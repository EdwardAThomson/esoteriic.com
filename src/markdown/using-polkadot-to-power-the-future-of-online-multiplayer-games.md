---
title: "Using Polkadot to power the future of online multiplayer games"
date: "2019-01-08"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,defi,medium-archive
category: "blockchain and cryptocurrency"
description: "in this piece I propose a simple multiplayer RPG game that exists entirely on-chain."
original_url: "https://edward-thomson.medium.com/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0"
---

# Using Polkadot to power the future of online multiplayer games

**tl;dr**: in this piece I propose a simple multiplayer RPG game that exists entirely on-chain.

![](/images/1*fa5e_6dz217SEpZK8OGDWQ.png)

*Thanks to my colleague Iggy ([Web3 Foundation](https://web3.foundation)) for creating this awesome visualization.*

This article is the sequel to my piece titled “[Blockchain gaming: putting the state on-chain](https://medium.com/@edward.thomson/blockchain-gaming-putting-the-state-on-chain-cc3915090547)”. In the first part I outlined some of the problems of the centralised architecture of online games and suggested how future online games could benefit from using blockchain technology.

In this follow-up blog I will propose a simple game that fits with that architecture. I also delve into some possibilities that are enabled by an interoperating blockchain network such as [Polkadot](https://polkadot.network).

I’m imagining a future where game data is stored on a blockchain chain, a future where in-game items to be purchased in bitcoin, ether, or any other token, and game assets can appear in multiple blockchain games because the players have true ownership.

In this piece I only consider part of the the requirements to bring such a game to life. I mostly focus how the characters of such a game. Considerations of how the world should function will come in a follow-up post.

# Recap of problems identified

In my previous blog I outlined why we might want to put the entire game state on-chain. I alluded to the ability to verify actions and to also improve item ownership. Data that is on-chain should be easy to verify, which means that player actions will be easy to verify.

The main problems are:

-   Ownership of items is poor in the current model of online games.
-   Action verification is weak and highly asynchronous.

With blockchains you get a consensually agreed upon and cryptographically protected iterated history.

![](/images/1*yRgLh-SQQ1Z-8g7liV45XQ.png)

*Cross-chain interaction with [Polkadot](https://polkadot.network/) ([Source](https://polkadot.network/static/media/RelayChainGraphic.f905d3d0.svg))*

In addition to solving these problems, I’d like to see cross-chain interactions where players of one game could feasibly appear in another (items, stats, and all!). Naturally, that would mean that the state could be rather large and if such data was dumped on to a current mainstream blockchain it would bloat it. This requires sidechains (c.f. POA Networks) or parachains (c.f. [Polkadot Network](https://polkadot.network/)).

The first game to do so will probably be quite simple and that is exactly what I plan to outline in the rest of this article. However, a pretty radical idea would be building the game to have its own instance of Polkadot, and that the players are their own parachains.

# Rogue: looking backwards to move forwards

Given the scalability issues that we saw when CryptoKitties hit peak popularity, it probably sounds like a wild suggestion to put the entire state of a game on-chain. However, I believe that it is possible if we employ the latest techniques in blockchain scaling.

We are a long way from ever putting the entirety of a complex game like EVE or World of Warcraft on to a blockchain, and I have no way of even guessing a timeframe for when it might be possible, but instead I shall outline a simple game that could feasibly “fit on-chain”.

People of a certain vintage will fondly recall playing [Rogue](https://en.wikipedia.org/wiki/Rogue_\(video_game\)). A classic RPG game from 1980 that has inspired myriad clones since its inception. It is about as simple an RPG as you will find and is exactly what I think the next generation of blockchain gaming could look like. The mechanics, at least, but with better graphics!

There is even a cottage industry of hobbyists creating new [Roguelike games](https://www.reddit.com/r/roguelikedev/), and better yet a [plethora of](https://www.gridsagegames.com/blog/2018/10/how-to-make-a-roguelike/) [tutorials](https://www.gridsagegames.com/blog/2018/10/how-to-make-a-roguelike/) to learn how to create one. Figuring out the basics is easy!

![](/images/1*JXvQ1qsuEOUjxvdAKMvABQ.png)

*Rogue. A classic game from 1980 (Source: [Wikipedia](https://en.wikipedia.org/wiki/Roguelike#/media/File:Rogue_Screen_Shot_CAR.PNG))*

The simplicity of Rogue means that the data requirements should be small enough such that the state could comfortably fit on a dedicated blockchain. Given the power of modern computers and the amount data that we can potentially, we can probably push blockchain games beyond a multiplayer Rogue and be more comparable to [Ultima Online](https://uo.com/getting-started/).

## Note on graphics

Graphics don’t necessarily need to be stored on-chain. A simple set of sprites could certainly be stored on inside the game client. Obviously, they shouldn’t be sent those via extrinsics (transactions). If players use essentially use the same client then they will see what other players see. Minor modifications to graphics shouldn’t really affect gameplay. What matters is that players can verify each other’s movements and actions.

# Game State: what does it look like?

I expect the game state to be a *combination* of the world state (the game world in which we play) and the aggregation of all character states. Potentially, we just need to save state proofs rather on-chain: i.e. in an encounter between two players, they must be able to check that their respective characters are valid.

If the game characters are not stored on-chain then it may be acceptable then we really need a proof that the player’s state (i.e. character stats such as positions, strength, etc) is valid. This would help to reduce the amount of on-chain storage but may increase computation times.

An individual character state:

-   Character identification (e.g. GUIDs, name)
-   Character Stats (e.g. Position, Speed, Strength, etc)
-   Items (e.g. weapons, armour / clothing, game currency)
-   Optional: magic spells and similar abilities.
-   Hash of the current character state

In this model of gaming, characters and items are NFTs. All characters and each individual item will be identified by Globally Unique IDs (GUIDs). I think both a sequence number and a hash of the public would be ideal: the latter as a payment address, and the former as a simple way to identify each character.

![](/images/1*oiU8edP3PdAE7X6xoo8JFA.jpeg)

*An example of character stats in Ultima Online ([Source](http://panemon.20megsfree.com/accts/jed.jpg))*

If we get creative then there are a lot more stats that could be added, but the main point of this article is just to get across a reasonably minimal state of characteristics for a simple but functional multiplayer game.

As character states will be composed of multiple token types, it seems likely that something like [ERC 1155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md) will be of great use to this model I am proposing. I was just reading about this new token standard and wanted to include it here. Blockgeeks have done a nice [ERC-1155](https://blockgeeks.com/erc-1155-token/) write up too.

I didn’t suggested adding empty stats to the character state in anticipation for future updates to the game, but rather I think new stats can be added through governance (a topic for a [later blog post](https://medium.com/@edward.thomson/governance-of-and-incentives-for-a-web-3-game-56edefb89cd4)).

One undeveloped thought is that there could be a “time penalty” stat. The idea is that badly behaved players could be given a time-out, in lieu of slashing their funds. They would not be able to move or perform any action until a future stated block number when they are unfrozen again.

# Actions are state transitions

When the game world is updated or a player’s state is changed then these updates will be stored on chain. Any update to a blockchain’s state is done via a state transition function. This is the *expensive* part of having a game that stores the state on-chain.

## No gas needed!

![](/images/1*qiaVOorkNOFp6jCjArWIEg.jpeg)

*No gas needed! ([Image source](https://previews.123rf.com/images/alexalmighty/alexalmighty1608/alexalmighty160801182/69438206-forbidden-sign-with-abstract-gas-station-icon-isolated-on-white-background-gas-station-is-prohibited.jpg))*

Putting such a game on to a general purpose blockchain such as [Edgeware](http://edgewa.re) or Ethereum will incur gas costs. Given the incredible generality of both chains then it is absolutely necessary to have metered actions (fuel) in order to prevent infinite loops.

If developers build a blockchain with [Substrate](https://medium.com/paritytech/substrate-has-arrived-f14f91536278), they have the freedom to build a blockchain that’s customised to their use-case. It isn’t necessary to build a game on top of Turing-complete blockchain: players will not be deploying generic smart contracts.

Player actions (state transitions) will be well defined and highly limited. They won’t be allowed to perform an unlimited number of actions. There are reasonable limits to what a player is expected to do within a given time window. Therefore, we can *consider* removing the gas costs entirely.

## Player Movement

I think handling player movement will be one of the hardest challenges to get right. Potentially, movement will be turn based in the first iteration of such a game, but ultimately I don’t think it is strictly necessary. Ideally, a player’s movements appear smooth and fluid in the game’s graphics.

The front-end client will capture a continuous stream of input from the keyboard and mouse, but the data that’s stored in a block is obviously discrete. It is important for nearby players to see your movements in real-time (just as you do); however, the exact stream of movements won’t have to replicated on-chain.

Some amount of data sharing between players in the same area can be done peer-to-peer, off-chain, to ensure that the graphical elements are seamless. This will be particularly necessary for combat. The movement data that’s committed to the chain needs to have consistency checks to prevent players from cheating, but it won’t be necessary to have every tiny movement verified.

A simple consistency check is whether the change in position, from the end of the previous block to the end of the new block, was greater than the maximum allowed speed of the player.

![](/images/1*ijrrGXgVdsvD2BWJCNREKA.png)

*Illustration of dividing up a path into discrete chunks.*

If the movement data is sampled such that there are N number of “steps” per block, then each step can be verified that the change in distance over time wasn’t greater than the player’s max speed (e.g. dx/dt =< max\_speed). One problem here is that the time between blocks (blocktime) is not fixed, but I think there will be a practical solution here such that it isn’t a huge problem.

Clearly, this could produce a lot of data and perhaps a lot of this data is essentially noise. My proposition is not fully optimised, so it will be interesting to see what developers can devise when tackling this problem.

**Determinism: fixed vs floating point**: as the Wasm sandbox provided by Substrate is completely deterministic by design, there are no floating point numbers. Floats are a natural way to represent decimals, but I suspect that it should be fine to use fixed points to solve this issue. I don’t think we need huge precision for the on-chain data stored either.

**Example Implementation**: if the game runs in the browser then the front-end part of the client could be written in javascript (+HTML). While the front end captures the keyboard and mouse, the data has to be ‘sent’ to the Substrate client providing the backend. A Substrate module will put the data into an extrinsic (a “transaction”) and send it to the other nodes in the network.

The game logic will execute in the front-end, while the back-end will be responsible for checking the data and putting it on-chain. The Substrate back-end will also check the new blocks that comes from the rest of the network.

Similar to Polkadot, the blocks can be produced at a fast rate with probabilistic finality, but absolute finality can come later (c.f [GRANDPA](https://medium.com/polkadot-network/grandpa-block-finality-in-polkadot-an-introduction-part-1-d08a24a021b5)). For cross-chain trading of game assets it will be necessary to have absolute finality eventually.

**Position Privacy:** Anyone who plays online games will know that you position is not broadcast to every player. It is only known to friends, or players in your immediate vicinity. If position is stored on-chain then it is public by default. This requires more thought.

## Combat, levels, and experience

As mentioned, game stats will be stored on-chain. Experience points and the progression of stats will also be stored on-chain. Updating player stats involves updating the game state and is performed by the transition function. Combat relies upon player movements being accurate and valid, so it is necessary to solve the problems with movement before working on combat.

While combat will be calculated in the game client, the outcome must be verified by the other nodes in the network. Consequently, experience points (and new combat levels) can’t be awarded until the corresponding blocks are finalised.

This should be true of loot too: rewards won inside the game can’t be used / spent until the relevant blocks are finalised. If a player kills a monster and picks up gold pieces, then the game should block the reward being spent until it is finalised. This would at least be the safest way, but I fear that it could dampen user experience.

If blocks are reverted then it will be problematic for gameplay. In current online games transactions are always final. Probabilistic finality may be fine for open world gameplay, but in instanced gameplay (e.g. dungeons) where rewards may be higher then we may rely on absolute finality before fully assigning rewards.

# Cross-chain trading of loot

Once loot has been collected after combat, and the blocks finalised, it will be possible trade these game items to other players. Moreover, with cross-chain transactions it would be possible to trade assets across chains and therefore across games.

![](/images/1*A70wCLBlwPUQcITwie1vwg.png)

*Visualising cross-chain interoperability ([Source](https://medium.com/polkadot-network/simplified-polkadot-developer-update-2-ffa0d98ef496))*

A sword in one game hosted on Polkadot could be traded to another game and used there. Naturally, there is a level of trust required between the two. The games should ideally mutually trust the state transitions of each other.

Cross-chain trading is helped by the fact that each item, and even each character, is an NFT. The same could be true of in-game land, and perhaps any other asset of conceivable value. The ‘magic’ is that they are all unique assets. That’s not to say that I have an exact solution for this will work, but interestingly, one of the teams building on top of Polkadot has indicated that they would build an NFT exchange (at the time of writing their website is down).

# Up next….

In the next piece I will discuss further the game state, in particular the game world which is a part of the game’s on-chain state. There will also be consideration for incentivisation: both for hosting the game data and paying for future development work.

Next post: [The worlds of Web 3 Games](https://medium.com/@edward.thomson/the-worlds-of-web-3-games-7e4797126a94)

# About me

Currently, I work at the [Web3 Foundation](https://web3.foundation/), covering numerous responsibilities (such as security and communications). This blog is of a personal nature. It just so happens that my hobby aligns with work.

One of the main projects of the foundation is the [Polkadot network](https://polkadot.network). A next generation blockchain platform. To read more about the innovation that Polkadot is bringing to the blockchain industry I invite you to read the following blog post: [link](https://medium.com/polkadot-network/how-polkadot-tackles-the-biggest-problems-facing-blockchain-innovators-1affc1309b0f).

# Questions / Comments?

You can create a reply to me here on Medium, or reach out to me on Twitter: [@EAThomson](https://twitter.com/EAThomson).