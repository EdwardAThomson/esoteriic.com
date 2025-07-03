const fs = require('fs-extra');
const path = require('path');
const frontMatter = require('front-matter');

const markdownDir = path.join(__dirname, '../src/markdown');

// Anonymity series structure
const anonymitySeries = [
  {
    file: 'anonymity.md',
    title: 'Anonymous Messaging over the Internet',
    subtitle: 'Overview and Index',
    order: 0,
    slug: 'anonymity'
  },
  {
    file: 'introduction-to-anonymity.md',
    title: 'Introduction to Anonymity',
    subtitle: 'Understanding the Need for Anonymous Communication',
    order: 1,
    slug: 'introduction-to-anonymity'
  },
  {
    file: 'theoretical-anonymity.md',
    title: 'Theoretical Anonymity',
    subtitle: 'Philosophical and Mathematical Definitions',
    order: 2,
    slug: 'theoretical-anonymity'
  },
  {
    file: 'concepts-and-schemes-of-anonymous-communication.md',
    title: 'Concepts and Schemes of Anonymous Communication',
    subtitle: 'Practical Approaches and Implementation Challenges',
    order: 3,
    slug: 'concepts-and-schemes-of-anonymous-communication'
  },
  {
    file: 'in-depth-analysis-of-bitmessage.md',
    title: 'In-depth Analysis of BitMessage',
    subtitle: 'Case Study of a Practical Anonymous Messaging System',
    order: 4,
    slug: 'in-depth-analysis-of-bitmessage'
  },
  {
    file: 'conclusion-of-thesis.md',
    title: 'Conclusion of Thesis',
    subtitle: 'Summary and Future Directions',
    order: 5,
    slug: 'conclusion-of-thesis'
  },
  {
    file: 'anonymity-bibliography.md',
    title: 'Bibliography and References',
    subtitle: 'Complete Academic References and Sources',
    order: 6,
    slug: 'anonymity-bibliography'
  }
];

function generateAnonymityToC(currentOrder) {
  let toc = '\n\n---\n\n';
  toc += '## 📚 Anonymity Research Series\n\n';
  toc += '*A comprehensive study of anonymous communication systems and their practical implementation.*\n\n';
  
  // Generate the table of contents
  for (const chapter of anonymitySeries) {
    const isCurrentChapter = chapter.order === currentOrder;
    const prefix = isCurrentChapter ? '**→** ' : '';
    const suffix = isCurrentChapter ? ' *(current)*' : '';
    const formatting = isCurrentChapter ? '**' : '';
    
    if (chapter.order === 0) {
      // Special formatting for the index
      toc += `${prefix}${formatting}[${chapter.title}](/${chapter.slug}/)${formatting}${suffix}\n`;
      toc += `   *${chapter.subtitle}*\n\n`;
    } else {
      toc += `${prefix}${formatting}${chapter.order}. [${chapter.title}](/${chapter.slug}/)${formatting}${suffix}\n`;
      toc += `   *${chapter.subtitle}*\n\n`;
    }
  }
  
  // Add navigation links if not on the index page
  if (currentOrder > 0) {
    toc += '### Navigation\n\n';
    
    // Previous chapter
    const prevChapter = anonymitySeries.find(ch => ch.order === currentOrder - 1);
    if (prevChapter) {
      toc += `← Previous: [${prevChapter.title}](/${prevChapter.slug}/)\n\n`;
    }
    
    // Next chapter
    const nextChapter = anonymitySeries.find(ch => ch.order === currentOrder + 1);
    if (nextChapter) {
      toc += `→ Next: [${nextChapter.title}](/${nextChapter.slug}/)\n\n`;
    }
    
    // Return to index
    toc += `📖 [Return to Series Index](/anonymity/)\n\n`;
  }
  
  toc += '---\n\n';
  
  return toc;
}

