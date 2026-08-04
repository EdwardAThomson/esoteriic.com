# Dev Log

## 2026-08-03

Published "How Do You Actually Score Narrative Dynamics?", a write-up of the third benchmark (`nd1`) added to the LLM Creative Writing Analyzer, covering tension trajectory, block rhythm, and thread architecture across a story's full length rather than surface word-level stats. The post's focus is the scaffolding needed to make an LLM-judged score trustworthy: a single quarantined `ctx["judge"]` seam with deterministic, unit-tested aggregation on either side; an anchored rubric (ported verbatim from another project, StoryDaemon, with a provenance header and an explicit "not yet re-verified in this harness" caveat) so the model can't invent its own scale; and an empirical reference band built by scoring 26 canonical public-domain novels, which showed tension cleanly separating by genre and peak position anti-correlating with overall tension (r = -0.64). As a pure content addition under `src/markdown/`, the build picks it up with no engine or template changes.

**Decisions & notes:** The post is explicit that a ported reliability figure (agreement/MAD measured in a different harness) does not transfer automatically, and treats "reliability re-verification in this harness" as an open roadmap item rather than glossing over it. Continues the blog's cadence of writing up work from the author's other projects.

## 2026-07-28

Published "Private VRF Loot Revisited: Hardening the Idea Nobody Else Built", a follow-up to the September 2024 post on player-held VRF loot. The post recounts auditing the two-year-old proof of concept before reusing it in a real game: a prior-art search suggesting nobody else ships private-until-reveal loot from a player-held VRF key (the nearest relative being Algorand's sortition), then three implementation cracks found in the audit (a verifier that never bound proof to output, ambiguous delimiter-based VRF messages, and a crypto test suite that had never actually executed). It then covers the rebuild on RFC 9381's ECVRF over noble-curves, validated byte-exact against the RFC test vectors, and the new sealed-loot lifecycle: a publishable commitment manifest at generation time with selective per-item reveals, plus a dungeon generator hanging the public layout and private loot off the same transaction hash. As a pure content addition under `src/markdown/`, the build picks it up with no engine or template changes.

**Decisions & notes:** The post records the choice of per-item VRF calls over one master-output-plus-HKDF call: cheaper is worse here because revealing any item would unseal the whole dungeon. It also flags the next problem (a seed the player cannot grind before broadcasting) as a future post, continuing the blog's thread of writing up work from the author's other projects.

## 2026-07-22

Published "Testing a multiplayer on-chain game with competing AI agents", a long write-up of the adversarial self-play harness built for the xaya-roguelike project. The post tells the story of turning integration testing into competition: a single Playwright-driven heuristic agent (with BFS dungeon navigation) grew into a shared `agentcore.mjs` policy, a `multi.mjs` runner that races N agents in one on-chain world, and a referee loop asserting cross-player invariants (coordinate uniqueness, HP ranges, no players on nonexistent segments) against global GSP state. It also covers `compete.mjs`, which scripts the exact contested cases (coordinate races, provisional-access rules, reward isolation) with hard pass/fail assertions, and the "confirmed-segment free-transit" design fix the harness forced. A quick follow-up commit credited the Xaya GSP framework in the intro and added a closing note linking both source repos (xaya-roguelike and xaya-roguelike-frontend). As a pure content addition under `src/markdown/`, the build picks it up with no engine or template changes.

**Decisions & notes:** The post's central lesson is that the hard part of multiplayer test harnesses is distinguishing genuine anomalies from legitimate competitive feedback (rejection is the feature), and that scripted assertions, not passive soaking, are what turn agent chaos into an actual test. Continues the blog's cadence of writing up work from the author's other projects.

## 2026-07-13

Fixed a stale LinkedIn profile URL that appeared in two places: the "connect professionally" link in `src/markdown/about.md` and the LinkedIn icon in the site-wide footer in `src/templates/main.html`. The old vanity slug (`edward-thomson-080ba519`) was updated to the current one (`edward-thomson-phd-msc-080ba519`) so both links resolve to the live profile. Because the footer lives in the outer template, this is one of the changes that touches every rendered page on the next build.

## 2026-07-09

Published "When Not to Call the LLM: Instant Narration for DungeonGPT", a write-up of the tiered-narration work in the DungeonGPT-JS project. The post explains why routing every world-map move through the LLM was a triple loss (API cost, spinner latency, and silence for logged-out guests who are gated off the AI path), and how routine movement narration was moved into a local, deterministic `localNarrator.js` module: per-terrain template pools for arrival, revisit, and ambient lines, with all choices seeded from an FNV-1a hash of the world seed plus tile coordinates fed into mulberry32, so a reloaded save always reproduces the same log text. The LLM is reserved for the beats that actually deserve prose. As a pure addition under `src/markdown/`, the static-site build picks it up with no engine or template changes.

**Decisions & notes:** The post is candid that the shipped design was simpler than the plan originally written for it, and that the pattern generalises DungeonGPT's existing fully-local combat narration. Continues the blog's recent cadence of writing up work from the author's other projects.

## 2026-07-07

A new post, "Mode-7 on a Homemade 16-Bit Console", was published under `src/markdown/`. It's a technical write-up of adding the affine (Mode-7) rotating-ground-plane layer to CastlePalm, the author's fantasy 16-bit console: exposing the PPU's existing per-scanline affine capability on the memory-mapped I/O bus via three new registers plus a DMA "affine table" destination, then discovering the honest rotating-plane model needed real multiplication, which drove adding MULU/MULS/DIVU/DIVS to the CPU and rebuilding the Galechase wind-skiff racer on top. Being a pure content addition, the static-site build picks it up with no engine or template changes. The commit also gitignored a new local-only `drafts/` directory for unpublished posts, which sits outside the build path; publishing is a matter of moving a draft into `src/markdown/` and rebuilding.

**Decisions & notes:** The post is a follow-up to the earlier Dragon Palm piece and continues the fantasy-console thread on the blog.

## 2026-06-24

Homepage post cards gained a meta row showing a linked, colour-coded category badge plus the first few tags, on both the regular cards and the featured/hero card. Category colours are stable: the ten most common categories are pinned to deliberately spaced hues in a `CATEGORY_HUES` map so the most-seen pills never collide, and anything else falls back to a hash of the slug, each rendered as a two-tone gradient. As part of the same change, some previously uncategorised posts were fixed up: the two July 2025 posts had their category stuck in an ignored plural `categories:` field, and the 2016 anonymity series had no category at all. A small follow-up dropped the italics from the Dragon Palm post's intro line.

**Decisions & notes:** The card markup lives in both `build.js` and `build-incremental.js` (they share copy-pasted blocks), so both were updated together per the repo convention, and the incremental cache now also stores each post's category and tags.

## 2026-06-23

Two new blog posts were added to the site. The first, "every-llm-has-a-favourite-name", is a 2026 follow-up to last year's LLM creative-writing study, presenting an LLM naming benchmark and linking back to the original post. The second, "eleven-opcodes-and-a-pocket-dragon", walks through building a game for the Dragon Palm fantasy console, a minimal 11-opcode 8-bit machine. Both are pure content additions under `src/markdown/`, picked up automatically by the static-site build with no engine or template changes.
