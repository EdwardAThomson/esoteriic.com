const fs = require('fs-extra');
const path = require('path');
const frontMatter = require('front-matter');

const markdownDir = path.join(__dirname, '../src/markdown');
const redirectsFile = path.join(__dirname, '../redirects.json');

async function addCategories() {
  const redirects = await fs.readJson(redirectsFile);
  const markdownFiles = await fs.readdir(markdownDir);

  // Create a reverse map from newUrl to oldUrl
  const urlMap = {};
  for (const oldUrl in redirects) {
    const newUrl = redirects[oldUrl].newUrl;
    urlMap[newUrl] = oldUrl;
  }

  for (const mdFile of markdownFiles) {
    if (!mdFile.endsWith('.md')) continue;

    const newUrl = `/${mdFile.replace('.md', '')}/`;
    const oldUrl = urlMap[newUrl];

    if (oldUrl) {
      const pathParts = oldUrl.split('/');
      if (pathParts.length > 2) {
        let category = pathParts[2];
        // remove leading number and hyphen
        category = category.replace(/^\d+-/, '');

        const filePath = path.join(markdownDir, mdFile);
        let fileContent = await fs.readFile(filePath, 'utf8');
        const { attributes, body } = frontMatter(fileContent);

        if (attributes.category) {
          console.log(`[INFO] Category already exists for ${mdFile}, skipping.`);
          continue;
        }

        const newAttributes = { ...attributes, category };
        
        let newContent = '---\n';
        for (const [key, value] of Object.entries(newAttributes)) {
          newContent += `${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
        }
        newContent += '---\n';
        newContent += body;

        await fs.writeFile(filePath, newContent);
        console.log(`[OK] Added category '${category}' to ${mdFile}`);
      }
    }
  }
}

addCategories().catch(console.error); 