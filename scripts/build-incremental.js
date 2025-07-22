const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
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
const cacheFile = path.join(__dirname, '../.build-cache.json');

// Anonymity series configuration (same as original)
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
      sidebarHtml += `
        <li${currentClass}>
          <a href="/${chapter.slug}/">
            <span class="chapter-title">${chapter.title}</span>
            <span class="chapter-subtitle">${chapter.subtitle}</span>
          </a>
        </li>
      `;
    } else {
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

// Load or create build cache
function loadBuildCache() {
  try {
    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    }
  } catch (error) {
    console.log('Could not load build cache, starting fresh');
  }
  return {
    files: {},
    lastBuild: 0,
    templates: {}
  };
}

// Save build cache
function saveBuildCache(cache) {
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
}

// Get file hash for content comparison
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

// Check if file needs rebuilding
function needsRebuild(filePath, cache) {
  const stats = fs.statSync(filePath);
  const mtime = stats.mtime.getTime();
  const hash = getFileHash(filePath);
  
  const cached = cache.files[filePath];
  if (!cached) return true;
  
  return cached.mtime !== mtime || cached.hash !== hash;
}

// Check if templates have changed
function templatesChanged(cache) {
  const mainTemplate = path.join(templatesDir, 'main.html');
  const pageTemplate = path.join(templatesDir, 'page.html');
  
  const mainHash = getFileHash(mainTemplate);
  const pageHash = getFileHash(pageTemplate);
  
  return cache.templates.mainHash !== mainHash || cache.templates.pageHash !== pageHash;
}

