---
title: "The worlds of Web 3 Games"
date: "2019-01-13"
tags: blockchain,gaming,polkadot,web3,medium-archive
category: "blockchain-and-cryptocurrency"
description: "I’m imagining the future of online games with an eye towards something that is MMO scale but replaces the old player-to-server architecture which something that is peer-to-peer."
original_url: "https://edward-thomson.medium.com/the-worlds-of-web-3-games-7e4797126a94"
---

# The worlds of Web 3 Games

**tl;dr:** a continuation of my thoughts on an online multiplayer game that exists entirely on-chain. This part contains my thoughts on the in-game world.

I’m imagining the future of online games with an eye towards something that is MMO scale but replaces the old player-to-server architecture which something that is peer-to-peer. To realise this future I think we can employ a blockchain that stores the game state on-chain.

The reason to do this is to take advantage of the possibilities offered by the next generation of web technologies (what many people call “[web 3](http://gavwood.com/dappsweb3.html)"). I can foresee such “web 3 games” being self-hosted on the “serverless” internet. I also want to illustrate the fact decentralised games that make use of blockchain technology can also use other decentralised (non-blockchain) technology.

# Previous posts

This piece is the third post in a series of related articles.

Previous blogs:

-   “[Blockchain gaming: putting the state on-chain](https://medium.com/@edward.thomson/blockchain-gaming-putting-the-state-on-chain-cc3915090547)”.
-   “[Using Polkadot to power the future of online multiplayer games](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0)”.

In the first post I outlined why we should put game state on-chain. In the second piece I suggested that we can test this idea by creating a simple game that’s inspired by a game from the 80s.

In that article I also discussed the challenges of storing and proving the validity of character movement, and how that impacts combat, experience levels, and loot.

Towards the end of the article I threw out some thoughts on cross-chain trading of loot. However, the top of cross-chain interaction deserves some more thought. I’m going to throw out a few more ideas before I jump into the considerations of the game world’s state.

## Further thinking on cross-chain interaction

One crucial point to mention is while I think putting the game state on-chain will bring interesting new possibilities, the success of such a game will be limited unless there is an inability to allow for cross-chain (and hence cross-game) interaction.

![](/images/1*A70wCLBlwPUQcITwie1vwg.png)

*Visualising cross-chain interoperability ([Source](https://medium.com/polkadot-network/simplified-polkadot-developer-update-2-ffa0d98ef496))*

What will cross-chain interaction allow for?

-   In-game items could be purchased in bitcoin, ether, dai, zkDai, any other token.
-   Players will have a strong notion of ownership for their game assets. Such ownership will be easy to prove.
-   Game assets (characters / items) can be re-used in any other compatible game.
-   Using game assets in the coming wave of decentralised finance (e.g. as collateral or something else). Not saying you *should* do it, just that it is possible.
-   Games can make use of ‘oracle’ data stored on another chain. I can see this being useful for gambling: e.g. bets that depend on real world data.

Naturally, these aspects will rely upon a blockchain protocol that provides cross-chain interactivity such as [Polkadot](http://polkadot.network).

# The World State

In a blockchain game, or a web 3 game, where the state of the game is recorded on-chain I suggested in my [previous post](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0) that the state is:

> a combination of the world state (the game world in which we play) and the aggregation of all character states.

a combination of the world state (the game world in which we play) and the aggregation of all character states.

Otherwise stated: concatenate all of the individual characters states together to get the aggregate character state, then add on the state of the environment within which gameplay happens (“the world”).

I outlined the character states in the previous post, so in this post I will outline what I think makes up the world state.

The world is the environment that players interact with: e.g. terrain, monsters, loot, NPCs, and other objects such as buildings (including player houses). Clearly, the more content and features that are added to the game, the more storage space is required.

It is also possible that players can download a large amount of data to begin with (download a huge state, as you would for any modern game) then keep it synced up over time. It is worth noting that many modern MMOs have installation sizes of 10s of GBs of data, and that poses quite a challenge for replicating in such a model although I suspect a lot of that is graphics and wouldn’t need to be stored on-chain.

The first game to adopt such a model will probably have a simple game world with simple graphics. However, the data that’s kept on-chain (post-genesis) are the changes to the world (or at least proofs of the changes).

## World (Aggregate Location) State

The world is likely made up of several different locations and it is likely that the world may not be a single contiguous map. The ‘global’ world state would of course be an aggregation of the individual areas.

The world state will also need to keep track of environmental factors

-   A list of players present with their location (player GUIDs + location).
-   A list of items present with their location (item GUIDs + location).
-   Other environmental factors.

Players will probably have their location listed in their own state and I debated whether it made sense to also store player GUIDs in the world state. Ultimately, I think the world state should be as simple as possible, and it is redundant to list character locations in both world and character state, but I figure this will reduce computation time.

Perhaps this is something that doesn’t need to be in the world state since it is in the character state and the game clients can a meta-state locally and keep that up-to-date as the game state is updated. There is a similar debate for item states too.

Related tangent: Maintaining privacy of player locations will be a challenge (as suggested [previously](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0)).

## Generic item state

Here is a proposition for the properties (state) of a generic item:

-   Position
-   Owner
-   Stackable (yes/no)
-   Stack quantity (yes/no)
-   Equipable (yes/no) \[whether an item can be worn\]

![](/images/0*YO-pCocXEGfCSuLo.jpg)

*The inventory system of Ultima Online ([Source](https://forums.unrealengine.com/development-discussion/c-gameplay-programming/457-creating-an-ultima-online-like-inventory-system))*

Items can be pretty much anything from gold pieces (which are stackable) to swords and houses (neither are likely stackable once deployed, whether you allow them to be stackable in the inventory is a developer choice).

Potentially, there is a generic item or asset template that will allow for more complex items to be created by extending the item class or perhaps even by allowing items to be combined together (thinking composability).

NPC states are probably similar to that of characters (that was explored in the previous blog), but with a few differences to account for that the fact they they are controlled by the game rather than a player. They will hold assets in their inventory that can perhaps be looted upon death.

Some NPCs will form part of the story arc. This will surely entail further properties to be added to the state of such NPCs.

# Technical challenges of an on-chain world state

There are a number of technical challenges to solve in order to create an online game that meets the expectations of players. These are challenges that pertain the world state.

While it is obvious that the graphical experience will be diminished in the first generation of such games, there is still a base level of features that are required. The challenges ultimately relate to the falling themes:

-   Scaling,
-   Privacy,
-   Randomness,
-   Finality,
-   Incentives.

In the sections that follow I outline some of the key challenges and how they relate to blockchain game design problems.

## **Scaling via procedural generation**

In the original Rogue, the game levels were procedurally generated. I think that would be useful for the type of game I’m describing here as I think it should cut down on the amount of data stored on-chain.

![](/images/0*c9484nnZSN3sQWYA.png)

*One of the procedurally generated games: Rescue On Fractalus ([Source](https://en.wikipedia.org/wiki/Rescue_on_Fractalus!#/media/File:A5200_Rescue_On_Fractalus.png))*

This does not necessitate that the world is “random” or that it is different every time you play, but rather the world is deterministically generated a set of seeds rather than being stored all in memory. I believe this will also feed into monster spawns and loot generation.

## **Scaling with zkSTARKs**

One interesting possibility that emerged in the last year, is the use of zkSTARKs in blockchain. They should be able to provide privacy as well as strong scaling properties.

While the proof size of STARKs is large, relative to comparable methods, the proof sizes don’t grow much, and neither does the verification time, [with the complexity of the computation](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d). That is somewhat ideal for gaming where privacy is required and that complexity grows quickly as new features are added.

![](/images/0*Td1O8swr9UvzEZ_B.jpg)

*Overview of ZK schemes from Zooko Wilcox’s (of Zcash) [keynote](https://slideslive.com/38911617/privacy-for-everyone) at Devcon4.*

## **Privacy for items, housing, and loot**

Given the transparency of current blockchains, it is hard to hide the data that players would expect to keep private. No other player should be able to see what you hold in your inventory, nor your location, nor the location of something like an in-game player house. Furthermore, players should not be able to see what loot is dropped from an NPC monster before it is killed.

While players can share what is in their inventory, and players will see other people and objects in their vicinity, they shouldn’t be able to query the state of the chain and know where people are. Being located near another player has always been a key aspect of knowing something about them in previous online games. Potentially, you might share your location with friends too. In a centralised architecture this is easy to solve. In a decentralised game, it proves tricky.

The solution might be possible in something like zkSTARKs, but I suspect some of the privacy concerns can be solved with simpler technology too.

## **Randomness for resources, loot, and monsters**

On-chain randomness is still a challenge for blockchain, but is necessary for things such as loot and monster spawns. There needs to be a way to have objects appear at random within the game, but the value can’t be known particularly far in advance.

Resources will spawn randomly at known approximate intervals of time, however, it shouldn’t be possible for code-savvy players to get an unfair advantage by knowing when the resources will spawn far in advance of that event happening.

I know that researchers for both Eth 2.0 and Polkadot are looking into on-chain randomness. With Polkadot there is the potential for a randomness beacon to exist on one chain then send those values to another chain (a game chain) for re-use.

## **Loot and finalisation**

I mentioned this problem in the previous post since it relates to character states. Loot is gained from dead NPC enemies and then stored in player inventories (should the players picked up the items). Naturally, these items can be traded from player to player but we wouldn’t want players who cheated to be able to trade their ill-gotten items.

![](/images/0*R6k_ohqvcFevVNOb.jpg)

*I chuckled. ([Source](https://i.pinimg.com/474x/23/dc/3f/23dc3fdb85c9d04e58712c70678c8255--world-of-warcraft-horde-canvas-tote-bags.jpg))*

This means that there probably needs to be a delay between an item being picked up and that item being traded. If a picked up item improves a player’s stats, and subsequently would affect the result of combat (e.g. faster kills), then there should be a lag between picking up and being used. The delay provides time for the network to verify that the actions were valid.

Valid actions will become final which means that they can’t be reverted. This requires us to be certain that no cheating was involved. My intention for the design of blockchain games is that actions are simple / easy to verify, otherwise they possibly shouldn’t be in the game. Should there still be corner cases where verification fails then an on-chain governance mechanism would prove useful to revert malicious actions.

Introducing some element of delay would at least be the safest way, but I fear that it could dampen user experience.

## **Incentives for hosting and validating data**

Ideally, many of the players will host data and participate in sharing with the rest of the community. That said, there should probably be an incentive to do this.

Similar to Polkadot’s incentive mechanism, I think that if players are staked to nodes that they nominate as trustworthy to host data and validate data, then they earn some reward from inflation for being staked. The nodes that perform the data hosting and validation (could be separate nodes) can receive an additional amount of inflation for their troubles.

This would be a self-hosted and self-sufficient web 3 game. I think this is attractive for game developers as it ought to greatly reduce the cost for being the sole hosting provider of the game. Furthermore, it eliminates downtime and there is the possibility of having upgradable blockchains as described in a Polkadot blog (“[Never Fork Again](https://medium.com/polkadot-network/never-fork-again-438c5e985cd8)”).

These concerns of data availability and validation are actually common to all parachains within Polkadot. Developers are somewhat free to decide how they wish to enforce this, but if they don’t have a solid plan there is a chance that their parachain is rejected.

# Up next… governance and incentives!

In the next part I offer up suggestions on paying for development of an self-hosting open source game, plus some thoughts on game governance.

Next piece here: [Governance of and incentives for a Web 3 game](https://medium.com/@edward.thomson/governance-of-and-incentives-for-a-web-3-game-56edefb89cd4)