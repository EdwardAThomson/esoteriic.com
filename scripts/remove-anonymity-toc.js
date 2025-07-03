const fs = require('fs-extra');
const path = require('path');

const markdownDir = path.join(__dirname, '../src/markdown');

// Anonymity series files
const anonymityFiles = [
  'anonymity.md',
  'introduction-to-anonymity.md',
  'theoretical-anonymity.md',
  'concepts-and-schemes-of-anonymous-communication.md',
  'in-depth-analysis-of-bitmessage.md',
  'conclusion-of-thesis.md',
  'anonymity-bibliography.md'
];

async function removeInlineToC(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Remove the ToC section between --- markers
    const tocPattern = /\n\n---\n\n## 📚 Anonymity Research Series[\s\S]*?---\n\n/g;
    const cleanContent = content.replace(tocPattern, '\n\n');
    
    // For the main index page, also remove the "Complete Series Contents" section
    if (filePath.includes('anonymity.md')) {
      const indexTocPattern = /## 📑 Complete Series Contents[\s\S]*?(?=\*\*Introduction\*\*|\*\*Defining Anonymity\*\*|$)/;
      const cleanedIndexContent = cleanContent.replace(indexTocPattern, '');
      await fs.writeFile(filePath, cleanedIndexContent);
    } else {
      await fs.writeFile(filePath, cleanContent);
    }
    
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  console.log('🧹 Removing inline ToC from Anonymity series...\n');
  
  for (const filename of anonymityFiles) {
    const filePath = path.join(markdownDir, filename);
    
    if (await fs.pathExists(filePath)) {
      console.log(`📝 Processing ${filename}...`);
      const success = await removeInlineToC(filePath);
      if (success) {
        console.log(`  ✅ Removed inline ToC from ${filename}`);
      } else {
        console.log(`  ❌ Failed to process ${filename}`);
      }
    } else {
      console.log(`  ⚠️  File not found: ${filename}`);
    }
  }
  
  console.log('\n✅ Inline ToC removal completed!');
}

if (require.main === module) {
  main();
}

module.exports = { main }; 