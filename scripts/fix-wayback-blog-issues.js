const fs = require('fs-extra');
const path = require('path');

const markdownDir = path.join(__dirname, '../src/markdown');

// Category mapping for security posts
const categoryMapping = {
  'always-take-your-credit-card-receipt-when-paying-by-contactless.md': 'information security',
  'blockchains-data-protection-and-gdpr.md': 'information security',
  'creating-better-passwords.md': 'information security',
  'hashing-fast-and-slow.md': 'information security',
  'investigating-the-security-of-anonymous-messaging-over-the-internet.md': 'information security',
  'it-may-look-complex-and-unpredictable-but-is-it-really.md': 'information security',
  'password-managers-local-vs-global.md': 'information security',
  'setting-up-a-secure-linux-web-server.md': 'information security',
  'the-people-behind-malware-and-cybercrime.md': 'information security',
  'ubers-fake-app-providing-anonymity-to-drivers.md': 'information security',
  'when-will-hedge-funds-become-interested-in-the-security-posture-of-a-company.md': 'information security',
  'wikileaks-releases-a-new-dump-from-the-cia-hacking-tools-vault-7.md': 'information security'
};

// Anonymity thesis chapters in order
const anonymityChapters = [
  {
    file: 'introduction-to-anonymity.md',
    title: 'Introduction to Anonymity',
    order: 1
  },
  {
    file: 'theoretical-anonymity.md',
    title: 'Theoretical Anonymity',
    order: 2
  },
  {
    file: 'concepts-and-schemes-of-anonymous-communication.md',
    title: 'Concepts and Schemes of Anonymous Communication',
    order: 3
  },
  {
    file: 'in-depth-analysis-of-bitmessage.md',
    title: 'In-depth Analysis of BitMessage',
    order: 4
  },
  {
    file: 'conclusion-of-thesis.md',
    title: 'Conclusion of Thesis',
    order: 5
  }
];

async function updateFrontmatter(filePath, updates) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.warn(`[WARN] No frontmatter found in ${path.basename(filePath)}`);
    return;
  }

  const frontmatterContent = frontmatterMatch[1];
  const bodyContent = frontmatterMatch[2];
  
  // Update frontmatter
  let updatedFrontmatter = frontmatterContent;
  
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}:.*$`, 'm');
    if (regex.test(updatedFrontmatter)) {
      // Update existing key
      updatedFrontmatter = updatedFrontmatter.replace(regex, `${key}: ${value}`);
    } else {
      // Add new key
      updatedFrontmatter += `\n${key}: ${value}`;
    }
  }
  
  const newContent = `---\n${updatedFrontmatter}\n---\n${bodyContent}`;
  await fs.writeFile(filePath, newContent);
}

async function fixCategories() {
  console.log('🏷️  Fixing categories for security blog posts...');
  
  for (const [filename, category] of Object.entries(categoryMapping)) {
    const filePath = path.join(markdownDir, filename);
    
    if (await fs.pathExists(filePath)) {
      await updateFrontmatter(filePath, {
        category: `"${category}"`
      });
      console.log(`[OK] Updated category for ${filename} -> ${category}`);
    } else {
      console.warn(`[WARN] File not found: ${filename}`);
    }
  }
}

async function handleAnonymityThesis() {
  console.log('📚 Handling anonymity thesis chapters...');
  
  // Check if we should create a combined document or keep them separate
  const createCombined = false; // Set to true if you want a single combined document
  
  if (createCombined) {
    await createCombinedAnonymityDocument();
  } else {
    await updateAnonymityChapters();
  }
}

async function updateAnonymityChapters() {
  console.log('📖 Updating anonymity chapters with proper ordering...');
  
  for (const chapter of anonymityChapters) {
    const filePath = path.join(markdownDir, chapter.file);
    
    if (await fs.pathExists(filePath)) {
      const updates = {
        category: '"information security"',
        series: '"Anonymity Research"',
        series_order: chapter.order,
        description: '"Part of a comprehensive thesis on anonymity and anonymous communication systems"'
      };
      
      await updateFrontmatter(filePath, updates);
      console.log(`[OK] Updated ${chapter.file} as chapter ${chapter.order}`);
    } else {
      console.warn(`[WARN] Anonymity chapter not found: ${chapter.file}`);
    }
  }
  
  // Handle the index file separately
  const anonymityIndexPath = path.join(markdownDir, 'anonymity.md');
  if (await fs.pathExists(anonymityIndexPath)) {
    const updates = {
      category: '"information security"',
      series: '"Anonymity Research"',
      series_order: 0,
      description: '"Index and overview of anonymity research thesis"'
    };
    
    await updateFrontmatter(anonymityIndexPath, updates);
    console.log('[OK] Updated anonymity index page');
  }
}

async function createCombinedAnonymityDocument() {
  console.log('📄 Creating combined anonymity document...');
  
  let combinedContent = `---
