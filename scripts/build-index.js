const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

const archiveFile = path.join(__dirname, '../old/archive.html');
const redirectsFile = path.join(__dirname, '../redirects.json');
const outputFile = path.join(__dirname, '../src/markdown/archive.md');

async function buildIndex() {
  const archiveHtml = await fs.readFile(archiveFile, 'utf-8');
  const redirects = await fs.readJson(redirectsFile);
  const $ = cheerio.load(archiveHtml);

  let markdown = '---\ntitle: "Archive"\ndescription: "The full archive of the Esoteriic blog."\n---\n\n';

  $('div.entry-content').children().each((i, el) => {
    const tagName = el.tagName;
    const $el = $(el);

    if (tagName === 'h4') {
      const category = $el.text();
      if (category !== 'Deprecated pages') {
          markdown += `## ${category}\n\n`;
      }
    } else if (tagName === 'p' && $el.find('strong').length > 0) {
      const subCategory = $el.find('strong').text();
      markdown += `### ${subCategory}\n\n`;
    } else if (tagName === 'ul') {
      let listMarkdown = '';
      $el.find('li a').each((j, link) => {
        const $link = $(link);
        let oldUrl = $link.attr('href');
        
        // Handle cases where the URL might have extra characters
        if(oldUrl) {
            oldUrl = oldUrl.trim();
        }

        const redirectInfo = redirects[oldUrl];

        if (redirectInfo) {
          listMarkdown += `* [${redirectInfo.title}](${redirectInfo.newUrl})\n`;
        } else {
            // It's possible that the link in the archive is not in the redirects
            // For example, if it wasn't a blog post. We'll log it.
            console.warn(`[WARN] No redirect found for: ${oldUrl}`);
        }
      });
      if(listMarkdown) {
        markdown += listMarkdown + '\n';
      }
    }
  });

  await fs.writeFile(outputFile, markdown);
  console.log(`[OK] Created index page at ${outputFile}`);
}

buildIndex().catch(console.error); 