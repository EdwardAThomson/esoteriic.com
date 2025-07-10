#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const srcDir = path.join(__dirname, '../src');
const markdownDir = path.join(srcDir, 'markdown');
const imagesDir = path.join(srcDir, 'images');

console.log('🔍 Comprehensive Image Usage Analysis...\n');

// Function to get file hash for duplicate detection
function getFileHash(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (error) {
    return null;
  }
}

// Function to analyze all image references in markdown files
function analyzeImageReferences() {
  const localImageRefs = new Set();
  const externalImageRefs = new Set();
  const allImageRefs = [];
  
  const markdownFiles = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));
  
  console.log(`📄 Scanning ${markdownFiles.length} markdown files for image references...`);
  
  markdownFiles.forEach(mdFile => {
    const content = fs.readFileSync(path.join(markdownDir, mdFile), 'utf8');
    
    // Match all image syntax patterns
    const imagePatterns = [
      /!\[[^\]]*\]\(([^)]+)\)/g,  // Standard markdown: ![alt](url)
      /<img[^>]+src=["']([^"']+)["'][^>]*>/g,  // HTML img tags
    ];
    
    imagePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const imageUrl = match[1];
        allImageRefs.push({ file: mdFile, url: imageUrl });
        
        if (imageUrl.startsWith('/images/')) {
          // Local image reference
          const filename = imageUrl.replace('/images/', '');
          localImageRefs.add(filename);
        } else if (imageUrl.startsWith('http') || imageUrl.startsWith('//')) {
          // External image reference
          externalImageRefs.add(imageUrl);
        } else if (!imageUrl.startsWith('data:')) {
          // Relative path or other local reference
          localImageRefs.add(imageUrl);
        }
      }
    });
  });
  
  return { localImageRefs, externalImageRefs, allImageRefs };
}

// Function to analyze local image files
function analyzeLocalImages() {
  if (!fs.existsSync(imagesDir)) {
    return { imageFiles: [], hashMap: new Map(), duplicates: [], totalSize: 0 };
  }
  
  const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
  
  console.log(`🖼️  Found ${imageFiles.length} local image files`);
  
  const hashMap = new Map();
  const duplicates = [];
  let totalSize = 0;
  
  imageFiles.forEach(file => {
    const filePath = path.join(imagesDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      
      const hash = getFileHash(filePath);
      if (hash) {
        if (hashMap.has(hash)) {
          const originalFile = hashMap.get(hash);
          duplicates.push({
            original: originalFile,
            duplicate: file,
            hash: hash,
            size: stats.size
          });
        } else {
          hashMap.set(hash, file);
        }
      }
    }
  });
  
  return { imageFiles, hashMap, duplicates, totalSize };
}

