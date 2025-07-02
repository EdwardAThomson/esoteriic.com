---
title: "Analyzing LLM Creative Writing: Patterns and Limitations"
date: 2025-04-01T00:00:00.000Z
category: artificial-intelligence
description: "Deep analysis of how GPT-4o, Gemini, and Claude perform in creative writing tasks, revealing surprising patterns and limitations"
---

I've spent the past few months exploring how LLMs perform in creative writing—specifically, generating science fiction novels. The results have been both fascinating and revealing.

Along the way, I discovered some surprising limitations in even the top models (OpenAI, Google, Anthropic):

- **Repetitive metaphors** that appear across different generations
- **Limited name variety** with certain names appearing far more frequently than statistical chance would suggest
- **Recurring thematic loops** that models seem unable to escape

That led to a deeper question: How consistent and varied are models like GPT-4o, Gemini, and Claude when generating creative text from the same prompt, repeatedly?

## The Elara Phenomenon

The results were fascinating. On the surface, outputs seemed different—but deeper patterns emerged. One curious example? The name "Elara" showed up across multiple models from different companies. Coincidence? Or something deeper embedded in the training data?

This discovery prompted me to build a comprehensive analysis tool to systematically examine these patterns.

## What I Analyzed

In this research, I explored several key areas:

**Text vs. Semantic Similarity** – Are outputs really different, or just dressed up the same? I implemented both exact text matching and semantic similarity analysis to understand how truly diverse the outputs are.

**The Limits of Randomness** – Why do names like Elara keep coming back? The analysis reveals that even with temperature settings designed to increase randomness, certain patterns persist.

**Model-Specific Signatures** – How GPT-4o, Gemini 2.5, and Claude 3.5 behave differently. Each model has distinct characteristics in how it approaches creative writing tasks.

**Adherence to Length, Vocabulary Diversity, and Other Subtle Quirks** – Beyond just content, I examined structural patterns in how models organize and present creative text.

**Implications for Long-Form Creative Writing** – Understanding these limitations is crucial for designing systems that can generate truly varied, novel-length content.

## The Analysis Tool

To conduct this research systematically, I developed the **LLM Creative Writing Analyzer**. This tool provides:

### Advanced Similarity Analysis
- **Text-based similarity** (exact matches)
- **Semantic similarity** (meaning-based comparison using embeddings)
- **Named entity detection and comparison**
- **Name component analysis** (detects when name parts like surnames appear across different texts)
- **Text structure analysis** (paragraphs, sentences, and word metrics)

### Multi-Model Testing
The tool allows you to test multiple LLMs with the same creative writing prompt to analyze and compare their responses across various dimensions.

### Practical Applications

If you're building generative apps, writing tools, or creative AI for novels, games, or media—this research could save you significant time and help you design around these inherent limitations.

Understanding these patterns is essential for anyone working with AI in creative applications. The tendency toward certain names, metaphors, and thematic structures isn't a bug—it's a feature of how these models learned from their training data. But recognizing these patterns allows us to work with them more effectively.

## Open Source Research

The complete analysis, methodology, and supporting code is available on GitHub. The research includes detailed statistical analysis, visualizations of the patterns discovered, and practical recommendations for working around these limitations.

**GitHub Repository**: [LLM Creative Writing Analyzer](https://github.com/EdwardAThomson/LLM-Creative-Writing-Analyzer)

**Detailed Report**: [Full Analysis Report](https://github.com/EdwardAThomson/LLM-Creative-Writing-Analyzer/blob/main/reports/report.md)

This research represents part of my broader exploration into the practical applications and limitations of AI in creative work. While LLMs are powerful tools for augmenting human creativity, understanding their constraints is crucial for using them effectively in long-form creative projects.

The patterns we've uncovered suggest that while AI can be an excellent writing partner, human oversight and creative direction remain essential for producing truly original and varied creative content. 