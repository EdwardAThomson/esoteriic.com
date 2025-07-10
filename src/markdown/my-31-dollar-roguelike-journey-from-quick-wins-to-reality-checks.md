---
title: "My $31 Roguelike Journey: From Quick Wins to Reality Checks"
date: "2025-07-05"
tags: gamedev,roguelike,ai-development,claude,cursor,javascript,game-programming
category: "artificial-intelligence"
description: "A developer's journey building a roguelike game with AI assistance, from rapid prototyping to debugging nightmares and eventual success"
---

## The Beginning: What $10 Could Buy You

This is what $10 of spend got me from Claude Code. 💰 (this was 2nd March 2025)

A simple Roguelike running in the browser - and it actually worked!

* Movement ⬆️
* Room generation 🏰
* Items (equip / unequip / stat mods) ⚔️🔑
* Menus - Stats, Inventory, Help screen 📜

Kinda cool!

![](/images/image_1.jpeg)

Claude crushed the 7 day Roguelike challenge before I even knew what hit me. For context, this is a fun challenge for humans to build a Roguelike from scratch in 7 days - a proper test of skill and endurance.

Claude Code spent just 1h 30m working. It could have been even faster, but I got greedy and asked for a custom feature which bogged it down (a custom gate feature to connect multiple map sections together). The big problem is asking for custom features that lie outside or on the edge of the training set. I eventually got this feature fixed, but resorted to using my own brain. The game now a pseudo-infinite dungeon.

I believe Claude Code was using Claude 3.7 at the time.

The speed was intoxicating. Within 90 minutes, I had a playable game that felt like something I might spend weeks building myself. The rooms generated procedurally, the combat worked, I could pick up items and see my stats change in real-time. For a brief moment, I felt like I'd discovered some kind of development cheat code.

## When Reality Hits: The Debug File Explosion

But then reality set in.

Claude goes so far and then the project gets overly complicated. I think there was an infinite loop somewhere that broke everything. 😆

This is where I learned about Claude's favorite debugging strategy: "I'm stuck, let's create a new debug file!"

* debug_game.html
* debug_fix.html
* debug_test.html
* fixed_game.html
* minimal_game.html

My project folder started looking like a graveyard of failed attempts. Each file was Claude's attempt to isolate the problem, but instead of fixing the core issue, it kept creating new versions. It's like watching someone clean their room by moving everything to another room.

The start was fast, but then progress slowed to a crawl. What had taken 90 minutes to build was now taking hours to debug. The magic was wearing off.

The cost hit around $31 and was feeling a bit expensive for a quick experiment. Eventually, I switched to Cursor (which costs $20/month but I use Cursor a lot across several different project.

## The Evolution: Ambition Meets Complexity

This is where things got interesting - and by interesting, I mean complicated.

I got ambitious. Looking at my working single-player game, I thought "you know what this needs? Multiplayer!" Because obviously, if one player having fun is good, multiple players having fun is better, right?

Claude actually managed to implement a basic multiplayer system. For a brief, shining moment, I had multiple players running around the same dungeon, fighting monsters together. It was crude, but it worked.

And then it didn't.

Bugs crept in. Players would desync. The game state would get confused about who was where. Combat became a mess of conflicting actions. What seemed like a simple addition had introduced a web of complexity that touched every system in the game.

Rather than fight through it, I made a decision that probably saved my sanity: I ripped out the multiplayer code entirely. Back to single-player. Back to basics. I had a working version of a single-player game, but that seemed a bit boring. At that point I was mentally tired of this project, which had gone from "fun weekend experiment" to "debugging nightmare".

So I took a break for a few months.

## The Return: A new process with Cursor + Claude 4

Today is 5th July 2025 - over 4 months later.

![](/images/image_2.png)

Coming back to this project felt like returning to an old friend. The core game was still there, still working, still fun. Rather than use Claude Code I've switched to Cursor IDE. It has AI-help and agents built-in. Cursor allows for finer control over the actions of the agents such that the agent doesn't jump around like a bull in a china shop.

So far I think Claude 4 is an improvement over 3.7. That might sound like an obvious thing to say, but it feels like it has a tighter grip on the conversation. It feels more like interacting with a human developer. Sure it is imperfect and doesn't really understand as a human would, but it's been fairly good to work with.

One annoying glitch recently was the removal of working code. Claude removed the code that made potions restore stats. The code is a bit janky, but it worked. For some reason Claude thought the code was duplicated across two different places, but I wasn't wholly convinced. I left the diff showing in the file such that I could return to it, and lo and behold I was right to keep the old code showing.

In the past few days, I've made some real progress:

* **Combat system overhaul**: Battles now feel strategic rather than random
* **Loot economy rebalancing**: Items are more scarce although not quite valuable yet
* **World generation improvements**: An enhanced gate system that makes map sections link reliably
* **Monster-drops variety**: Improved drop tables and behaviors
* **UI polish**: Inventory management and equipment display tweaks.

There is still a lot more to do.

## What I've Learned

This journey taught me something unexpected about AI-assisted development:

**The tool matters, but timing matters more.** Claude 3.7 was impressive for rapid prototyping but struggled with complex, interconnected systems. By the time Claude 4 arrived, I had a better understanding of what I wanted to build, and the AI had better capabilities to help me build it.

**Complexity is the enemy of progress.** The multiplayer detour wasn't a failure - it was a learning experience. Sometimes the best way forward is to simplify, not complicate. I hope to return to this in the future.

**Taking breaks is productive.** Coming back to the project with fresh eyes and better tools turned out to be exactly what it needed.

## The Future

The game isn't finished, but it's no longer a prototype. It's a foundation.

There's still plenty to build:
* More monster types and behaviors
* A proper magic system with spells and scrolls
* Maybe even that multiplayer system (done right this time)
* Save/load functionality
* Deeper progression systems

But for now, I'm enjoying having a game that works, that's fun to play, and that represents a real collaboration between human creativity and AI capability.

Not bad for a $31 investment that turned into a 4-month journey.

*Want to try it yourself? The code is open source on GitHub. Fair warning: it's addictive.* 