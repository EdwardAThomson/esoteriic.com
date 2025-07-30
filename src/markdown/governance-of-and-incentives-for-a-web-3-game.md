---
title: "Governance of and incentives for a Web 3 game"
date: "2019-01-19"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,business,medium-archive
category: "blockchain-and-cryptocurrency"
description: "I outline some possibilities for paying for an open source blockchain game."
original_url: "https://edward-thomson.medium.com/governance-of-and-incentives-for-a-web-3-game-56edefb89cd4"
---

# Governance of and incentives for a Web 3 game

**tl;dr**: I outline some possibilities for paying for an open source blockchain game.

In my previous posts I outlined a vision for an online multiplayer game that leverages the latest web 3 technologies. The idea is an MMO scale game that replaces the old player-to-server architecture which something that is peer-to-peer. Game state is stored on-chain while the protocol pays incentives to encourage a self-hosted (self-sufficient) network.

In this post I review possible funding methods that are used in the gaming industry and the funding methods used for developing new blockchain projects. The methods have some overlap, but are mostly distinct. I suggest a number of possible strategies.

Lastly, I outline the importance for governance and why this must be an on-chain mechanism.

![](/images/1*TrRiUQ3-DZVAsQvzSQ56iw.png)

*Why on-chain governance? ([Read more](https://medium.com/polkadot-network/why-on-chain-governance-82ecf28f314c))*

# Previous posts

This piece is the fourth post in a series of related articles.

Previous blogs:

-   “[Blockchain gaming: putting the state on-chain](https://medium.com/@edward.thomson/blockchain-gaming-putting-the-state-on-chain-cc3915090547)”.
-   “[Using Polkadot to power the future of online multiplayer games](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0)”.
-   “[The worlds of Web 3 Games](https://medium.com/@edward.thomson/the-worlds-of-web-3-games-7e4797126a94)”

The last piece included some thoughts on incentivising people to run nodes which revolved using around token inflation to pay for hosting. That may not be entirely appropriate for paying for developers too.

# Contemporary method of paying for game development

## Previous game funding models

Most online games operate on a subscription model, where players pay for gameplay every month, or on a **freemium** model where some of the content is available for free while premium content is access via payment. The premium content may be accessed via a subscription (a flag is set in a character’s state).

![](/images/1*nqMZB3jRiRKQ_84KWqdfWw.png)

*Runescape is probably the most obvious example of the freemium model ([Source](https://www.runescape.com/splash))*

The previous funding models are worth pondering, but the payment model for this new paradigm of games (“web 3 games”) requires some deeper thought.

In open source projects, users don’t tend to pay for the product but rather they might pay a subscription to receive professional support, but it is hard to see why players would necessarily pay a subscription when they can freely download the software and run their own instances. Moreover, players would receive updates to the game for free due to the code being open-source.

While I suspect that a web 3 game can be self-hosted in a peer-to-peer network, which reduces costs borne by the development team, that doesn’t help to cover the costs of on-going updates. For hobby projects, people may donate their spare time to help code the game, but that is not a viable approach for a popular game where regular updates are required.

![](/images/1*xTi2MEgNK7UWqehBlpYbZQ.png)

*Kickstarter ([Source](https://en.wikipedia.org/wiki/File:Kickstarter_logo_2017.svg))*

**Kickstarter / Indiegogo**: In the old world, pre-blockchain days, indie game developers could do the initial round of fundraising on platforms like Kickstarter and then continue to raise additional funds via their website. Players who fund the game early receive benefits for being an early backer, such as a set of items only available during the initial fund raising.

Two fairly prominent examples are [Star Citizen](https://robertsspaceindustries.com/) and [Shroud of the Avatar](https://www.shroudoftheavatar.com/).

## Payment models of blockchain projects

Recently, with blockchain projects, we’ve seen a new way to reward developers:

-   Gift developers with some fraction of the tokens in the genesis block.
-   Provide a fraction of the block reward as a way of paying for development.

![](/images/1*cUJgvbaFoQ4FzGu1kkfYvA.png)

*Z Cash is one example of having a developer’s fee ([Source](https://z.cash/))*

Neither of these necessarily requires the *sale* of tokens, but that has been fairly common to do so. However, that would only provides an initial amount of funding and won’t provide the necessary long term funding. These tokens could also have utility within the game.

Early phase backers could also receive benefits such as a set of ‘free’ items (e.g. weapons, or even land & housing) when the game is launched.

Selling a security token for equity in the company is also a short term solution, a separate source of funds, but it isn’t a viable solution for long-term funding.

# Paying for on-going development of web 3 games in the future

## Freemium / Subscription basis

The development team could charge a subscription for premium content. I think that it is technically possible to have premium / members only locations (only accessible to paid members), but this is not a guaranteed win given that open source code can be forked.

Players need to see the benefits of staying on the official chain, and not on a free-to-play forked chain. If they pay a subscription they will want benefits.

Preventing a fork will require a social reason: i.e. there is greater benefit to playing on the official network rather than on a forked network. The promise of active development combined with network effects *may* be enough to keep most players on the official network.

While players could still access that content by forking the code and then running a parallel chain (also possible: an offline mode). They won’t necessarily have enough players on the forked network to make it **fun**. Part of the reason we play online games is to engage in social interaction. An official server would, or at least should, have a larger player base and hopefully this will deter players abandoning the main chain.

**Subscription payments**: Funding will have to be done on-chain (confer subscription payments in Ethereum: [ERC-1337](https://gitcoinco.github.io/ERC-1337/)). A module could be added to [Substrate](https://github.com/w3f/Web3-wiki/wiki/Substrate) that allows the gaming chain to collect a subscription fee paid in native tokens; with interoperability, the players could pay the subscription fees on another chain.

![](/images/1*O5pAWouUIpvGJv6bRJ8SyQ.png)

*Something based upon ERC-1337 may prove fruitful ([Image Source](https://gitcoinco.github.io/ERC-1337/))*

The crucial part is the **benefits**. There should be an automatic payout of benefits, e.g. a “*benefit DAO*”, where players can receive in-game items in exchange for their subscription fee every month (which is paid to the developers). The DAO would encode the rules under which new items can be created and how much the items would cost. From time to time, this DAO will need to be updated as new content is added to the game.

What type of items could be provided to subscribed players?

Here are a few suggestions:

-   Extra in-game currency (may be separate token from the ICO token).
-   Extra in-game items (maybe just stat buff items).
-   Premium items, which may be limited in supply (aka rares).
-   Access to a members’ only forum with the possibility of developer interaction and help shape the game.

## Character creation

Developers could potentially sell new accounts in the genesis block instead of tokens: an initial character offering. Once the network is launched, there needs to be a way for developers to continue to charge for account creation.

The game protocol has to be able to add new characters in an ad-hoc manner (characters are associated with key key pairs), but the activation of the character should require a fee to be paid (perhaps in a stable coin) and potentially it will require funds to be staked.

![](/images/1*SiZsJAqKNvASD0gEhEpFZQ.png)

*Should Web 3 games have an in-game stable coin like dai? ([image source](https://makerdao.com/en/))*

The staking of funds is essentially a deposit that can be slashed for bad behaviour. However, if all goes well in this new paradigm, then there will be plenty of opportunities to sell game assets to either recover funds or make money. The emphasis is on players having a strong notion of asset ownership.

## Offline Swag

What may come as a surprise for potential revenue generation is the sale of official merchandise (t-shirts etc). While I don’t expect this to necessarily be a huge revenue generator, I’d like to think that it would help. Doing limited edition items always tends to appeal to gamers. All merch could be tracked via NFTs too (not necessary but may add ‘cool’ factor).

## **Item shop**

Simply adding a game shop for the developers to sell items is likely tricky to build given the above reasons about open source products. Adding new assets to a blockchain in an ad-hoc manner will break the protocol. In blockchain protocols it isn’t possible to mint coins at will: everything must follow the protocol.

Another possibility would be to take an approach that somewhat mimics what the CryptoKitties developers do where the developers can sell a number of rare items every month.

## **Further token sales**

Another token sale could bring in more funds, but there also needs to be a clear and obvious benefit to the purchaser. Potentially, this funding allows access to another game shard, which could even be another parachain.

In Polkadot’s model of parachains, it is possible to have a hierachy of parachains. The original game would sit on the top level parachain (remember that I’m suggesting to put the state on-chain), then additions / expansion to the game can be added as parachains that are linked to this one.

Access could be permission (code would still be open) as suggested previously about requiring fees for access to premium content. If the game chain is decentralised then it woud require current token holders to vote about the addition of a new parachain (new game shard with new content). Should the proposition pass then the content is added.

The positive side of this is that players can decide if the new content is worth adding. The downside is that if a proposal fails then the developers will need to modify the content which could pose a risk for keeping the development business funded. Some amount of development will be centralised where the developers can be in a single business, even though the game itself will be on a decentralised network.

## Further funding ideas

**(D) Exchange with fees**: potentially the game chain can facilitate cross-chain trading where some fee is extracted per transaction: e.g. exchange bitcoin to buy in-game currency.

**Game access via fiat**: developers should make it as easy as possible to get started. Providing a way to get started with fiat instead of cryptocurrencies will probably help. It would not be unfair to charge some fee for facilitating the exchange of fiat into a game account. Clearly, this only earns money when new players join.

# Governance (on-chain, natch!)

All the rage these days. However, it is genuinely an important issue for blockchains and doubly-so for something like a computer game. If an issue arises where it is clear that the game is broken: e.g. a vulnerability leads to item duplication and the economy subsequently tanks. When economies tank, games die.

![](/images/1*zby9r8Z2HwVwgYkLkk--hQ.jpeg)

*First draft of Polkadot governance (for more info: [source](https://twitter.com/polkadotnetwork/status/1006997212235288577))*

In the past, when a game is faced with an existential threat the developers would come up with a solution and implement it. There have been numerous cases of developers killing games from implementing bad updates too, so it isn’t necessarily wise to give all the power to the devs.

Given that Substrate has governance modules then it would make sense to adapt and re-use. I would suggest that governance is similar to Polkadot where voting is stake weighted, and that there be a council to review proposals (see above image and [Polkadot Governance](https://github.com/paritytech/polkadot/wiki/Governance)).

If a similar system is adopted then players will be able to vote, hopefully rationally, on measures that will improve the economy. If too many tokens exist then potentially players can vote on whether to remove excess supply. If a player, or group of players, has found an exploit that can’t be easily reverted then governance would allow for an irregular state transition to remove those players. The governance modules should probably enforce a super-majority of active players in order to pass the motion.

Before Polkadot goes live there will be a Substrate based chain called [Edgeware](https://edgewa.re/) which will allow on-chain governance to be tested. It is a Turing complete smart contract platform where tokens will have real value.