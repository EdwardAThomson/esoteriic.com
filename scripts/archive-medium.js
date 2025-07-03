const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Create archive directory structure
const ARCHIVE_DIR = path.join(__dirname, '../temp_archive/medium');
const IMAGES_DIR = path.join(ARCHIVE_DIR, 'images');

if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper function to make HTTP/HTTPS requests
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;
        const request = protocol.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve({ data, headers: response.headers });
                } else if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    // Follow redirects
                    makeRequest(response.headers.location).then(resolve).catch(reject);
                } else {
                    reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                }
            });
        });
        request.on('error', reject);
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// Download and save image
async function downloadImage(imageUrl, filename) {
    try {
        console.log(`Downloading image: ${imageUrl}`);
        const response = await makeRequest(imageUrl);
        const imagePath = path.join(IMAGES_DIR, filename);
        
        // Write binary data
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

// Extract article content and metadata
function parseArticleContent(html, articleUrl) {
    // Extract title
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
    
    // Extract publication date
    const dateMatch = html.match(/<time[^>]*datetime="([^"]+)"/);
    const pubDate = dateMatch ? new Date(dateMatch[1]).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    // Extract article content (look for main article content)
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    let content = contentMatch ? contentMatch[1] : '';
    
    // If no article tag, try to find content in main content area
    if (!content) {
        const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        content = mainMatch ? mainMatch[1] : '';
    }
    
    // Clean up content and extract images
    const images = [];
    content = content.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
        // Generate filename from URL
        const urlObj = new URL(src);
        const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${src.split('.').pop().split('?')[0] || 'jpg'}`;
        images.push({ url: src, filename });
        return `![Image](./images/${filename})`;
    });
    
    // Convert HTML to markdown-like format
    content = content
        .replace(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/g, (match, level, text) => `${'#'.repeat(parseInt(level))} ${text}\n\n`)
        .replace(/<p[^>]*>([^<]+)<\/p>/g, '$1\n\n')
        .replace(/<strong[^>]*>([^<]+)<\/strong>/g, '**$1**')
        .replace(/<em[^>]*>([^<]+)<\/em>/g, '*$1*')
        .replace(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<[^>]+>/g, '') // Remove remaining HTML tags
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
        .trim();
    
    return {
        title,
        pubDate,
        content,
        images,
        url: articleUrl
    };
}

// Get article links from Medium profile
async function getArticleLinks(profileUrl) {
    try {
        console.log(`Fetching profile: ${profileUrl}`);
        const response = await makeRequest(profileUrl);
        const html = response.data;
        
        // Extract article links from Medium profile
        const articleLinks = [];
        const linkRegex = /<a[^>]*href="([^"]*\/[^"]*-[a-f0-9]{12})"[^>]*>/g;
        let match;
        
        while ((match = linkRegex.exec(html)) !== null) {
            let url = match[1];
            // Ensure full URL
            if (url.startsWith('/')) {
                url = 'https://medium.com' + url;
            } else if (!url.startsWith('http')) {
                url = 'https://medium.com/' + url;
            }
            
            // Avoid duplicates
            if (!articleLinks.includes(url)) {
                articleLinks.push(url);
            }
        }
        
        console.log(`Found ${articleLinks.length} articles`);
        return articleLinks;
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        return [];
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
    
    console.log('Starting Medium blog archive...');
    console.log(`Archive directory: ${ARCHIVE_DIR}`);
    
    try {
        // Get all article links
        const articleLinks = await getArticleLinks(profileUrl);
        
        if (articleLinks.length === 0) {
            console.log('No articles found. This might be due to Medium\'s dynamic loading.');
            console.log('Consider using a browser automation tool like Puppeteer for better results.');
            return;
        }
        
        // Process each article
        for (let i = 0; i < articleLinks.length; i++) {
            const articleUrl = articleLinks[i];
            console.log(`\nProcessing article ${i + 1}/${articleLinks.length}: ${articleUrl}`);
            
            try {
                const response = await makeRequest(articleUrl);
                const articleData = parseArticleContent(response.data, articleUrl);
                await saveArticle(articleData, i);
                
                // Add delay to be respectful to Medium's servers
                await new Promise(resolve => setTimeout(resolve, 2000));
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