const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Check if puppeteer is available
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (error) {
    console.log('Puppeteer not found. Please install it with: npm install puppeteer');
    process.exit(1);
}

// Create archive directory structure
const ARCHIVE_DIR = path.join(__dirname, '../temp_archive/medium');
const IMAGES_DIR = path.join(ARCHIVE_DIR, 'images');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Download and save image
async function downloadImage(imageUrl, filename) {
    try {
        console.log(`Downloading image: ${imageUrl}`);
        const imagePath = path.join(IMAGES_DIR, filename);
        
        return new Promise((resolve, reject) => {
            const request = (imageUrl.startsWith('https:') ? https : http).get(imageUrl, (res) => {
                if (res.statusCode !== 200) {
                    console.warn(`Failed to download image ${imageUrl}: ${res.statusCode}`);
                    resolve(null);
                    return;
                }
                
                const writeStream = fs.createWriteStream(imagePath);
                res.pipe(writeStream);
                
                writeStream.on('finish', () => {
                    console.log(`Saved image: ${filename}`);
                    resolve(filename);
                });
                
                writeStream.on('error', (err) => {
                    console.warn(`Error saving image ${filename}:`, err.message);
                    resolve(null);
                });
            });
            request.on('error', (err) => {
                console.warn(`Error downloading image ${imageUrl}:`, err.message);
                resolve(null);
            });
            request.setTimeout(10000, () => {
                request.destroy();
                console.warn(`Timeout downloading image: ${imageUrl}`);
                resolve(null);
            });
        });
    } catch (error) {
        console.warn(`Failed to download image ${imageUrl}:`, error.message);
        return null;
    }
}

// Clean filename for safe file system usage
function sanitizeFilename(filename) {
    return filename
        .replace(/[^a-z0-9\s-]/gi, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .substring(0, 50);
}

// Extract clean article URLs from Medium profile
async function getArticleLinks(profileUrl) {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set user agent to avoid bot detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        console.log(`Fetching profile: ${profileUrl}`);
        await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Scroll to load more articles
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        
        // Wait a bit more for dynamic content
        await page.waitForTimeout(2000);
        
        // Extract article links more carefully
        const articleLinks = await page.evaluate(() => {
            const links = new Set();
            
            // Look for various link patterns that might contain articles
            const selectors = [
                'a[href*="medium.com"]',
                'a[href*="-"]',
                'article a',
                'h2 a',
                'h3 a'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const href = element.getAttribute('href');
                    if (href) {
                        let cleanUrl = href;
                        
                        // Extract the actual article URL from redirect URLs
                        if (href.includes('redirect=')) {
                            const match = href.match(/redirect=([^&]+)/);
                            if (match) {
                                cleanUrl = decodeURIComponent(match[1]);
                            }
                        }
                        
                        // Only include URLs that look like actual articles
                        if (cleanUrl.includes('medium.com') && 
                            cleanUrl.includes('-') && 
                            cleanUrl.match(/[a-f0-9]{12}/) &&
                            !cleanUrl.includes('/m/signin') &&
                            !cleanUrl.includes('bookmark') &&
                            !cleanUrl.includes('policy.medium.com')) {
                            
                            // Make sure it's a full URL
                            if (cleanUrl.startsWith('/')) {
                                cleanUrl = 'https://medium.com' + cleanUrl;
                            }
                            
                            links.add(cleanUrl);
                        }
                    }
                });
            });
            
            return Array.from(links);
        });
        
        // Filter out duplicates and invalid URLs
        const validArticles = articleLinks.filter(url => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        });
        
        console.log(`Found ${validArticles.length} valid article URLs`);
        return validArticles;
        
    } finally {
        await browser.close();
    }
}

