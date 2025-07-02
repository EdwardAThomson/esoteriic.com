---
title: "Enhancing Fog of War in Multiplayer Games with Cryptography"
date: 2025-03-10T00:00:00.000Z
category: cryptography
description: "How Oblivious Function Evaluation and Private Set Intersection can solve memory peeking exploits in real-time strategy games"
---

Real-time strategy (RTS) games have long struggled with a fundamental security problem: players can break the "Fog of War" mechanic by peeking into memory to reveal hidden information about opponent positions. This creates an unfair advantage and undermines the core gameplay experience. After studying cryptographic protocols for several months, I've developed a solution using advanced cryptographic techniques.

## The Problem: Memory Peeking Exploits

In traditional multiplayer RTS games, the client receives all game state information but only displays what the player should be able to see according to the Fog of War rules. This approach is vulnerable to memory inspection attacks where players can:

- Use memory scanners to reveal enemy unit positions
- Exploit game files to see the entire map
- Gain unfair advantages by accessing hidden information

This fundamentally breaks the strategic element of RTS games where information gathering and map control are core mechanics.

## The Solution: Cryptographic Fog of War

I've implemented a solution using **Oblivious Function Evaluation (OFE)** to compute a **Private Set Intersection (PSI)**. This cryptographic approach allows players to detect each other within the game without revealing their exact positions, maintaining the integrity of the Fog of War.

The aim is to prove this can work in a Real Time Strategy game, as shown in the research paper [OpenConflict: Preventing Real Time Map Hacks in Online Games](https://www.shiftleft.org/papers/openconflict/). This foundational work demonstrated that cryptographic techniques could be applied to solve memory peeking exploits in real-time games.

### How It Works

The protocol works by:

1. **Grid-based Position Encoding**: The game map is divided into a grid system where each cell has a unique identifier
2. **Private Set Creation**: Each player maintains a private set of grid cells they currently occupy or have visibility over
3. **Oblivious Intersection**: Using PSI, players can determine if they can "see" each other without revealing their exact positions
4. **Secure Revelation**: Only the intersection results (what each player can legitimately see) are revealed, not the underlying position data

This ensures that no player can gain an unfair advantage by peeking into memory, as the sensitive position data never exists in an exploitable form on the client side.

## Implementation and Performance

I've built a JavaScript demo that showcases this cryptographic approach to game mechanics. The implementation includes several optimizations:

- **Multi-level grids** for efficient spatial partitioning
- **Web workers** for non-blocking cryptographic computations
- **Optimized PSI algorithms** for real-time performance

Despite these optimizations, the current implementation is somewhat slow for real-time gaming applications. The computational overhead of cryptographic operations presents challenges for the fast-paced nature of RTS games.

## Addressing the Cheating Problem

One deficiency of the OpenConflict solution is that it has no protection against players who lie about their positions or visibility. I think the problem of lying is one that can be solved. Essentially, the players would reveal all their position and visibility sets at the end of the game. Then players can check those against the rules of the game to ensure the calculations were correct and fit with the physics of the game.

Additionally, there would need to be a dispute resolution protocol in order to adjudicate in times when one player disagrees with another. This would happen when one player cheats and then denies it. I think there is a blockchain solution to this problem, as this is something already shown to be possible with blockchain tehcnology.

The overall top-level strategy for solving these advanced cheating scenarios is outlined in a blog I wrote in June 2020: [Preventing cheaters in Fog Of War Games](https://edward-thomson.medium.com/preventing-cheaters-in-fog-of-war-games-69f202fbe107).

## Future Improvements

The next stage of development would focus on performance enhancements:

- **WebAssembly (Wasm) implementation** for faster cryptographic operations
- **Native desktop application** to leverage more efficient system resources
- **Hybrid approaches** combining cryptographic security with traditional optimizations
- **Specialized hardware acceleration** for cryptographic computations
- **End-game verification protocols** to detect and prevent position/visibility lying
- **Dispute resolution systems** for handling cheating accusations

## Broader Implications

This project demonstrates how cryptography can enhance game mechanics beyond traditional security applications. The same principles could be applied to:

- **Card games** where hidden information is crucial
- **Turn-based strategy games** with fog of war mechanics
- **Any multiplayer game** where information asymmetry is a core design element

The intersection of cryptography and game design opens up new possibilities for creating truly fair and secure multiplayer experiences.

## Try It Yourself

I've made both the source code and a live demo available:

- **Source code**: [GitHub Repository](https://github.com/EdwardAThomson/psi-demo)
- **Live demo**: [PSI Demo Application](https://psi-demo-delta.vercel.app/)

The demo allows you to experiment with the cryptographic fog of war concept and see how Private Set Intersection can be applied to gaming scenarios. While it's currently a proof of concept, it demonstrates the potential for cryptographic solutions to long-standing problems in multiplayer game design.

## Conclusion

By applying advanced cryptographic techniques to game mechanics, we can solve fundamental security problems that have plagued multiplayer gaming for decades. While performance challenges remain, the potential for creating truly secure and fair gaming experiences makes this an exciting area for continued research and development.

The marriage of cryptography and game design represents a fascinating frontier where mathematical security meets interactive entertainment. As computational power continues to increase and cryptographic techniques become more efficient, we may see these approaches become standard practice in competitive multiplayer gaming. 