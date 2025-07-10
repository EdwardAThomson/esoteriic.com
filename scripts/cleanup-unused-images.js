#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const srcDir = path.join(__dirname, '../src');
const markdownDir = path.join(srcDir, 'markdown');
const imagesDir = path.join(srcDir, 'images');
const archiveDir = path.join(__dirname, '../temp_archive/unused_images');

console.log('🔍 Analyzing image usage and duplicates...\n');

// Function to get file hash for duplicate detection
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Function to get all image references from markdown files
function getImageReferences() {
  const imageRefs = new Set();
  const markdownFiles = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));
  
  console.log(`📄 Scanning ${markdownFiles.length} markdown files for image references...`);
  
  markdownFiles.forEach(mdFile => {
    const content = fs.readFileSync(path.join(markdownDir, mdFile), 'utf8');
    
    // Match markdown image syntax: ![alt](/images/filename)
    const imageMatches = content.match(/!\[[^\]]*\]\(\/images\/([^)]+)\)/g);
    
    if (imageMatches) {
      imageMatches.forEach(match => {
        // Extract filename from the match
        const filename = match.match(/\/images\/([^)]+)/)[1];
        imageRefs.add(filename);
        console.log(`  📎 Found reference: ${filename} in ${mdFile}`);
      });
    }
  });
  
  return imageRefs;
}

// Function to analyze images in the directory
function analyzeImages() {
  if (!fs.existsSync(imagesDir)) {
    console.log('❌ Images directory not found!');
    return { imageFiles: [], hashMap: new Map(), duplicates: [] };
  }
  
  const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
  
  console.log(`🖼️  Found ${imageFiles.length} image files in directory`);
  
  // Create hash map for duplicate detection
  const hashMap = new Map();
  const duplicates = [];
  
  imageFiles.forEach(file => {
    const filePath = path.join(imagesDir, file);
    
    // Check if file exists before processing
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping missing file: ${file}`);
      return;
    }
    
    try {
      const hash = getFileHash(filePath);
      
      if (hashMap.has(hash)) {
        // Duplicate found
        const originalFile = hashMap.get(hash);
        duplicates.push({
          original: originalFile,
          duplicate: file,
          hash: hash
        });
        console.log(`🔄 Duplicate found: ${file} is identical to ${originalFile}`);
      } else {
        hashMap.set(hash, file);
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}: ${error.message}`);
    }
  });
  
  return { imageFiles, hashMap, duplicates };
}

