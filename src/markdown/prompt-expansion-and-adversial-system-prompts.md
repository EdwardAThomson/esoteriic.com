---
title: "Research into Prompt Injection: Prompt Expansion and Adversial System Prompts"
date: "2025-09-01"
tags: ai-development,python,security,information-security,prompt-injection,hacking,LLMs
category: "artificial-intelligence"
description: "I explored two potential defenses against prompt injection in AI systems: prompt expansion and adversial system prompts."
---

In my latest project, I explored two potential defenses against prompt injection in AI systems:

1. Prompt Expansion – the idea that making a prompt longer and more verbose might help an LLM spot malicious intent.
2. Adversarial System Prompts – deliberately instructing the model to be more suspicious and alert to potential abuse.

## What I found
Expansion consistently degrades safety performance. Both GPT-4o and GPT-5 became more permissive when prompts were expanded, often misclassifying unsafe inputs as safe.

By contrast, adversarial system prompts worked well. When I primed the model with instructions to be wary of malicious behaviour, it classified unsafe prompts more accurately—without introducing false positives.


## Takeaway
Making prompts longer seems to make security worse, but system prompt engineering — carefully crafting “suspicious” system instructions — can be a reliable way to harden models against prompt injection attacks.

Thinking models were not explored here and may behave differently.

Code and report are on GiHub:

* [Code](https://github.com/EdwardAThomson/prompt-injection-testing)
* [Report](https://github.com/EdwardAThomson/prompt-injection-testing/blob/master/findings_report.md)

