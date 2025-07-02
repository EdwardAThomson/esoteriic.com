const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Mapping of old categories to new categories for creative writing
const categoryMapping = {
  'short-stories': 'creative-writing',
  'blog': 'writing-craft',
  'writing-resource': 'writing-craft',
  'shroud-of-the-avatar': 'creative-writing'
};

// Helper function to clean HTML and convert to markdown-like format
function htmlToMarkdown(html) {
  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Convert paragraph tags
  html = html.replace(/<p[^>]*>/gi, '\n\n');
  html = html.replace(/<\/p>/gi, '');
  
  // Convert headers
  html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1');
  html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1');
  html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1');
  
  // Convert emphasis
  html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  html = html.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  html = html.replace(/<span[^>]*style="[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi, '*$1*');
  
  // Convert links
  html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert lists
  html = html.replace(/<ul[^>]*>/gi, '');
  html = html.replace(/<\/ul>/gi, '');
  html = html.replace(/<li[^>]*>/gi, '- ');
  html = html.replace(/<\/li>/gi, '');
  
  // Convert blockquotes
  html = html.replace(/<blockquote[^>]*>/gi, '\n> ');
  html = html.replace(/<\/blockquote>/gi, '\n');
  
  // Remove remaining HTML tags
  html = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  html = html.replace(/&#8217;/g, "'");
  html = html.replace(/&#8220;/g, '"');
  html = html.replace(/&#8221;/g, '"');
  html = html.replace(/&#8211;/g, '–');
  html = html.replace(/&#8212;/g, '—');
  html = html.replace(/&amp;/g, '&');
  html = html.replace(/&lt;/g, '<');
  html = html.replace(/&gt;/g, '>');
  html = html.replace(/&quot;/g, '"');
  html = html.replace(/&nbsp;/g, ' ');
  
  // Clean up whitespace
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  html = html.replace(/^\s+|\s+$/g, '');
  
  return html;
}

// Function to extract metadata from WordPress HTML
function extractMetadata($) {
  // Extract title
  const titleElement = $('h1.entry-title');
  const title = titleElement.length ? titleElement.text().trim() : 'Untitled';
  
  // Extract date
  const dateElement = $('time.entry-date');
  const dateString = dateElement.length ? dateElement.attr('datetime') : null;
  const publicationDate = dateString ? new Date(dateString).toISOString().split('T')[0] : null;
  
  // Extract categories
  const categories = [];
  $('.categories-links a').each((i, el) => {
    const cat = $(el).text().trim().toLowerCase().replace(/\s+/g, '-');
    const mappedCat = categoryMapping[cat] || cat;
    if (!categories.includes(mappedCat)) {
      categories.push(mappedCat);
    }
  });
  
  // Extract tags
  const tags = [];
  $('.tags-links a').each((i, el) => {
    const tag = $(el).text().trim().toLowerCase().replace(/\s+/g, '-');
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  });
  
  return {
    title,
    publicationDate,
    categories,
    tags
  };
}

// Function to extract content from WordPress HTML
function extractContent($) {
  // Get the main content area
  const contentElement = $('.entry-content');
  if (!contentElement.length) {
    return '';
  }
  
  // Remove "more" links and navigation
  contentElement.find('[id*="more-"]').remove();
  
  return htmlToMarkdown(contentElement.html());
}

// Function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Function to convert a single HTML file to markdown
function convertHtmlToMarkdown(htmlFilePath) {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    const $ = cheerio.load(htmlContent);
    
    const metadata = extractMetadata($);
    const content = extractContent($);
    
    if (!content.trim()) {
      console.log(`Skipping ${htmlFilePath} - no content found`);
      return null;
    }
    
    // Generate slug
    const slug = generateSlug(metadata.title);
    
    // Create markdown frontmatter
    let frontmatter = '---\n';
    frontmatter += `title: "${metadata.title}"\n`;
    if (metadata.publicationDate) {
      frontmatter += `date: ${metadata.publicationDate}T00:00:00.000Z\n`;
    }
    // Use the first category as the main category (singular field expected by build script)
    if (metadata.categories.length > 0) {
      frontmatter += `category: ${metadata.categories[0]}\n`;
    }
    if (metadata.tags.length > 0) {
      frontmatter += `tags:\n${metadata.tags.map(tag => `  - "${tag}"`).join('\n')}\n`;
    }
    frontmatter += '---\n\n';
    
    // Combine frontmatter and content
    const markdownContent = frontmatter + content;
    
    return {
      slug,
      content: markdownContent,
      metadata
    };
  } catch (error) {
    console.error(`Error processing ${htmlFilePath}:`, error.message);
    return null;
  }
}

// Main function to process all HTML files
function processCreativeWritingFiles() {
  const authorDir = path.join(__dirname, '..', 'temp_archive', 'author');
  const markdownDir = path.join(__dirname, '..', 'src', 'markdown');
  
  if (!fs.existsSync(authorDir)) {
    console.error('Author directory not found:', authorDir);
    return;
  }
  
  // Get all subdirectories
  const subdirs = fs.readdirSync(authorDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`Found ${subdirs.length} subdirectories to process`);
  
  let processedCount = 0;
  let skippedCount = 0;
  
  for (const subdir of subdirs) {
    const htmlFile = path.join(authorDir, subdir, 'index.html');
    
    if (!fs.existsSync(htmlFile)) {
      console.log(`Skipping ${subdir} - no index.html found`);
      skippedCount++;
      continue;
    }
    
    console.log(`Processing: ${subdir}`);
    const result = convertHtmlToMarkdown(htmlFile);
    
    if (result) {
      const outputPath = path.join(markdownDir, `${result.slug}.md`);
      
      // Check if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`File already exists: ${result.slug}.md - skipping`);
        skippedCount++;
        continue;
      }
      
      fs.writeFileSync(outputPath, result.content, 'utf8');
      console.log(`Created: ${result.slug}.md`);
      processedCount++;
    } else {
      skippedCount++;
    }
  }
  
  console.log(`\nProcessing complete:`);
  console.log(`- Processed: ${processedCount} files`);
  console.log(`- Skipped: ${skippedCount} files`);
}

// Run the conversion if this script is executed directly
if (require.main === module) {
  processCreativeWritingFiles();
}

module.exports = { processCreativeWritingFiles }; 