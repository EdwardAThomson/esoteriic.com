const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const archiveDir = path.join(__dirname, '../temp_archive');
const markdownDir = path.join(__dirname, '../src/markdown');
const redirectsFile = path.join(__dirname, '../redirects.json');

const turndownService = new TurndownService();

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

async function convertFile(filePath) {
  const html = await fs.readFile(filePath, 'utf-8');
  const $ = cheerio.load(html);

  const title = $('head title').text().trim();
  if (!title) {
    console.warn(`[WARN] No title found in ${filePath}, skipping.`);
    return null;
  }

  // Final, correct, and simple script.
  // It will find the div with the class `article` and extract the HTML.
  const $article = $('div.article');

  if ($article.length === 0) {
    console.warn(`[WARN] 'div.article' not found in ${filePath}, skipping.`);
    return null;
  }

  const contentHtml = $article.html();
  const markdownContent = turndownService.turndown(contentHtml);

  const slug = slugify(title);
  const newFilePath = path.join(markdownDir, `${slug}.md`);

  const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
---

${markdownContent}
`;

  await fs.writeFile(newFilePath, frontMatter);
  console.log(`[OK] Converted ${filePath} to ${newFilePath}`);

  const newUrl = `/${slug}/`;
  
  return { newUrl, title };
}

async function processDirectory(directory, redirects) {
  const files = await fs.readdir(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await processDirectory(fullPath, redirects);
    } else if (fullPath.endsWith('.html')) {
      const result = await convertFile(fullPath);
      if (result) {
        const oldUrl = fullPath.replace(archiveDir, '').replace(/\\/g, '/');
        redirects[oldUrl] = {
          newUrl: result.newUrl,
          title: result.title
        };
      }
    }
  }
}

async function main() {
  // Clear any previous attempts
  await fs.emptyDir(markdownDir);
  console.log('Cleaned markdown directory.');

  const redirects = {};
  await processDirectory(archiveDir, redirects);

  await fs.writeJson(redirectsFile, redirects, { spaces: 2 });
  console.log(`\nRedirect map saved to ${redirectsFile}`);
  console.log('Conversion complete!');
}

main(); 