const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const RAW_DIR = path.join(__dirname, '../temp_archive/medium_raw');
const OUTPUT_DIR = path.join(__dirname, '../temp_archive/medium_processed');

// Configure TurndownService for better markdown conversion
const turndownService = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full'
});

// Custom rules for better Medium conversion
turndownService.addRule('figcaption', {
    filter: 'figcaption',
    replacement: function(content) {
        return '*' + content + '*';
    }
});

turndownService.addRule('removeScript', {
    filter: 'script',
    replacement: function() {
        return '';
    }
});

turndownService.addRule('removeStyle', {
    filter: 'style',
    replacement: function() {
        return '';
    }
});

function extractTitle(html) {
    const $ = cheerio.load(html);
    
    // Try multiple selectors for title
    const titleSelectors = [
        'h1[data-testid="storyTitle"]',
        'h1.pw-post-title',
        'h1',
        'title'
    ];
    
    for (const selector of titleSelectors) {
        const title = $(selector).first().text().trim();
        if (title) {
            return title;
        }
    }
    
    return 'Untitled';
}

function extractDate(html) {
    const $ = cheerio.load(html);
    
    // Try multiple selectors for date
    const dateSelectors = [
        '[data-testid="storyPublishDate"]',
        'time',
        '.published-date'
    ];
    
    for (const selector of dateSelectors) {
        const date = $(selector).first().text().trim();
        if (date) {
            // Parse the date and convert to YYYY-MM-DD format
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate.toISOString().split('T')[0];
            }
        }
    }
    
    return '2024-01-01'; // Default date
}

function extractOriginalUrl(metadataPath) {
    try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        return metadata.url || '';
    } catch (error) {
        return '';
    }
}

function processArticleContent(html) {
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, .header, .footer, .nav').remove();
    $('[class*="clap"], [class*="follow"], [class*="subscribe"]').remove();
    $('[data-testid*="clap"], [data-testid*="follow"]').remove();
    
    // Try to find the main content area
    const contentSelectors = [
        'article',
        'main',
        '[role="main"]',
        '.post-content',
        '.story-content'
    ];
    
    let content = '';
    for (const selector of contentSelectors) {
        const element = $(selector).first();
        if (element.length > 0) {
            console.log(`Found content with selector: ${selector}`);
            
            // Extract only the actual article content paragraphs
            const paragraphs = element.find('p[data-selectable-paragraph], h1, h2, h3, h4, h5, h6, ul, ol, blockquote, figure');
            
            if (paragraphs.length > 0) {
                // Create a clean HTML structure with just the content
                const cleanHtml = paragraphs.map((i, el) => {
                    const $el = $(el);
                    
                    // Clean up classes and attributes
                    $el.removeAttr('class');
                    $el.removeAttr('id');
                    $el.removeAttr('data-selectable-paragraph');
                    
                    // Convert images to proper markdown format
                    $el.find('img').each((j, img) => {
                        const $img = $(img);
                        const src = $img.attr('src');
                        const alt = $img.attr('alt') || '';
                        
                        if (src && src.includes('miro.medium.com')) {
                            // Convert to local image reference
                            const imageName = src.split('/').pop();
                            $img.attr('src', `./images/${imageName}`);
                        }
                    });
                    
                    return $.html($el);
                }).get().join('\n');
                
                content = turndownService.turndown(cleanHtml);
                break;
            }
        }
    }
    
    if (!content) {
        console.log('No article content found');
        return '';
    }
    
    // Clean up the markdown
    content = content
        .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
        .replace(/\*\*\*\*/g, '**') // Fix bold formatting
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            // Clean up URLs
            if (url.includes('medium.com/@edward.thomson/')) {
                return `[${text}](${url})`;
            }
            return match;
        })
        .trim();
    
    return content;
}

async function processHtmlFile(filePath) {
    try {
        const html = await fs.readFile(filePath, 'utf8');
        const filename = path.basename(filePath, '_article.html');
        const metadataPath = path.join(RAW_DIR, `${filename}.json`);
        
        const title = extractTitle(html);
        const date = extractDate(html);
        const originalUrl = extractOriginalUrl(metadataPath);
        const content = processArticleContent(html);
        
        // Create frontmatter
        const frontmatter = [
            '---',
            `title: "${title}"`,
            `date: "${date}"`,
            `tags: medium-archive`,
            `category: "blog"`,
            `description: ""`,
            `original_url: "${originalUrl}"`,
            '---',
            '',
            content
        ].join('\n');
        
        const outputPath = path.join(OUTPUT_DIR, `${filename}.md`);
        await fs.writeFile(outputPath, frontmatter);
        
        console.log(`✓ Processed: ${filename}.md`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

async function main() {
    // Ensure output directory exists
    await fs.ensureDir(OUTPUT_DIR);
    
    // Find all HTML files to process
    const files = await fs.readdir(RAW_DIR);
    const htmlFiles = files.filter(file => file.endsWith('_article.html'));
    
    console.log(`Found ${htmlFiles.length} HTML files to process.`);
    
    // Process each file
    for (const file of htmlFiles) {
        const filePath = path.join(RAW_DIR, file);
        console.log(`Processing: ${file}`);
        await processHtmlFile(filePath);
    }
    
    // Copy images directory
    const imagesSourceDir = path.join(RAW_DIR, 'images');
    const imagesTargetDir = path.join(OUTPUT_DIR, 'images');
    
    if (await fs.pathExists(imagesSourceDir)) {
        await fs.copy(imagesSourceDir, imagesTargetDir);
        console.log(`✓ Copied images to ${imagesTargetDir}`);
    }
    
    console.log('\n🎉 HTML processing complete!');
    console.log(`📝 Successfully processed ${htmlFiles.length} files`);
    console.log(`📁 Output saved to: ${OUTPUT_DIR}`);
    console.log('\nNext steps:');
    console.log('1. Review the processed markdown files');
    console.log('2. Check for any formatting issues');
    console.log('3. Use convert-medium-blogs.js to move to your main blog');
}

main().catch(console.error); 