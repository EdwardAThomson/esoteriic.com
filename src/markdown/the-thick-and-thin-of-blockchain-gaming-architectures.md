---
title: "The thick and thin of blockchain gaming architectures"
date: "2019-12-31"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,medium-archive
category: "blockchain and cryptocurrency"
description: "3 common architectural approaches to blockchain games."
original_url: "https://edward-thomson.medium.com/the-thick-and-thin-of-blockhain-gaming-architectures-a51795156420"
---

# The thick and thin of blockchain gaming architectures

**tl,dr**: 3 common architectural approaches to blockchain games.

Over the course of this year I’ve written almost exclusively about blockchain gaming. In my initial blog on the topic I proposed [putting ‘everything’ on-chain](https://medium.com/@edward.thomson/blockchain-gaming-putting-the-state-on-chain-cc3915090547) in a rather monolothic way. This piece is published almost one year later. Over the last 12 months I realised that I was overly optimistic on how well that approach would scale.

From what I wrote, it can be seen that I was grasping at a way to split the functions of the blockchain network from that of the game logic:

> “Transactions will be sent to the collator nodes who hold the current game state and all previous history (cf. a full node). As the actions contained within an extrinsic could be complex a collator may should perhaps only perform a verification of the actions rather than be expected to calculate the full replay of the actions.”

“Transactions will be sent to the collator nodes who hold the current game state and all previous history (cf. a full node). As the actions contained within an extrinsic could be complex a collator may should perhaps only perform a verification of the actions rather than be expected to calculate the full replay of the actions.”

The goal is to have decentralised verification of player actions. That doesn’t necessarily have to all be done at Layer 1 (on the chain). It turns out that splitting the game logic from the functions of the blockchain into separate layers is possible

In this blog I will outline the various approaches to blockchain gaming with a comment on their strengths and weaknesses.

The main 3 architectures that exist are:

-   Decentralised Monolithic
-   Hybrid (centralised and decentralised)
-   Decentralised Layered

The third architecture seems like the most sensible approach to maintaining decentralisation while also allowing for scalability. I actually learned about this architecture from from the [Xaya](https://xaya.io/) team.

# Decentralised Tech Stack

To help frame the discussion I will refer to the different components as layers in a tech stack. The labelling should be familiar to people already following the blockchain space.

![](/images/0*YuOA561xxh191IPM.png)

*Web 3.0 Tech Stack ([Image source](https://wiki.web3.foundation/en/latest/tech_stack/tech_stack_overview/))*

This diagram is a bit more complicated than we need but it might help to frame my blog. Blockchains sit are in layer 1 (L1) of this diagram.

The best way to understand the different architectures is with examples.

# Monolithic — thick blockchain, thin game client

In this architecture the processing of the game logic is done entirely inside the blockchain client software. All actions are stored on-chain and therefore such games are fully decentralised. The user interface (UI), basically the game client, is somewhat superfluous since all it does is render what is recorded on-chain.

The game client sends the player moves (actions) to the the chain, but the underlying mechanics are fixed within the logic of the chain and hence everyone will agree. The user interface is essentially just a wallet.

In this architecture the game client (and UI) is thin while the blockchain is thick (relative to the UI). I think this is a ***key characteristic for comparing decentralised gaming architectures.***

For simple games like poker or chess, they are simple enough that each blockchain client in the network can process all of actions.

![](/images/0*aEUUoKfX5gasiqkG)

*Decentralised Montholithic: all game logic is processed at layer 1*

**Simple games (e.g. Poker)**  
A game like poker could be coded into the core logic of a blockchain, such that the entire network is dedicated to just playing poker. A so-called DAppchain.

Players still need a game client in order to see the cards they have and interpret the actions of the other players. This could be purely command line based, but a simple graphical interface would provide a nicer experience.

There was supposedly a version of Poker included in the original Bitcoin client, however it was removed upon recommendation.

## [**Huntercoin**](http://huntercoin.org/)

Essentially the first blockchain game was Huntercoin. All of the game logic was coded directly into the chain. All code is [open source](https://github.com/chronokings/huntercore) too.

As you should expect, someone could write a modified version of the UI and tweak the colours or whatever, but it wouldn’t be able to modify gameplay in an adverse way since all of the logic is on-chain.

*Video of Huntercoin from Day 1 to Day 32.*

The team behind Huntercoin now work under the name [Xaya](https://xaya.io/). They are mentioned below in the **Decentralised Layered** section.

## **CryptoKitties**

Most of the game logic of CryptoKitties is done in a smart contract on Ethereum (still processed on-chain at layer 1). Being hosted on a non-dedicated chain doesn’t detract from the architecture type.

![](/images/0*7kjS6ngB7AWnQgFz)

*Games entirely inside a smart contract can still be monolithic.*

From what I’ve read it seems that some processing of the game data is done off-chain, so CryptoKitties is technically a hybrid of centralised and decentralised. However, it is conceivable that the game could be wholly decentralised. Props to Shawn Tabrizi for doing this in his [Substrate Kitties](https://www.shawntabrizi.com/substrate-collectables-workshop/#/) workshop.

Further to the off-chain processing of some data, the big thing that got people excited about this game was the cute graphics. While the architecture is thick at the blockchain end, the perceived value was the cute cats but they are rendered in a centralised (thin) UI. If the official servers close down then your cats are as good as dead. For me, that isn’t good enough for blockchain gaming.

![](/images/1*aZKLs7Lce2uqBImYr1IfTA.png)

*A cute cat from CryptoKitties ([image source](https://www.cryptokitties.co/))*

James from Loom Network wrote a great in-depth piece about CryptoKitties on their [Medium blog](https://medium.com/loom-network/how-to-code-your-own-cryptokitties-style-game-on-ethereum-7c8ac86a4eb3). It covers the game mechanics in greater detail plus outlines the problems with the off-chain computation.

# Hybrid — thin blockchain, thick game client

The biggest problem with monolithic architectures is that they don’t scale well. I was overly optimistic in thinking that the next generation of blockchains would be able to put a lot of complex game logic directly into a dappchain.

One solution to this is to put *only* the game assets on to a blockchain but to keep all of the game’s logic off-chain. As the game logic is never on-chain it can be as complex as you like and you don’t have to worry much about scalability.

![](/images/0*-Fz9l2BreEqMH3qP)

*Hybrid Architecture: off-chain game client and UI is minimally coupled to the blockchain*

The contention here is that the games are most likely closed source and entirely centralised. Even if the code was open source and available to run anywhere, there is still the problem that the logic is essentially uncoupled from the blockchain. The player actions are not stored on-chain and therefore cannot be verified in a decentralised manner (players verifying the actions of other players).

## Get Edward A Thomson’s stories in your inbox

Why would you consider this architecture? One reason, the developers want to allow players to freely trade items to other players. While this is obviously possible in a centralised game, the ownership of such an item is never really the players’. If the assets are on a blockchain (e.g. as a non-fungible token, aka NFT) then you can argue that the assets are [truly owned by the players](https://medium.com/@edward.thomson/true-ownership-needs-provable-on-chain-assets-cf347ff0f384).

Currently, this seems to be the most common architecture for blockchain games.

## [**Enjin**](https://enjin.io/)**\-powered games**

Perhaps the best well-known project in the blockchain gaming space (after CryptoKitties), Enjin provide a way to put gaming assets on to Ethereum. The gaming assets would be NFTs stored in a smart contract, however, as described in the opening lines of this section the game logic is not verified in a decentralised manner.

![](/images/0*UxHp1eamEZTVW9pz)

*Age of Rust, an Enjin-powered game ([image source](https://www.ageofrust.games/))*

I see that Enjin have created an [API for Unity](https://assetstore.unity.com/packages/tools/utilities/blockchain-sdk-by-enjin-124133), this means that essentially any Unity game could try to put their assets on to Ethereum.

In theory, a game developer could create an open source decentralised game using Unity and one that also puts the assets on to Ethereum. The actions would perhaps be stored on another chain while the assets are on Ethereum. That sounds messy, but it should be possible. That said, someone could create a dedicated “Enjin” chain that only needs to understand their API and hence make something that would fit into the third architecture (described later).

## [**Hoard**](https://hoard.exchange/)**\-powered games**

This team are following a fairly similar approach to Enjin, but their preference is to support games that leverage Plasma (specifically the flavour known as “Minimum Viable Plasma”). Hoard have also created a Unity API which is available on [GitHub](https://github.com/hoardexchange/HoardSDK).

![](/images/0*WhMESWbhRu9LwVpL.png)

*[Plasma Dog](http://plasmadog.hoard.exchange/): An in-game shot I took while playing.*

From their Discord room, one developer described their SDK as follows:

> “In general our API is just a bridge for convenient retrieval of itmes and their state/properties from Ethereum blockchain. And of course there is a similar provider for Plasma. Mind that currently Plasma supports only ERC20 but we are working on NFT support.”

“In general our API is just a bridge for convenient retrieval of itmes and their state/properties from Ethereum blockchain. And of course there is a similar provider for Plasma. Mind that currently Plasma supports only ERC20 but we are working on NFT support.”

Click on the following to join [Hoard’s discord](https://discord.gg/KqV3fXT).

# Layered — thin blockchain, thick game client

In this architecture the chain stores all player action but the blockchain client software doesn’t interpret those actions and hence the validity of their meaning. This means that the chain can be minimalistic and fast: it processes ‘transactions’ (the submission and recording of actions). In theory, more data could be put on-chain but that’s an idea for another blog.

The game client **must** read the data from the chain, which is stored locally on a player’s computer, in order to verify the actions of all players: i.e. players can verify the actions of every other player.

![](/images/0*e2QDRVQuJPl__SvY)

*Decentralised layered. This time the UI must read the on-chain data to function.*

As the chain is thin and the game client is thick, there is scope for complex games. This architecture is similar to the hybrid style except that UI is more closely coupled to the blockchain: it must read the on-chain data in order to process what is happening in-game.

Interestingly, there is still some independence of choice at the UI layer. There can be multiple game clients as long as they interpret the on-chain data in the same way. You can imagine that the game client could be closed source too but that would break the trust model.

In [my previous blog](https://medium.com/@edward.thomson/trusted-trade-offs-in-blockchain-gaming-416faa5b8df8) I note that this architecture incurs some barrier to entry and that there is a trade off of decentralisation and convenience.

## [**Xaya**](https://xaya.io/)

The team behind Huntercoin have evolved heir approach to gaming and no longer do monolithic chains. Their chain is a modified version of Namecoin. While the chain stores all player actions next to their registered names, it is lightweight since it doesn’t verify the player actions. The game client is where all player actions are verified: each player verifies the actions of every other player.

*Daniel from Xaya explains their architecture with little bit of the team’s history too*

This team are current building a number of decentralised games, including Taurion, Soccer Manager Elite, and Xaya Ships.

As mentioned, fully decentralised complex games come with a cost of increased set-up effort for the players. This can be solved by providing the choice of running a thin game client locally. See [my previous blog for further details](https://medium.com/@edward.thomson/trusted-trade-offs-in-blockchain-gaming-416faa5b8df8).

![](/images/1*pNCzAC5OmGKAO4CNIhz5Ng.png)

*One of my screenshots from playing Taurion last night (currently pre-alpha)*

This team have also worked on game channel technology for real-time 1-vs-1 encounters which is demonstrated in the XayaShips game.

Click on the following to join [Xaya’s discord](https://discord.gg/VQQ6TC3).

## [**Planetarium**](https://planetariumhq.com/)

The architecture used by the Planetarium team is similar to that used by Xaya. Their first game, Nine Chronicles, is a decentralised MMO and was featured in one of my [previous blogs](https://medium.com/@edward.thomson/trusted-trade-offs-in-blockchain-gaming-416faa5b8df8).

![](/images/0*TVRaqnjgf0ZJrkD-.png)

*An in-game screenshot of combat in 9C (see [previous blog](https://medium.com/@edward.thomson/trusted-trade-offs-in-blockchain-gaming-416faa5b8df8)).*

If I have understood their documentation correctly then also employ this layered architecture where the chain is minimal and only stores the actions.

Click on the following to join [Planetarium’s discord](https://discord.gg/ue9fgc3).

# Concluding note….

The diagrams here are simplifications, but I think they illustrate the idea well enough to explain how different blockchain games work from an architectural point of view.

I’m naturally drawn towards fully decentralised solutions. Personally, I think that a gaming chain can be tailored to it’s use case like Xaya. I think it makes sense to store moves on-chain as well as having gaming assets stored directly on-chain too. Anything of value should really stored on a blockchain where it can be traded or kept as the owner desires.

Decentralised gaming is the ‘**what**’, the architecture is the ‘**how**’, while true ownership and preventing cheating is ‘**why**’.

# About me

Currently, I work at the [Web3 Foundation](https://web3.foundation/) (mainly running the [grants program](http://grants.web3.foundation/)). This blog is of a personal nature. It just so happens that my hobby aligns with work.

One of the main projects of the foundation is the [Polkadot network](https://polkadot.network/). A next generation blockchain platform. To read more about the innovation that Polkadot is bringing to the blockchain industry I invite you to read the following blog post: [link](https://medium.com/polkadot-network/how-polkadot-tackles-the-biggest-problems-facing-blockchain-innovators-1affc1309b0f).

# Questions / Comments?

You can create a reply to me here on Medium, or reach out to me on Twitter: [@EAThomson](https://twitter.com/EAThomson).