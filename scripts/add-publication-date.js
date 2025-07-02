const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const MARKDOWN_DIR = path.join(__dirname, '..', 'src', 'markdown');
const TEMP_ARCHIVE_DIR = path.join(__dirname, '..', 'temp_archive');
const REDIRECTS_FILE = path.join(__dirname, '..', 'redirects.json');

async function addPublicationDates() {
    try {
        const redirects = JSON.parse(await fs.readFile(REDIRECTS_FILE, 'utf8'));
        const markdownFiles = await fs.readdir(MARKDOWN_DIR);

        // Create a reverse map from newUrl to oldUrl
        const urlMap = {};
        for (const oldUrl in redirects) {
            const newUrl = redirects[oldUrl].newUrl;
            urlMap[newUrl] = oldUrl;
        }

        for (const markdownFile of markdownFiles) {
            const markdownFilePath = path.join(MARKDOWN_DIR, markdownFile);
            const stats = await fs.stat(markdownFilePath);

            if (stats.isDirectory()) {
                continue;
            }

            const newUrl = `/${markdownFile.replace(/\.md$/, '')}/`;
            const oldUrl = urlMap[newUrl];

            if (oldUrl) {
                const htmlFilePath = path.join(TEMP_ARCHIVE_DIR, oldUrl.substring(1));

                try {
                    const htmlContent = await fs.readFile(htmlFilePath, 'utf8');
                    const $ = cheerio.load(htmlContent);

                    const dateElement = $('.PostHeaderIcons.metadata-icons');
                    let dateText = dateElement.text().trim();

                    if (dateText) {
                        // The text is like "Monday, 01 June 2009 22:19 | Author: Ed | ..."
                        dateText = dateText.split('|')[0].trim();

                        const markdownContent = await fs.readFile(markdownFilePath, 'utf8');
                        const updatedContent = `*Originally published: ${dateText}*\n\n` + markdownContent;
                        await fs.writeFile(markdownFilePath, updatedContent);
                        console.log(`Added publication date to ${markdownFile}`);
                    }
                } catch (err) {
                    console.error(`Error processing ${markdownFile}:`, err);
                }
            }
        }
    } catch (err) {
        console.error('Error adding publication dates:', err);
    }
}

addPublicationDates(); 