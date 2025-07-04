---
title: "Blockchain gaming: putting the state on-chain"
date: "2019-01-02"
tags: blockchain,gaming,polkadot,cryptocurrency,web3,medium-archive
category: "blockchain and cryptocurrency"
description: "online games are entirely centralised, but blockchain could improve that."
original_url: "https://edward-thomson.medium.com/blockchain-gaming-putting-the-state-on-chain-cc3915090547"
---

# Blockchain gaming: putting the state on-chain

**tl;dr**: online games are entirely centralised, but blockchain could improve that.

First off, I wish to wish everyone a Happy New Year! In this piece I’m going to outline my thoughts about putting the entire game state on to a blockchain. Not just simple transactions but everything! That would include all actions, or at least the outcomes of each and every action.

I should state that this is a personal piece so it doesn’t benefit from the great editorial abilities of my colleagues! I’m doing a bit of future gazing here and trying to imagine what the future online (and blockchain) gaming would look like. I think such a future is possible, and that [Polkadot](http://polkadot.network) will make it possible.

# State of the art: current blockchain games

To say that I’m excited about the future of blockchain gaming is an understatement. In this article I’m going to lay out what I’d like to see from future blockchain games.

While CryptoKitties was a big hit, it wasn’t a game that interested me. It did highlight the scalability issues inherent within the current generation of blockchains. That said, I was suitable impressed with the [PlasmaDog](http://plasmadog.hoard.exchange) game created by [Hoard Exchange](https://blog.hoard.exchange/how-hoard-created-the-first-omg-network-application-plasma-dog-62f139ec3dd4). I saw them demo it at DevCon IV.

It’s a fun game and illustrates a promise of things to come. To the best of my understanding the game state doesn’t exist on-chain; however, it does leverage OMG for ownership and trading of Plasma Dog tokens.

![](/images/1*KKPpkr4BWBlfnQus6ZIY1w.png)

*[Plasma Dog](http://plasmadog.hoard.exchange): An in-game shot I took while playing.*

For future blockchain games I think it will be necessary to use application specific chains (cf. parachains / sidechains / dappchains). This is necessary to prevent the parent chains from becoming bloated with game data, espescially if the entire state of a game is to be stored on-chain. Before I outline how that might look, I will describe how current online games work and point out some of the problems that the model has.

# The current model of online games

Some of the most popular games today allow you to play alongside hundreds of other people in an online world. At the core of these games is the ability to be involved in shared experiences such as cooperative tasks and storytelling.

Typical gameplay activities are:

-   Players fighting with and alongside other players.
-   Earning experience points to improve character abilities.
-   Collecting and spending in-game currency.
-   Collecting and purchasing items (including wearing such items).

Servers for the most popular games are online 24/7 and boast an incredible amount of player activity. This underscores the fact that the industry is both [healthy and growing.](https://en.wikipedia.org/wiki/Video_game_industry#World_trends)

The relationship between the player base and developers could be summarised as “the players pay for the privilege of accessing the game”. The payments cover the costs of development (both initial and ongoing) and the costs of hosting the game servers. It is right that developers earn money for their development efforts and are able cover costs for hosting the servers. It is also fair for the company to make profit and thrive.

## Problems of ownership

I hold a deep appreciation of developers to create and maintain great games, but there are problems with the current model. All of this activity and its associated value are ‘locked’ into silos. All game data is owned by the development company and stored in centrally hosted databases. This is a peer-to-server relationship.

Should the development company go bust, the servers will disappear. Your character will be gone and any items that players collected or purchased will vanish. This is a huge loss if you consider that players spend hundreds of hours clicking rocks and killing monsters. The rewards of such efforts would also disappear.

That’s bad enough, but it is also possible for players to lose their character (and all of its value) should they fall foul of arbitrary rules. I don’t mean cheating, but rather developers may delete old accounts if the player hasn’t performed a particular action within the last X number of months.

This is a big problem because in-game items can be worth hundreds or even [thousands of dollars](https://successstory.com/spendit/most-expensive-virtual-items-in-video-games). A few examples:

-   [“Player Sells Virtual Resort for $635,000.00 USD”](https://www.prnewswire.com/news-releases/planet-calypso-player-sells-virtual-resort-for-63500000-usd-107426428.html)
-   [Bloodbath of B-R5RB](https://en.wikipedia.org/wiki/Bloodbath_of_B-R5RB), an in-game EVE war, saw *losses* at an estimated real-world value of circa $300,000 USD.

![](/images/1*4VLUpHFvDtRHhAqGtGzdDA.jpeg)

*An in-game shot from EVE Online (Source: [Wikipedia](https://en.wikipedia.org/wiki/File:EVE_Online_-_Caldari_Freighters.jpg))*

All of this value is centralised and often locked to the developers. While real money trading is possible in Entropia Universe, many developers also forbid the sale of in-game items for real money.

The advent of blockchain technology in gaming will unlock this value for players by allowing true ownership.

## Problem of action verification

In the previous section I outlined the fact that online games are entirely reliant upon the development company. All game data had to be stored in centrally hosted databases (peer-to-server model). This architecture was necessary given what technology has been available hiterto.

Whenever players perform an action, this database is updated to reflect the change in state. For example, when a new character is created the central database will be updated to reflect this change. Likewise, it will also be updated for players moving around in the world, items being traded, monsters being killed, and so on. These updates are analogous to the state transitions of blockchains.

While the current state of the game is stored centrally, it receives updates from the client software installed on players’ computers. This require a very high level of trust in players not to modify the client software and behave maliciously. I believe the number of real-time checks upon the state are limited because they would hinder performance.

The lack of checks mean that players may find a way to duplicate items and in-game currency, or inject code and perform actions that are beyond what the game allows. Such cheating can include being able to move through walls or fight with greater speed. Eventually, such actions can be detected after honest players report the abuse, or when developers perform consistency checks on the game data.

These are not new problems. Developers do get better at detecting malicious activity over-time but it would be better if the game could prevent them in the first place.

![](/images/1*0sWOO_5xda-ohwE2Bd3F9Q.png)

*Elite: Dangerous has allows for some P2P data transfer but doesn’t do proper consistency checks (AFAIK!) (Source: [Tobii](https://cdn-images-1.medium.com/max/2000/1*yiNOkgan_5W5Cko9kyx1JA.png))*

Interestingly, [Elite: Dangerous](https://www.elitedangerous.com/) using a [hybrid of peer-to-server and peer-to-peer networking](https://forums.frontier.co.uk/showthread.php/238233-VERY-basic-guide-for-ED-networking) in order to cut down on bandwidth costs. This is pretty cool; however, the game assets are still essentially owned by the company. I haven’t checked whether RMT is allowed. From previous discussion with a friend who plays the game, the game enables huge player versus player battles via P2P but consistency checking is lacking!

# A new model for future online games

It should be obvious given what we know of blockchain technology that these problems are solveable. The architecture for the solution I am envisaging would be similar to [Polkadot](https://polkadot.network/): the use of state transition functions to update the game state and the use of state transition verification functions to verify that the update provided was correct. Refer to my article: [Preparing to build on Polkadot](https://medium.com/polkadot-network/preparing-to-build-on-polkadot-349ff5002885).

Players will provide updates to the game state via the client software (as before), but now the state is held on a chain. I think it should be fine for the client to “summarise” the actions that occur within some timeframe (e.g. 5 seconds) and then just send out a digest of the player’s actions to the rest of the network. This data essentially constitutes a transaction (an *extrinsic* in Polkadot language).

Transactions will be sent to the collator nodes who hold the current game state and all previous history (cf. a full node). As the actions contained within an extrinsic could be complex a collator may should perhaps only perform a verification of the actions rather than be expected to calculate the full replay of the actions. Bad extrinsics should be immediately discarded, and all of the good extrinsics would be bundled together into a block and added to the chain.

New blocks are then propagated to nodes that require an update of another player’s state. One problem here is that blocks could contain thousands of extrinsics where most of the actions are irrelevant to an individual player. You only really need to be sure that your own actions were included into the block, and that the players nearby are also behaving correctly.

I think it is fine for the client software to only save a local copy of a player’s actions but also to transiently store the data of other nearby players. This will necessitate that game clients perform lightclient proofs (in the blockchain sense) to ensure that nearby player actions are valid. I dare say there are optimisations that can be done to improve latency and potentially something interesting with L2 and off-chain scaling too (ultimately, with state being fulled stored on-chain though).

One subtlety here is that collators in Polkadot don’t tend be the ones doing state transition verifications, but rather they tend to perform the state transitions themselves. However, collators are fully customisable for whatever your use-case is. For simple blockchains the only necessary calculations are those of transaction validity. In those cases, it is feasible for a collator to perform all such calculations.

My suggestion here ought to allow for peer-to-peer gaming that’s fully verifiable. Moreover, the nodes hosting the game data (collators) could be incentivised to hold the data while bad behaviour can be discouraged through slashing. Even players could be slashed a penalty for submitting bad extrinsics. Naturally, that would require coins to be staked in both cases.

I say nothing of game performance just yet, as any game that implements such an architecture will necessarily be simple to begin with. As techniques improve we will be able to allow for greater complexity in the state transition functions.

I think my proposition here should enable blockchain technology to protect the entire game state. This should help to cut down on cheating and item duplication, while also providing the exciting possibilities offered by true ownership. I also hope that we will see the day when there is cross-chain trading via interoperating blockchains.

This suggestion is fairly theoretical at the moment but I’d love to see someone start to flesh something out, particularly making use of [Parity Tech’s new Substrate framework](https://medium.com/paritytech/substrate-has-arrived-f14f91536278) (mostly because I want to see a game that will exist within the Polkadot platform).

![](/images/1*ByfYjvFF6oMiS2RRNzwCfw.png)

*Parity Technologies [recently released Substrate v1 beta](https://medium.com/paritytech/substrate-has-arrived-f14f91536278).*

# Up next….

In the next post I delve into the idea of putting the game state on-chain. I propose how to build a simple online RPG game. I also discuss how I think Polkadot can be used to power the future of online games.

Next post: [Using Polkadot to power the future of online multiplayer games](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0)