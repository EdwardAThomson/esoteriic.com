# Dev Log

## 2026-07-07

A new post, "Mode-7 on a Homemade 16-Bit Console", was published under `src/markdown/`. It's a technical write-up of adding the affine (Mode-7) rotating-ground-plane layer to CastlePalm, the author's fantasy 16-bit console: exposing the PPU's existing per-scanline affine capability on the memory-mapped I/O bus via three new registers plus a DMA "affine table" destination, then discovering the honest rotating-plane model needed real multiplication, which drove adding MULU/MULS/DIVU/DIVS to the CPU and rebuilding the Galechase wind-skiff racer on top. Being a pure content addition, the static-site build picks it up with no engine or template changes. The commit also gitignored a new local-only `drafts/` directory for unpublished posts, which sits outside the build path; publishing is a matter of moving a draft into `src/markdown/` and rebuilding.

**Decisions & notes:** The post is a follow-up to the earlier Dragon Palm piece and continues the fantasy-console thread on the blog.

## 2026-06-24

Homepage post cards gained a meta row showing a linked, colour-coded category badge plus the first few tags, on both the regular cards and the featured/hero card. Category colours are stable: the ten most common categories are pinned to deliberately spaced hues in a `CATEGORY_HUES` map so the most-seen pills never collide, and anything else falls back to a hash of the slug, each rendered as a two-tone gradient. As part of the same change, some previously uncategorised posts were fixed up: the two July 2025 posts had their category stuck in an ignored plural `categories:` field, and the 2016 anonymity series had no category at all. A small follow-up dropped the italics from the Dragon Palm post's intro line.

**Decisions & notes:** The card markup lives in both `build.js` and `build-incremental.js` (they share copy-pasted blocks), so both were updated together per the repo convention, and the incremental cache now also stores each post's category and tags.

## 2026-06-23

Two new blog posts were added to the site. The first, "every-llm-has-a-favourite-name", is a 2026 follow-up to last year's LLM creative-writing study, presenting an LLM naming benchmark and linking back to the original post. The second, "eleven-opcodes-and-a-pocket-dragon", walks through building a game for the Dragon Palm fantasy console, a minimal 11-opcode 8-bit machine. Both are pure content additions under `src/markdown/`, picked up automatically by the static-site build with no engine or template changes.
