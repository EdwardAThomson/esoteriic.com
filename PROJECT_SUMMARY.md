# Project Summary: esoteriic.com

This document provides a summary of the `esoteriic.com` project structure and build process.

## Project Structure

The project is a static website generated from markdown files. The main directories are:

- `src/`: Contains the source files for the website.
  - `css/`: CSS files for styling.
  - `js/`: JavaScript files for client-side functionality.
  - `images/`: Image assets.
  - `markdown/`: The content for the website, written in Markdown format. Each file represents a page or a blog post.
  - `templates/`: HTML templates (`main.html`, `page.html`) used to structure the final pages.
- `scripts/`: Node.js scripts for building the website.
- `dist/`: The output directory where the generated static website is stored. This directory is served in production.
- `package.json`: Defines project metadata, dependencies, and build scripts.
- `redirects.json`: A mapping of old URLs to new URLs for creating redirects.
- `temp_archive/`: Contains archived content from a previous version of the website.
- `old/`: Contains very old archived content.

## Build Process

The website is built using a set of Node.js scripts located in the `scripts/` directory. The main build process is triggered by running `npm run build`, which executes `scripts/build.js` and then `scripts/build-categories.js`.

### `scripts/build.js`

This is the primary build script. It performs the following actions:

1.  **Initialization**: It sets up paths for source and distribution directories.
2.  **Static Assets**: It copies the contents of `src/css/`, `src/js/`, and `src/images/` to the `dist/` directory.
3.  **Markdown Processing**: 
    - It reads all `.md` files from `src/markdown/`.
    - For each file, it parses the front-matter (metadata like title, date, category) and the Markdown content.
    - It converts the Markdown to HTML using the `marked` library, applying syntax highlighting for code blocks.
    - It generates an HTML page for each Markdown file using the `src/templates/page.html` and `src/templates/main.html` templates.
    - Each page is saved as a separate `index.html` file within a directory named after the original markdown file in `dist/`. For example, `example-post.md` becomes `dist/example-post/index.html`.
4.  **Index Page**:
    - It generates the main `index.html` for the site.
    - It collects all posts, sorts them by date in descending order, and groups them by year.
    - The most recent post is displayed as a "featured post".
    - The remaining posts are listed under their respective years.
5.  **Redirects**: It reads `redirects.json` and generates HTML files that perform meta refreshes to the new URLs, ensuring old links don't break.

### `scripts/build-categories.js`

This script runs after the main build script and is responsible for generating category pages:

1.  **Post Grouping**: It reads the front-matter of all Markdown files and groups the posts by the `category` attribute.
2.  **Category Index Page**: It creates a main index for categories at `dist/categories/index.html`. This page displays a list of all categories and the number of posts in each.
3.  **Individual Category Pages**: For each category, it generates a page that lists all posts belonging to it, sorted by date. These are located at `dist/categories/<category-name>/index.html`.

### Other Scripts

The `scripts/` directory contains other utility scripts for tasks like:
- `dev.js`: Likely used for local development, perhaps with a file watcher.
- Data conversion and migration from older formats (e.g., `convert-steemit-posts.js`, `convert-archive.js`).
- Content maintenance (e.g., `add-categories.js`, `fix-publication-date.js`). 