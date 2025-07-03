const fs = require('fs-extra');
const path = require('path');

const markdownDir = path.join(__dirname, '../src/markdown');

// Anonymity posts to update
const anonymityPosts = [
  'anonymity.md',
  'introduction-to-anonymity.md',
  'theoretical-anonymity.md',
  'concepts-and-schemes-of-anonymous-communication.md',
  'in-depth-analysis-of-bitmessage.md',
  'conclusion-of-thesis.md'
];

// New date for all anonymity posts
const newDate = '2017-06-01';

// URL mapping for internal links
const urlMappings = {
  // Old odinnsecurity URLs to new esoteriic URLs
  'odinnsecurity.com/index.php/anonymity/introduction-to-anonymity/': 'esoteriic.com/introduction-to-anonymity/',
  'odinnsecurity.com/index.php/anonymity/theoretical-anonymity/': 'esoteriic.com/theoretical-anonymity/',
  'odinnsecurity.com/index.php/anonymity/concepts-and-schemes-of-anonymous-communication/': 'esoteriic.com/concepts-and-schemes-of-anonymous-communication/',
  'odinnsecurity.com/index.php/anonymity/in-depth-analysis-of-bitmessage/': 'esoteriic.com/in-depth-analysis-of-bitmessage/',
  'odinnsecurity.com/index.php/anonymity/conclusion-of-thesis/': 'esoteriic.com/conclusion-of-thesis/',
  'odinnsecurity.com/index.php/anonymity/bibliography-of-thesis/': 'esoteriic.com/anonymity/', // Bibliography points to main anonymity page
  'odinnsecurity.com/anonymity/': 'esoteriic.com/anonymity/',
  
  // Simplify any remaining odinnsecurity links
  'odinnsecurity.com/': 'esoteriic.com/',
  
  // Remove web.archive.org references from internal links
  'https://web.archive.org/web/20210422200850/https://odinnsecurity.com/': 'https://esoteriic.com/',
  'https://web.archive.org/web/20200922045830/https://odinnsecurity.com/': 'https://esoteriic.com/'
};

async function updateDateInFrontmatter(filePath, newDate) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Update the date field in frontmatter
  const updatedContent = content.replace(
    /^date: .+$/m,
    `date: ${newDate}`
  );
  
  await fs.writeFile(filePath, updatedContent);
}

async function updateInternalLinks(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  let hasChanges = false;
  
  // Apply all URL mappings
  for (const [oldUrl, newUrl] of Object.entries(urlMappings)) {
    // Handle both with and without https://
    const patterns = [
      new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      new RegExp(`https://${oldUrl}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, `https://${newUrl}`);
        hasChanges = true;
      }
    }
  }
  
  // Handle any remaining odinnsecurity references more broadly
  if (content.includes('odinnsecurity.com')) {
    content = content.replace(/https?:\/\/odinnsecurity\.com/g, 'https://esoteriic.com');
    hasChanges = true;
  }
  
  // Clean up any double slashes
  content = content.replace(/https:\/\/esoteriic\.com\/\//g, 'https://esoteriic.com/');
  
  if (hasChanges) {
    await fs.writeFile(filePath, content);
    return true;
  }
  
  return false;
}

async function updateNavigationLinks(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  let hasChanges = false;
  
  // Update the "Read the next section" links to be cleaner
  const nextSectionPatterns = [
    {
      pattern: /Read the next section: \[theoretical anonymity\]\(https:\/\/esoteriic\.com\/theoretical-anonymity\/\)/g,
      replacement: 'Read the next section: [Theoretical Anonymity](/theoretical-anonymity/)'
    },
    {
      pattern: /Read the next section: \[.*?\]\(https:\/\/esoteriic\.com\/([^)]+)\)/g,
      replacement: 'Read the next section: [$1](/$1/)'
    }
  ];
  
  for (const {pattern, replacement} of nextSectionPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      hasChanges = true;
    }
  }
  
  // Clean up bibliography links
  content = content.replace(
    /\[Biblography\]\(https:\/\/esoteriic\.com\/anonymity\/\)/g,
    '[Bibliography](/anonymity/)'
  );
  
  if (hasChanges) {
    await fs.writeFile(filePath, content);
    return true;
  }
  
  return false;
}

async function processAnonymityPost(filename) {
  const filePath = path.join(markdownDir, filename);
  
  if (!(await fs.pathExists(filePath))) {
    console.warn(`[WARN] File not found: ${filename}`);
    return;
  }
  
  console.log(`📝 Processing ${filename}...`);
  
  // Update date
  await updateDateInFrontmatter(filePath, newDate);
  console.log(`  ✓ Updated date to ${newDate}`);
  
  // Update internal links
  const linksUpdated = await updateInternalLinks(filePath);
  if (linksUpdated) {
    console.log(`  ✓ Updated internal links`);
  }
  
  // Update navigation links
  const navUpdated = await updateNavigationLinks(filePath);
  if (navUpdated) {
    console.log(`  ✓ Updated navigation links`);
  }
  
  console.log(`  ✅ Completed ${filename}`);
}

async function main() {
  console.log('🔧 Updating Anonymity series posts...\n');
  
  try {
    for (const filename of anonymityPosts) {
      await processAnonymityPost(filename);
      console.log('');
    }
    
    console.log('✅ All anonymity posts updated successfully!');
    console.log('');
    console.log('📋 Changes made:');
    console.log(`- Updated all dates to ${newDate}`);
    console.log('- Fixed odinnsecurity.com links to esoteriic.com');
    console.log('- Cleaned up web.archive.org references');
    console.log('- Improved navigation link formatting');
    
  } catch (error) {
    console.error('❌ Error updating posts:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main }; 