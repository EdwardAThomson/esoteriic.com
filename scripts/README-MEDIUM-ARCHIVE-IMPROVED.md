# Improved Medium Blog Archive Process

This directory contains an improved workflow for archiving Medium blog posts that addresses formatting issues by separating raw data collection from content processing.

## The Problem with Previous Approach

The original scripts (`archive-medium.js`, `archive-medium-puppeteer.js`, `archive-medium-improved.js`) tried to parse Medium's complex HTML structure and convert it to markdown immediately. This caused issues:

- Missing sub-headers and formatting
- Incomplete content extraction
- Difficulty debugging parsing problems
- No way to reprocess if parsing failed

## The New Two-Step Solution

### Step 1: Save Raw HTML Files
**Script:** `archive-medium-raw.js`
- Saves complete HTML files from Medium
- Stores metadata as JSON
- Downloads all images
- No content parsing/conversion (preserves everything)

### Step 2: Process HTML to Markdown
**Script:** `process-medium-html.js`
- Processes the saved HTML files
- Uses Cheerio and TurndownService for better parsing
- Applies custom rules for Medium-specific elements
- Can be run multiple times with different settings
- Easier to debug and fix formatting issues

### Step 3: Convert to Blog Format
**Script:** `convert-medium-blogs.js` (updated)
- Automatically detects if processed files exist
- Converts to your blog's frontmatter format
- Copies images to main site directory
- Generates categories and tags

## Usage

### 1. Archive Raw HTML (Run Once)
```bash
npm run archive-medium-raw
```

This will:
- Fetch all your Medium articles
- Save complete HTML files to `temp_archive/medium_raw/`
- Download all images to `temp_archive/medium_raw/images/`
- Create metadata JSON files

**Output structure:**
```
temp_archive/medium_raw/
├── images/
│   ├── 1751501525530_0.jpg
│   └── ...
├── 2024-12-19_the-future-of-real-time-decentralized-gaming.json
├── 2024-12-19_the-future-of-real-time-decentralized-gaming_full.html
├── 2024-12-19_the-future-of-real-time-decentralized-gaming_article.html
└── ...
```

### 2. Process HTML to Markdown
```bash
npm run process-medium-html
```

This will:
- Read the raw HTML files
- Convert to clean markdown format
- Apply Medium-specific formatting fixes
- Save processed files to `temp_archive/medium_processed/`

**Output structure:**
```
temp_archive/medium_processed/
├── images/
│   ├── 1751501525530_0.jpg
│   └── ...
├── 2024-12-19_the-future-of-real-time-decentralized-gaming.md
├── 2024-12-19_the-future-of-real-time-decentralized-gaming_metadata.json
└── ...
```

### 3. Convert to Blog Format
```bash
npm run convert-medium
```

This will:
- Use processed files if available (preferred)
- Fall back to original medium files if processed don't exist
- Convert to your blog's frontmatter format
- Copy to `src/markdown/` and `src/images/`
- Generate proper categories and tags

## Benefits of This Approach

### 🔍 **Debugging Friendly**
- Raw HTML files let you inspect the original structure
- Can test different parsing approaches
- Easy to identify what's missing or broken

### 🔄 **Reprocessable**
- Raw files saved once, can process many times
- Experiment with different markdown conversion settings
- Update parsing logic without re-fetching from Medium

### 📦 **Backup Protection**
- Complete HTML backup of your Medium posts
- Never lose content due to Medium changes
- Can recover even if processing fails

### 🎯 **Better Quality**
- More sophisticated HTML parsing with Cheerio
- Custom rules for Medium-specific elements
- Better handling of headings, images, and formatting

## Troubleshooting

### Missing Headers or Formatting
1. Check the raw HTML files in `temp_archive/medium_raw/`
2. Look at the `_article.html` files to see the structure
3. Modify the parsing logic in `process-medium-html.js`
4. Re-run `npm run process-medium-html`

### Images Not Loading
- Images are downloaded to `temp_archive/medium_raw/images/`
- Processing copies them to `temp_archive/medium_processed/images/`
- Conversion copies them to `src/images/`
- Check each step if images are missing

### Parsing Errors
- Review the HTML structure in raw files
- Update the content selectors in `process-medium-html.js`
- Test changes by re-running the processing step

## Advanced Usage

### Custom Processing Rules
Edit `process-medium-html.js` to add custom TurndownService rules:

```javascript
turndownService.addRule('customRule', {
    filter: 'element-selector',
    replacement: function(content) {
        return `custom replacement for ${content}`;
    }
});
```

### Different Parsing Strategies
Modify the content selectors array to try different approaches:

```javascript
const contentSelectors = [
    'article',
    '[data-testid="storyContent"]',
    'main',
    '.postArticle-content',
    '.section-content',
    // Add your own selectors here
];
```

### Metadata Enhancement
The processed files include enhanced metadata that can be used for:
- Better categorization
- Tag generation
- SEO optimization
- Content analysis

## Migration from Old Method

If you already have Medium posts from the old method:
1. Keep your existing files as backup
2. Run the new raw archiving process
3. Process the new raw files
4. Compare output quality
5. Replace old files with new processed ones

## File Types Explained

- `*_full.html`: Complete HTML page from Medium
- `*_article.html`: Just the article content section
- `*.json`: Metadata (title, date, URL, images)
- `*.md`: Processed markdown files
- `*_metadata.json`: Enhanced metadata with categories/tags

This improved workflow gives you much better control over the Medium archiving process and ensures you won't lose content due to parsing issues. 