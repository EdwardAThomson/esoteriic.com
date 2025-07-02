const fs = require('fs-extra');
const path = require('path');

const markdownDir = path.join(__dirname, '../src/markdown');

async function cleanMarkdownFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  // Find the start of the Joomla comments/ads junk
  const junkMarker = '<!--//';
  const junkIndex = content.indexOf(junkMarker);

  if (junkIndex !== -1) {
    console.log(`[OK] Cleaning junk from ${path.basename(filePath)}`);
    content = content.substring(0, junkIndex).trim();
    await fs.writeFile(filePath, content);
  } else {
    console.log(`[INFO] No junk marker found in ${path.basename(filePath)}, skipping.`);
  }
}

async function main() {
  console.log('Starting post-processing cleanup of markdown files...');
  const files = await fs.readdir(markdownDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      await cleanMarkdownFile(path.join(markdownDir, file));
    }
  }
  console.log('Markdown cleanup complete!');
}

main().catch(err => {
  console.error('Error during markdown cleanup:', err);
  process.exit(1);
}); 