// Main build function
async function build() {
  console.log('Starting incremental build...');
  
  const cache = loadBuildCache();
  
  // Clean up any stale cache entries for index.md (it should never be treated as a blog post)
  const indexPath = path.join(markdownDir, 'index.md');
  if (cache.files[indexPath] && cache.files[indexPath].metadata) {
    console.log('Cleaning up stale cache entry for index.md');
    cache.files[indexPath].metadata = null;
  }
  const forceRebuild = process.argv.includes('--force') || templatesChanged(cache);
  
  if (forceRebuild) {
    console.log('Templates changed or force rebuild requested - rebuilding all files');
  }
  
  // Ensure dist directory exists
  fs.ensureDirSync(distDir);
  
  // Always copy static assets (they're usually small)
  console.log('Copying static assets...');
  fs.copySync(cssDir, path.join(distDir, 'css'));
  fs.copySync(jsDir, path.join(distDir, 'js'));
  
  // Copy images if they exist
  const imagesDir = path.join(srcDir, 'images');
  if (fs.existsSync(imagesDir)) {
    fs.copySync(imagesDir, path.join(distDir, 'images'));
  }
  
  // Load templates
  const mainTemplate = fs.readFileSync(path.join(templatesDir, 'main.html'), 'utf8');
  const pageTemplate = fs.readFileSync(path.join(templatesDir, 'page.html'), 'utf8');
  
  // Process markdown files
  const markdownFiles = fs.readdirSync(markdownDir)
    .filter(file => file.endsWith('.md'));
  
  const posts = [];
  let rebuiltCount = 0;
  let skippedCount = 0;
  
  for (const mdFile of markdownFiles) {
    const mdPath = path.join(markdownDir, mdFile);
    const needsUpdate = forceRebuild || needsRebuild(mdPath, cache);
    
    if (!needsUpdate) {
      // Load cached post metadata for index generation (skip index.md)
      if (mdFile !== 'index.md') {
        const cached = cache.files[mdPath];
        if (cached && cached.metadata) {
          posts.push(cached.metadata);
          skippedCount++;
          continue;
        }
      } else {
        skippedCount++;
        continue;
      }
    }
    
    console.log(`Processing ${mdFile}...`);
    rebuiltCount++;
    
    // Read and process markdown file
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const { attributes, body } = frontMatter(mdContent);
    
    // Convert markdown to HTML
    const contentHtml = marked.parse(body);
    
    // Create post metadata (but skip index.md as it's not a blog post)
    let postMeta = null;
    if (mdFile !== 'index.md') {
      postMeta = {
        title: attributes.title || 'Untitled',
        date: attributes.date || new Date().toISOString(),
        slug: mdFile.replace('.md', ''),
        excerpt: attributes.excerpt || body.substring(0, 200).replace(/\n/g, ' ') + '...'
      };
      
      posts.push(postMeta);
    }
    
    // Generate page HTML
    let pageHtml = pageTemplate
      .replace('{{title}}', postMeta ? postMeta.title : (attributes.title || 'Untitled'))
      .replace('{{content}}', contentHtml)
      .replace('{{date}}', postMeta ? new Date(postMeta.date).toDateString() : '')
      .replace('{{category_link}}', attributes.category ? `<a href="/category/${attributes.category}/">${attributes.category}</a>` : '');
    
    // Add any additional front matter content
    Object.keys(attributes).forEach(key => {
      if (key !== 'title') {
        pageHtml = pageHtml.replace(`{{${key}}}`, attributes[key] || '');
      }
    });
    
    // Fill main template
    let fullHtml = mainTemplate
      .replace('{{title}}', postMeta ? postMeta.title : (attributes.title || 'Untitled'))
      .replace('{{description}}', attributes.description || '')
      .replace('{{page_content}}', pageHtml);
    
    // Inject anonymity sidebar for series pages
    if (isAnonymitySeriesPage(mdFile)) {
      const slug = getAnonymitySlug(mdFile);
      const sidebarHtml = generateAnonymitySidebar(slug);
      fullHtml = fullHtml.replace('</body>', sidebarHtml + '</body>');
    }
    
    // Write output file
    if (mdFile === 'index.md') {
      // Handle index page separately (will be rebuilt later with post list)
    } else {
      const pageName = mdFile.replace('.md', '');
      const pageDir = path.join(distDir, pageName);
      fs.ensureDirSync(pageDir);
      fs.writeFileSync(path.join(pageDir, 'index.html'), fullHtml);
    }
    
    // Update cache
    const stats = fs.statSync(mdPath);
    cache.files[mdPath] = {
      mtime: stats.mtime.getTime(),
      hash: getFileHash(mdPath),
      metadata: postMeta
    };
  }
  
  // Always rebuild index page (since it depends on all posts)
  console.log('Rebuilding index page...');
  const indexMdFile = path.join(markdownDir, 'index.md');
  if (fs.existsSync(indexMdFile)) {
    const indexMdContent = fs.readFileSync(indexMdFile, 'utf8');
    const { attributes, body } = frontMatter(indexMdContent);
    const bodyHtml = marked.parse(body);
    
    // Sort posts by date, descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
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
    
    // Featured post logic - always remove featured post from year listing to prevent duplication
    const featuredPost = postsByYear[years[0]] ? postsByYear[years[0]].shift() : null;
    
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
      postsHtml += `<div class="year-section">`;
      postsHtml += `<h2 id="year-${year}">${year}</h2>`;
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
    
    pageHtml = pageHtml.replace('<div class="toc-container" id="toc-container"></div>', yearsTocHtml);
    
    let fullHtml = mainTemplate
      .replace('{{title}}', attributes.title || 'Home')
      .replace('{{description}}', attributes.description || '')
      .replace('{{page_content}}', pageHtml);
    
    fs.writeFileSync(path.join(distDir, 'index.html'), fullHtml);
  }
  
  // Create redirects (always rebuild these as they're quick)
  console.log('Creating redirects...');
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
    
    if (oldUrl.endsWith('/')) {
      const dirPath = path.join(distDir, oldUrl);
      fs.ensureDirSync(dirPath);
      fs.writeFileSync(path.join(dirPath, 'index.html'), redirectHtml);
    } else {
      const outputPath = path.join(distDir, oldUrl);
      fs.ensureDirSync(path.dirname(outputPath));
      fs.writeFileSync(outputPath, redirectHtml);
    }
  }
  
  // Update template hashes in cache
  cache.templates = {
    mainHash: getFileHash(path.join(templatesDir, 'main.html')),
    pageHash: getFileHash(path.join(templatesDir, 'page.html'))
  };
  
  cache.lastBuild = Date.now();
  saveBuildCache(cache);
  
  console.log(`Build completed! Rebuilt: ${rebuiltCount}, Skipped: ${skippedCount}, Total: ${markdownFiles.length}`);
}

// Run the build
build().catch(console.error);
