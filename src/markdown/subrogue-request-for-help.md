---
title: "SubRogue: Request for help"
date: "2021-02-25"
tags: blockchain,gaming,polkadot,web3,medium-archive
category: "blockchain-and-cryptocurrency"
description: "I have a request for help. I’d like to finish a simple decentralized game I’ve been building"
original_url: "https://edward-thomson.medium.com/subrogue-request-for-help-cb770dd83eac"
---

# SubRogue: Request for help

I have a request for help. I’d like to finish a simple decentralized game I’ve been building but don’t find the time to finish. I’m not really a coder so I’d be slow to finish it anyway, but I know what needs to be done. I will outline what needs to be done in this blog and would appreciate it if people reached out to me to help finish this. I’ve done everything in Python and suspect that would be the best choice to finish this project.

The idea is a blockchain roguelike, but the intention is really to have a working **Proof of Concept** upon which a more complicated game can be based. There have been a couple of such games already, but I’m specifically targeting the Polkadot ecosystem.

While this is just a PoC, I do have ideas about how the ideas can be taken much further in order to build a better game.

It isn’t yet a decentralized game but the groundwork is there. I think some tricks can be played to give an almost real time experience for player even though there is a blockchain in the background.

# What has been done 🔨

I previously wrote [a fairly long blog](https://medium.com/@edward.thomson/subrogue-the-build-so-far-ca39edb4edc3) about what has been done, so I will try to keep this part short. Most of what I have done relies upon tutorials and libraries that I can splice together to build what I needed.

-   Simple game logic for moving around a random dungeon (a la Rogue / Diablo)
-   Pull a block hash from a Substrate blockchain to seed the randomness
-   Monsters that follow a simple AI
-   Combat
-   Items Object (not done much here)

This is what the current tech stack looks like:

![](/images/1*OINtLVOXiD1Ow9RNfKA9qA.png)

*Current tech stack*

Sending signed actions to the chain is in principle done, but the code is really in a rough state.

# What needs to be done 👨‍🔧

I have to admit that some of the trickiest parts are still to be done; however, I believe I know how they should be implemented.

-   **Tx Format**: Choose appropriate format for transactions (basically JSON messages).
-   **Chain RPCs**: Use the Polkascan python library to parse the chain (we want to parse **all** player moves).
-   **Decentralize Combat**: Use blockhashes to seed combat. While combat is currently derived from a blockhash, there is no initiation transaction. May need to perform combat from multiple monsters sequentially.
-   **Physics Check**: Write some logical checks to decide if parsed actions are valid. In the UI, monsters use A\* pathfinding, but a simple distance check would be ok for a PoC. Combat should also be checked.
-   **Store valid moves**: Only store valid actions in a local database.
-   **Render valid player moves** on-screen (if on map / within player PoV).

![](/images/1*Buc-Cvr7aGrtfBVsrMGUVQ.png)

*The tech stack for a completed Proof-of-Concept.*

I’m open to discussing alternative suggestions. I’m not stuck with using Python but it seems like the easiest way to complete this PoC game. If someone believes they can replicate everything that has been done in a very short space of time, while still targeting a Substrate blockchain, then we can discuss.

## Bonus Milestones 🚀

There are a couple of bonus pieces of functionality that would be nice to have, but less important.

-   Scalable infinite map ([example](https://medium.com/@edward.thomson/on-infinite-multi-user-dungeons-4ef13d275a35))
-   Fog of War protection ([example](https://medium.com/@edward.thomson/preventing-cheaters-in-fog-of-war-games-69f202fbe107), probably a long way away!)

# Completion and rewards 💰

I can cover about a month’s worth of work and I’d be surprised if it took much longer for a skilled coder. The plan is of course, for everything to be open sourced. You can leave a private message here, find me on [Twitter](https://twitter.com/EAThomson/), or find an email address on my [website](https://edthomson.com/).

Let’s discuss!

![](/images/0*Ps6HmQuHjYpF8P_7.png)

# Real Time Gaming

While I believe there are some tricks that can be played with the animation in the game client, I also have an interest in figuring out how to create a fully decentralized real time game. This is separate initiative from the above mentioned Roguelike. Funding is also available via [Xaya](https://xaya.io/).