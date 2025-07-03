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
const ARCHIVE_DIR = path.join(__dirname, '../temp_archive/medium_raw');
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

// Save raw HTML and basic metadata
async function saveRawArticle(articleUrl, index) {
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
        
        // Get basic metadata and full HTML
        const pageData = await page.evaluate(() => {
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
            
            // Get the full HTML content
            const fullHtml = document.documentElement.outerHTML;
            
            // Get just the article content HTML for easier processing later
            let articleHtml = '';
            const articleElement = document.querySelector('article') ||
                                 document.querySelector('[data-testid="storyContent"]') ||
                                 document.querySelector('main') ||
                                 document.querySelector('.postArticle-content');
            
            if (articleElement) {
                articleHtml = articleElement.outerHTML;
            }
            
            return {
                title,
                pubDate,
                fullHtml,
                articleHtml
            };
        });
        
        // Collect all images in the article
        const images = await page.evaluate(() => {
            const imgElements = document.querySelectorAll('img');
            const imageUrls = [];
            
            imgElements.forEach((img, index) => {
                const src = img.src;
                if (src && !src.startsWith('data:') && src.includes('medium.com')) {
                    // Create a safe filename
                    const extension = src.includes('.png') ? 'png' : 
                                    src.includes('.gif') ? 'gif' : 'jpg';
                    const filename = `${Date.now()}_${index}.${extension}`;
                    imageUrls.push({ url: src, filename });
                }
            });
            
            return imageUrls;
        });
        
        return { ...pageData, url: articleUrl, images };
        
    } finally {
        await browser.close();
    }
}

// Save article data to files
async function saveArticleFiles(articleData, index) {
    const { title, pubDate, fullHtml, articleHtml, images, url } = articleData;
    
    // Create filename from title
    const sanitizedTitle = sanitizeFilename(title);
    const baseFilename = `${pubDate}_${sanitizedTitle || 'article-' + index}`;
    
    // Save metadata as JSON
    const metadataPath = path.join(ARCHIVE_DIR, `${baseFilename}.json`);
    const metadata = {
        title,
        pubDate,
        url,
        images: images.map(img => img.filename),
        archived: new Date().toISOString()
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
    
    // Save full HTML
    const fullHtmlPath = path.join(ARCHIVE_DIR, `${baseFilename}_full.html`);
    fs.writeFileSync(fullHtmlPath, fullHtml, 'utf8');
    
    // Save article HTML
    const articleHtmlPath = path.join(ARCHIVE_DIR, `${baseFilename}_article.html`);
    fs.writeFileSync(articleHtmlPath, articleHtml, 'utf8');
    
    // Download images
    const imagePromises = images.map(img => downloadImage(img.url, img.filename));
    await Promise.all(imagePromises);
    
    console.log(`✓ Saved raw article ${index + 1}: ${baseFilename}`);
    console.log(`  - Metadata: ${baseFilename}.json`);
    console.log(`  - Full HTML: ${baseFilename}_full.html`);
    console.log(`  - Article HTML: ${baseFilename}_article.html`);
    console.log(`  - Images: ${images.length} files`);
}

// Main function
async function archiveMediumRaw() {
    const profileUrl = 'https://edward-thomson.medium.com/';
    
    console.log('Starting RAW Medium blog archive...');
    console.log(`Archive directory: ${ARCHIVE_DIR}`);
    console.log('This will save raw HTML files that can be processed later.\n');
    
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
                const articleData = await saveRawArticle(articleUrl, i);
                if (articleData && articleData.title !== 'Untitled') {
                    await saveArticleFiles(articleData, i);
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
        
        console.log('\n🎉 RAW Archive complete!');
        console.log(`📝 Successfully archived ${successCount}/${articleLinks.length} articles`);
        console.log(`📁 Raw files saved to: ${ARCHIVE_DIR}`);
        console.log(`🖼️  Images saved to: ${IMAGES_DIR}`);
        console.log('\nNext steps:');
        console.log('1. Review the HTML files to understand the structure');
        console.log('2. Use the process-medium-html.js script to convert to markdown');
        console.log('3. Debug and fix any parsing issues');
        
    } catch (error) {
        console.error('❌ Error during archive process:', error.message);
    }
}

// Run the script
if (require.main === module) {
    archiveMediumRaw();
}

module.exports = { archiveMediumRaw }; 