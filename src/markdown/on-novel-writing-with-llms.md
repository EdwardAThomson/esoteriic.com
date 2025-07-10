---
title: "On Novel Writing with LLMs"
date: "2024-12-07"
tags: artificial-intelligence,llm,creative-writing,openai,python,nanogenmo
category: "artificial-intelligence"
description: "Exploring the potential of using large language models for novel writing through a practical Python implementation"
---


![](/images/header_image.jpeg)

I recently hacked together some Python code to write a novel. The app I built is rough around the edges, but it managed to generate a 52,000-word novel (I used the [@OpenAI](https://x.com/@OpenAI) API for text generation!). It's a work-in-progress, but it shows the potential of using large language models (LLMs) for storytelling (👉 [GitHub](https://github.com/EdwardAThomson/NovelWriter)).

## Not possible?

A lot of people argue that it's not possible to write a novel with current LLMs, mainly due to the context window limitations or perhaps due to intelligence-level. The idea is that since LLMs can't generate huge amounts of text at once, they're unsuitable for creating a cohesive story. But honestly, the idea of one-shotting a novel in a single LLM pass seems impractical—even for human authors, writing a novel is an iterative process. Authors like Stephen King (who is famous for writing fast) certainly don't write without planning, contemplation, and rewriting. So why would we expect an AI to one-shot a novel? (the chain-of-thought models might be able to, one day).

Instead of trying to generate a novel all at once, I took a different approach: breaking the problem down into smaller pieces, building the novel over multiple prompts. Some of my thought process was inspired by what Dave Shapiro (@DaveShapi) did with his project AutoMuse. My goal was to create something practical within the time constraints of NaNoGenMo—a kind of hackathon to produce 50,000 words of text using code.

Due to some offline interruptions, I couldn't dedicate as much time as I wanted, and the final product isn't polished. But it serves as a proof of concept. The generated text is obviously not at the level of a human-written novel, but it lays the groundwork for what's possible.

## The Generation Process

The novel generation process is broken down as follows:

1. **Generate Background**: Start by generating background details for the story universe—this includes characters, factions, and general world-building elements. (I used GPT-4o for this step.)

2. **Define Relationships**: Create a web of relationships between the factions and characters. This adds depth to interactions and motivations. (Again, using GPT-4o.)

3. **High-Level Outline**: Develop a high-level story outline. I initially tried GPT-4o, but found it to struggle with the size of the prompt, so I ended up using o1-mini for generating structured outlines. This part could use further improvement, I think multiple prompts with GPT-4o would work.

4. **Chapter Outlines**: Generate outlines for each chapter. This is the weakest part of the process at the moment—probably because I didn't iterate enough. (Used GPT-4o, though o1-mini might have worked better here. I hope to rework this to use multiple GPT-4o prompts)

5. **Write Chapters**: Expand on the chapter outlines to create the full text of each chapter. The outlines are placed into the prompts in a fairly simple way. I ended up using o1-preview to produce enough text quickly for the NaNoGenMo deadline. That was a bit expensive, but it worked. The first drafts weren't quite 50k when combined though.

6. **Rewrite and Expand**: Finally, to meet the 50,000-word requirement, I asked GPT-4o to review each chapter and add any missing details. This part was a bit rushed, but it helped fill in the gaps and meet the word count.

Overall, I believe this process could be streamlined and improved. I want to go back and refine my code to rely solely on GPT-4o, as I think it could be good enough to handle novel writing but with a more in-depth step-by-step approach. The whole process could be automated too, but I need to get it working better than it is first.

The project is still far from perfect, but it's exciting to see how far we can push LLMs in creative writing. I think with more iteration, we can get closer to producing something that feels more cohesive and compelling—even if we're not quite at the point of a "one-shot novel."

![](/images/image_1.png)

## What's Next?

I've started to make updates to the code already. To get better coherency in the story I need to re-work the lore generation to make it fuller, then I need to add more depth to the story structure generation process. I think I could probably ask for scenes to be sketched out after structure has been generated, but before any text is written.

Here on X I saw a thread where one person took an agent approach ([link](https://x.com/venturetwins/status/1859298925930479998)) to this problem. That feels like it could be better than the approach I've taken, but it's a bit beyond my current ability.

A couple days ago I pondered using RAG and do wonder if that could improve coherency. It would add some complexity, but perhaps not much more. There could even be some interesting avenues to explore here with regards to interactive storytelling and on-the-fly story generation.

That being said, I didn't do much work around coherency as I ran out of time, so probably some more improvements I can make there without opting for a more complicated architecture.

## Updates

1. First big update involved re-jigging the architecture such that all API calls were possible with 4o.
2. Moved the main repo to my original [GitHub account](https://github.com/EdwardAThomson/NovelWriter).
3. Added Gemini API support. Example novel coming soon.

## Links

* [Latest code](https://github.com/EdwardAThomson/NovelWriter) (Original [Code](https://github.com/edthomson/NovelWriter))
* [Novel](https://github.com/edthomson/NovelWriter/blob/main/combined_novel.md) (don't actually read it, it's just a PoC)

Also, check out the guy taking an agent approach to this problem:

* [Terminal Velocity - An AI-Collaborative Novel](https://github.com/Lesterpaintstheworld/terminal-velocity) 