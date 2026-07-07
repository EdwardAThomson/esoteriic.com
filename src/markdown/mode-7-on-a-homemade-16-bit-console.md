---
title: "Mode-7 on a Homemade 16-Bit Console"
date: "2026-07-07"
category: "computing"
tags: retro computing, fantasy console, assembly, mode 7, graphics, game development, emulation
description: "How I recreated the SNES rotating-ground-plane trick on my fantasy 16-bit console, and why the hardware had to grow a multiply instruction before a wind-skiff racer could turn a real corner."
---

How I recreated the SNES rotating-ground-plane trick on my fantasy 16-bit console, and why the hardware had to grow a multiply instruction before a wind-skiff racer could turn a real corner.

A little while ago I [wrote about **Dragon Palm**](/eleven-opcodes-and-a-pocket-dragon/), a fantasy 8-bit handheld with three registers and exactly eleven opcodes, and the game I built for it by rewriting my own instructions between frames. That was pure play, and it left me wanting a bigger machine. So I built one: **CastlePalm**, a fantasy *16-bit* console, spec and emulator and all. This post is about the moment that machine stopped being a toy renderer and grew a personality, because I decided it should be able to do the one graphics trick that defined the era it's pretending to come from.

I wanted Mode-7.

## The trick I was chasing

If you played a SNES, you already know the effect even if you never knew the name. [Mode-7](https://en.wikipedia.org/wiki/Mode_7) is the rotating, receding ground plane: the floor in [*F-Zero*](https://en.wikipedia.org/wiki/F-Zero_(video_game)), the track in [*Super Mario Kart*](https://en.wikipedia.org/wiki/Super_Mario_Kart), the world map in *Final Fantasy* that tilts away toward the horizon. Under the hood it's an [**affine transform**](https://en.wikipedia.org/wiki/Affine_transformation) applied per scanline. Each horizontal line of the screen samples a flat texture at a slightly different scale and offset, and if you pick those offsets right, a top-down bitmap turns into a plane stretching away into the distance. Turn the parameters over time and the whole world rotates and rushes at you.

CastlePalm's PPU could already do the per-scanline part. Internally it had a `setAffineLine(y, {startX, startY, dx, dy})` call: give it a starting sample point in the texture and a per-pixel step, in 16.16 [fixed point](https://en.wikipedia.org/wiki/Fixed-point_arithmetic), and it would walk that line across the screen sampling a tile map. The horsepower was there. The problem was that **a cartridge had no way to reach it.** The memory-mapped I/O bridge, the thing a game actually pokes to talk to the hardware, wired up VRAM, sprites, palette, scrolling and DMA, but there were no affine registers on the bus at all. The capability existed inside the emulator and was invisible to any game running on it.

So the first job wasn't "build Mode-7." It was "expose the Mode-7 the hardware already has."

## Step one: put the affine layer on the bus

This turned out to be a satisfyingly small, bounded change. I added three registers to the I/O map:

- `AFFINE_CTRL` (`$10101C`): bit 0 enables affine, bit 1 picks which background layer it applies to, and I reserved bit 2 for a future double-buffer page.
- `AFFINE_FIRST` (`$10101E`): the first scanline the affine table maps to, the horizon.
- `AFFINE_LAST` (`$101020`): the last affine scanline.

The per-line parameters themselves are far too much data to write one register at a time, 152 lines of four 32-bit values each, so they arrive by DMA. I extended the DMA engine's mode field with a new destination "space 3 = affine table." A cart builds an `N×16`-byte table in work RAM (`startX, startY, dx, dy` per line, each a signed 16.16 value), then fires a single DMA to blast it into the layer's line array during vblank. One nice detail fell out of it: each affine DMA clears the band first, so any scanline the cart *doesn't* write stays transparent, and the layer above shows through. That's the horizon, for free. Everything below the horizon is ground; everything above is sky.

The change I'm proudest of here is the one you can't see. Affine defaults to *off*, so every existing cartridge, the snake game, the arena brawler, the shoot-em-up, produced byte-for-byte identical frames after the change. The determinism fixtures didn't move. I measured the new path at roughly 0.7 ms per frame, about 23 times inside the 60fps budget, and wrote the words "GALECHASE is feasible" in the commit. GALECHASE being the game I wanted to build on top of all this: a wind-skiff racer through a stone-and-sky kingdom.

I was wrong about the feasibility, in an interesting way.

## Step two: the honest model is a rotating plane, and rotation needs multiplication

There are two ways to fake a 3D racetrack with a Mode-7-ish plane, and I tried them in the wrong order.

The first, the one my original design doc committed to, is the **[OutRun](https://en.wikipedia.org/wiki/Out_Run) model**. You don't really rotate anything. You draw a straight road and *bend* it by [shifting each scanline sideways](https://www.extentofthejam.com/pseudo/) by a precomputed curve amount. It looks like cornering, but the world isn't actually turning; you're sliding scanlines. Its great virtue is that it's cheap: every per-line value can be a table lookup baked on the host, so the console does nothing but adds and shifts. I designed the whole first cut of the racer around being **mul-free**, on purpose, because the CPU had no multiply instruction and I didn't want to need one. The design notes are emphatic about it: "no hardware multiply or divide, all strides power-of-two."

It drove like a slot car. You couldn't take a real ninety-degree corner, let alone a hairpin, because the road never truly rotated around you. It faked the *lean* of a curve, not the *geometry* of one.

The honest model is the **Mario Kart model**. The camera has a real world position and a real heading. For each scanline you take a perspective-scaled sampling line and *rotate it by the camera's heading* before you read the texture. Steer, and the heading changes, and the entire ground plane rotates around you. Corners become real corners because the world is genuinely turning.

But rotating a vector is `x' = x·cos - y·sin`, and perspective is a division: the sample scale at depth `p` is roughly `K / (p + C)`. There is no getting around it, this model is *made of* multiplies and divides. Per affine line you need something like six signed multiplies, a couple of unsigned multiplies and a divide; across 152 lines plus camera motion that's roughly 1,300 multiplies and 150 divides *every frame*. On a CPU with no multiply instruction, you'd synthesise each one from shifts and adds, or lean on giant baked reciprocal tables and a lot of mul-free gymnastics. At that volume it simply wasn't going to fit the frame budget, and even if it had, the code would have been miserable.

So I did the thing you can do when you own the whole machine. I changed the hardware.

## Step three: teaching the ISA to multiply

I added four instructions to the CPU: `MULU`, `MULS`, `DIVU`, `DIVS`, at opcodes `$20`–`$23`. Unsigned and signed 16×16→32 multiply, and 32/16→16 divide. The shape is deliberately borrowed from the [68000](https://en.wikipedia.org/wiki/Motorola_68000) and the [Mega Drive](https://en.wikipedia.org/wiki/Sega_Genesis), machines this console is spiritually cosplaying as. The registers are 16-bit, so a 32-bit result uses a *register pair*: multiply writes the low word to `Rd` and the high word to `R(d+1 mod 8)`; divide reads its 32-bit dividend from that same pair, and writes quotient to `Rd`, remainder to `R(d+1)`. That symmetry is intentional, a multiply followed by a divide through the same register round-trips cleanly. Divide by zero sets the overflow flag and yields zero rather than trapping, which is the pragmatic retro choice.

These are also the first instructions on CastlePalm that **don't all cost the same.** Until now every instruction was one tick; the interpreter's `run()` loop just counted instructions. Multiply and divide are genuinely heavier, so I made `step()` return a cycle cost, provisionally 8 for a multiply and 16 for a divide, and had `run()` budget by cycles instead of by instruction count. It's a small change with a nice property: every existing cart is untouched, because they all cost 1 and halt well inside the budget. The determinism fixtures, again, didn't move. But now the CPU has the beginnings of an honest timing model, which is exactly the kind of thing a 16-bit machine should have and an 8-bit toy can get away without.

There's a philosophy hiding in here that I keep bumping into with these fantasy consoles. On a real machine, the instruction set is a wall you build software against. When *you* are also the hardware designer, the wall becomes negotiable, and the interesting question stops being "how do I do this with what I have" and becomes "is this worth adding to the machine, or am I about to ruin the constraint that made it fun?" Adding multiply to an eleven-opcode dragon would have been cheating. Adding it to a machine cosplaying as a 1990s 16-bit console is just... accuracy. The Mega Drive had `MULU`. Mine should too.

## The spike, and then the game

With multiply on the bus I wrote a bare rotating-plane spike, no game around it, just a camera you could drive over a baked track texture, to prove the model on the real instructions before building anything on top of it. Camera position in 16.16 fixed point, heading as a 1,024-step angle indexing a baked sine table, and per line: a live `DIVU` for the perspective scale, a couple of `MULU` for depth and span, and the `MULS` pair that rotates the sampling vector by heading. About 1,370 multiply/divides a frame, landing around 1.55 ms. Turning now rotated the entire world. Real ninety-degree corners. A hairpin. The thing I'd wanted the whole time.

Then I rebuilt **Galechase** on top of it, and this is where it turned from a rendering demo into an actual game. Off-track is a tile sample under the skiff that caps your speed and rumbles. Laps are in-order checkpoints expressed as world rectangles. The lap timer is `M:SS:cc`, formatted with the very `DIVU` I'd just added, which felt like a nice full-circle moment: the instruction I put in for the graphics ended up drawing the clock too.

From there the game grew the structure of the genre it's imitating:

- **A ship roster.** Four hand-authored wind-skiffs, each a tuple of stats in ROM, top speed, acceleration, turn rate, weight, drag, off-track grip, contact scrub, palette. GALE is balanced, BOLT is fast and twitchy, WARD is grippy and slow, OXEN is a heavy bruiser. The engine copies the chosen ship's stats into working variables at the start of a race, so they genuinely drive differently: BOLT tops out around 3.0 world-pixels a frame against WARD's 2.0, WARD turns about 50% sharper, OXEN shrugs off both the grass and a shove. Each craft is drawn at three sizes for the perspective sprite scaling, so a distant rival is a tiny recoloured silhouette rather than a coloured square.
- **AI rivals** on the rotating plane, driving the track by parameter and rendered as perspective-scaled sprites you can actually see recede.
- **A cup / Grand Prix mode.** Tracks are data now: three distinct River-Vale layouts baked as map, path and metadata, streamed into VRAM one at a time. The flow is Title, Ship Select, then three races of Countdown, Race and Standings, then a Champion screen, with your ship, your three rivals and the cup points carried the whole way. Grand Prix scoring is the classic 5/3/2/1 by finish order. It's the full F-Zero skeleton, roster plus cup, running at around 1.66 ms a frame.

## What I took from it

The Dragon Palm lesson was that constraints are a feature: a machine that won't let you cheat forces you to understand it. The CastlePalm lesson is the twin of that one, and slightly more dangerous. When you own the machine *and* the game, the boundary between "problem to solve in software" and "thing to add to the hardware" is a design decision you make on purpose, and it's easy to make it badly. I could have solved the perspective math with a monstrous reciprocal table and no new opcodes, and kept the ISA "pure." Instead I asked what a real machine of this class would have done, and a real 16-bit console of 1992 would absolutely have had a multiply instruction. Adding it wasn't giving up on the constraint. It was moving the console one honest step closer to the thing it always wanted to be.

And the reward for getting the boundary right is very concrete. You steer, and the whole kingdom rotates around your little skiff, and you take the hairpin flat out. That corner is real, all the way down, because I built the layer of the machine that makes it real.

## Links

- **Play Galechase** (and the rest of the CastlePalm arcade) in the browser: [castle.octonion.io/#galechase](https://castle.octonion.io/#galechase)
- The **CastlePalm SDK**, with the CPU (including the new multiply and divide instructions), assembler, docs and example carts: [github.com/EdwardAThomson/castlepalm-sdk](https://github.com/EdwardAThomson/castlepalm-sdk)
- The browser **arcade** launcher: [github.com/EdwardAThomson/castle-arcade](https://github.com/EdwardAThomson/castle-arcade)
- The previous post in this series: [Eleven Opcodes and a Pocket Dragon](/eleven-opcodes-and-a-pocket-dragon/)
