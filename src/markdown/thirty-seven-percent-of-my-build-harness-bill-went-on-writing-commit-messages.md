---
title: "Thirty-Seven Percent of My Build Harness's Bill Went on Writing Commit Messages"
date: "2026-08-07"
category: "artificial-intelligence"
description: "A cost breakdown of my autonomous build harness Plimsoll turned up a step that writes two sentences of prose costing forty times more per token than the steps that write the code. Chasing why led somewhere other than the model, and exposed a second mistake along the way."
---

*Every figure below comes from four real runs and can be re-derived from their run databases.*

I've been building an autonomous build loop called [Plimsoll](https://github.com/EdwardAThomson/plimsoll). You give it a prompt, it writes a spec, freezes a checklist, and then works through the items one at a time. Nothing gets marked done on trust: after each item, the harness actually runs a verify command against the code as just written, and only a real pass counts.

Each item runs three steps: PREPARE looks around the repository, EXECUTE writes the code, COMMIT writes the commit message. The harness makes the actual git commit itself, mechanically. COMMIT has no tools. Its entire job is prose.

A run built a small playable RPG in pygame: seventeen items, sixty-nine minutes, $61.72. Afterwards I broke the bill down by step, expecting the two steps that write code to dominate.

| step | cost | share of bill | share of output tokens |
|---|---|---|---|
| COMMIT | $22.84 | **37.0%** | **1.8%** |
| PREPARE | $20.86 | 33.8% | 62.5% |
| EXECUTE | $18.02 | 29.2% | 35.7% |

The step that writes two sentences of prose, with no tools, after the work is already verified, was the most expensive step in the run. Per unit of output it cost roughly forty times what the coding steps did.

## The obvious answer was wrong

The obvious answer is that I was using an expensive model for a cheap job. Everything ran on Opus. Commit messages don't need Opus. Swap that one step to Haiku, five times cheaper on both input and output, and save most of it.

Same prompt, same harness commit, one variable changed. The run cost $39.21 instead of $61.72, and COMMIT dropped from $1.344 per item to $0.129.

That's a factor of 10.4, and it's the number that gave the game away. A model five times cheaper cannot make something ten times cheaper. The token counts said what had actually happened: COMMIT's **input** per step had halved, from 136,590 tokens to 66,852. Swapping a model doesn't reduce input.

## What was actually happening

The three steps of an item ran as one chained conversation. PREPARE opened a session, EXECUTE resumed it, COMMIT resumed it again. By the time COMMIT ran, the session carried the entire coding conversation: every file read, every edit, every test run.

COMMIT then paid to re-establish all of that in order to write two sentences it could have written from a diff.

That's what a large input count on a step with no tools and 400 tokens of output actually means. The step wasn't doing expensive work. It was carrying expensive luggage.

## Four runs

Two runs couldn't separate "cheaper model" from "smaller context", because the cheap-model run had changed both. So I made the harness skip the session for COMMIT explicitly and kept the expensive model. Then, when that broke something, a fourth run with the fix for what it broke.

| | model | inherits the conversation | shown the diff | COMMIT $/item | input/step | share of bill |
|---|---|---|---|---|---|---|
| 1 | Opus | yes | no | 1.344 | 136,590 | 37.0% |
| 2 | Haiku | partly | no | 0.129 | 66,852 | 5.6% |
| 3 | Opus | no | no | 0.103 | 7,155 | 3.8% |
| 4 | Opus | no | yes | 0.177 | 13,616 | 5.6% |

The expensive model without the conversation is **cheaper than the cheap model was**. The model was never the problem. I'd reached for the answer that was easy to test rather than the one that was true, and the only reason I noticed is that the saving was too large for the explanation.

## Then it broke, instructively

Run 3's commit messages got worse. Not slightly: twenty-four lines of literal tool-call markup in the commit bodies, `<invoke name="Bash">` and all, complete with invented command output. Permanently, in git history.

Run 2, the Haiku swap, hadn't shown any of this. Its messages were fine, just cheaper to produce. The markup only appeared once the conversation was removed while the model stayed Opus, which rules out "weaker model" as the cause before I'd even gone looking for one.

The cause was one sentence in the prompt, rendered to every step:

> Reading git (`git status`, `git log`, `git diff`) is fine and often useful.

True for the two steps that hold tools and work in the item's worktree. False for COMMIT, which has no tools at all. It had never mattered, because COMMIT inherited the conversation and already knew what had happened, so it never tried to look. Take the conversation away and it doesn't know, so it tries to find out, can't, and its attempted tool call comes out as text.

Run 4 fixed two things: it tells COMMIT plainly that it has no tools and that an attempted call gets written into the message rather than executed, and it gives it the actual staged patch, capped and with truncation stated. Twenty-four lines of markup became zero, at a cost of about seven cents a commit.

The patch is worth its price for a reason the numbers make obvious in hindsight. Everything COMMIT had said something *about* the change: the item statement is the intent, the diff stat is the shape, and a note from the previous step is the account. None of them was the change. A commit message is written from a diff, and I had been giving it a count of files.

That note has its own small lesson. The prompt has always asked every step to "reply with a short plain-text note for the next step". PREPARE's note has always gone to EXECUTE. EXECUTE's went nowhere, generated and discarded on every item of every run since the beginning, because the resumed session made it look redundant. Removing the session is what made anyone look for it.

## The measurement I got wrong

Run 3 also looked slower. Its COMMIT step's median duration went from 11.9 seconds to 15.7, and its total nearly doubled. I wrote that up as a real trade: cheaper but slower, and reasoned confidently about why a model with less context would flail.

Then I checked the machine. It was 95% idle, load average 0.06, with the agent processes using between 0.4% and 2.5% of a core. These steps aren't computing. They're waiting on an API.

So the four "durations" were four samples of a vendor's response latency, taken at four different points across two evenings, with no control for server-side load. The difference I'd been explaining was never mine to explain.

The cost numbers are unaffected, because token counts and dollars are properties of what was sent rather than of when it was sent. But I'd spent an hour building a mechanism story on top of a measurement that was never mine, and the only thing that stopped it going in this post is that someone asked whether the container might be skewing the timing. It wasn't the container. It was that I hadn't asked what the machine was doing at all.

## What generalises

**A cost that doesn't match the work is a structural signal, not a pricing problem.** The step doing the least work costing the most was information about the architecture, and the pricing framing buried it.

**Test the explanation, not just the fix.** Switching to a cheaper model "worked": a third off the bill, ship it, move on with a wrong model of why. The saving being larger than the explanation allowed is the only thing that caught it.

**Context inheritance is not free and is usually invisible.** Chaining steps through one conversation is the obvious design and mostly the right one. It also means every later step pays for every earlier step, and nothing in the code says so. Here it cost about a third of every run.

**Removing context reveals what was compensating for it.** The prompt had a sentence that was wrong for one step and harmless while that step had the transcript. Fixing the cost exposed a latent defect, which is an argument for changing one thing at a time and reading the output rather than the totals.

**Be careful what you claim to have timed.** Anything whose wall clock is dominated by a network call to somebody else's servers is not a benchmark of your change. Tokens are deterministic. Seconds are not.

The final position: the commit step went from 37% of every run's bill to under 6%, on the same model, with cleaner messages than before. The bug it uncovered was in a sentence I wrote by hand months ago and never questioned, because until last week it had never been wrong.
