# esoteriic.com Blog

This is the source code for the esoteriic.com blog, a static website built with Node.js. The blog content is migrated from an older WordPress site. I have also added my blogs from Medium.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1.  Clone the repo

    ```sh
    git clone https://github.com/EdwardAThomson/esoteriic.com.git
    ```

2.  Install NPM packages

    ```sh
    npm install
    ```

### Local Development

1.  **Build the website:**

    This command will process the markdown files, generate HTML pages, and copy static assets to the `dist` directory.

    ```sh
    npm run build
    ```

2.  **Serve the website:**

    This will start a local web server to view the website.

    ```sh
    npm start
    ```
    
    You can then access the website at `http://localhost:8080`.

## Build Process

The static site is generated from Markdown files located in `src/markdown/`. The build process is orchestrated by scripts in the `scripts/` directory:

-   `scripts/build.js`: Converts markdown posts into HTML pages, creates the index page, and handles redirects.
-   `scripts/build-categories.js`: Generates category pages based on the front-matter in the markdown files.

The final static site is placed in the `dist/` directory, which is ready to be deployed.

## Content Management

All blog posts and pages are located in `src/markdown/`. To add a new post, create a new `.md` file in this directory with the appropriate front-matter (e.g., `title`, `date`, `category`). 
