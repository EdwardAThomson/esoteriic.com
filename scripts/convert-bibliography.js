const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const bibliographyFile = path.join(__dirname, '../temp_archive/odinnsecurity.com/Anonymity/Bibliography of thesis – Odinn Security.html');
const markdownDir = path.join(__dirname, '../src/markdown');
const outputFile = path.join(markdownDir, 'anonymity-bibliography.md');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Custom rule to handle bibliography entries better
turndownService.addRule('bibliographyEntries', {
  filter: function (node) {
    return node.nodeName === 'P' && node.textContent.match(/^\[\d+\]/);
  },
  replacement: function (content, node) {
    // Clean up the content and format as a proper bibliography entry
    return content.replace(/^\[(\d+)\]/, '**[$1]**') + '\n';
  }
});

async function convertBibliography() {
  try {
    console.log('📚 Converting bibliography to markdown...');
    
    if (!(await fs.pathExists(bibliographyFile))) {
      console.error('❌ Bibliography file not found:', bibliographyFile);
      return;
    }
    
    const htmlContent = await fs.readFile(bibliographyFile, 'utf-8');
    const $ = cheerio.load(htmlContent);
    
    // Extract title
    const title = $('title').text().replace(' – Odinn Security', '').trim() || 'Bibliography of Thesis';
    
    // Extract main content
    const $content = $('article.post-content');
    
    if ($content.length === 0) {
      console.warn('⚠️ No post-content found, trying alternative selectors...');
      // Try alternative content selectors
      const altContent = $('div.entry-content, div.content, main').first();
      if (altContent.length > 0) {
        $content.replaceWith(altContent);
      }
    }
    
    let contentHtml = $content.html();
    
    if (!contentHtml) {
      console.error('❌ Could not extract content from bibliography file');
      return;
    }
    
    // Convert to markdown
    const markdownContent = turndownService.turndown(contentHtml);
    
    // Create frontmatter
    const frontmatter = `---
title: "Bibliography and References"
date: 2016-08-27
tags: ["security", "blog-archive", "bibliography"]
category: "information security"
series: "Anonymity Research"
series_order: 6
description: "Complete bibliography and references for the anonymity research thesis"
---

`;
    
    // Add series navigation
    const seriesNav = `
---

## 📚 Anonymity Research Series

*A comprehensive study of anonymous communication systems and their practical implementation.*

[Anonymous Messaging over the Internet](/anonymity/)
   *Overview and Index*

1. [Introduction to Anonymity](/introduction-to-anonymity/)
   *Understanding the Need for Anonymous Communication*

2. [Theoretical Anonymity](/theoretical-anonymity/)
   *Philosophical and Mathematical Definitions*

3. [Concepts and Schemes of Anonymous Communication](/concepts-and-schemes-of-anonymous-communication/)
   *Practical Approaches and Implementation Challenges*

4. [In-depth Analysis of BitMessage](/in-depth-analysis-of-bitmessage/)
   *Case Study of a Practical Anonymous Messaging System*

5. [Conclusion of Thesis](/conclusion-of-thesis/)
   *Summary and Future Directions*

**→** **6. Bibliography and References** *(current)*
   *Complete Academic References and Sources*

### Navigation

← Previous: [Conclusion of Thesis](/conclusion-of-thesis/)

📖 [Return to Series Index](/anonymity/)

---

`;
    
    // Clean up markdown content
    let cleanedContent = markdownContent
      .replace(/\n\n\n+/g, '\n\n')  // Remove excessive newlines
      .replace(/\*\*\[\*\*(\d+)\*\*\]\*\*/g, '**[$1]**')  // Fix double bold formatting
      .trim();
    
    // Combine everything
    const finalContent = frontmatter + seriesNav + cleanedContent;
    
    // Write to file
    await fs.writeFile(outputFile, finalContent);
    
    console.log(`✅ Successfully converted bibliography to: ${outputFile}`);
    console.log(`📄 Title: ${title}`);
    console.log(`📝 Content length: ${cleanedContent.length} characters`);
    
    // Update the redirects file
    const redirectsFile = path.join(__dirname, '../redirects.json');
    const redirects = await fs.readJson(redirectsFile);
    
    // Add redirect for bibliography
    redirects['/anonymity/bibliography-of-thesis/'] = {
      newUrl: '/anonymity-bibliography/',
      title: 'Bibliography and References'
    };
    
    await fs.writeJson(redirectsFile, redirects, { spaces: 2 });
    console.log('✅ Updated redirects.json with bibliography redirect');
    
  } catch (error) {
    console.error('❌ Error converting bibliography:', error);
  }
}

if (require.main === module) {
  convertBibliography();
}

module.exports = { convertBibliography }; 