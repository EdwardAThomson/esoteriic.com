---
title: "How Do You Actually Score Narrative Dynamics?"
date: "2026-08-03"
category: "artificial-intelligence"
description: "Turning the fuzzy question of whether a story behaves like a story into numbers you can trust, using an anchored LLM rubric, deterministic aggregation, and a reference band built from 26 canonical novels."
---

# How Do You Actually Score Narrative Dynamics?

I have a tool, the [LLM Creative Writing Analyzer](https://github.com/EdwardAThomson/LLM-Creative-Writing-Analyzer), that measures the creative writing of LLMs. I first wrote about this tool back in [April 2025](/analyzing-llm-creative-writing-patterns-and-limitations/). The first version of the tool was quite simple: run the same prompt ten times, then measure how much the models repeat themselves. Lexical diversity, cliché density, how often a model reaches for the same character name (the "Elara phenomenon", if you have followed the project). All of that is real, and all of it is computable with no model in the loop. Count words, compare strings, done.

Ultimately, the point of the tool was for me to better understand the strengths and weaknesses of LLM-generated text and therefore to help steer my decisions in the apps I've been building. Primarily, I have 2 fiction-generating apps: [NovelWriter](https://github.com/EdwardAThomson/NovelWriter), a GUI app that plans, outlines, and writes whole novels with an agentic multi-model pipeline, and [StoryDaemon](https://github.com/EdwardAThomson/StoryDaemon), a more recent successor that generates long-form fiction through an autonomous agent, favouring emergent structure over pre-planning.

But none of it can see the thing readers actually care about. A word-frequency count cannot tell you whether a story's tension rises and falls like a real narrative, whether the prose breathes between action and dialogue and interiority, or whether a cast of characters runs parallel plotlines that converge the way novels do. Those are the *dynamics* of a story, its long-range shape, and they are structurally invisible to anything that only looks at the surface.

So: how do you actually put a number on that? This is the story of the third benchmark I added to the analyzer, the one I have been calling **narrative dynamics** (`nd1`), and the discipline it took to make its numbers mean anything.

## The naive answer, and why it isn't enough

The obvious move is to ask an LLM. "Here is a chapter, rate its dramatic tension from 0 to 10." Modern models will happily give you a number, and the number will even feel plausible.

The trouble is that a bare number from a bare prompt is close to useless. Ask twice and you get two different answers. Ask about two different books and you have no idea whether the model is using the same internal scale for both. And even if it were perfectly consistent, a "7" tells you nothing until you know what a 7 *is* and what range good writing occupies. An uncalibrated judge producing uncalibrated numbers is just a confident-sounding guess.

Making narrative dynamics scorable, it turns out, is much less about the clever prompt and much more about the scaffolding you build around it.

## Three metrics, one judge seam

The benchmark measures three things, each its own module:

- **`tension_trajectory`**: every segmentation unit (a chapter, or a roughly 1500-word window for texts without headings) is scored 0 to 10 for dramatic tension. From the per-unit series I derive the aggregates that actually describe *shape*: mean register, volatility (mean absolute change between adjacent units), the decile spread, where the single peak sits, and how the ending behaves (does it wind down to calm, or hold high to the last page?).
- **`block_rhythm`**: every paragraph is labelled with one of seven block types (setting, character description, lore, dialogue, action, interiority, transition). From that I get the prose's rhythm: how long it stays in one mode, how often it switches, whether it leans on narration or dialogue.
- **`thread_architecture`**: an LLM extracts each unit's point of view, principal cast, and a one-line strand summary, and then deterministic clustering rules stitch those into plot threads, tracking how they run, hand off, and converge.

The architectural rule that holds the whole thing together is this: **the LLM touches exactly one seam, and everything after it is deterministic, pure, and tested.** Every model call goes through a single `ctx["judge"]` interface. The judge returns raw scores and labels; from there, all the aggregation (the volatility maths, the thread clustering, the transition matrices) is ordinary Python with direct unit tests and no randomness. In testing, the judge is swapped for a `FakeJudge`; a `--dry-run` mode uses a placeholder judge and spends zero tokens. The judgment is the only fuzzy step, and it is quarantined.

## The part that makes the number trustworthy: the anchored rubric

A "rate it 0 to 10" prompt invites the model to invent its own scale. So the tension metric does not ask that. It hands the judge an **anchored rubric**, defining every band:

- 0 to 1, *none*: calm, safe, no stakes or conflict.
- 4 to 5, *rising*: complications or open questions, outcome uncertain.
- 8 to 9, *very high*: imminent threat, violence, or a critical irreversible decision happening now.
- 10, *peak climax*: a story-defining, life-or-death moment at its breaking point.

The prompt also tells the judge to rate *stakes and threat and uncertainty*, not the presence of dramatic-sounding words, and to score the unit as a whole. That distinction matters: a calm chapter full of the word "danger" should still score low.

Crucially, this rubric is not something I made up on the spot. It is a **versioned artifact ported verbatim** from another project of mine (StoryDaemon), copied in with a `PROVENANCE` header that records the exact source commit, the prompt framing, and, most importantly, the reliability numbers as measured *there*: on a 20-chapter re-pass of masters, the judge agreed with itself within one point 100% of the time, exactly 85% of the time, with a mean absolute deviation of 0.15.

## An important caveat

Here is the bit I am most careful about, because it is exactly the kind of thing benchmarks quietly get wrong. Those reliability numbers were measured in a *different harness*, with a specific judge model, prompt batching, and corpus. **They do not transfer to my tool automatically.** A different judge, a different framing, a different set of texts, and the agreement could be worse.

So every result JSON the benchmark writes carries the provenance block *and* a re-verification caveat, and the roadmap lists "reliability re-verification in THIS harness" as an explicit, unchecked box: a double-pass agreement check, shuffled order and a different temperature, on a stratified sample, before any finding is trusted. Copying a rubric buys you a good starting point, not a free pass. Saying so in the output is the honest way to ship it.

## A number is meaningless without a yardstick

Even a perfectly reliable "mean tension 5.2" tells you nothing on its own. Is that high? Low? Normal? You cannot know until you know what real, acknowledged-good prose scores.

So I built the yardstick empirically. I scored a corpus of **26 canonical, public-domain novels** (Austen, Dickens, Conrad, Stoker, Tolstoy, Wells, and more) on the same benchmark, to establish the *reference band*: the range of values that skilled published fiction actually occupies. The full narrative-dynamics run was not cheap (roughly 6,000 judge calls, with the five largest books needing a dedicated checkpointed pass), but the payoff is that an LLM's output can now be measured against real literature instead of against my intuition about what "good" should look like.

## What fell out of it

Two findings convinced me the tension metric is reading signal, not noise.

First, **tension separates by genre, cleanly.** Mean tension across the 26 books spans 2.96 to 7.00, and the ordering is defensible top to bottom: the three Austen domestic novels sit at the bottom, the adventure and peril books at the top. The judge was never told what kind of book it was reading. It recovered the genre structure from the prose alone.

Second, **peak position anti-correlates with tension (r = -0.64).** Books that run hot place their single most dramatic chapter early and sustain the heat; books that run calm withhold their climax until near the end. That is a real structural regularity, now quantified, and it means the two numbers have to be read together: a generated story should be compared against the *pattern*, not against either figure in isolation.

And, because honesty is the whole point, the parts that are messier: the block-rhythm gauges have masters sitting outside the envelope I inherited from the source study, so I treat that envelope as calibration context, not a pass/fail line. Single-point-of-view books with a rotating supporting cast can fragment into phantom threads, so every result reports its sensitivity to the clustering threshold. "Out of range" is a flag for attention, never a verdict.

## What "scoring narrative dynamics" actually means

If there is one thing I took from building this, it is that the number was never the hard part. Any model will emit a number. The hard part, and the whole job, is everything around it: an anchored rubric so the scale is fixed rather than invented, a single quarantined judge seam so the fuzzy step cannot leak into the maths, provenance and a loud re-verification caveat so nobody mistakes a ported reliability figure for a local guarantee, and an empirical reference band so the score has something real to be measured against.

You do not score narrative dynamics by finding the perfect prompt. You score it by building the scaffolding that turns a confident guess into a measurement you are willing to defend.

## Links

- [LLM Creative Writing Analyzer](https://github.com/EdwardAThomson/LLM-Creative-Writing-Analyzer) — the tool this post is about
- [NovelWriter](https://github.com/EdwardAThomson/NovelWriter) — GUI app that plans, outlines, and writes whole novels
- [StoryDaemon](https://github.com/EdwardAThomson/StoryDaemon) — autonomous agent for emergent long-form fiction
- [Analyzing LLM Creative Writing: Patterns and Limitations](/analyzing-llm-creative-writing-patterns-and-limitations/) — the original April 2025 post