// Main function
function main() {
  const referencedImages = getImageReferences();
  const { imageFiles, hashMap, duplicates } = analyzeImages();
  
  console.log('\n📊 ANALYSIS RESULTS:');
  console.log(`   • Total images: ${imageFiles.length}`);
  console.log(`   • Referenced images: ${referencedImages.size}`);
  console.log(`   • Duplicate sets: ${duplicates.length}`);
  
  // Find unused images
  const unusedImages = imageFiles.filter(file => !referencedImages.has(file));
  console.log(`   • Unused images: ${unusedImages.length}`);
  
  if (unusedImages.length > 0) {
    console.log('\n🗑️  UNUSED IMAGES:');
    unusedImages.slice(0, 10).forEach(file => {
      const filePath = path.join(imagesDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`   • ${file} (${sizeKB} KB)`);
      } else {
        console.log(`   • ${file} (missing)`);
      }
    });
    if (unusedImages.length > 10) {
      console.log(`   ... and ${unusedImages.length - 10} more`);
    }
  }
  
  if (duplicates.length > 0) {
    console.log('\n🔄 DUPLICATE IMAGES:');
    duplicates.slice(0, 10).forEach(dup => {
      console.log(`   • ${dup.duplicate} is identical to ${dup.original}`);
    });
    if (duplicates.length > 10) {
      console.log(`   ... and ${duplicates.length - 10} more duplicate pairs`);
    }
  }
  
  // Calculate potential space savings
  let unusedSize = 0;
  let duplicateSize = 0;
  
  unusedImages.forEach(file => {
    const filePath = path.join(imagesDir, file);
    if (fs.existsSync(filePath)) {
      unusedSize += fs.statSync(filePath).size;
    }
  });
  
  duplicates.forEach(dup => {
    const filePath = path.join(imagesDir, dup.duplicate);
    if (fs.existsSync(filePath)) {
      duplicateSize += fs.statSync(filePath).size;
    }
  });
  
  const totalSavings = unusedSize + duplicateSize;
  console.log(`\n💾 POTENTIAL SPACE SAVINGS:`);
  console.log(`   • Unused images: ${Math.round(unusedSize / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   • Duplicate images: ${Math.round(duplicateSize / 1024 / 1024 * 100) / 100} MB`);
  console.log(`   • Total savings: ${Math.round(totalSavings / 1024 / 1024 * 100) / 100} MB`);
  
  // Ask for confirmation before archiving
  if (unusedImages.length > 0 || duplicates.length > 0) {
    console.log('\n⚠️  READY TO ARCHIVE (SAFE CLEANUP)');
    console.log('This script will MOVE (not delete) unused/duplicate images to:');
    console.log(`   ${archiveDir}`);
    console.log('You can always restore them later if needed.');
    console.log('Run with --archive flag to move them safely:');
    console.log('node scripts/cleanup-unused-images.js --archive');
    
    // If --archive flag is provided, move files to archive
    if (process.argv.includes('--archive')) {
      console.log('\n📦 ARCHIVING UNUSED AND DUPLICATE IMAGES...');
      
      // Create archive directories
      const unusedArchiveDir = path.join(archiveDir, 'unused');
      const duplicateArchiveDir = path.join(archiveDir, 'duplicates');
      fs.ensureDirSync(unusedArchiveDir);
      fs.ensureDirSync(duplicateArchiveDir);
      
      let archivedCount = 0;
      let archivedSize = 0;
      
      // Archive unused images
      unusedImages.forEach(file => {
        const sourcePath = path.join(imagesDir, file);
        const destPath = path.join(unusedArchiveDir, file);
        
        if (fs.existsSync(sourcePath)) {
          try {
            const size = fs.statSync(sourcePath).size;
            fs.moveSync(sourcePath, destPath);
            archivedCount++;
            archivedSize += size;
            console.log(`   📦 Archived unused: ${file}`);
          } catch (error) {
            console.log(`   ❌ Failed to archive ${file}: ${error.message}`);
          }
        } else {
          console.log(`   ⚠️  Skipping missing file: ${file}`);
        }
      });
      
      // Archive duplicate images (keep the original, archive the duplicate)
      duplicates.forEach(dup => {
        const sourcePath = path.join(imagesDir, dup.duplicate);
        const destPath = path.join(duplicateArchiveDir, dup.duplicate);
        
        if (fs.existsSync(sourcePath)) {
          try {
            const size = fs.statSync(sourcePath).size;
            fs.moveSync(sourcePath, destPath);
            archivedCount++;
            archivedSize += size;
            console.log(`   📦 Archived duplicate: ${dup.duplicate} (kept ${dup.original})`);
          } catch (error) {
            console.log(`   ❌ Failed to archive ${dup.duplicate}: ${error.message}`);
          }
        } else {
          console.log(`   ⚠️  Skipping missing duplicate: ${dup.duplicate}`);
        }
      });
      
      // Create a restoration script
      const restoreScript = `#!/usr/bin/env node
// Restoration script generated on ${new Date().toISOString()}
const fs = require('fs-extra');
const path = require('path');

const archiveDir = __dirname;
const imagesDir = path.join(__dirname, '../../../src/images');

console.log('🔄 Restoring archived images...');

// Restore unused images
const unusedDir = path.join(archiveDir, 'unused');
if (fs.existsSync(unusedDir)) {
  const unusedFiles = fs.readdirSync(unusedDir);
  unusedFiles.forEach(file => {
    const sourcePath = path.join(unusedDir, file);
    const destPath = path.join(imagesDir, file);
    fs.moveSync(sourcePath, destPath);
    console.log(\`✅ Restored unused: \${file}\`);
  });
}

// Restore duplicate images
const duplicateDir = path.join(archiveDir, 'duplicates');
if (fs.existsSync(duplicateDir)) {
  const duplicateFiles = fs.readdirSync(duplicateDir);
  duplicateFiles.forEach(file => {
    const sourcePath = path.join(duplicateDir, file);
    const destPath = path.join(imagesDir, file);
    fs.moveSync(sourcePath, destPath);
    console.log(\`✅ Restored duplicate: \${file}\`);
  });
}

console.log('🎉 Restoration complete!');
`;
      
      fs.writeFileSync(path.join(archiveDir, 'restore-images.js'), restoreScript);
      
      console.log(`\n🎉 ARCHIVING COMPLETE!`);
      console.log(`   • Archived ${archivedCount} files`);
      console.log(`   • Freed ${Math.round(archivedSize / 1024 / 1024 * 100) / 100} MB of space`);
      console.log(`   • Files moved to: ${archiveDir}`);
      console.log(`   • To restore: node ${path.join(archiveDir, 'restore-images.js')}`);
    }
  } else {
    console.log('\n✅ No unused or duplicate images found!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { getImageReferences, analyzeImages }; 