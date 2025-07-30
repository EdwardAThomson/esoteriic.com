---
title: "The Future of Real-Time Decentralized Gaming"
date: "2024-12-19"
tags: blockchain,gaming,cryptocurrency,defi,investment,medium-archive
category: "blockchain-and-cryptocurrency"
description: "we have the seeds of real-time decentralized gaming now."
original_url: "https://edward-thomson.medium.com/the-future-of-real-time-decentralized-gaming-528a248f766a"
---

# **The Future of Real-Time Decentralized Gaming**

**tl;dr**: we have the seeds of real-time decentralized gaming now.

# Introduction

Decentralized gaming represents a revolutionary shift in how games are developed and played. Unlike traditional gaming models that rely on centralized servers, decentralized games operate on blockchain networks, providing enhanced transparency, ownership, and fairness. However, achieving real-time, synchronous gameplay in a decentralized environment poses unique challenges.

In 2020, [I was on the Zima Red podcast](https://creators.spotify.com/pod/show/andrew-steinwold/episodes/Edward-Thomson---PhD-In-Astrophysics-Turned-Decentralization-Diehard---ep-25-efg2vs) with Andrew Steinwold ([@AndrewSteinwold](https://x.com/@AndrewSteinwold)), I predicted that a fully decentralized MMO could be achievable within 5 years. I still believe that it was possible, but very little research went into the problem, ergo nothing happened. On the other hand, NFT-based games received significant investment while actual [decentralized gaming](https://x.com/DecentralizedG) has been largely underexplored.

I also tweeted this out in 2021:

Since then, some progress has been made. The core technologies and expertise exist, but building these systems requires significant time, effort, and investment.

In this blog, I’ll explore the existing techniques and technologies that could make real-time decentralized games a reality. While current solutions allow for games with a low number of players, scaling to larger audiences requires further R&D and innovation.

The building blocks are here — let’s explore how we can put them together.

# The Appeal of Real-Time Decentralized Games

Why is real-time gameplay so captivating? From fast-paced shooters to competitive strategy games, the immediacy of interactions is what keeps players engaged. Yet, the decentralized model, with its inherent reliance on consensus and distributed networks, struggles to match the speed and fluidity players expect from real-time experiences.

As a technical clarification, the phrase “real-time” means synchronous gameplay. A definition that also admits slow-paced games where two of more players take actions at the same time. In this blog, our concern is **only** with fast-paced games.

# Biggest Challenges of Real-Time Decentralized Games

Key challenges include **network latency** and **scalability**, which makes achieving the low response times needed for smooth gameplay difficult on blockchain systems. Current blockchain networks struggle to handle the high transaction throughput demanded by real-time games. Therefore, any solution to this challenge requires taking computation off-chain (away from the busy L1s and L2s).

# Current State of Decentralized Gaming

While decentralized games have made strides in ownership and provable fairness, many rely on turn-based or asynchronous mechanics. Projects like Axie Infinity and CryptoKitties have demonstrated blockchain gaming’s appeal, but decentralized gaming remains largely unexplored.

To name a few decentralized games that are synchronous-yet-slow, we have [Conquest](https://x.com/conquest_eth), [Mithraeum](https://x.com/MithraeumIO), [Taurion](https://taurion.io/) (unreleased), and no doubt a few more!

![](/images/0*V1D24GgY0VDxAxdU)

*Conquest.eth*

The main architectures can be split into two categories:

-   **Fully On-Chain Games**: All computations occur directly on the blockchain, ensuring transparency, verifiability, and immutability, but at the cost of speed and scalability.
-   **Hybrid Models (Provable Off-Chain Games)**: Critical computations happen off-chain, but their results are verified on-chain, offering a balance between performance at the cost of composability (less convenient). Off-chain meaning “off of the L1”, there can still be another blockchain used within the overall solution.

The latter is where we see the possibilities of real-time decentralized gaming emerge.

# Key Technologies Enabling Real-Time Decentralized Gaming

For real-time decentralized gaming to succeed, several technological hurdles must be overcome. The following technology solutions may play a role:

1.  **Rollups**: These reduce the load on main blockchains, enabling faster transactions.
2.  **State Channels**: Players can interact off-chain, with results only submitted to the blockchain as needed.
3.  **Local blockchains**: can manage interactions among small groups of players (e.g., instances or matches). once connected to either a rollup or state channel to provide a global state needed to prevent cheating and safeguard fairness.

# Examples of Real-Time Decentralized Games

Here are some of the pioneering efforts exploring this frontier.

# State Channels

**Xaya (**[**@**XAYA\_tech](https://x.com/@XAYA_tech)):

A decentralized gaming platform that provides state channels (“game channels”) to enable fast, low-latency gameplay. Xaya demonstrated its capabilities with a turn-based but [fast-paced Battleships game](https://xaya.io/xayaships). It is a two player game where the interactions are peer-to-peer, but validation occurs via an on-chain like any state channel solution.

This showcases the potential of state channels for lightweight real-time games. The Xaya team suggests that up to 30 players could be possible.

![](/images/0*_IIfzMU1Oo-kH4bB)

*Xayaships (Snippet from YouTube promo video)*

-   [Xayaships on YouTube](https://www.youtube.com/watch?v=y-qB5uMALJc)

# Off-chain VM with Rollups

**Cartesi (**[**@**cartesiproject](https://x.com/@cartesiproject)):

A platform integrating verifiable off-chain computations, allowing developers to run complex logic off-chain while submitting results to the blockchain. The [Cartesi Virtual Machine](https://cartesi.io/blog/understanding-cartesi-rollups-pt2/) is a custom VM that emulates a RISC-V instruction set architecture. In turn this would be deployed to an app-specific rollup.

Previously Cartesi had their VMs connect to a blockchain via state channels. During that time they released a demo game called Creepts which was a tower defense game using this technology. More recently, a team called **Rives** ([@rives\_io](https://x.com/@rives_io)) put Doom into a Cartesi VM.

While Doom is only single player, this is a novel application of blockchain technology. Doesn’t seem wild to think a simple multiplayer game could be a possibility with this technology.

## Get Edward A Thomson’s stories in your inbox

**Lattice** (@[latticexyz](https://x.com/latticexyz)):

With a focus on the dream of “autonomous worlds”, the Lattice team have developed numerous pieces of technology that may enable real-time decentralized worlds. Their key technology in that regard is [Quarry](https://lattice.xyz/blog/introducing-quarry), which aims to enable MUD applications to run in real-time at scale, with four key provisions: ultra-low latency APIs, account abstraction, multi-region bare metal edge deployments, and a custom block builder network.

Quarry achieves low latency through its custom block builder, Wiresaw. Unlike traditional block builders that prioritize high-paying transactions, Wiresaw uses a first-come, first-serve model, adding transactions to a pending block and committing to their order immediately. This allows Wiresaw to stream state updates to clients in real-time, resulting in a latency as low as 7ms.

![](/images/0*pQ9f36EdaZz_UlUr)

MUD is an open-source framework for building decentralized, open-world games. While Quarry is an augmentation to Redstone, which is itself an EVM blockchain, with a custom block builder. Specifically, Redstone is an Optimistic Rollup.

The team also ran Doom on Quarry:

Perhaps most interesting of all is the brewing partnership with CCP Games ([@CCPGames](https://x.com/@CCPGames)) to develop technology for EVE: Frontier ([@EVE\_Frontier](https://x.com/@EVE_Frontier)). Unfortunately, not many details have been given about EVE:F. The [whitepaper](https://whitepaper.evefrontier.com/) (public!) suggests that the game could be decentralized one day. Perhaps Quarry would even be used there?

![](/images/0*FisP9ZENrojog_i3)

*[https://whitepaper.evefrontier.com/](https://whitepaper.evefrontier.com/)*

# Local blockchains

**Playmint (**[**@**PlaymintUK](https://x.com/@PlaymintUK)):

Focused on creating provably fair real-time games, Playmint utilizes a local blockchain (“playerchain”) that allows for fast peer-to-peer gameplay.

![](/images/0*61Is7Zclj_UK6slS)

*Playerchain network diagram*

These chains would not connect directly to an L1, but rather to a permissioned network that provides fast-as-possible-finality. A network called a Blocklace, which is a DAG-based solution.

![](/images/0*Bf7BGI-5F_Asny3y)

*Diagram of a global blocklace*

A few relevant comments from the [team’s blog](https://5p0rt5beard.substack.com/p/playerchain-architecture):

> *“single player blockchains joining together to form a blocklace that results in totally ordered inputs.”*
> 
> *“Before a playerchain session begins, peers must find each other and share a key that ensures the group is private. Fast consensus relies on a known fixed group, rather than the time or money-based security that slows down consensus on a permissionless chain.”*

*“single player blockchains joining together to form a blocklace that results in totally ordered inputs.”*

*“Before a playerchain session begins, peers must find each other and share a key that ensures the group is private. Fast consensus relies on a known fixed group, rather than the time or money-based security that slows down consensus on a permissionless chain.”*

The team have built a demo game with code available on [GitHub](https://github.com/playmint/playerchain-demo?tab=readme-ov-file#-).

**Sparsity (**[**@**sparsity\_xyz](https://x.com/@sparsity_xyz)):

This team’s solution uses a multi-layered network architecture with dedicated blockchains per game, and then dedicated session blockchains for individual gaming sessions.

The session blockchains are ephemeral (per session) and operate in a peer-to-peer manner for a small number of players. That is to say that they are also permissioned just as with the local blockchains in the Playmint solution.

The details can be found in the Sparsity [whitepaper (v1.0](https://docs.google.com/document/d/1zah6nQmLEY--s_PuSZTg6YGuHWyA52ZJMtxyyPK99G0/edit?tab=t.0#heading=h.ftfro35bqhod)).

![](/images/0*Imm-G-S9H2YryPYU)

*A dedicated blockchain for each session, plus a dedicated chain per game.*

The local blockchain network for session should ensure high bandwidth, low latency, and zero gas fees (at the local level). The local blockchains can rollup to a dedicated game-specific blockchain, and then rollup again to an existing blockchain L1 or even a popular L2.

![](/images/0*PtOCqYbyBmHKD8lv)

*Illustration of a potential future MMO split into cells, where each cell has it’s own ephemeral rollup.*

Sparsity presented their solution at the a16z CSX NY demo day ([YouTube](https://www.youtube.com/watch?v=10DJLBg-B78)).

# Conclusion

Real-time decentralized gaming holds immense potential to reshape the gaming landscape, but it requires the collective effort of developers, technologists, and the gaming community. As the technology matures, we may witness the birth of games that are not only engaging but truly player-owned and governed.

Given the technology outlined here, real-time decentralized games are achievable today for small groups of players, as Playmint’s demo demonstrates. Scaling to larger audiences will require further R&D, perhaps through instancing and clever world map chunking techniques. A slower-paced world map may not necessarily a deal-breaker for gamers: it acts as a social layer with a community-building element, while fast-paced action happens in isolated instances.

The journey is just beginning, and with continued innovation, we may soon see decentralized MMOs rival traditional games in speed, scale, and player ownership.

# Links

-   [Zima Red podcast by Andrew Steinwold](https://%20https//anchor.fm/andrew-steinwold/episodes/Edward-Thomson---PhD-In-Astrophysics-Turned-Decentralization-Diehard---ep-25-efg2vs)
-   [Decentralized Gaming Association](https://x.com/DecentralizedG)
-   [Xaya](https://xaya.io/) — [Xaya Battleships](https://xaya.io/xayaships)
-   [Cartesi](https://cartesi.io/about/) / [Rives](https://rives.io/)
-   [Lattice](https://lattice.xyz/) — [Quarry](https://lattice.xyz/blog/introducing-quarry) — [EVE:Frontier Whitepaper](https://whitepaper.evefrontier.com/)
-   [Playmint](https://playmint.com/) — [playerchains](https://5p0rt5beard.substack.com/p/playerchain-architecture)
-   [Sparsity](https://www.sparsity.xyz/) — [whitepaper v1.0](https://docs.google.com/document/d/1zah6nQmLEY--s_PuSZTg6YGuHWyA52ZJMtxyyPK99G0/edit?tab=t.0#heading=h.ftfro35bqhod)