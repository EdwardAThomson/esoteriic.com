---
title: "Trusted trade-offs in blockchain gaming"
date: "2019-12-16"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,medium-archive
category: "blockchain-and-cryptocurrency"
description: "less trust requires greater effort."
original_url: "https://edward-thomson.medium.com/trusted-trade-offs-in-blockchain-gaming-416faa5b8df8"
---

# Trusted trade-offs in blockchain gaming

**tl;dr**: less trust requires greater effort.

In early December I tested the game [Nine Chronicles](https://twitter.com/NineChronicles). It is a fully decentralised game that’s still in pre-alpha. This morning they just re-opened testing with the latest updates. As you can expect, the game is still in an early state but you can can already get a feeling for the gameplay.

![](/images/1*OanodsZZpvyx4oIP652Z6g.png)

*In-game splashscreen for Nine Chronicles*

One thing that came up in discussion in the developer’s [Discord channel](https://discordapp.com/invite/planetarium) was whether it was easy to download and play the game. Some back and forth ensued about how much hassle should be involved to install any *blockchain game*. Succinctly, we want to know, “what level of hassle is acceptable in order to achieve mainstream adoption of blockchain games?”

The naive reaction here might be to make the adoption as easy as possible (*easier = more players*). However, the reality is not so simple. There is a trade-off between trust and decentralisation.

> Greater decentralisation will minimise the amount of trust required but it necessarily makes the technology harder to adopt.

Greater decentralisation will minimise the amount of trust required but it necessarily makes the technology harder to adopt.

This is blockchain 101.

With a fully decentralised architecture it is possible to have accommodate both. The trade-off can be given to the players as a choice: more trust and less hassle, or less trust and more hassle. With purely centralised architecture, there is **no choice for players**: you will always have to accept more trust and less hassle.

![](/images/1*N-olN_RKW0LN_GqeoJITgA.png)

*An in-game screenshot of combat in 9C.*

# The setup of Nine Chronicles

Let me recap how the setup of Nine Chronicles (9C) actually went:

> The download for the game is packaged together as a single zip file that decompresses into a bunch of files, but ultimately there is just a single file that you need to double-click in order to play.

The download for the game is packaged together as a single zip file that decompresses into a bunch of files, but ultimately there is just a single file that you need to double-click in order to play.

**That’s it, that’s the setup.**

If setting up the game is so easy, then what is there to complain about? Well, the game client is actually a full node and downloads all the blocks from the chain. It is necessary to sync the game before you can play. Naturally, this will only take longer in the future for new players.

The current game executable also includes a mining function that mines for new blocks. Even the thought of mining blocks was enough to make some people worried (will it drain my computer’s resources?).

As this game runs on its own dedicated chain, there is no way to connect Metamask for logging into the game. In the version I saw there was no real character management or authentication (9C is still in a pre-alpha). This complaint could be re-phrased as “why must I have the hassle of managing my own keys?”

Each of these steps could be cumbersome for a casual gamer, new gamers, or people used to the current blockchain games we see on Ethereum. With many of these games you don’t need to have a local copy of the chain, you don’t need to mine blocks, and you can use Metamask to manage logging into the game.

# Why is such hassle necessary?

Going back to basics with blockchain technology, let’s remind ourselves of blockchain 101 and why the technology is desireable in the first place.

![](/images/0*Ebh7Gn1G0h4id7WD)

*Infographic from the 9C team: decentralisation matters! ([Source](https://twitter.com/NineChronicles/status/1183629389176508416/photo/1)).*

## Why run a local copy of the chain?

You run a local copy of the chain in order to verify for yourself the data is correct, and therefore you don’t need to trust a third party service. For blockchain games such as 9c, this means you will be able to verify all actions of all players yourself. Moreover, as 9C runs on a dedicated chain there is no extraneous spam from some other popular DApp.

*But why?* In theory, this should eliminate cheating. If arbitrary malicious actions are eliminated then the economy should be able to function as it was programmed to do so. Too many games have a grumpy fan base because of item duplication or excessive inflation. Rarely do developers seem to care either. Transparency was essentially zero, and ironically trust is lost in the developers.

Keep in mind that modern MMOs that run on a desktop require multiple GBs of disk space. World of Warcraft, which is the most popular MMO, and once boasted 12 million active subscriptions, has an install of over 70 GB.

## Why should you have to mine?

Well, I have to admit that it isn’t strictly necessary to perform mining in order to play the game. The mining function can be split from the rest of the game since it is a somewhat separate security concern. Ideally, there should be enough miners to keep the network decentralised. We need this in order to maintain censorship-resistance and hence prevent privileged entities from breaking the protocol. If this is broken then the game economics will break.

There are similar concerns for PoS based networks. Although this is where I’d argue in favour of [Polkadot](http://polkadot.network/)’s [shared security model](https://wiki.polkadot.network/docs/en/learn-security#shared-security): validators are already present when you connect your chain to the platform.

## Why should I have the hassle of managing my own keys?

*Not your keys, not your coins.*

## Get Edward A Thomson’s stories in your inbox

Yes, there is additional hassle in self-managing keys and crypto-assets, but the main reason for managing your own keys if that you are the master of your assets (“[true ownership](https://medium.com/@edward.thomson/true-ownership-needs-provable-on-chain-assets-cf347ff0f384)”). You can choose when to trade your assets and to whomever you please. If you give up the sole ownership of your keys (i.e. your account) then it is always possible for someone else to move your assets without your permission.

![](/images/0*kFSVxgeTKpOEv9La)

*9C is built on Unity and will eventually be multi-platform with a light-client option ([Image Source](https://twitter.com/NineChronicles/status/1178240787567374336/photo/1))*

# Trading trust for adoption

There is a way to accommodate both types of people: those who prefer minimal hassle, and those who prefer full decentralisation.

## Don’t have to run a full node

The developers could run a full node on behalf of players who want such a service. Players would then download a version of the game that comes packaged with a light-client rather than a full node. This allow for mobile versions too. However, I think big complex games will probably still require a large download anyway.

A node hosting service should probably require a subscription and would perhaps one way to cover future development costs. As the game is open source then it would certainly be possible to bypass the subscription, so more thought about rewarding subscribers is required.

Placing more trust in the developers also goes against the spirit of decentralisation so it shouldn’t be encouraged as the norm for all players.

## Mining (or validation) isn’t strictly necessary

This was addressed above. It isn’t strictly necessary for all players perform mining (or validation for PoS networks).

## Key management solutions

There are more and more solutions now for managing keys. Not just in browser extension wallets, but also in hardware devices and other offline devices. Perhaps the easiest is to use something like [Portis](https://www.portis.io/): this should make on-boarding causal users easier. I’ve hard a look at their architecture and in theory it looks like players will remain in control of their keys, although some trust is required here.

# Accommodating both types of players

Rapid adoption with a low barrier to entry will allow more players to join this new wave of decentralised gaming, and with some luck they will be encourage to go the full hog: to be the master of their own assets and the verifiers of all the data!

It seems that the developers of 9C are keen to follow this path and allow both types of players to get involved!

# Why did I write this?

I’m advocate for fully decentralised gaming, like the 9C developers, and I would prefer that the few sensible heads in *blockchain gaming* can come together to promote the benefits of the technology. I think we need to get away from the notion that trading NFTs is (1) gaming, and (2) blockchain gaming.

> ***It isn’t.***

***It isn’t.***

Games, first and foremost, need to be fun. Beyond that, players should be sovereign and must be allowed to own the assets that they work hard to obtain. Only blockchain technology can make that a reality, and that’s a future worth fighting for!

# About Nine Chronicles

![](/images/0*L8Pl80gCKSgLM0PX)

*([Source](https://twitter.com/NineChronicles/status/1186138182619811840/photo/1))*

The following is from their website:

> [Nine Chronicles](http://nine-chronicles.com/) is a fully decentralized RPG powered by the players.
> 
> Open Sourced and fully moddable from launch. Design levels and features, send contributions through Github, fork and launch new network with friends.

[Nine Chronicles](http://nine-chronicles.com/) is a fully decentralized RPG powered by the players.

Open Sourced and fully moddable from launch. Design levels and features, send contributions through Github, fork and launch new network with friends.