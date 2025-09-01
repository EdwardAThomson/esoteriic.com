---
title: "ScrambleGate: A Failed Attempt at Prompt Injection Defense"
date: "2025-08-31"
tags: ai-development,python,scramble-gate,security,information-security,prompt-injection,hacking,LLMs
category: "artificial-intelligence"
description: "ScrambleGate: the intention was a stochastic pre-execution gate: before a prompt is sent to the main model, ScrambleGate randomly samples and scrambles parts of the input, then sends them to an LLM for safety classification."

---

I tried to invent a new defense against prompt injection. It didn’t work — but here’s what I learned.

## The idea
The intention was a stochastic pre-execution gate: before a prompt is sent to the main model, [ScrambleGate](https://github.com/EdwardAThomson/Scramble-Gate) randomly samples and scrambles parts of the input, then sends them to an LLM for safety classification.

If malicious intent is detected in any scrambled view, the safety classifier returns a "block" signal, and the execution is blocked. An additional idea that's tried here is the masking of inputs, which performed better than scramlbing, but it introduced false positives (the LLM became more suspicious).

However, in practise, this didn't work. Detection perfomance was made worse by scrambling the input. I borrowed the idea from ASLR (Address Space Layout Randomization) in computer security: randomness as a defense.

## What happened
I used ScrambleGate to send 27 unsafe prompts to an LLM which was asked to act as a safety classifier. These prompts came from the Agent Dojo benchmark suite, and mimic malicious requests potentially found in a business setting (e.g. 'Send money to this bank account').

Here is a high-level summary of what I found:

* LLMs detect malicious intent best when prompts are not scrambled.
* Masking tokens improved detection rates, but only artificially — the model got suspicious of the masks, so false positives rose.
* After a full day of testing, clean prompts still win.

## Lesson

While it seems that scrambling and masking is not helpful, 'proving' that gave me clearer ground to explore other defenses. I suspect that a series of regexes may help to filter out a lot of prompts that contain uncommon / exotic characters, which are often used in malicious prompts. Although given the nature of LLMs, simple regexes will not be enough. We need a way to screen for intent, which is very hard for LLMs to do. Even humans can be fooled by malicious actors.
