const fs = require('fs-extra');
const path = require('path');

// Support both raw medium files and processed files
const mediumDir = path.join(__dirname, '../temp_archive/medium');
const processedDir = path.join(__dirname, '../temp_archive/medium_processed');
const markdownDir = path.join(__dirname, '../src/markdown');

// Use processed directory if it exists, otherwise fall back to medium directory
const sourceDir = fs.existsSync(processedDir) ? processedDir : mediumDir;
const mediumImagesDir = path.join(sourceDir, 'images');
const targetImagesDir = path.join(__dirname, '../src/images');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function extractDescription(content) {
  // Remove frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Split into lines and find the first substantial paragraph
  const lines = contentWithoutFrontmatter.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, headers, and common UI elements
    if (!line || 
        line.startsWith('#') || 
        line.startsWith('Listen') || 
        line.startsWith('Share') ||
        line.startsWith('Follow') ||
        line.startsWith('Sign up') ||
        line.startsWith('Get started') ||
        line.startsWith('**tl;dr:') ||
        line.startsWith('tl;dr:') ||
        line.length < 20) {
      continue;
    }
    
    // Clean up the line - remove markdown formatting and common prefixes
    let description = line
      .replace(/^\*\*[^*]+\*\*:?\s*/, '') // Remove bold prefixes like "**tl;dr:**"
      .replace(/^[^:]+:\s*/, '') // Remove any "prefix:" patterns
      .replace(/\*\*/g, '') // Remove bold formatting
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to just text
      .trim();
    
    // If it's still substantial, use it
    if (description.length >= 20) {
      return description.length > 200 ? description.substring(0, 200) + '...' : description;
    }
  }
  
  return '';
}

function categorizePost(title, content) {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for blockchain/crypto/gaming keywords
  const blockchainKeywords = ['blockchain', 'crypto', 'bitcoin', 'ethereum', 'polkadot', 'defi', 'web3', 'decentralized', 'gaming', 'nft'];
  const businessKeywords = ['business', 'banking', 'investment', 'startup', 'finance', 'economy'];
  const techKeywords = ['programming', 'development', 'software', 'technical', 'algorithm'];
  
  if (blockchainKeywords.some(keyword => titleLower.includes(keyword) || contentLower.includes(keyword))) {
    return 'blockchain and cryptocurrency';
  }
  
  if (businessKeywords.some(keyword => titleLower.includes(keyword) || contentLower.includes(keyword))) {
    return 'business';
  }
  
  if (techKeywords.some(keyword => titleLower.includes(keyword) || contentLower.includes(keyword))) {
    return 'programming';
  }
  
  return 'blog';
}

function generateTags(title, content) {
  const tags = [];
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Common tags based on content
  if (titleLower.includes('blockchain') || contentLower.includes('blockchain')) tags.push('blockchain');
  if (titleLower.includes('gaming') || contentLower.includes('gaming')) tags.push('gaming');
  if (titleLower.includes('polkadot') || contentLower.includes('polkadot')) tags.push('polkadot');
  if (titleLower.includes('ethereum') || contentLower.includes('ethereum')) tags.push('ethereum');
  if (titleLower.includes('crypto') || contentLower.includes('crypto')) tags.push('cryptocurrency');
  if (titleLower.includes('web3') || contentLower.includes('web3')) tags.push('web3');
  if (titleLower.includes('defi') || contentLower.includes('defi')) tags.push('defi');
  if (titleLower.includes('business') || contentLower.includes('business')) tags.push('business');
  if (titleLower.includes('investment') || contentLower.includes('investment')) tags.push('investment');
  
  // Add medium-archive tag to all
  tags.push('medium-archive');
  
  return tags.join(',');
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.warn(`[WARN] No frontmatter found in ${filePath}, skipping.`);
    return;
  }
  
  const frontmatterContent = frontmatterMatch[1];
  const bodyContent = frontmatterMatch[2];
  
  // Parse existing frontmatter
  const titleMatch = frontmatterContent.match(/title: "(.*?)"/);
  const dateMatch = frontmatterContent.match(/date: "(.*?)"/);
  const originalUrlMatch = frontmatterContent.match(/original_url: "(.*?)"/);
  
  if (!titleMatch || !dateMatch) {
    console.warn(`[WARN] Missing title or date in ${filePath}, skipping.`);
    return;
  }
  
  const title = titleMatch[1];
  const date = dateMatch[1];
  const originalUrl = originalUrlMatch ? originalUrlMatch[1] : '';
  
  // Generate new metadata
  const category = categorizePost(title, bodyContent);
  const tags = generateTags(title, bodyContent);
  const description = extractDescription(content);
  
  // Create slug from title
  const slug = slugify(title);
  
  // Update image references to use relative paths
  const updatedContent = bodyContent.replace(/!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g, 
    (match, alt, filename) => {
      return `![${alt}](/images/${filename})`;
    });
  
  // Create new frontmatter
  const newFrontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
${tags ? `tags: ${tags}` : ''}
category: "${category}"
description: "${description.replace(/"/g, '\\"')}"
${originalUrl ? `original_url: "${originalUrl}"` : ''}
---

${updatedContent.trim()}`;

  // Write to target directory
  const targetPath = path.join(markdownDir, `${slug}.md`);
  await fs.writeFile(targetPath, newFrontmatter);
  
  console.log(`[OK] Converted ${path.basename(filePath)} to ${slug}.md`);
}

async function copyImages() {
  try {
    // Check if medium images directory exists
    const mediumImagesExists = await fs.pathExists(mediumImagesDir);
    if (!mediumImagesExists) {
      console.log('[INFO] No Medium images directory found, skipping image copy.');
      return;
    }
    
    // Ensure target images directory exists
    await fs.ensureDir(targetImagesDir);
    
    // Copy all images from medium to main images directory
    const imageFiles = await fs.readdir(mediumImagesDir);
    for (const imageFile of imageFiles) {
      const sourcePath = path.join(mediumImagesDir, imageFile);
      const targetPath = path.join(targetImagesDir, imageFile);
      
      // Only copy if file doesn't exist or is different
      const sourceExists = await fs.pathExists(sourcePath);
      const targetExists = await fs.pathExists(targetPath);
      
      if (sourceExists && !targetExists) {
        await fs.copy(sourcePath, targetPath);
        console.log(`[OK] Copied image: ${imageFile}`);
      } else if (sourceExists && targetExists) {
        console.log(`[INFO] Image already exists: ${imageFile}`);
      }
    }
  } catch (error) {
    console.error('[ERROR] Failed to copy images:', error.message);
  }
}

async function main() {
  try {
    // Ensure target directory exists
    await fs.ensureDir(markdownDir);
    
            // Process all markdown files in source directory
        const files = await fs.readdir(sourceDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
    
            console.log(`Using source directory: ${sourceDir}`);
        console.log(`Found ${markdownFiles.length} Medium blog posts to convert.`);
    
            for (const file of markdownFiles) {
            const filePath = path.join(sourceDir, file);
            await processFile(filePath);
        }
    
    // Copy images
    await copyImages();
    
    console.log('\n[SUCCESS] Medium blog conversion complete!');
    console.log(`Converted ${markdownFiles.length} posts to src/markdown/`);
    console.log('Images copied to src/images/');
    console.log('\nNext steps:');
    console.log('1. Review the converted files in src/markdown/');
    console.log('2. Run your build script to generate the HTML files');
    console.log('3. Test the site locally');
    
  } catch (error) {
    console.error('[ERROR] Conversion failed:', error.message);
    process.exit(1);
  }
}

main(); 