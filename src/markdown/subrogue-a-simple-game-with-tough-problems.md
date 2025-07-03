---
title: "SubRogue: a simple game with tough problems"
date: "2020-01-05"
tags: blockchain,polkadot,web3,medium-archive
category: "blockchain and cryptocurrency"
description: "I address the constructive feedback I received on my idea of a blockchain Roguelike."
original_url: "https://edward-thomson.medium.com/subrogue-a-simple-game-with-tough-problems-87748fe2839c"
---

# SubRogue: a simple game with tough problems

**tl,dr**: I address the constructive feedback I received on my idea of a blockchain Roguelike.

[In a previous blog](https://medium.com/@edward.thomson/subrogue-8c0a537f02d4) I suggested building a seemingly simple Roguelike game that I dubbed SubRogue. I suggested a single player game with procedurally generated dungeon that was connected to a blockchain, such a game requires a source of random value to produce the dungeon.

![](/images/0*DP2BZw7BymMBK170.png)

*Something I put together quicker than you can read this! :-)*

Most feedback on the blog was positive. Yay! Although I did receive some negative comments like “why bother, this doesn’t need a blockchain”.

Well, I wasn’t presenting a finished product. Only a concept. My hope was to inspire people. That said, I did outline a number of features which are improved or only possible when such a game is connected to a blockchain, so the criticism wasn’t entirely valid.

The most valid criticism concerned the source of the random numbers and how those numbers were used. Generating good on-chain randomness is a hard problem to solve.

In this piece I will recap the game idea and then present the problems highlighted in various conversations, plus I hope to provide some potential solutions to these problems. I don’t promise solid fixes, but rather reasonable best guesses.

# SubRogue — what did I propose?

Roguelike games are typically 2D, RPG styled games with procedurally generated dungeons. Gameplay is turn-based, grid-based and single character focused. While the original Rogue was set in a fantasy world, the style can be applied to other story settings.

## Game Summary

Here is a summary of what I proposed:

