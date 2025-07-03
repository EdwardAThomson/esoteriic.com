const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const waybackDir = path.join(__dirname, '../temp_archive/odinnsecurity.com');
const markdownDir = path.join(__dirname, '../src/markdown');
const redirectsFile = path.join(__dirname, '../redirects.json');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Add custom rules for better markdown conversion
turndownService.addRule('removeWaybackUrls', {
  filter: function (node) {
    return node.nodeName === 'A' && node.getAttribute('href') && 
           node.getAttribute('href').includes('web.archive.org');
  },
  replacement: function (content, node) {
    const href = node.getAttribute('href');
    if (href) {
      // Extract the original URL from wayback machine URL
      const match = href.match(/https:\/\/web\.archive\.org\/web\/\d+\/(.+)/);
      const originalUrl = match ? match[1] : href;
      return `[${content}](${originalUrl})`;
    }
    return content;
  }
});

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function cleanWaybackUrls(html) {
  // Remove wayback machine URLs from src and href attributes
  return html
    .replace(/https:\/\/web\.archive\.org\/web\/\d+\//g, '')
    .replace(/https:\/\/web-static\.archive\.org\/_static\//g, '')
    .replace(/cs_\//g, '');
}

function extractDateFromMeta($) {
  // Try to extract date from various meta formats
  const timeElement = $('time.entry-date');
  if (timeElement.length > 0) {
    const datetime = timeElement.attr('datetime');
    if (datetime) {
      return new Date(datetime).toISOString().split('T')[0];
    }
  }
  
  // Fallback to text parsing
  const dateText = $('.entry-date').text();
  if (dateText) {
    const match = dateText.match(/(\w+ \d+, \d+)/);
    if (match) {
      const date = new Date(match[1]);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }
  }
  
  return new Date().toISOString().split('T')[0]; // fallback to today
}

async function convertFile(filePath) {
  const html = await fs.readFile(filePath, 'utf-8');
  const $ = cheerio.load(html);

  // Extract title
  const title = $('h1.entry-title').text().trim() || $('title').text().replace(' – Odinn Security', '').trim();
  if (!title) {
    console.warn(`[WARN] No title found in ${path.basename(filePath)}, skipping.`);
    return null;
  }

  // Find the article content
  const $article = $('article.post-content');
  if ($article.length === 0) {
    console.warn(`[WARN] 'article.post-content' not found in ${path.basename(filePath)}, skipping.`);
    return null;
  }

  // Extract just the entry-content div for the main content
  const $entryContent = $article.find('.entry-content');
  if ($entryContent.length === 0) {
    console.warn(`[WARN] '.entry-content' not found in ${path.basename(filePath)}, skipping.`);
    return null;
  }

  // Clean wayback URLs from the content HTML
  let contentHtml = $entryContent.html();
  contentHtml = cleanWaybackUrls(contentHtml);

  // Convert to markdown
  const markdownContent = turndownService.turndown(contentHtml);

  // Extract date
  const date = extractDateFromMeta($);

  // Generate slug and filename
  const slug = slugify(title);
  const newFilePath = path.join(markdownDir, `${slug}.md`);

  // Create frontmatter
  const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
tags: ["security", "blog-archive"]
---

${markdownContent}
`;

  await fs.writeFile(newFilePath, frontMatter);
  console.log(`[OK] Converted "${title}" to ${path.basename(newFilePath)}`);

  const newUrl = `/${slug}/`;
  
  return { newUrl, title, originalFile: path.basename(filePath) };
}

async function processDirectory(directory, redirects) {
  const files = await fs.readdir(directory);
  let converted = 0;
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      const subResults = await processDirectory(fullPath, redirects);
      converted += subResults;
    } else if (fullPath.endsWith('.html')) {
      try {
        const result = await convertFile(fullPath);
        if (result) {
          const oldUrl = fullPath.replace(waybackDir, '').replace(/\\/g, '/');
          redirects[oldUrl] = {
            newUrl: result.newUrl,
            title: result.title,
            originalFile: result.originalFile
          };
          converted++;
        }
      } catch (error) {
        console.error(`[ERROR] Failed to convert ${file}: ${error.message}`);
      }
    }
  }
  
  return converted;
}

async function main() {
  console.log('Starting conversion of Wayback Machine blog posts...');
  
  // Ensure markdown directory exists
  await fs.ensureDir(markdownDir);
  
  // Load existing redirects if they exist
  let redirects = {};
  try {
    redirects = await fs.readJson(redirectsFile);
  } catch (error) {
    console.log('Creating new redirects file...');
  }

  const converted = await processDirectory(waybackDir, redirects);

  // Save updated redirects
  await fs.writeJson(redirectsFile, redirects, { spaces: 2 });
  
  console.log(`\n✅ Conversion complete!`);
  console.log(`📝 Converted ${converted} blog posts`);
  console.log(`📁 Files saved to: ${markdownDir}`);
  console.log(`🔗 Redirect map updated: ${redirectsFile}`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  });
}

module.exports = { main }; 