function generateMainIndexToC() {
  let toc = '\n\n## 📑 Complete Series Contents\n\n';
  toc += '*Click any chapter to begin reading, or read them in order for the full experience.*\n\n';
  
  for (const chapter of anonymitySeries) {
    if (chapter.order === 0) continue; // Skip the index itself
    
    toc += `### ${chapter.order}. [${chapter.title}](/${chapter.slug}/)\n`;
    toc += `${chapter.subtitle}\n\n`;
  }
  
  toc += '### 6. [Bibliography and References](/anonymity-bibliography/)\n';
  toc += 'Complete Academic References and Sources\n\n';
  
  toc += '### Additional Resources\n\n';
  toc += '- [Complete Series as Single Page](#) *(coming soon)*\n';
  toc += '- [Download as PDF](#) *(coming soon)*\n\n';
  
  return toc;
}

async function addToCAnonymityPost(filePath, currentOrder) {
  if (!(await fs.pathExists(filePath))) {
    console.warn(`[WARN] File not found: ${filePath}`);
    return false;
  }
  
  let content = await fs.readFile(filePath, 'utf-8');
  const { attributes, body } = frontMatter(content);
  
  // Remove any existing ToC (look for the pattern between --- markers)
  const existingTocPattern = /\n\n---\n\n## 📚 Anonymity Research Series[\s\S]*?---\n\n/;
  const cleanBody = body.replace(existingTocPattern, '');
  
  // For the main index page, use a different ToC
  let newToc;
  if (currentOrder === 0) {
    // Remove old sections list and replace with new ToC
    const sectionsPattern = /\*\*Sections\*\*:[\s\S]*?(?=\*\*Overview\*\*)/;
    const overviewPattern = /\*\*Overview\*\*[\s\S]*?(?=\*\*Introduction\*\*)/;
    
    let updatedBody = cleanBody
      .replace(sectionsPattern, '')
      .replace(overviewPattern, '');
    
    // Add new ToC after the intro paragraph
    const introEnd = updatedBody.indexOf('The benefit of hosting as blog posts');
    if (introEnd !== -1) {
      const endOfIntro = updatedBody.indexOf('.', introEnd + 'The benefit of hosting as blog posts'.length) + 1;
      newToc = generateMainIndexToC();
      updatedBody = updatedBody.slice(0, endOfIntro) + newToc + updatedBody.slice(endOfIntro);
    } else {
      newToc = generateMainIndexToC();
      updatedBody = newToc + updatedBody;
    }
    
    // Reconstruct the content
    let newContent = '---\n';
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === 'string' && value.includes('"')) {
        newContent += `${key}: ${JSON.stringify(value)}\n`;
      } else if (typeof value === 'string') {
        newContent += `${key}: "${value}"\n`;
      } else {
        newContent += `${key}: ${value}\n`;
      }
    }
    newContent += '---\n' + updatedBody;
    
    await fs.writeFile(filePath, newContent);
    return true;
  } else {
    // For regular chapters, add ToC at the beginning
    newToc = generateAnonymityToC(currentOrder);
    const updatedBody = newToc + cleanBody;
    
    // Reconstruct the content
    let newContent = '---\n';
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === 'string' && value.includes('"')) {
        newContent += `${key}: ${JSON.stringify(value)}\n`;
      } else if (typeof value === 'string') {
        newContent += `${key}: "${value}"\n`;
      } else {
        newContent += `${key}: ${value}\n`;
      }
    }
    newContent += '---\n' + updatedBody;
    
    await fs.writeFile(filePath, newContent);
    return true;
  }
}

async function main() {
  console.log('🔧 Adding custom ToC to Anonymity series...\n');
  
  try {
    for (const chapter of anonymitySeries) {
      const filePath = path.join(markdownDir, chapter.file);
      console.log(`📝 Processing ${chapter.title}...`);
      
      const success = await addToCAnonymityPost(filePath, chapter.order);
      if (success) {
        console.log(`  ✅ Added custom ToC to ${chapter.file}`);
      } else {
        console.log(`  ❌ Failed to process ${chapter.file}`);
      }
    }
    
    console.log('\n✅ Custom ToC added to all Anonymity series posts!');
    console.log('\n📋 Features added:');
    console.log('- Series overview with current chapter highlighted');
    console.log('- Previous/Next navigation links');
    console.log('- Enhanced main index page with structured contents');
    console.log('- Consistent navigation throughout the series');
    
  } catch (error) {
    console.error('❌ Error adding ToC:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, generateAnonymityToC }; 