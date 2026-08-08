---
title: "What a Harness Actually Buys You Over Calling the Model Directly"
date: "2026-08-05"
category: "artificial-intelligence"
description: "Coding-agent harnesses add API round-trips on top of the model they wrap. I checked whether that costs more, and what you actually get for it."
---

# What a Harness Actually Buys You Over Calling the Model Directly

Every coding-agent harness I've been comparing, Hermes, Goose, OpenClaw, NullClaw, and the rest, does the same basic thing: it sits between you and a model, wraps your request in tool definitions and a system prompt, and lets the model call tools in a loop instead of just answering once. That's more infrastructure and more API round-trips than calling Claude, GPT, or DeepSeek directly. Which raises an obvious question I hadn't actually answered until I checked: does that add up to real extra cost, and if it doesn't, what's the harness actually for? The eval data behind this post lives in the same repo as the rest of this work: [agent-reviews](https://github.com/EdwardAThomson/agent-reviews).

## The cost question, checked against one real task

Before the SWE-bench harness comparison, I ran a small controlled test: the same greenfield task (build a stdlib-only JSON/CSV CLI tool with a pytest suite it has to pass), on the same model, three ways. A raw API call with no tools at all. Hermes. OpenClaw. Same model, same task, same success criterion.

The raw model was the most expensive of the three: one call, 20,704 output tokens, $0.31, 233 seconds. Hermes made 13 API calls and 12 tool calls but came in cheaper and faster: 8,585 output tokens, $0.295, 155 seconds. OpenClaw, at 5 calls and 4 tool calls, was cheapest and fastest of all: 4,005 output tokens, roughly $0.22, 63 seconds.

That's the opposite of what I expected going in. More round-trips did not mean more cost. The reason is what those round-trips actually contain. A raw one-shot call has to generate everything in a single pass, code, explanation, and a closing summary, all as prose in one long generation. A harnessed call is terse: a tool call, a short result, another tool call. Short turns compress well under prompt caching (Hermes's run alone read 228k cached tokens), so a dozen small exchanges can cost less than one big one. The harness's real efficiency cost, if it has one, isn't API spend, it's engineering and latency variance, not the token bill.

## What the harness actually buys, on that same task

All three approaches produced correct code, so cost and speed were the only things separating them on this particular task, but there's a more important asymmetry underneath that. The raw model call has no tools. It cannot run its own output. It produced a 63-test suite that happened to pass, verified by an independent re-run afterward, but the model itself never checked. Hermes ran pytest and a stdin smoke test before calling the task done. OpenClaw ran pytest too, and did it in the fewest steps of the three by first reading its own coding-agent skill file rather than improvising.

That's the actual value proposition, and it's easy to miss if you only look at the outcome: the harness didn't make the model smarter. Claude Sonnet 4.6 was right about the CSV tool with zero tool calls. What the harness adds is the ability to check that you were right, and revise if you weren't. On a task the model reliably nails in one shot, that's redundant insurance. On a task where the first attempt is a coin flip, checking your own work stops being optional.

## Where the harness itself becomes the bottleneck, or the edge

The cost/verification question is about calling a model through a harness versus calling it raw. There's a second, sharper question underneath it: does *which* harness you use change the outcome, holding the model fixed? The SWE-bench comparison exists to answer exactly that, and the answer is yes, more than I expected going in.

Same fixed model (`deepseek/deepseek-v4-pro`) across seven different harnesses on identical bug-fix tasks: mini-SWE-agent resolves 10/20 on the full pilot set. Aider, in its default edit-format, produces empty patches on many instances, not because it failed to solve the bug, but because DeepSeek answers in tool-call style and Aider's parser expects whole rewritten files in fenced blocks, so it extracts nothing. On the shared 4-instance frontier, three of four instances get solved by every harness, but the fourth, astropy-14182, only two of seven harnesses (Hermes, NullClaw) get right; the other five produce plausible-looking half-fixes. Same model, same bug, different tools around it, different outcome.

That's the case for a harness that a cost comparison alone can't make: the harness's tool design and edit mechanism aren't a thin shell around the model, they're a real constraint on what the model can actually accomplish. A harness whose output format the model can't speak effectively wastes the model entirely, as Aider did. A harness that lets an agent explore every call site instead of stopping at the first plausible one changes whether a subtle bug gets fully fixed or half-fixed. None of that shows up if you only ask "is calling the model through a wrapper more expensive than calling it directly." It shows up when you hold the model fixed and vary only the harness.

## The reason I can't test yet: long-term autonomy

There's a third argument for using a harness that I haven't been able to evaluate yet, because nothing I've run so far actually exercises it: persistent, long-running autonomy. Every task in this project, the CSV tool, every SWE-bench instance, is a single turn worked to completion in one sitting. That's not what a harness like QM, or Hermes's own background/skill-loop features, is actually built for. Those systems are designed around session memory that survives across days, work that continues unattended, and state that accumulates rather than resets each run.

If that's where a harness's real advantage lives, cost-per-task and pass-rate-on-a-fixed-benchmark are both measuring the wrong thing. A harness could look cost-neutral and only modestly more capable on any single task, exactly what I found, and still be the only viable option for a job that has to run for six hours without you watching it, or that needs to remember what it tried yesterday. I don't have evals that test that yet. It's the honest gap in everything above, and the next thing worth building toward, not asserting.

## What I'd tell someone asking whether to bother

Not "a harness makes the model smarter." It doesn't. The case for harness is perhaps narrower and, I think, more durable: a harness lets the model check its own work instead of guessing, it does so without a meaningful cost premium once you account for how differently raw and tool-call-shaped generations spend tokens, and which harness you pick materially changes the outcome on harder tasks in ways a "just call the API" approach can't touch at all, because there's no self-correction loop to design well or badly. The autonomy case, running unattended over real time, is the one I believe most and can prove least, so far.

At the moment I am creating my own harness, [Plimsoll](https://github.com/EdwardAThomson/plimsoll), as I want to have more understanding and control over running long-term autonomous operations.

*The full harness comparison and the eval data behind this post are open on GitHub: [agent-reviews](https://github.com/EdwardAThomson/agent-reviews).*
