const fs = require('fs-extra');
const path = require('path');
const frontMatter = require('front-matter');

const distDir = path.join(__dirname, '../dist');
const srcDir = path.join(__dirname, '../src');
const markdownDir = path.join(srcDir, 'markdown');
const templatesDir = path.join(srcDir, 'templates');

// Function to format category names for display
function formatCategoryName(category) {
    // Handle special cases
    if (category === 'book-reviews-non-fiction') {
        return 'Book Reviews (Non-Fiction)';
    }
    if (category === 'book-reviews-fiction') {
        return 'Book Reviews (Fiction)';
    }
    if (category === 'blockchain-and-cryptocurrency') {
        return 'Blockchain and Cryptocurrency';
    }
    if (category === 'creative-writing') {
        return 'Creative Writing';
    }
    if (category === 'writing-craft') {
        return 'Writing Craft';
    }
    
    // Default formatting: replace hyphens with spaces and capitalize
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

async function buildCategories() {
    console.log('Building category pages...');

    const mainTemplate = await fs.readFile(path.join(templatesDir, 'main.html'), 'utf8');
    const pageTemplate = await fs.readFile(path.join(templatesDir, 'page.html'), 'utf8');
    const markdownFiles = await fs.readdir(markdownDir);

    const posts = [];
    for (const mdFile of markdownFiles) {
        if (!mdFile.endsWith('.md') || mdFile === 'index.md') continue;
        const mdContent = await fs.readFile(path.join(markdownDir, mdFile), 'utf8');
        const { attributes } = frontMatter(mdContent);
        posts.push({
            ...attributes,
            slug: mdFile.replace('.md', '')
        });
    }

    const categories = posts.reduce((acc, post) => {
        const { category } = post;
        if (category) {
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(post);
        }
        return acc;
    }, {});

    const categoriesDir = path.join(distDir, 'categories');
    await fs.ensureDir(categoriesDir);

    const sortedCategories = Object.keys(categories).sort();

    const categoryGridHtml = sortedCategories.map(category => `
        <a href="/categories/${category}/" class="category-card">
            <h3 class="category-card-title">${formatCategoryName(category)}</h3>
            <p class="category-card-count">${categories[category].length} posts</p>
        </a>
    `).join('');

    const categoryIndexContent = pageTemplate
        .replace('{{title}}', 'Categories')
        .replace('{{content}}', `<div class="category-grid">${categoryGridHtml}</div>`)
        .replace('{{date}}', '')
        .replace('{{category_link}}', '');

    const categoryIndexPage = mainTemplate
        .replace('{{title}}', 'Categories')
        .replace('{{description}}', 'A list of post categories.')
        .replace('{{page_content}}', categoryIndexContent);

    await fs.writeFile(path.join(categoriesDir, 'index.html'), categoryIndexPage);

    for (const category of sortedCategories) {
        const categoryDir = path.join(categoriesDir, category);
        await fs.ensureDir(categoryDir);
        const categoryPosts = categories[category].sort((a, b) => new Date(b.date) - new Date(a.date));

        const postsHtml = categoryPosts.map(post => `
            <article>
                <h2><a href="/${post.slug}/">${post.title}</a></h2>
                <p class="date">${new Date(post.date).toDateString()}</p>
            </article>
        `).join('');

        const pageHtml = pageTemplate
            .replace('{{title}}', `Category: ${formatCategoryName(category)}`)
            .replace('{{content}}', postsHtml)
            .replace('{{date}}', '')
            .replace('{{category_link}}', '');

        const fullHtml = mainTemplate
            .replace('{{title}}', `Category: ${formatCategoryName(category)}`)
            .replace('{{description}}', `Posts in the category ${formatCategoryName(category)}`)
            .replace('{{page_content}}', pageHtml);

        await fs.writeFile(path.join(categoryDir, 'index.html'), fullHtml);
    }

    console.log('Category pages built successfully!');
}

buildCategories().catch(console.error); 