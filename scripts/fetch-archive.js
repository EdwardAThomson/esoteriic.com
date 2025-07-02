const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = 'https://esoteriic.com';
const archiveFile = path.join(__dirname, '../old/archive.html');
const outputDir = path.join(__dirname, '../temp_archive');

async function fetchAndSave(url, outputFile) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const outputDirForFile = path.dirname(outputFile);
    await fs.ensureDir(outputDirForFile);
    await fs.writeFile(outputFile, response.data);
    console.log(`Successfully downloaded and saved ${url} to ${outputFile}`);
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
  }
}

async function main() {
  // Ensure the output directory exists
  await fs.ensureDir(outputDir);

  // Read the archive file
  const archiveHtml = await fs.readFile(archiveFile, 'utf-8');

  // Load the HTML into cheerio
  const $ = cheerio.load(archiveHtml);

  // Find all links to articles
  const articleLinks = [];
  $('a[href^="/thoughts/"]').each((i, link) => {
    const href = $(link).attr('href');
    if (href.endsWith('.html')) {
        articleLinks.push(href);
    }
  });

  console.log(`Found ${articleLinks.length} article links to fetch.`);

  // Fetch and save all articles
  for (const articleLink of articleLinks) {
    const fullUrl = `${baseUrl}${articleLink}`;
    const outputFile = path.join(outputDir, articleLink);
    await fetchAndSave(fullUrl, outputFile);
  }

  console.log('Finished fetching all articles.');
}

main(); 