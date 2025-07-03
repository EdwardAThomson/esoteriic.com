---
title: "The Future of Real-Time Decentralized Gaming — Part 2"
date: "2025-01-16"
tags: blockchain,gaming,ethereum,defi,investment,medium-archive
category: "blockchain and cryptocurrency"
description: "Part 2 of Real-Time Decentralized Gaming"
original_url: "https://edward-thomson.medium.com/the-future-of-real-time-decentralized-gaming-part-2-de1aa78bb67a"
---

# **The Future of Real-Time Decentralized Gaming — Part 2**

**tl;dr**: more teams are working on this problem than I realized!

In my [previous blog](https://medium.com/@edward-thomson/the-future-of-real-time-decentralized-gaming-528a248f766a), I introduced a number of teams who are working on real-time decentralized gaming. Unlike traditional gaming models that rely on centralized servers, decentralized games operate “on” blockchain networks, offering enhanced transparency, ownership, and fairness. However, achieving real-time, synchronous gameplay in a decentralized environment poses unique challenges.

![](/images/0*cA8XM83nM2gJNzXD)

See part 1: [The Future of Real-Time Decentralized Gaming](https://medium.com/@edward-thomson/the-future-of-real-time-decentralized-gaming-528a248f766a).

> tl;dr: we have the seeds of real-time decentralized gaming now. Introduction Decentralized gaming represents a revolutionary shift in how games are developed and played. Unlike traditional gaming…

tl;dr: we have the seeds of real-time decentralized gaming now. Introduction Decentralized gaming represents a revolutionary shift in how games are developed and played. Unlike traditional gaming…

I think solutions should exist and have suggested that for a number of years. There is something about the challenges that \*feel\* like they should be solvable, even if the evidence until recently was fairly minimal. Now in 2024 we can see a number of efforts in this regard.

If you missed the first part, I recommend reading Part 1 for an introduction to the appeal, the challenges, and the current state of decentralized games. In this follow-up, I aim to spotlight four *more* teams that are pushing the boundaries of decentralized gaming and deserve attention for their innovative work. I missed these from the first blog as I either didn’t know about them, or I didn’t appreciate they were working on real-time gaming.

So let’s jump into this.

# Off-chain computation with ZKPs

**Hylé** ([@hyle\_org](https://x.com/@hyle_org))

The team is building its own Layer 1 blockchain with native zero-knowledge proof verification. The key here is to push heavy computation off-chain, as with many other techniques mentioned in the previous blog, but the approach here is to leverage ZKPs. Moreover, Hylé has no on-chain execution or virtual machine, but there is proof verification on-chain.

In this approach, transactions are submitted and sequenced but not proven straight away. A proof is sent eventually, then verified ensuring that the transaction is settled. This approach is more general than gaming, but clear to see why it is appealing for decentralized gaming.

![](/images/0*InhXEzVBJztQ1ITC)

That said, more infrastructure would be required for real-time gaming. I’d guess that players would run something locally, perhaps a blockchain, or some sort of multiparty computation, and then a proof of the gameplay is submitted for verification. To that extent it would be like a state channel approach, although one can foresee how it could fit with rollups too.

**Dojo** ([@ohayo\_dojo](https://x.com/@ohayo_dojo))

Dojo is self-described as “an [open-source toolchain](https://github.com/dojoengine/dojo) for building provable games and autonomous worlds”.

The team’s initial approach seemed to be about building a framework and toolchain for putting “everything” on-chain: i.e. all game state and logic resides on a blockchain. However, it seems that there is a slight pivot in recent times.

The new focus is about using the [Cairo language](https://www.cairo-lang.org/) for provable computation. Cairo is also the smart-contract language of Starknet, an L2 blockchain (Validity Rollup) that is verified over Ethereum.

Developement of Dojo is led by Cartridge ([@cartridge\_gg](https://x.com/@cartridge_gg)), with significant contributions from Realms & BibliothecaDAO.

## Get Edward A Thomson’s stories in your inbox

One of the most notable examples of games is Eternum ([@RealmsEternum](https://x.com/@RealmsEternum)). The game is already live with the promise of some interesting additions coming in the form of AI agents:

# Local chains (DAGs)

**Tashi Protocol** ([@tashiggofficial](https://x.com/@tashiggofficial))

Tashi is building along similar lines to Playmint. Their solution also seeks to deploy local DAG networks between players. Keeping consensus issues to a small number clearly reduces a lot of overheads. The website mentions that their consensus engine is proprietary which makes it unsuitable for decentralization. Their GitHub page has bindings to this proprietary code.

It is technically possible to deploy a decentralized network, and even to have a fairly well-distributed set of token allocations, but the lack of public code for the consensus engine forced a lot of trust to be placed into the dev team which his antithetical to the spirit of the blockchain space. That said, I acknowledge that not everyone values that and that is definitely possible for this team to be successful. Opening up the code will be net beneficial to everyone.

**Topology** ([@topology\_gg](https://x.com/@topology_gg))

The solution has at least two main components, a local-first [Conflict-free Replicated Data Type](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) (CRDT), and a [hashgraph](https://en.wikipedia.org/wiki/Hashgraph). While CRDT solutions are generally robust, they are not completely resistant to Byzantine faults. The team propose using a hashgraph, which is a variant of a DAG-based solution, to bring in Byzantine fault protection. The overall solution is similar to a few of the solutions proposed by other teams, for example Playmint and Tashi.

![](/images/0*Y27O21olW4Chiyia)

*A diagram from the whitepaper with a hashgraph*

As with other teams, splitting local from global consensus is essential for real-time gaming efforts. Local consensus can be found amount a small number of nodes in a short-space of time, and can be quicker still if there isn’t a strict requirement on sequential ordering. The latter is part of the reason blockchains are slow (although secure).

The [whitepaper](https://paper.topology.gg/drp-whitepaper.pdf) is fairly detailed and it would be hard to summarize it here. It isn’t the easiest topic to digest, but it does seem to be quite thorough. Suggestions about the use of ZKPs and ephemerality are common solutions for dealing with a rapidly expanding amount of data.

# Final Thoughts

These teams demonstrate innovative approaches being taken to solve the challenges of real-time decentralized gaming. While the road ahead is undoubtedly challenging, the progress made by all teams gives a glimpse of what’s possible.

As the decentralized gaming space continues to grow, it’s worth keeping an eye on these projects and the ones mentioned in part one. No doubt there will be failures along the way and it is necessary to build more than just infrastructure. There must be games and those games need traction in order to prove a project is successful.

That said, it feels like there might be enough attention on this problem that a real-time decentralized game is possible. We’ve seen a few running examples already, but the question is now about seeing the same tech deployed at scale. Solving this problem for gaming will also mean faster decentralized apps in general, not just gaming.

More investment and more people working on these challenges are needed!

If there are other teams or projects you think deserve a spotlight, feel free to share them in the comments or reach out.

# Links

-   [The Future of Real-Time Decentralized Gaming — Part 1](https://x.com/EAThomson/status/1869150752393867271)
-   [hyle.eu](https://hyle.eu/)
-   [dojoengine.com](https://dojoengine.com/)
-   [tashi.gg](https://tashi.gg/)
-   [topology.gg](https://topology.gg/)