// Main analysis function
function main() {
  const { localImageRefs, externalImageRefs, allImageRefs } = analyzeImageReferences();
  const { imageFiles, hashMap, duplicates, totalSize } = analyzeLocalImages();
  
  // Find unused local images
  const unusedImages = imageFiles.filter(file => !localImageRefs.has(file));
  
  console.log('\n📊 IMAGE REFERENCE ANALYSIS:');
  console.log(`   • Total image references: ${allImageRefs.length}`);
  console.log(`   • Local image references: ${localImageRefs.size}`);
  console.log(`   • External image references: ${externalImageRefs.size}`);
  
  console.log('\n📁 LOCAL IMAGE ANALYSIS:');
  console.log(`   • Total local image files: ${imageFiles.length}`);
  console.log(`   • Total size: ${Math.round(totalSize / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   • Referenced locally: ${imageFiles.length - unusedImages.length}`);
  console.log(`   • Unused locally: ${unusedImages.length}`);
  console.log(`   • Duplicate files: ${duplicates.length}`);
  
  // Show sample external references
  if (externalImageRefs.size > 0) {
    console.log('\n🌐 SAMPLE EXTERNAL IMAGE REFERENCES:');
    const externalSample = Array.from(externalImageRefs).slice(0, 5);
    externalSample.forEach(url => {
      if (url.includes('wayback') || url.includes('archive.org')) {
        console.log(`   📦 Wayback: ${url.substring(0, 80)}...`);
      } else if (url.includes('medium.com') || url.includes('miro.medium.com')) {
        console.log(`   📝 Medium: ${url.substring(0, 80)}...`);
      } else {
        console.log(`   🌍 Other: ${url.substring(0, 80)}...`);
      }
    });
    if (externalImageRefs.size > 5) {
      console.log(`   ... and ${externalImageRefs.size - 5} more external references`);
    }
  }
  
  // Show unused images
  if (unusedImages.length > 0) {
    console.log('\n🗑️  UNUSED LOCAL IMAGES:');
    let unusedSize = 0;
    unusedImages.slice(0, 10).forEach(file => {
      const filePath = path.join(imagesDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        unusedSize += stats.size;
        console.log(`   • ${file} (${sizeKB} KB)`);
      }
    });
    
    // Calculate total unused size
    unusedImages.forEach(file => {
      const filePath = path.join(imagesDir, file);
      if (fs.existsSync(filePath)) {
        unusedSize += fs.statSync(filePath).size;
      }
    });
    
    if (unusedImages.length > 10) {
      console.log(`   ... and ${unusedImages.length - 10} more unused images`);
    }
    console.log(`   💾 Total unused size: ${Math.round(unusedSize / 1024 / 1024 * 100) / 100} MB`);
  }
  
  // Show duplicates
  if (duplicates.length > 0) {
    console.log('\n🔄 DUPLICATE IMAGES:');
    let duplicateSize = 0;
    duplicates.slice(0, 10).forEach(dup => {
      const sizeKB = Math.round(dup.size / 1024);
      duplicateSize += dup.size;
      console.log(`   • ${dup.duplicate} = ${dup.original} (${sizeKB} KB)`);
    });
    if (duplicates.length > 10) {
      console.log(`   ... and ${duplicates.length - 10} more duplicates`);
    }
    console.log(`   💾 Total duplicate size: ${Math.round(duplicateSize / 1024 / 1024 * 100) / 100} MB`);
  }
  
  // Show potential space savings
  const unusedSize = unusedImages.reduce((total, file) => {
    const filePath = path.join(imagesDir, file);
    return total + (fs.existsSync(filePath) ? fs.statSync(filePath).size : 0);
  }, 0);
  
  const duplicateSize = duplicates.reduce((total, dup) => total + dup.size, 0);
  const totalSavings = unusedSize + duplicateSize;
  
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (externalImageRefs.size > localImageRefs.size) {
    console.log(`   📊 You have ${externalImageRefs.size} external vs ${localImageRefs.size} local image references`);
    console.log(`   💭 Most images are hosted externally (Wayback, Medium, etc.)`);
    console.log(`   ✅ This suggests many local images may indeed be unused`);
  }
  
  if (totalSavings > 50 * 1024 * 1024) { // > 50MB
    console.log(`   💾 Potential space savings: ${Math.round(totalSavings / 1024 / 1024 * 100) / 100} MB`);
    console.log(`   🗑️  Consider cleaning up unused and duplicate images`);
  }
  
  if (unusedImages.length > 0 || duplicates.length > 0) {
    console.log('\n⚠️  SAFE CLEANUP OPTIONS:');
    console.log('   1. Run analysis with --list-unused to see detailed unused file list');
    console.log('   2. Run with --archive-unused to safely move unused images to archive');
    console.log('   3. Run with --archive-duplicates to safely move duplicate images to archive');
  }
  
  // Handle command line options
  if (process.argv.includes('--list-unused')) {
    console.log('\n📝 COMPLETE UNUSED IMAGE LIST:');
    unusedImages.forEach(file => {
      const filePath = path.join(imagesDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`${file} (${sizeKB} KB)`);
      }
    });
  }
  
  if (process.argv.includes('--archive-unused') && unusedImages.length > 0) {
    console.log('\n📦 ARCHIVING UNUSED IMAGES...');
    const archiveDir = path.join(__dirname, '../temp_archive/unused_images_v2/unused');
    fs.ensureDirSync(archiveDir);
    
    let archived = 0;
    unusedImages.forEach(file => {
      const sourcePath = path.join(imagesDir, file);
      const destPath = path.join(archiveDir, file);
      
      if (fs.existsSync(sourcePath)) {
        try {
          fs.moveSync(sourcePath, destPath);
          archived++;
          console.log(`   ✅ Archived: ${file}`);
        } catch (error) {
          console.log(`   ❌ Failed to archive ${file}: ${error.message}`);
        }
      }
    });
    console.log(`\n🎉 Archived ${archived} unused images to: ${archiveDir}`);
  }
  
  if (process.argv.includes('--archive-duplicates') && duplicates.length > 0) {
    console.log('\n📦 ARCHIVING DUPLICATE IMAGES...');
    const archiveDir = path.join(__dirname, '../temp_archive/unused_images_v2/duplicates');
    fs.ensureDirSync(archiveDir);
    
    let archived = 0;
    duplicates.forEach(dup => {
      const sourcePath = path.join(imagesDir, dup.duplicate);
      const destPath = path.join(archiveDir, dup.duplicate);
      
      if (fs.existsSync(sourcePath)) {
        try {
          fs.moveSync(sourcePath, destPath);
          archived++;
          console.log(`   ✅ Archived duplicate: ${dup.duplicate} (kept ${dup.original})`);
        } catch (error) {
          console.log(`   ❌ Failed to archive ${dup.duplicate}: ${error.message}`);
        }
      }
    });
    console.log(`\n🎉 Archived ${archived} duplicate images to: ${archiveDir}`);
  }
}

if (require.main === module) {
  main();
} 