title: "Anonymity Research: A Comprehensive Study"
date: 2016-01-01
category: "information security"
description: "A comprehensive thesis on anonymity and anonymous communication systems, covering theoretical foundations, practical implementations, and analysis of existing systems."
tags: ["anonymity", "information security", "thesis", "cryptography"]
---

# Anonymity Research: A Comprehensive Study

*Originally published as a thesis, now reformatted for easier reading and reference.*

## Table of Contents

`;

  // Add table of contents
  for (const chapter of anonymityChapters) {
    combinedContent += `${chapter.order}. [${chapter.title}](#chapter-${chapter.order}-${chapter.file.replace('.md', '').replace(/-/g, '-')})\n`;
  }
  
  combinedContent += '\n---\n\n';
  
  // Combine all chapters
  for (const chapter of anonymityChapters) {
    const filePath = path.join(markdownDir, chapter.file);
    
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Extract content after frontmatter
      const contentMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
      if (contentMatch) {
        const chapterContent = contentMatch[1];
        
        combinedContent += `## Chapter ${chapter.order}: ${chapter.title} {#chapter-${chapter.order}-${chapter.file.replace('.md', '').replace(/-/g, '-')}}\n\n`;
        combinedContent += chapterContent + '\n\n---\n\n';
      }
    }
  }
  
  // Write combined document
  const combinedPath = path.join(markdownDir, 'anonymity-research-complete.md');
  await fs.writeFile(combinedPath, combinedContent);
  console.log('[OK] Created combined anonymity document: anonymity-research-complete.md');
  
  // Optionally remove individual chapter files
  // for (const chapter of anonymityChapters) {
  //   const filePath = path.join(markdownDir, chapter.file);
  //   if (await fs.pathExists(filePath)) {
  //     await fs.remove(filePath);
  //     console.log(`[OK] Removed individual chapter: ${chapter.file}`);
  //   }
  // }
}

async function cleanupDuplicates() {
  console.log('🧹 Checking for duplicate files...');
  
  // Check for the duplicate theoretical-anonymity files
  const theoreticalAnonymityExisting = path.join(markdownDir, 'theoretical-anonymity-a-description.md');
  const theoreticalAnonymityNew = path.join(markdownDir, 'theoretical-anonymity.md');
  
  if (await fs.pathExists(theoreticalAnonymityExisting) && await fs.pathExists(theoreticalAnonymityNew)) {
    // Check content to see which one is the thesis chapter
    const existingContent = await fs.readFile(theoreticalAnonymityExisting, 'utf-8');
    const newContent = await fs.readFile(theoreticalAnonymityNew, 'utf-8');
    
    // The new one from the thesis should be longer and more comprehensive
    if (newContent.length > existingContent.length) {
      console.log('[OK] Keeping the new theoretical-anonymity.md (thesis chapter)');
      // The new file is fine, we'll use it
    } else {
      console.log('[OK] The existing theoretical-anonymity-a-description.md appears to be different content');
      // Keep both but rename the new one to avoid confusion
      await fs.move(theoreticalAnonymityNew, path.join(markdownDir, 'theoretical-anonymity-thesis.md'));
      console.log('[OK] Renamed thesis chapter to theoretical-anonymity-thesis.md');
    }
  }
}

async function main() {
  console.log('🔧 Starting fixes for wayback blog issues...\n');
  
  try {
    await fixCategories();
    console.log('');
    
    await cleanupDuplicates();
    console.log('');
    
    await handleAnonymityThesis();
    console.log('');
    
    console.log('✅ All fixes completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log('- Added categories to security blog posts');
    console.log('- Organized anonymity thesis chapters with proper ordering');
    console.log('- Added series metadata for related content');
    console.log('- Cleaned up any duplicate files');
    
  } catch (error) {
    console.error('❌ Error during fixes:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main }; 