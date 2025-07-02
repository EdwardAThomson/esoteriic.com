const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const matter = require('gray-matter');

const steemitDir = path.join(__dirname, '../temp_archive/steemit');
const markdownDir = path.join(__dirname, '../src/markdown');

// Turndown configuration for converting HTML to Markdown
const turndownService = new TurndownService();

// Custom rule to handle images from steemitimages.com
turndownService.addRule('steemitImage', {
    filter: 'img',
    replacement: function (content, node) {
        const src = node.getAttribute('src');
        if (src && src.startsWith('https://steemitimages.com/')) {
            // Keep the original Steemit image URL
            return `![Image](${src})`;
        }
        // For other images, return the standard markdown
        return `![${node.alt || ''}](${src || ''})`;
    }
});


async function convertSteemitPosts() {
    try {
        const files = await fs.readdir(steemitDir);

        for (const file of files) {
            if (path.extname(file) === '.html' && file !== 'index.html') {
                const htmlPath = path.join(steemitDir, file);
                const htmlContent = await fs.readFile(htmlPath, 'utf8');
                const $ = cheerio.load(htmlContent);

                // Extract title
                const title = $('h1.entry-title').text().trim();
                if (!title) {
                    console.warn(`No title found in ${file}. Skipping.`);
                    continue;
                }

                // Extract date from meta tag
                const dateISO = $('meta[property="article:published_time"]').attr('content');
                if (!dateISO) {
                    console.warn(`No date found in ${file}. Skipping.`);
                    continue;
                }
                const date = new Date(dateISO);

                // Extract category from first tag link
                const category = $('.TagList__horizontal a').first().text().trim() || 'Uncategorized';

                // Extract content and convert to Markdown
                const contentHtml = $('.PostFull__body .MarkdownViewer').html();
                if (!contentHtml) {
                    console.warn(`No content found in ${file}. Skipping.`);
                    continue;
                }
                const markdownContent = turndownService.turndown(contentHtml);

                // Create front matter
                const frontMatter = {
                    title,
                    date: date.toISOString(),
                    category
                };

                const newContent = matter.stringify(markdownContent, frontMatter);
                
                // Create a slug from the original filename
                const slug = path.basename(file, '.html');
                const newFilePath = path.join(markdownDir, `${slug}.md`);

                await fs.writeFile(newFilePath, newContent);
                console.log(`Converted ${file} to ${path.basename(newFilePath)}`);
            }
        }
        console.log('Steemit posts conversion complete.');
    } catch (error) {
        console.error('Error converting Steemit posts:', error);
    }
}

convertSteemitPosts(); 