const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const LATEST_POSTS_DIR = path.join(__dirname, '..', 'temp_archive', 'latest');
const SITE_URL = 'https://esoteriic.com/';

async function fetchLatestPosts() {
    console.log(`Fetching latest posts from ${SITE_URL}`);
    await fs.ensureDir(LATEST_POSTS_DIR);

    try {
        const { data: homeHtml } = await axios.get(SITE_URL);
        const $ = cheerio.load(homeHtml);

        const postLinks = new Set(); // Use a Set to avoid duplicate links
        
        // Selector for typical WordPress post links on a homepage
        $('article.post .entry-title a').each((i, el) => {
            const url = $(el).attr('href');
            if (url) {
                postLinks.add(url);
            }
        });

        console.log(`Found ${postLinks.size} post links.`);

        for (const postUrl of postLinks) {
            try {
                const urlObject = new URL(postUrl);
                const slug = path.basename(urlObject.pathname);
                const filePath = path.join(LATEST_POSTS_DIR, `${slug}.html`);

                if (await fs.pathExists(filePath)) {
                    console.log(`[SKIP] ${slug}.html already exists.`);
                    continue;
                }

                console.log(`Fetching ${postUrl}`);
                const { data: postHtml } = await axios.get(postUrl);

                await fs.writeFile(filePath, postHtml);
                console.log(`[OK] Saved ${slug}.html`);
            } catch (err) {
                console.error(`Error processing post from ${postUrl}:`, err.message);
            }
        }

        console.log('Finished fetching latest posts.');

    } catch (error) {
        console.error('Error fetching the homepage:', error.message);
    }
}

fetchLatestPosts(); 