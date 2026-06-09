# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A custom Node.js static-site generator for the esoteriic.com blog (250+ posts migrated from WordPress, Medium, and Steemit). There is **no framework** — the "engine" is a set of hand-written scripts in `scripts/` that read markdown from `src/`, render HTML with `marked` + `cheerio`, and write a complete static site to `dist/`. The site deploys to GitHub Pages via `.github/workflows/`.

## Commands

```sh
npm run build              # Full build: scripts/build.js + scripts/build-categories.js
npm run build:incremental  # Hash-based incremental build (used by CI), then category pages
npm start                  # Serve dist/ at http://localhost:8080 (build first)
```

There is no test suite, linter, or watch/dev server — for local preview use `npm run build && npm start`.

Pass `--force` to the incremental build (`node scripts/build-incremental.js --force`) to bypass the cache and rebuild everything.

CI (`.github/workflows/`) runs `build:incremental` on push to `main`, falls back to full `build` on failure, and deploys `dist/` to Pages. It caches `.build-cache.json` keyed on the hashes of `src/templates/**`, `src/markdown/**`, and `scripts/**`.

## Content model

Posts are markdown files in `src/markdown/`. The **filename becomes the URL slug** — `example-post.md` → `dist/example-post/index.html` → `/example-post/`. Front-matter is parsed with `front-matter`:

```yaml
---
date: "Mon Oct 01 2012 17:30:00 GMT+0100 (British Summer Time)"  # JS Date string
title: "Hedging 101"
description: ""
category: "investing"   # drives category pages; one category per post
---
```

The homepage sorts all posts by `date` descending, shows the newest as a "featured post", and groups the rest by year. Category pages are generated from the `category` field.

## Build pipeline (the big picture)

`scripts/build.js` is the primary builder. In order it: copies `src/css`, `src/js`, `src/images` into `dist/`; renders each markdown file through `marked` (with `marked-highlight`/highlight.js for code, `marked-gfm-heading-id` for anchor IDs, `marked-mangle`) into the `src/templates/page.html` → `src/templates/main.html` template chain; builds the homepage; and emits redirect stubs (meta-refresh HTML) for every entry in `redirects.json` so legacy WordPress URLs still resolve.

`scripts/build-categories.js` runs **after** build.js and reads front-matter again to produce `dist/categories/index.html` plus per-category archive pages at `dist/categories/<category>/index.html`.

`scripts/build-incremental.js` is a near-duplicate of build.js that only re-renders changed files. For each markdown file it stores an `mtime` + MD5 content hash in `.build-cache.json`; `needsRebuild()` skips any file whose mtime and hash both match the cache (pulling its post metadata from the cache instead of re-rendering). Two important escape hatches: if either template (`main.html`/`page.html`) changes, `templatesChanged()` forces a **full** rebuild of every page; and `--force` bypasses the cache entirely. Note the cache is keyed on markdown/template content only — it does **not** detect edits to the build scripts themselves, so after changing rendering logic run `npm run build` or `build-incremental --force`.

**When you change rendering logic, the anonymity series config, or templates, you usually need to edit BOTH `build.js` and `build-incremental.js`** — they share large blocks of copy-pasted code (e.g. the `anonymitySeries` array and sidebar generation) and will diverge silently otherwise.

### Anonymity series special-casing
A hardcoded `anonymitySeries` array (in both build scripts) gives a fixed set of posts a multi-chapter layout with a floating sidebar nav. Adding/reordering chapters means editing that array in both files.

## Templates & assets

- `src/templates/main.html` — outer shell (head, nav, dark-mode toggle, footer).
- `src/templates/page.html` — per-post body; injected into main.html.
- `src/js/` and `src/css/` are copied verbatim to `dist/` — client-side features (TOC scroll-spy, dark mode, mobile menu, code-copy buttons, lazy images) live here, not in the build scripts.

## Migration / maintenance scripts

Most files in `scripts/` are **one-off importers and content fixers**, not part of the regular build: `archive-medium-*.js`, `convert-*.js` (medium/steemit/wayback/archive), `fetch-*.js`, `add-*.js`, `fix-*.js`, `check-broken-images.js`, `cleanup-unused-images.js`. They mutate `src/markdown/` in place and pull from `temp_archive/` and `old/` (both git-ignored, local-only). Don't run them as part of normal development.

## Conventions

- `dist/` and `.build-cache.json` are git-ignored build outputs — never edit by hand; edit `src/` and rebuild.
- New legacy redirects go in `redirects.json` as `"/old/path": { "newUrl": "/slug/", "title": "..." }`.
- `temp_archive/` and `old/` are intentionally local-only (gitignored) source material for the migration scripts.
