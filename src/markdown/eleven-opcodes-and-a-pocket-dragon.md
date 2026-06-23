---
title: "Eleven Opcodes and a Pocket Dragon"
date: "2026-06-23"
category: "computing"
tags: retro computing, fantasy console, assembly, game development, testing, self-modifying code, AI-assisted
description: "What I learned building a game (and the tooling around it) for a fantasy 8-bit console with almost no instructions."
---

*What I learned building a game (and the tooling around it) for a fantasy 8-bit console with almost no instructions.*

Every so often a project comes along that's pure play. For me, this month, it was **Dragon Palm**: a *fantasy* 8-bit handheld console that runs entirely in the browser. "Fantasy" because the hardware never existed: someone invented a plausible little 1980s machine, wrote the spec, and built an emulator for it. A 128×128 screen, sixteen colours, three registers, and a CPU with **exactly eleven instructions**.

Eleven. No multiply. No compare. No general-purpose branch: just "jump if not zero." If you want to do almost anything interesting, you have to earn it.

I fell for it immediately, and decided to build a game. Here's what that turned into.

## The constraint *is* the fun

On a normal machine you move a sprite by changing a variable. On Dragon Palm there's no instruction to load a value from a variable into the coordinate registers; they only take constants baked into the instruction. So how do you move anything?

You rewrite your own program. **Self-modifying code**: the program reaches into its own instructions and overwrites the "constant" for the next time it runs. The draw call literally edits itself between frames. It feels illegal the first time you do it, and then it feels like the whole point.

This is the texture of the machine: every feature you'd take for granted is a small puzzle. It's the most fun I've had programming in a while.

## You can't debug what you can't run

The problem with writing self-modifying assembly by hand is that it's *very* easy to get wrong, and the only way to see a bug was to open the browser, drag the cart onto the console, and squint. That's a slow, vibes-based way to work.

So before writing much of the game, I built a small **headless test harness**: a way to run any cartridge in plain Node, with no browser. Load it, feed it button presses on a script, run some frames, and read the screen back pixel by pixel. Suddenly I could *assert* things: "hold Up for five frames, the paddle should be one pixel higher."

To make that trustworthy, I pulled the emulator's CPU out into a shared module so the browser and the tests run the **exact same code**, and added a "fidelity" check that proves the test harness reproduces the real console's behaviour, not a lookalike. Green tests genuinely mean the thing in the browser is correct.

That harness changed everything. The game went from "guess and squint" to a tight loop: write assembly → assemble → run the tests → fix → repeat. I even wrote a little bot that *plays the game by reading the screen* to verify scoring end to end.

## Dragon Hoard

The game is **Dragon Hoard**: steer a little dragon around to gobble gems, with a gold coin worth bonus points. Simple, but on this hardware, every part of it was a small engineering story:

- **The dragon is a sprite, not a dot.** Eight pixels drawn relative to one moving anchor, all positioned by self-modifying code.
- **Collision with no compare instruction.** "Is the dragon touching the gem?" normally needs less-than/greater-than. With only equality available, you check a small region by *enumerating* the cells, a trick the console's own pong game uses.
- **The flicker.** Moving a multi-pixel sprite by erasing it and redrawing it leaves a window where it's briefly *gone*, and the display sometimes caught it mid-erase, so the dragon flickered. The fix: draw the dragon at its new spot *first* (so it's never absent), then erase only the few pixels it left behind. Smooth.
- **You could eat your own score.** Walking over the score counter erased it. The fix was the oldest trick in arcade design: reserve a strip at the top for the HUD and keep the player out of it.

None of these are hard problems on a real computer. That's exactly why they're enjoyable here.

## Tooling, conformance, and a tiny arcade

Two things grew out of this beyond the game itself:

- A **conformance test suite**, built around the console author's lovely principle that "the hardware is gospel": a cart must never be able to break the rules of the machine. I turned those rules into executable tests (only the real opcodes exist, no writing out of bounds, four-bit colour, and so on), so any version of the emulator can be checked against the spec.
- A small **browser arcade** to host the carts: pick a cartridge, press insert, play.

## The takeaway

Two, really. First: **constraints are a feature.** A machine with eleven instructions forces you to actually understand what's happening, and that understanding is the reward. Second: **good tooling pays for itself absurdly fast.** A morning spent making the thing testable turned a fiddly, error-prone task into something I could iterate on quickly and confidently. And, yes, I built a lot of it pairing with an AI assistant, which is its own small lesson in how this kind of work is changing.

Sometimes the best way to learn the fundamentals is to pick a machine that won't let you cheat.

## Links

- **Dragon Palm**, the fantasy console, by its creator: [github.com/0xe25f/dragon-palm](https://github.com/0xe25f/dragon-palm)
- **Dragon Hoard** and the test suite (my fork): [github.com/EdwardAThomson/dragon-palm](https://github.com/EdwardAThomson/dragon-palm)
- The **arcade** launcher: [github.com/EdwardAThomson/dragon-palm-arcade](https://github.com/EdwardAThomson/dragon-palm-arcade)
- Play Dragon Palm on my website here:  [Dragon Palm](https://dragon-palm-arcade.octonion.io/)
