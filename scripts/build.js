const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const { mangle } = require('marked-mangle');
const frontMatter = require('front-matter');
const hljs = require('highlight.js');
const cheerio = require('cheerio');
const { gfmHeadingId } = require('marked-gfm-heading-id');
const { markedHighlight } = require("marked-highlight");

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));
marked.use(mangle());
marked.use(gfmHeadingId());

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');
const markdownDir = path.join(srcDir, 'markdown');
const templatesDir = path.join(srcDir, 'templates');
const cssDir = path.join(srcDir, 'css');
const jsDir = path.join(srcDir, 'js');

// Anonymity series configuration
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

function generateAnonymitySidebar(currentSlug) {
  const currentChapter = anonymitySeries.find(ch => ch.slug === currentSlug);
  const currentOrder = currentChapter ? currentChapter.order : -1;
  
  let sidebarHtml = `
    <div class="anonymity-sidebar" id="anonymity-sidebar">
      <div class="anonymity-sidebar-header">
        <h3 class="anonymity-sidebar-title">📚 Anonymity Research</h3>
        <p class="anonymity-sidebar-subtitle">Anonymous Communication Systems</p>
      </div>
      <ul class="anonymity-sidebar-nav">
  `;
  
  for (const chapter of anonymitySeries) {
    const isCurrent = chapter.order === currentOrder;
    const currentClass = isCurrent ? ' class="current"' : '';
    
    if (chapter.order === 0) {
      // Index page
      sidebarHtml += `
        <li${currentClass}>
          <a href="/${chapter.slug}/">
            <span class="chapter-title">${chapter.title}</span>
            <span class="chapter-subtitle">${chapter.subtitle}</span>
          </a>
        </li>
      `;
    } else {
      // Regular chapters
      sidebarHtml += `
        <li${currentClass}>
          <a href="/${chapter.slug}/">
            <span class="chapter-number">${chapter.order}.</span>
            <span class="chapter-title">${chapter.title}</span>
            <span class="chapter-subtitle">${chapter.subtitle}</span>
          </a>
        </li>
      `;
    }
  }
  
  sidebarHtml += `
      </ul>
    </div>
    <button class="anonymity-sidebar-toggle" id="anonymity-sidebar-toggle" aria-label="Toggle series navigation">
      📖
    </button>
  `;
  
  return sidebarHtml;
}

function isAnonymitySeriesPage(filename) {
  return anonymitySeries.some(chapter => chapter.file === filename);
}

function getAnonymitySlug(filename) {
  const chapter = anonymitySeries.find(ch => ch.file === filename);
  return chapter ? chapter.slug : null;
}

// Ensure dist directory exists
fs.ensureDirSync(distDir);

// Copy static assets
fs.copySync(cssDir, path.join(distDir, 'css'));
fs.copySync(jsDir, path.join(distDir, 'js'));

// Copy any images if they exist
const imagesDir = path.join(srcDir, 'images');
if (fs.existsSync(imagesDir)) {
  fs.copySync(imagesDir, path.join(distDir, 'images'));
}

// Read templates
const mainTemplate = fs.readFileSync(path.join(templatesDir, 'main.html'), 'utf8');
const pageTemplate = fs.readFileSync(path.join(templatesDir, 'page.html'), 'utf8');

// Process markdown files
const markdownFiles = fs.readdirSync(markdownDir)
  .filter(file => file.endsWith('.md'));

const posts = [];

