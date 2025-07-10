#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const markdownDir = path.join(srcDir, 'markdown');
const imagesDir = path.join(srcDir, 'images');

console.log('🔍 Checking for broken image references...\n');

// Get all existing images
const existingImages = new Set();
if (fs.existsSync(imagesDir)) {
  const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
  imageFiles.forEach(file => existingImages.add(file));
}

console.log(`📁 Found ${existingImages.size} existing images`);
console.log(`   ${Array.from(existingImages).join(', ')}\n`);

// Check markdown files for broken references
const markdownFiles = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));
let totalReferences = 0;
let brokenReferences = 0;
const brokenByFile = new Map();

markdownFiles.forEach(mdFile => {
  const content = fs.readFileSync(path.join(markdownDir, mdFile), 'utf8');
  
  // Match markdown image syntax: ![alt](/images/filename)
  const imageMatches = content.match(/!\[[^\]]*\]\(\/images\/([^)]+)\)/g);
  
  if (imageMatches) {
    const brokenInThisFile = [];
    
    imageMatches.forEach(match => {
      const filename = match.match(/\/images\/([^)]+)/)[1];
      totalReferences++;
      
      if (!existingImages.has(filename)) {
        brokenReferences++;
        brokenInThisFile.push(filename);
      }
    });
    
    if (brokenInThisFile.length > 0) {
      brokenByFile.set(mdFile, brokenInThisFile);
    }
  }
});

console.log(`📊 SUMMARY:`);
console.log(`   • Total image references: ${totalReferences}`);
console.log(`   • Broken references: ${brokenReferences}`);
console.log(`   • Working references: ${totalReferences - brokenReferences}`);
console.log(`   • Files with broken images: ${brokenByFile.size}`);

if (brokenByFile.size > 0) {
  console.log('\n🔗 BROKEN IMAGE REFERENCES:');
  let count = 0;
  for (const [file, brokenImages] of brokenByFile) {
    count++;
    if (count <= 5) {
      console.log(`\n   📄 ${file}:`);
      brokenImages.slice(0, 3).forEach(img => {
        console.log(`      ❌ ${img}`);
      });
      if (brokenImages.length > 3) {
        console.log(`      ... and ${brokenImages.length - 3} more`);
      }
    }
  }
  if (brokenByFile.size > 5) {
    console.log(`\n   ... and ${brokenByFile.size - 5} more files with broken images`);
  }
  
  console.log('\n💡 RECOMMENDATION:');
  console.log('   Most of your images appear to be missing from the filesystem.');
  console.log('   You may want to:');
  console.log('   1. Check if images were moved to a different location');
  console.log('   2. Update markdown files to remove broken references');
  console.log('   3. Re-download missing images if needed');
} else {
  console.log('\n✅ All image references are working!');
} 