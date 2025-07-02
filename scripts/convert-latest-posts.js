const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const LATEST_POSTS_DIR = path.join(__dirname, '..', 'temp_archive', 'latest');
const MARKDOWN_DIR = path.join(__dirname, '..', 'src', 'markdown');

const turndownService = new TurndownService();

async function convertLatestPosts() {
    console.log('Converting latest posts to markdown...');
    const htmlFiles = await fs.readdir(LATEST_POSTS_DIR);

    for (const htmlFile of htmlFiles) {
        if (!htmlFile.endsWith('.html')) continue;

        const slug = htmlFile.replace('.html', '');
        const markdownPath = path.join(MARKDOWN_DIR, `${slug}.md`);

        if (await fs.pathExists(markdownPath)) {
            console.log(`[SKIP] ${slug}.md already exists.`);
            continue;
        }

        console.log(`Converting ${htmlFile}...`);

        const htmlContent = await fs.readFile(path.join(LATEST_POSTS_DIR, htmlFile), 'utf8');
        const $ = cheerio.load(htmlContent);

        const title = $('.entry-title').text().trim();
        const contentHtml = $('.entry-content').html();
        const date = new Date($('time.entry-date').attr('datetime')).toISOString();
        const category = $('a[rel="category tag"]').first().text() || 'uncategorized';

        if (!title || !contentHtml) {
            console.error(`[ERROR] Could not extract title or content from ${htmlFile}.`);
            continue;
        }

        const markdownContent = turndownService.turndown(contentHtml);

        const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
category: ${category.toLowerCase().replace(' ', '-')}
---

`;

        const fullMarkdown = frontMatter + markdownContent;
        await fs.writeFile(markdownPath, fullMarkdown);
        console.log(`[OK] Created ${slug}.md`);
    }

    console.log('Finished converting latest posts.');
}

convertLatestPosts().catch(console.error); 