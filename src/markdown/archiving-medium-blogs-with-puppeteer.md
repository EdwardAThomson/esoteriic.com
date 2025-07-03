---
title: "Archiving Medium Blogs with Puppeteer: A Technical Deep Dive"
date: "2025-07-03"
category: "programming"
description: "Building a robust Node.js script to archive Medium articles with images using Puppeteer for dynamic content handling and proper authentication bypass."
---

# Archiving Medium Blogs with Puppeteer: A Technical Deep Dive

Recently, I decided to relaunch my personal website and my old blog website. Both are online, but hosted on a VPS. I really wanted to upgrade my setup and perhaps try to save costs too. As part of that migration effort, I wanted to create a backup of my Medium blog posts for integration into my personal website.

What started as a simple scraping task quickly revealed the complexities of modern web scraping, authentication barriers, and dynamic content loading. Here's how I built a robust archiving solution using Node.js and Puppeteer.

I've been working with AI extensively to relaunch my websites, including writing custom scripts to process my old blogs into a new format, but also to perform the work here. I have exclusively been working inside the Cursor IDE for this process.

## The Challenge: Medium's Modern Web Architecture

Medium isn't your typical static website. It employs:

- **Heavy JavaScript rendering** for dynamic content loading
- **Authentication walls** that redirect to sign-in pages
- **Anti-bot measures** to prevent automated scraping
- **Complex URL structures** with redirect chains
- **Dynamic image loading** with CDN-hosted assets

A simple HTTP request to fetch HTML wouldn't suffice—I needed browser automation.

## Evolution of the Solution

### Attempt 1: Basic HTTP Scraping

My first approach used Node.js's built-in `https` module to fetch article pages directly:

```javascript
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;
        const request = protocol.get(url, (response) => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve({ data, headers: response.headers }));
        });
        request.on('error', reject);
    });
}
```

**Result**: Failed spectacularly. Medium's JavaScript-heavy architecture meant most content wasn't present in the initial HTML response.

### Attempt 2: Puppeteer with Basic Selectors

Enter Puppeteer—a Node.js library that provides a high-level API to control Chrome/Chromium browsers:

```javascript
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(articleUrl);
```

**Challenge**: Medium's article links were wrapped in authentication redirects. Instead of getting direct article URLs, I was getting URLs like:

```
https://medium.com/m/signin?actionUrl=...&redirect=https%3A%2F%2Fedward-thomson.medium.com%2Farticle-title
```

### Attempt 3: Smart URL Extraction and Authentication Bypass

The breakthrough came from understanding Medium's URL structure and implementing intelligent extraction:

```javascript
// Extract article links more carefully
const articleLinks = await page.evaluate(() => {
    const links = new Set();
    
    const selectors = [
        'a[href*="medium.com"]',
        'a[href*="-"]',
        'article a',
        'h2 a',
        'h3 a'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const href = element.getAttribute('href');
            if (href) {
                let cleanUrl = href;
                
                // Extract the actual article URL from redirect URLs
                if (href.includes('redirect=')) {
                    const match = href.match(/redirect=([^&]+)/);
                    if (match) {
                        cleanUrl = decodeURIComponent(match[1]);
                    }
                }
                
                // Only include URLs that look like actual articles
                if (cleanUrl.includes('medium.com') && 
                    cleanUrl.includes('-') && 
                    cleanUrl.match(/[a-f0-9]{12}/) &&
                    !cleanUrl.includes('/m/signin') &&
                    !cleanUrl.includes('bookmark')) {
                    
                    links.add(cleanUrl);
                }
            }
        });
    });
    
    return Array.from(links);
});
```

## Key Technical Solutions

### 1. Robust Content Extraction

Medium's HTML structure varies, so I implemented multiple fallback selectors:

```javascript
// Get title - try multiple selectors
let titleElement = document.querySelector('h1[data-testid="storyTitle"]') ||
                  document.querySelector('h1') ||
                  document.querySelector('[data-testid="storyTitle"]') ||
                  document.querySelector('article h1');

const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
```

### 2. Smart Content Processing

Converting Medium's HTML to clean Markdown required careful processing:

```javascript
elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    let text = element.textContent.trim();
    
    if (text && !text.includes('Sign up') && !text.includes('Follow')) {
        switch (tagName) {
            case 'h1':
                if (text !== title) content += `# ${text}\n\n`;
                break;
            case 'h2':
                content += `## ${text}\n\n`;
                break;
            case 'blockquote':
                content += `> ${text}\n\n`;
                break;
            case 'pre':
                content += `\`\`\`\n${text}\n\`\`\`\n\n`;
                break;
            default:
                content += `${text}\n\n`;
        }
    }
});
```

### 3. Image Handling and Download

Medium hosts images on CDNs with complex URLs. The script identifies, downloads, and locally references them:

```javascript
// Process images
const imgElements = contentElement.querySelectorAll('img');
imgElements.forEach((img, index) => {
    const src = img.src;
    if (src && !src.startsWith('data:') && src.includes('medium.com')) {
        const extension = src.includes('.png') ? 'png' : 
                        src.includes('.gif') ? 'gif' : 'jpg';
        const filename = `${Date.now()}_${index}.${extension}`;
        images.push({ url: src, filename });
        content += `\n![Image](./images/${filename})\n\n`;
    }
});
```

### 4. Rate Limiting and Respect

Critical for avoiding blocks and being respectful to Medium's servers:

```javascript
// Add delay between requests
await new Promise(resolve => setTimeout(resolve, 3000));

// Set realistic user agent
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...');
```

## The Final Architecture

The completed solution consists of several key components:

1. **Profile Crawler**: Navigates to the Medium profile and extracts all article URLs
2. **Content Extractor**: Visits each article and extracts title, date, content, and images
3. **Image Downloader**: Downloads all images to a local directory
4. **Markdown Generator**: Converts HTML content to clean Markdown with frontmatter
5. **File Manager**: Organizes everything into a structured directory

## Results and Performance

The final script successfully archived:
- **48 articles** from my Medium profile
- **265 images** with proper local references
- **Complete metadata** including publication dates and original URLs
- **Clean Markdown format** ready for static site generators

## Lessons Learned

### 1. Modern Web Scraping is Complex
Gone are the days of simple HTTP requests. Modern sites require browser automation to handle JavaScript, authentication, and dynamic content.

### 2. Fallback Strategies are Essential
Always implement multiple selectors and extraction methods. Websites change their HTML structure frequently.

### 3. Respect Rate Limits
Being aggressive with requests will get you blocked. Implement delays and realistic user agents.

### 4. Handle Edge Cases
Not every article will have the same structure. Build robust error handling and graceful degradation.

## The Code

The complete archiving solution is available as an npm script:

```bash
npm run archive-medium
```

The script creates a structured archive:

```
temp_archive/
└── medium/
    ├── images/
    │   ├── image1.jpg
    │   └── image2.png
    ├── 2025-02-16_article-title.md
    └── 2024-12-19_another-article.md
```

Each Markdown file includes proper frontmatter:

```yaml
---
title: "Article Title"
date: "2025-02-16"
source: "Medium"
original_url: "https://medium.com/..."
---
```

## Future Improvements

Potential enhancements for the archiving script:

1. **Parallel Processing**: Download multiple articles simultaneously
2. **Incremental Updates**: Only archive new articles since last run
3. **Content Filtering**: Skip articles below a certain length or engagement
4. **Format Options**: Support for different output formats (HTML, PDF, etc.)
5. **Metadata Enhancement**: Extract claps, responses, and reading time

## Conclusion

Building a robust web scraping solution in 2025 requires understanding modern web architecture, implementing proper browser automation, and respecting the target site's resources. While the initial HTTP-based approach failed, Puppeteer provided the necessary tools to handle Medium's complex JavaScript-heavy architecture.

The resulting archive script successfully preserved years of writing with full fidelity, including images and formatting. For anyone looking to backup their Medium content or build similar archiving tools, the key is to start simple, handle edge cases gracefully, and always implement proper rate limiting.

*This archiving script is part of my broader effort to maintain ownership of my content and integrate various writing platforms into a unified personal website. The complete source code and documentation are available in my website's repository.* 