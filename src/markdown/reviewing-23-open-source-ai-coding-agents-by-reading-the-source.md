---
title: "Reviewing 23 Open-Source AI Coding Agents by Reading the Source"
date: "2026-08-04"
category: "artificial-intelligence"
description: "We set out to compare 23 open-source AI coding agents to find out which one is better. The honest answer turned out to be a method, not a leaderboard."
---

# Reviewing 23 Open-Source AI Coding Agents by Reading the Source

The question that started this was simple enough to ask over coffee: is one AI coding agent actually better than another, and why? There are dozens of open-source options now, Aider, Cline, Goose, OpenHands, Codex CLI, Gemini CLI, a long tail of smaller ones, and picking between them mostly comes down to marketing copy, a README, and vibes from whoever posted about it last. We wanted an actual answer, grounded in something more solid than vibes.

The instinct most people reach for first is a benchmark: run them all on the same coding tasks, score the output, rank the results. We eventually did build that too (that's a separate post). But before any of that, we did something slower and less exciting: we read the source code. All of it, for 23 projects, at a pinned commit, and wrote down what was actually there. The full set of reviews, comparison tables, and recommendations is open on GitHub: [agent-reviews](https://github.com/EdwardAThomson/agent-reviews).

One honest caveat up front, because it's a little awkward: the tool I actually reach for day to day is Claude Code, and it isn't in this review at all. Not because we rate it low, but because we can't rate it, it's distributed as a bundled package with no source available, so there's nothing to read. Everything below is open-source only, by construction. If you're evaluating agents and a closed-source option like Claude Code, Cursor, or Copilot is on the table, it deserves a place on your shortlist too, you'll just be trusting the vendor's engineering rather than verifying it yourself, which is a different kind of bet than anything in this post.

## Why code before benchmarks

A benchmark score answers "did this agent solve this task." It doesn't tell you why it failed when it did, whether the tool is quietly sending your prompts to a third-party analytics service, or whether the whole project is one person's side project that could go dark next quarter. Those are exactly the questions that matter most before you let something execute shell commands on your machine or your team's, and none of them show up in a leaderboard number.

Caveat: most people quoting a benchmark score never see past the number, but we did also run our own harness comparison, with full logs of every tool call and turn, so for those runs we're not just staring at a pass/fail digit; we can see exactly where and how a solve went wrong. Even with that depth of detail, it still only tells you about behavior at runtime, on the tasks you happened to run. It has nothing to say about licensing terms, who maintains the project, or what a security doc admits and doesn't, which is a separate, complementary kind of insight the source itself has to answer.

So the review runs on evidence, not impressions. Every claim in every review has to point at a specific file, a specific pattern, a specific line of code. Not "the security looks solid" but "the command-policy scanner in `src/policy/command-policy.ts` unwraps quoting, substitution, heredocs, and piping before matching, and SECURITY.md calls this a speed bump, not a boundary." That discipline is the whole point: it's the difference between a review and an opinion piece.

## The three-tier structure

Each of the 23 projects gets assessed the same way, in three tiers that build on each other:

**Tier 1, Identity**, is pure fact, mechanically extractable: repo URL, commit hash, license, language, lines of code, dependency count. No judgment involved; if you disagree with a Tier 1 entry, one of us made an arithmetic mistake.

**Tier 2, Capabilities**, is where you actually have to read the code: architecture (monolith vs. plugin system vs. microservices), how tools get called, how memory and session state persist, what the orchestration loop looks like, what happens at the security boundary, what fires when you clone the repo and open it in your own coding agent (a distinct, and often overlooked, trust surface from the deployed runtime). Findings here are factual statements about what the code does, not evaluations of whether that's good.

**Tier 3, Opinions**, is the only tier where we say what we think, code quality on a 1-5 scale, maturity, maintainability, red flags, a two-to-three sentence summary, and every opinion has to be backed by a specific piece of Tier 2 evidence. You don't get to say a codebase is well-architected without pointing at the module boundary that makes it so.

The fairness rule underneath all three tiers: a solo developer's weekend project and a five-person team's production system get assessed against different reasonable expectations for their stage, not the same bar. And every review is pinned to an exact commit, because these projects move fast and a review is a snapshot, not a permanent verdict.

## What this method actually surfaces

Read enough of these back to back and patterns emerge that a benchmark run would never show you.

**Licensing traps that read fine until you check.** AutoGPT's platform code carries a PolyForm Shield license, a non-compete restriction that quietly rules it out for anyone building a competing product, something you'd never notice from a GitHub star count. CLIO is GPL-3.0, which is a real constraint for corporate adoption that Apache-2.0 or MIT projects don't carry.

**Vendor lock-in that's deeper than the marketing.** Codex CLI and Gemini CLI both brand themselves as open and flexible, but reading the actual client code shows real, structural single-vendor coupling, a `WireApi` enum with only one variant in Codex's case, a Gemini client baked into the core abstractions in Gemini CLI's. Meanwhile Cline (46 providers), Goose (25+), and NullClaw (95+, at compile time) are genuinely provider-agnostic because you can see the abstraction layer doing real work in the source.

**Sustainability risk you can only see by counting.** GBrain was five days old at the time we reviewed it, real architectural thought behind it already, but a single contributor, bus factor of one, a fact pinned to that snapshot rather than a permanent verdict on the project. Plandex hasn't had a commit since October 2025 and its hosted service shut down. That's not a knock on either project; it's information a benchmark score simply has no slot for.

**Security postures that are candid rather than reassuring, when you check them against the code.** QM's SECURITY.md states plainly that its command-policy scanner is "a speed bump," not a boundary, and that egress enforcement is off by default on both its sandbox backends, and both of those claims check out against the actual source. That kind of documented honesty is more useful, and rarer, than a security page that just says "we take security seriously."

None of this is visible if the only thing you measure is whether the agent solved the coding task.

## The actual conclusion: there isn't a winner

Here's the part that surprised us least by the end, even though it wasn't the answer we set out looking for: there is no best agent. METHODOLOGY.md states this as a stated principle, not a hedge: no rankings, because different agents make different tradeoffs for different users, and it held up as a real finding, not a diplomatic dodge.

Aider is the right call for a developer who lives in the terminal and wants git-native, zero-infrastructure assistance. Cline is the right call inside VS Code, with 46 providers and human-in-the-loop approval as the default safety model. Codex CLI and Gemini CLI have the most serious sandboxing of anything we reviewed, Landlock, seccomp, and bubblewrap on Linux for Codex, platform-native isolation for Gemini, and that matters enormously for an enterprise and not at all for a solo hobbyist running everything locally with `git reset` as their safety net. OpenHands is the most complete platform if you want Docker/Kubernetes-backed sandboxing and a real enterprise deployment story, and total overkill if you just want a coding assistant on your own laptop. Goose has the most sophisticated multi-layer security pipeline of anything we looked at, and ships with that pipeline disabled by default, which is its own small lesson about the gap between what a system can do and what it does out of the box.

"Which agent is better" turned out to be the wrong first question. The right first question is "better at what, for whom, running under what constraints," and once you ask it that way, a leaderboard number was never going to answer it. That's what a three-tier, evidence-based reading of the actual source gets you that a benchmark can't: not a winner, but a map of real tradeoffs, with the receipts attached.

## What this method can't tell you

It's worth being just as honest about the limit. Reading source code tells you what an agent is built to do, how it's architected, what it claims about its own security, how candid its maintainers are about its weaknesses. It does not tell you how well the thing actually performs when you point it at a real bug, whether the harness gets in its own way, or whether a security posture that reads well on paper holds up under an adversarial task. For that you have to stop reading and start running the thing, on identical tasks, with the model held constant, and see what actually happens. That's the other project running alongside this one, and it's next up.

None of this reading was purely academic, either. I'm building a coding-agent harness of my own, and 23 other people's architecture decisions, the ones that held up under scrutiny and the ones that didn't, are exactly the design notes you want before writing your own. Seeing the same interface-first pattern pay off across several unrelated codebases, or the same "verified by inspection, not by running it" habit cause the same kind of failure in more than one review, is a much better starting point than a blank file.

*All 23 reviews, the comparison tables, and the recommendations guide are open on GitHub: [agent-reviews](https://github.com/EdwardAThomson/agent-reviews).*