-   Rogue-like that connects to a [Substrate blockchain](https://www.parity.io/substrate/).
-   Uses on-chain randomness for procedural generation of maps and spawning of items.
-   Simple mechanics, but complex enough to be an entertaining challenge.
-   Multiple players and games on one chain.

The features that really need a blockchain:

-   Public and verifiable account history that is protected.
-   Provably fair gameplay (prevents cheating).
-   Trade accounts or items with the guarantee of [true ownership](https://medium.com/@edward.thomson/true-ownership-needs-provable-on-chain-assets-cf347ff0f384).

# What are the problems with SubRogue (and how to fix them)?

## Problem: passive random values can be ignored

If the player passively obtains random values from the chain, then a player could ignore all hash numbers that generate a *bad* dungeon and lead to a bad outcome. Some block hashes will likely generate a nicer dungeon than others.

**Fix**: One solution is to have the player sign a message (a transaction) that commits them to taking the next unseen random number. This number could be the next block hash, or the block hash in a few blocks time. I’m not convinced block hashes are the right thing, but for simplicity of discussion I will pretend they are.

Furthermore, there needs to be a way to freeze the player from taking a new random value, or perhaps they should pay a penalty. With on-chain randomness the values are stored *forever*, so there isn’t really a liveness issue in that regard.

Naturally, anything that’s put on-chain is expensive, so if there is a way to do some multi-party computation that’s off-chain but later provably on-chain then that is probably better. I do fear there might not be a good way to do that.

In addition, good game design should help to mitigate one particular hash number being privileged. How so? Try to enforce minima and maxima on enemy spawns, item spawns such as gold pieces or anything else.

## Problem: Entire map is revealed at the start

In the simplest design you take a single random value and generate the entire dungeon from it. For a human, the map is hidden on the screen and must be revealed as you traverse the dungeon. However, once the dungeon is revealed a player could try to ‘exit’ via a timeout (or whatever) if the dungeon looks hard. Part of the fun of these games is to explore the dungeon and experience the “[fog of war](https://en.wikipedia.org/wiki/Fog_of_war#In_video_games)”.

![](/images/1*qDYYZnEvUUCfKKGzdNm0RA.png)

*Mock up to help visualise: seeing the whole dungeon means you can plot the safest path ahead of time.*

In addition, a bot could try to compute the best path through the dungeon. There is a chance that a bot could compute some optimum path that can avoid much of the risk of the dungeon by cleverly out-running the enemies while picking up all the treasure.

**Fix**: Dynamically generate the dungeon as the player moves. This means that the dungeon isn’t revealed entirely at the beginning and that new random seeds are needed to generate new dungeon segments. Given that passive randomness is a problem, these new random values should probably come from the chain (or some other distributed generation of randomness).

There should be some smart game design that prevents a bot avoiding all the risks while picking up all rewards.

## Problem: Random Number Generation

Generating public random values, either on-chain or off, is hard. There are many ways in which a player can collude with the nodes producing the random values in order to bias the outcome. Block withholding is one such problem, but brute forcing is also potentially a problem here. If the player can guess lots of possible paths then there could be ways they can use that to bias random number generation.

Block withholding is when a miner (or validator) withholds a random number it doesn’t like in order to influence the outcome of a game. Daniel Kraft (from [Xaya](http://xaya.io/)) wrote an interesting paper about block withholding from miners: [Game-Theoretic Randomness for Blockchain Games](https://arxiv.org/pdf/1901.06285.pdf) (PDF).

**Fix**: Ok, so this one is still a bit of an unsolved problem. Multi-party computation of a random number has a number of problems which is made all the harder when the numbers are public.

There are a number of suggested solutions to on-chain randomness: such as using a VRF or something like RanDAO. Both seem like solid suggestions but I don’t have the space to go into depth here. The Polkadot wiki contains a good discussion on these: [link](https://wiki.polkadot.network/docs/en/learn-randomness).

My colleague Bruno has created a useful YouTube video that introduces these advanced algorithms ([the video](https://www.youtube.com/watch?v=ZVWqcxe-KKY) should show here):

## Problem: Generate random numbers at high speed

Now do the random number generation at high speed.

**Fix**: Well, I think it sort of depends how fast we really need and depends on how quickly you can cross a dungeon segment. You don’t want to be waiting a long time for loading the next area, so there is potentially a game design choice here. The game could be designed in such a way that crossing a segment is comparable to the block-time (assumes new random number comes from the chain).

Potentially, this can be done off-chain in order to increase speed. Eventually, the evidence needs to be submitted on-chain such that the other nodes can check the validity of the gameplay.

## Problem: brute-force many possible paths with passive randomness

When I was first thinking about how to make a Roguelike game “on the blockchain”, I was trying to avoid transactions as I figured they are generally expensive. I was hoping that it might be possible to generate the dungeons passively using (e.g.) block hashes. However, as we can see above that gives all the power to player to generate the dungeon.

Even with a dynamic map that’s generated on-the-fly as the player traverses the dungeon, a bot could brute-force all possible paths within the currently revealed map section to find the best path within that dungeon segment.

**Fix**: Well, there are trade-offs here. There isn’t exactly an easy fix if you want to stay passive. I think that you ultimately need to sign for a random number and commit to it ahead of it being revealed.

I tried to come up with various fixes for this problem that allows the random values to still be taken passively, but it is computationally expensive to try and brute-force all possible combinations of dungeon. Here is my thinking, which may still prove useful for developers.

**Option 1**: generate a small segment of the dungeon with each random number, that way very little is revealed. The problem here is that you need a fast source of randomness (if from block hashes then you need ultra short block times). You don’t want the player to wait a long time for a new segment to generate.

**Option 2:** To avoid a multiple long loading times, you could generate larger segments of the map from a single hash. However, the more you reveal, the more you allow to be brute-forced.

However, the real problem here is that a cheat may just wait a long time to get a hash number they like. Passively taking random values is too easily ‘gamed’.

![](/images/1*f2GpDry7XpQxrwnHWTBzpg.png)

*Left: small segments require fast block times. Right: large segments need brute-force protection.*

I wondered if some economic incentivisation could possibly discourage that: i.e. encourage fast generation with a reward, but make limit brute-force attacks by making the dungeon generation function ‘slow’. It is worth considering what the risk-reward should be within each segment.

Using a heavy hash function within the dungeon generation function can ensure that generating a new segment of the dungeon is easy enough, while also ensuring that computing all possible dungeons is computationally difficult.

Suggestions for choice of heavy hash function (or key derivation function) are [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) and [Argon2](https://en.wikipedia.org/wiki/Argon2). One of those coupled with a choice of input parameters should ensure a large enough number of permutations.

Here is a first guess of a dungeon generating function, **F**:

-   **Random\_seed** — this comes from the network and forces this new dungeon segment to be unique. If a player has actively signed a transaction for this number then we can have some faith that the dungeon generation can not be heavily manipulated by the player.
-   **Block\_hash** — this comes from the chain and I figured it forces the calculation to be unique in time, but this may be redundant with the random seed actually (this was probably more useful before when I was still considering passive random numbers).
-   **Player\_location** — is the coordinates of the player when generating the next dungeon segment. This will have multiple possible inputs and will depend upon the path taken, plus how the current dungeon segment was generated (which in turn relies upon the previous segment). While the number of locations is fairly limited, and can be partially predicted ahead of time, I hope that the nesting of parameters within the hash function make it harder to parallise this calculation.
-   **Step\_number** — is a simple count of the number of steps of the player. I hope it adds extra difficulty since if you walk back on yourself you would affect the output of this function. This value will monotonically increase, it increases even if you visit the same square twice.

The output is another pseudo-random number that will be used to construct the rooms and passageways.

**Rationale**: If the reward per dungeon is low then there is less economic incentive to spend time (money) brute-forcing many paths for a small reward.

The cost of generating all dungeon possibilities is ideally greater than just generating the next dungeon segment and pkaying, such that even if you can wait as long as you like between segment generation there is no point waiting a lot of time for minimal reward. For example, if it takes 0.5 seconds to generate a new segment then it is still quick enough to compute once, but slow to brute-force.

# Final thought…

There are a number of technical challenges that are necessary in order to minimise cheating, but I think there are also game design issues that can make constrain the extent to which cheating has an impact.

I fear that devs put off building their game because they don’t have the perfect solution to on-chain randomness, but here’s the the thing: your game might not be enjoyable anyway.

Games should be fun and it is worth getting player feedback on the game itself. Even if you solve the randomness problem you won’t make any income if no one plays the game.

So even if the current sources of randomness are poor, the source can easily be changed in the future once such an algorithm is found. I think it is worth developing something and acknowledging that it is a proof-of-concept.

# Acknowledgements

I’d like to give thanks to the following people from feedback on my previous blog or for engaging in discussion about random number generation.

[Killari](https://twitter.com/Qhuesten), [Clement](https://twitter.com/clementcodes), Andy and Daniel (from [Xaya](http://xaya.io/)), [Ronan](https://twitter.com/wighawag), plus [Bill](https://twitter.com/BillLaboon) / [Logan](https://twitter.com/logansaether) and [Bruno](https://twitter.com/bitfalls) (from W3F). I’m sure there are others too, apologies for missing you out.

# About me

Currently, I work at the [Web3 Foundation](https://web3.foundation/) (mainly running the [grants program](http://grants.web3.foundation/)). This blog is of a personal nature. It just so happens that my hobby aligns with work.

One of the main projects of the foundation is the [Polkadot network](https://polkadot.network/). A next generation blockchain platform. To read more about the innovation that Polkadot is bringing to the blockchain industry I invite you to read the following blog post: [link](https://medium.com/polkadot-network/how-polkadot-tackles-the-biggest-problems-facing-blockchain-innovators-1affc1309b0f).

# Questions / Comments?

You can create a reply to me here on Medium, or reach out to me on Twitter: [@EAThomson](https://twitter.com/EAThomson).