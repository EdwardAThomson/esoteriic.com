# Medium Blog Archive Scripts

This directory contains scripts to archive your Medium blog posts locally, including images.

## Scripts Available

### 1. `archive-medium-puppeteer.js` (Recommended)
Uses Puppeteer to handle Medium's dynamic content loading. This is the preferred method as it can properly handle JavaScript-rendered content.

**Features:**
- Handles dynamic content loading
- Downloads all images
- Converts content to Markdown format
- Preserves article structure (headings, lists, quotes, etc.)
- Adds frontmatter with metadata

### 2. `archive-medium.js` (Simple)
Basic HTTP scraping without browser automation. May miss some content due to Medium's heavy use of JavaScript.

## Installation

First, install the required dependencies:

```bash
npm install
```

This will install Puppeteer and other dependencies needed for the archiving process.

## Usage

### Run the Enhanced Archiver (Recommended)
```bash
npm run archive-medium
```

### Run the Simple Archiver
```bash
npm run archive-medium-simple
```

## Output

The scripts will create the following directory structure:

```
temp_archive/
└── medium/
    ├── images/
    │   ├── image1.jpg
    │   ├── image2.png
    │   └── ...
    ├── 2025-02-16_new-token-issuance-norms-for-web3.md
    ├── 2025-02-15_the-shifting-spotlight-why-ai-is-outshining.md
    └── ...
```

## Article Format

Each article is saved as a Markdown file with:

1. **Frontmatter** containing metadata:
   ```yaml
   ---
   title: "Article Title"
   date: "2025-02-16"
   source: "Medium"
   original_url: "https://medium.com/..."
   ---
   ```

2. **Content** converted to Markdown format with:
   - Proper heading hierarchy
   - Preserved formatting (bold, italic, links)
   - Embedded images with local references
   - Code blocks and quotes

## Configuration

To archive a different Medium profile, edit the `profileUrl` variable in either script:

```javascript
const profileUrl = 'https://your-username.medium.com/';
```

## Rate Limiting

The scripts include delays between requests to be respectful to Medium's servers:
- Simple archiver: 2 second delay
- Puppeteer archiver: 3 second delay

## Troubleshooting

### Puppeteer Issues
If you encounter issues with Puppeteer on Linux, you may need to install additional dependencies:

```bash
sudo apt-get install -y gconf-service libasound2-dev libatk1.0-dev libc6-dev libcairo2-dev libcups2-dev libdbus-1-dev libexpat1-dev libfontconfig1-dev libgcc1 libgconf-2-4 libgdk-pixbuf2.0-dev libglib2.0-dev libgtk-3-dev libnspr4-dev libpango-1.0-dev libpangocairo-1.0-dev libstdc++6 libx11-dev libx11-xcb-dev libxcb1-dev libxcomposite-dev libxcursor-dev libxdamage-dev libxext-dev libxfixes-dev libxi-dev libxrandr-dev libxrender-dev libxss-dev libxtst-dev ca-certificates fonts-liberation libappindicator1 libnss3-dev lsb-release xdg-utils wget
```

### No Articles Found
If no articles are found, this could be due to:
1. Medium's anti-bot measures
2. Changes in Medium's HTML structure
3. Network connectivity issues

Try running the script again or use the simple archiver as a fallback.

## Converting to Your Blog Format

After archiving, you can:
1. Review the generated Markdown files
2. Edit them to match your blog's format
3. Move them to your main markdown directory
4. Update categories and tags as needed
5. Rebuild your site

## Legal Considerations

- Only archive content you own or have permission to archive
- Respect Medium's Terms of Service
- The scripts include reasonable delays to avoid overwhelming Medium's servers
- Consider reaching out to Medium if you need to archive large amounts of content 