// Scrape individual article with better error handling
async function scrapeArticle(articleUrl) {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // Try to navigate to the article
        try {
            await page.goto(articleUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        } catch (error) {
            console.warn(`Failed to load ${articleUrl}: ${error.message}`);
            return null;
        }
        
        // Check if we got redirected to a signin page
        const currentUrl = page.url();
        if (currentUrl.includes('/m/signin') || currentUrl.includes('sign-in')) {
            console.warn(`Article requires sign-in: ${articleUrl}`);
            return null;
        }
        
        // Extract article data with better selectors
        const articleData = await page.evaluate(() => {
            // Get title - try multiple selectors
            let titleElement = document.querySelector('h1[data-testid="storyTitle"]') ||
                              document.querySelector('h1') ||
                              document.querySelector('[data-testid="storyTitle"]') ||
                              document.querySelector('article h1');
            
            const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
            
            // Get publication date - try multiple selectors
            let timeElement = document.querySelector('time') ||
                             document.querySelector('[data-testid="storyPublishDate"]') ||
                             document.querySelector('[datetime]');
            
            let pubDate;
            if (timeElement) {
                const datetime = timeElement.getAttribute('datetime') || timeElement.textContent;
                pubDate = new Date(datetime).toISOString().split('T')[0];
            } else {
                pubDate = new Date().toISOString().split('T')[0];
            }
            
            // Get article content with better selectors
            let contentElement = document.querySelector('article') ||
                               document.querySelector('[data-testid="storyContent"]') ||
                               document.querySelector('main') ||
                               document.querySelector('.postArticle-content');
            
            let content = '';
            let images = [];
            
            if (contentElement) {
                // Process all text elements
                const elements = contentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, li');
                elements.forEach(element => {
                    const tagName = element.tagName.toLowerCase();
                    let text = element.textContent.trim();
                    
                    if (text && !text.includes('Sign up') && !text.includes('Follow')) {
                        switch (tagName) {
                            case 'h1':
                                if (text !== title) content += `# ${text}\n\n`;
                                break;
                            case 'h2':
                                content += `## ${text}\n\n`;
                                break;
                            case 'h3':
                                content += `### ${text}\n\n`;
                                break;
                            case 'h4':
                                content += `#### ${text}\n\n`;
                                break;
                            case 'h5':
                                content += `##### ${text}\n\n`;
                                break;
                            case 'h6':
                                content += `###### ${text}\n\n`;
                                break;
                            case 'blockquote':
                                content += `> ${text}\n\n`;
                                break;
                            case 'pre':
                                content += `\`\`\`\n${text}\n\`\`\`\n\n`;
                                break;
                            case 'li':
                                content += `- ${text}\n`;
                                break;
                            default:
                                if (tagName === 'p' || tagName === 'div') {
                                    content += `${text}\n\n`;
                                }
                        }
                    }
                });
                
                // Process images
                const imgElements = contentElement.querySelectorAll('img');
                imgElements.forEach((img, index) => {
                    const src = img.src;
                    if (src && !src.startsWith('data:') && src.includes('medium.com')) {
                        // Create a safe filename
                        const extension = src.includes('.png') ? 'png' : 
                                        src.includes('.gif') ? 'gif' : 'jpg';
                        const filename = `${Date.now()}_${index}.${extension}`;
                        images.push({ url: src, filename });
                        content += `\n![Image](./images/${filename})\n\n`;
                    }
                });
            }
            
            return {
                title,
                pubDate,
                content: content.trim(),
                images
            };
        });
        
        return { ...articleData, url: articleUrl };
        
    } finally {
        await browser.close();
    }
}

// Save article as markdown
async function saveArticle(articleData, index) {
    const { title, pubDate, content, images, url } = articleData;
    
    // Create filename from title
    const sanitizedTitle = sanitizeFilename(title);
    const filename = `${pubDate}_${sanitizedTitle || 'article-' + index}.md`;
    
    // Download images
    const imagePromises = images.map(img => downloadImage(img.url, img.filename));
    await Promise.all(imagePromises);
    
    // Create markdown content
    const markdown = `---
title: "${title}"
date: "${pubDate}"
source: "Medium"
original_url: "${url}"
---

# ${title}

${content}
`;
    
    // Save markdown file
    const filePath = path.join(ARCHIVE_DIR, filename);
    fs.writeFileSync(filePath, markdown, 'utf8');
    console.log(`✓ Saved article ${index + 1}: ${filename}`);
}

// Main function
async function archiveMediumBlog() {
    const profileUrl = 'https://edward-thomson.medium.com/';
    
    console.log('Starting improved Medium blog archive...');
    console.log(`Archive directory: ${ARCHIVE_DIR}`);
    
    try {
        // Get all article links
        const articleLinks = await getArticleLinks(profileUrl);
        
        if (articleLinks.length === 0) {
            console.log('No articles found.');
            return;
        }
        
        let successCount = 0;
        
        // Process each article
        for (let i = 0; i < articleLinks.length; i++) {
            const articleUrl = articleLinks[i];
            console.log(`\nProcessing article ${i + 1}/${articleLinks.length}:`);
            console.log(`URL: ${articleUrl}`);
            
            try {
                const articleData = await scrapeArticle(articleUrl);
                if (articleData && articleData.title !== 'Untitled') {
                    await saveArticle(articleData, i);
                    successCount++;
                } else {
                    console.log(`⚠ Skipped article (no content or requires sign-in)`);
                }
                
                // Add delay to be respectful to Medium's servers
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (error) {
                console.error(`❌ Error processing article ${articleUrl}:`, error.message);
            }
        }
        
        console.log('\n🎉 Archive complete!');
        console.log(`📝 Successfully archived ${successCount}/${articleLinks.length} articles`);
        console.log(`📁 Articles saved to: ${ARCHIVE_DIR}`);
        console.log(`🖼️  Images saved to: ${IMAGES_DIR}`);
        
    } catch (error) {
        console.error('❌ Error during archive process:', error.message);
    }
}

// Run the script
if (require.main === module) {
    archiveMediumBlog();
}

module.exports = { archiveMediumBlog }; 