markdownFiles.forEach(mdFile => {
  console.log(`Processing ${mdFile}...`);
  
  // Read markdown file
  const mdContent = fs.readFileSync(path.join(markdownDir, mdFile), 'utf8');
  
  // Parse front matter
  const { attributes, body } = frontMatter(mdContent);
  
  // Convert markdown to HTML
  const htmlContent = marked.parse(body);
  
  // Create an excerpt from the first paragraph
  const $ = cheerio.load(htmlContent);
  const excerpt = $('p').first().html();

  // Store post data for index page
  if (mdFile !== 'index.md') {
    posts.push({
        ...attributes,
        slug: mdFile.replace('.md', ''),
        content: htmlContent,
        excerpt: excerpt,
    });
  }

  // Fill page template
  let pageHtml = pageTemplate
    .replace('{{title}}', attributes.title || 'Untitled')
    .replace('{{content}}', htmlContent)
    .replace('{{date}}', attributes.date ? new Date(attributes.date).toDateString() : '');
    
  if (attributes.category) {
    const categoryUrl = `/categories/${attributes.category}/`;
    const categoryLink = `in <a href="${categoryUrl}">${attributes.category.replace(/-/g, ' ')}</a>`;
    pageHtml = pageHtml.replace('{{category_link}}', categoryLink);
  } else {
    pageHtml = pageHtml.replace('{{category_link}}', '');
  }
  
  // Add any additional front matter content
  Object.keys(attributes).forEach(key => {
    if (key !== 'title') {
      pageHtml = pageHtml.replace(`{{${key}}}`, attributes[key] || '');
    }
  });
  
  // Fill main template
  let fullHtml = mainTemplate
    .replace('{{title}}', attributes.title || 'Untitled')
    .replace('{{description}}', attributes.description || '')
    .replace('{{page_content}}', pageHtml);
  
  // Inject anonymity sidebar for series pages
  if (isAnonymitySeriesPage(mdFile)) {
    const slug = getAnonymitySlug(mdFile);
    const sidebarHtml = generateAnonymitySidebar(slug);
    
    // Inject sidebar before closing body tag
    fullHtml = fullHtml.replace('</body>', `${sidebarHtml}</body>`);
    
    // Add anonymity-series class to body
    fullHtml = fullHtml.replace('<body>', '<body class="anonymity-series">');
  }
  
  // Determine output path
  const outputFilename = mdFile.replace('.md', '.html');
  const outputPath = path.join(distDir, outputFilename);
  
  // Special case for index.md
  if (mdFile === 'index.md') {
    // This will be handled later, after all posts are processed
  } else {
    // Create directory for the page if it doesn't exist
    const pageName = mdFile.replace('.md', '');
    const pageDir = path.join(distDir, pageName);
    fs.ensureDirSync(pageDir);
    fs.writeFileSync(path.join(pageDir, 'index.html'), fullHtml);
  }
});

// Sort posts by date, descending
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate index page
const indexMdFile = path.join(markdownDir, 'index.md');
if (fs.existsSync(indexMdFile)) {
    const indexMdContent = fs.readFileSync(indexMdFile, 'utf8');
    const { attributes, body } = frontMatter(indexMdContent);
    const bodyHtml = marked.parse(body);

    // Group posts by year
    const postsByYear = posts.reduce((acc, post) => {
        const year = new Date(post.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {});

    const years = Object.keys(postsByYear).sort((a, b) => b - a);

    // The most recent post is the first post of the most recent year.
    const featuredPost = postsByYear[years[0]].shift();

    const yearsTocHtml = `
        <div class="toc-container visible" id="years-toc">
            <h3 class="toc-title">Years</h3>
            <ul class="toc-list">
                ${years.map(year => `<li class="toc-list-item"><a href="#year-${year}">${year}</a></li>`).join('')}
            </ul>
        </div>
    `;

    let featuredPostHtml = '';
    if (featuredPost) {
        featuredPostHtml = `
            <section class="featured-post">
                <h2 class="featured-post-title"><a href="/${featuredPost.slug}/">${featuredPost.title}</a></h2>
                <p class="featured-post-date">${new Date(featuredPost.date).toDateString()}</p>
                <div class="featured-post-excerpt">
                    <p>${featuredPost.excerpt}</p>
                </div>
            </section>
        `;
    }

    let postsHtml = '';
    years.forEach(year => {
        postsHtml += `<h2 id="year-${year}">${year}</h2>`;
        postsHtml += '<div class="post-grid">';
        postsHtml += postsByYear[year].map(post => `
            <div class="post-card">
                <div class="post-card-content">
                    <h3 class="post-card-title"><a href="/${post.slug}/">${post.title}</a></h3>
                    <p class="post-card-date">${new Date(post.date).toDateString()}</p>
                </div>
            </div>
        `).join('');
        postsHtml += '</div>';
    });

    const indexContent = bodyHtml.replace('{{posts}}', featuredPostHtml + postsHtml);

    let pageHtml = pageTemplate
        .replace('{{title}}', attributes.title || 'Home')
        .replace('{{content}}', indexContent)
        .replace('{{date}}', '')
        .replace('{{category_link}}', '');
    
    // Inject the years ToC into the homepage
    pageHtml = pageHtml.replace('<div class="toc-container" id="toc-container"></div>', yearsTocHtml);

    let fullHtml = mainTemplate
        .replace('{{title}}', attributes.title || 'Home')
        .replace('{{description}}', attributes.description || '')
        .replace('{{page_content}}', pageHtml);

    fs.writeFileSync(path.join(distDir, 'index.html'), fullHtml);
}

// Create redirects
const redirects = fs.readJsonSync(path.join(__dirname, '../redirects.json'));
for (const [oldUrl, redirectData] of Object.entries(redirects)) {
  const newUrl = redirectData.newUrl;
    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${newUrl}">
  <meta http-equiv="refresh" content="0; url=${newUrl}">
</head>
<body>
  <h1>Redirecting...</h1>
  <a href="${newUrl}">Click here if you are not redirected.</a>
  <script>
    window.location.href = "${newUrl}";
  </script>
</body>
</html>`;

    const outputPath = path.join(distDir, oldUrl);
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, redirectHtml);
}

console.log('Build completed successfully!'); 