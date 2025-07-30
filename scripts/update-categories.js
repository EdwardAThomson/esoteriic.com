const fs = require('fs');
const path = require('path');

const markdownDir = path.join(__dirname, '../src/markdown');

// Get all markdown files
const markdownFiles = fs.readdirSync(markdownDir)
  .filter(file => file.endsWith('.md'));

let updatedCount = 0;
let totalChecked = 0;

console.log('Updating category from "blockchain and cryptocurrency" to "blockchain-and-cryptocurrency"...\n');

markdownFiles.forEach(mdFile => {
  const filePath = path.join(markdownDir, mdFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  totalChecked++;
  
  // Check if the file contains the old category
  if (content.includes('category: "blockchain and cryptocurrency"')) {
    // Replace the category
    const updatedContent = content.replace(
      'category: "blockchain and cryptocurrency"',
      'category: "blockchain-and-cryptocurrency"'
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    
    console.log(`✅ Updated: ${mdFile}`);
    updatedCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Files checked: ${totalChecked}`);
console.log(`   Files updated: ${updatedCount}`);
console.log(`   ✨ Category standardization complete!`);
