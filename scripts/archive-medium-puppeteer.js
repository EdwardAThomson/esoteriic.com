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
                    reject(new Error(`Failed to download image: ${res.statusCode}`));
                    return;
                }
                
                const writeStream = fs.createWriteStream(imagePath);
                res.pipe(writeStream);
                
                writeStream.on('finish', () => {
                    console.log(`Saved image: ${filename}`);
                    resolve(filename);
                });
                
                writeStream.on('error', reject);
            });
            request.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download image ${imageUrl}:`, error.message);
        return null;
    }
}

// Extract and clean content
function cleanContent(content) {
    return content
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}

// Get article links from Medium profile using Puppeteer
async function getArticleLinks(profileUrl) {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set user agent to avoid bot detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        console.log(`Fetching profile: ${profileUrl}`);
        await page.goto(profileUrl, { waitUntil: 'networkidle2' });
        
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
        
        // Extract article links
        const articleLinks = await page.evaluate(() => {
            const links = [];
            const articleElements = document.querySelectorAll('a[href*="medium.com"]');
            
            articleElements.forEach(element => {
                const href = element.getAttribute('href');
                if (href && href.includes('-') && href.match(/[a-f0-9]{12}/)) {
                    let fullUrl = href;
                    if (href.startsWith('/')) {
                        fullUrl = 'https://medium.com' + href;
                    }
                    if (!links.includes(fullUrl)) {
                        links.push(fullUrl);
                    }
                }
            });
            
            return links;
        });
        
        console.log(`Found ${articleLinks.length} articles`);
        return articleLinks;
        
    } finally {
        await browser.close();
    }
}

// Scrape individual article
async function scrapeArticle(articleUrl) {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        await page.goto(articleUrl, { waitUntil: 'networkidle2' });
        
        // Extract article data
        const articleData = await page.evaluate(() => {
            // Get title
            const titleElement = document.querySelector('h1');
            const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
            
            // Get publication date
            const timeElement = document.querySelector('time');
            const pubDate = timeElement ? 
                new Date(timeElement.getAttribute('datetime') || timeElement.textContent).toISOString().split('T')[0] : 
                new Date().toISOString().split('T')[0];
            
            // Get article content
            const articleElement = document.querySelector('article') || document.querySelector('main');
            let content = '';
            let images = [];
            
            if (articleElement) {
                // Process paragraphs
                const paragraphs = articleElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol');
                paragraphs.forEach(p => {
                    const tagName = p.tagName.toLowerCase();
                    let text = p.textContent.trim();
                    
                    if (text) {
                        switch (tagName) {
                            case 'h1':
                                content += `# ${text}\n\n`;
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
                            case 'ul':
                            case 'ol':
                                const items = p.querySelectorAll('li');
                                items.forEach(li => {
                                    content += `- ${li.textContent.trim()}\n`;
                                });
                                content += '\n';
                                break;
                            default:
                                content += `${text}\n\n`;
                        }
                    }
                });
                
                // Process images
                const imgElements = articleElement.querySelectorAll('img');
                imgElements.forEach((img, index) => {
                    const src = img.src;
                    if (src && !src.startsWith('data:')) {
                        const filename = `${Date.now()}_${index}.${src.split('.').pop().split('?')[0] || 'jpg'}`;
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
    const filename = `${pubDate}_${title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)}.md`;
    
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
    console.log(`Saved article ${index + 1}: ${filename}`);
}

// Main function
async function archiveMediumBlog() {
    const profileUrl = 'https://edward-thomson.medium.com/';
    
    console.log('Starting Medium blog archive with Puppeteer...');
    console.log(`Archive directory: ${ARCHIVE_DIR}`);
    
    try {
        // Get all article links
        const articleLinks = await getArticleLinks(profileUrl);
        
        if (articleLinks.length === 0) {
            console.log('No articles found.');
            return;
        }
        
        // Process each article
        for (let i = 0; i < articleLinks.length; i++) {
            const articleUrl = articleLinks[i];
            console.log(`\nProcessing article ${i + 1}/${articleLinks.length}: ${articleUrl}`);
            
            try {
                const articleData = await scrapeArticle(articleUrl);
                await saveArticle(articleData, i);
                
                // Add delay to be respectful to Medium's servers
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (error) {
                console.error(`Error processing article ${articleUrl}:`, error.message);
            }
        }
        
        console.log('\nArchive complete!');
        console.log(`Articles saved to: ${ARCHIVE_DIR}`);
        console.log(`Images saved to: ${IMAGES_DIR}`);
        
    } catch (error) {
        console.error('Error during archive process:', error.message);
    }
}

// Run the script
if (require.main === module) {
    archiveMediumBlog();
}

module.exports = { archiveMediumBlog }; 