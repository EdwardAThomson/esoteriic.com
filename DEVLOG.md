# Dev Log

## 2026-06-24

Homepage post cards gained a meta row showing a linked, colour-coded category badge plus the first few tags, on both the regular cards and the featured/hero card. Category colours are stable: the ten most common categories are pinned to deliberately spaced hues in a `CATEGORY_HUES` map so the most-seen pills never collide, and anything else falls back to a hash of the slug, each rendered as a two-tone gradient. As part of the same change, some previously uncategorised posts were fixed up: the two July 2025 posts had their category stuck in an ignored plural `categories:` field, and the 2016 anonymity series had no category at all. A small follow-up dropped the italics from the Dragon Palm post's intro line.

**Decisions & notes:** The card markup lives in both `build.js` and `build-incremental.js` (they share copy-pasted blocks), so both were updated together per the repo convention, and the incremental cache now also stores each post's category and tags.

## 2026-06-23

Two new blog posts were added to the site. The first, "every-llm-has-a-favourite-name", is a 2026 follow-up to last year's LLM creative-writing study, presenting an LLM naming benchmark and linking back to the original post. The second, "eleven-opcodes-and-a-pocket-dragon", walks through building a game for the Dragon Palm fantasy console, a minimal 11-opcode 8-bit machine. Both are pure content additions under `src/markdown/`, picked up automatically by the static-site build with no engine or template changes.
