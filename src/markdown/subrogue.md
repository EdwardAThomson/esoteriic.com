---
title: "SubRogue"
date: "2019-10-20"
tags: blockchain,gaming,polkadot,cryptocurrency,web3,defi,medium-archive
category: "blockchain and cryptocurrency"
description: "a simple Rogue-like game that builds on Parity’s Substrate"
original_url: "https://edward-thomson.medium.com/subrogue-8c0a537f02d4"
---

# SubRogue

**tl;dr**: a simple Rogue-like game that builds on Parity’s Substrate. Here I will outline everything you need to write the game.

In a [previous blog](https://medium.com/@edward.thomson/using-polkadot-to-power-the-future-of-online-multiplayer-games-e8b52afae0b0) I suggested an idea for a simple blockchain that should be more entertaining than a simple card game. Since then I’ve done some more research and have a greater idea about how to make the idea tangible.

In this blog will outline a plan of attack and provide links to all the resources you’d need. The end result will be a game that [procedurally generates](https://en.wikipedia.org/wiki/Procedural_generation) basic maps and spawns monsters to be fought using swords, bows, or magic. Did I mention potions too?

![](/images/1*-JMKHWK7J7iynPaZcF_mUQ.png)

*Something I put together quicker than you can read this! :-)*

I’m not really a coder so this idea would take me a while. Instead, I share this idea with the hopes that it encourages a competent programmer to take up the challenge (would be a great hackathon project too!). A good programmer could probably put together something in under a week.

**Game Summary**

-   Rogue-like that connects to a Substrate chain.
-   Uses on-chain randomness for procedural generation of maps and spawning of items.
-   Simple mechanics, but complex enough to be an entertaining challenge. (This [genre](https://en.wikipedia.org/wiki/List_of_roguelikes) has staying power, it is almost 40 years old now!)
-   Multiple games on one chain.

So that’s the flavour of the game. How do you build it? Well, I think I can provide ALL of the resources you need in order to complete this project.

**Steps to build**:

Here are the steps of detail what you would need to learn in order to build the game.

1.  Know what Rogue is.
2.  Complete a Rogue tutorial.
3.  Follow Shawn’s Substrate Kitties tutorial.
4.  Integrate the simple Rogue game with Shawn’s Kitties game.

![](/images/0*KlEgl9NifJfQaqtK.png)

*Rogue. A classic game from 1980 (Source: [Wikipedia](https://en.wikipedia.org/wiki/Roguelike#/media/File:Rogue_Screen_Shot_CAR.PNG))*

# **Rogue**

[Rogue](https://en.wikipedia.org/wiki/Rogue_\(video_game\)) is a classic RPG game from 1980 that has inspired myriad clones since its inception. It is about as simple an RPG as you will find, although it has proven to be incredibly popular.

The game has spawned a sub-genre of RPG games involving things like permadeath and randomised levels. Typically, they are turn-based, grid-based and single character focused. While the original is set in a fantasy world, the style can be applied to other story settings. There is a community definition of what makes a Roguelike, I won’t go into that here, but I will provide a [link](http://www.roguebasin.com/index.php?title=Berlin_Interpretation).

As I noted in my previous blog, there is even a cottage industry of hobbyists creating new Roguelike games, and better yet a plethora of tutorials to learn how to create one. This is what makes the game an attractive target for development, which I will cover in the next section. The games are simple enough to code but offer enough complexity in gameplay to be appealing.

# **Roguelike Tutorials**

![](/images/0*n3pX1pth6gpX-vqQ)

*The RoguelikeDev community now run a 7-day challenge every year ([Image Source](https://gitlab.com/aaron-santos/roguelikedev-does-the-complete-roguelike-tutorial/tree/master))*

There is a classic tutorial upon which all others are based. It was the tutorial that I followed too, it takes you through a [full implementation of the game in Python 2.7](http://www.roguebasin.com/index.php?title=Complete_Roguelike_Tutorial%2C_using_python%2Blibtcod). That said, members of the [Roguelike dev](http://reddit.com/r/roguelikedev) community have recreated this same tutorial in other languages (e.g. JS, Rust, C++, or the [latest version of Python](http://rogueliketutorials.com/tutorials/tcod)).

It is worth being mindful of the fact that I’m going to suggest connecting the game to [Parity’s Substrate](https://www.parity.io/substrate/) (their blockchain framework). A fitting choice of language for the game is to pick one that can already ‘talk’ to Substrate. Rust is an obvious choice and perhaps there can be a tighter coupling of the game and the Substrate, but that isn’t strictly necessary. I think the easiest choice is probably to use JS. There is already a JS RPC-API client, maintained by Parity, which makes it easy to interact with Substrate nodes as was demonstrated in Shawn’s Substrate Kitties workshop. The good thing about JS is that it runs in the browser and doesn’t need to be compiled.

![](/images/0*7nK1vAGYP2bgqLUn)

*One of the most popular Roguelikes: Ancient Domains Of Mystery (aka ADOM) (Source: [Steam](https://store.steampowered.com/app/333300/ADOM_Ancient_Domains_Of_Mystery/))*

If you pick JS, then you can probably reuse the work done in the following tutorial: [here](https://gamedevelopment.tutsplus.com/tutorials/how-to-make-your-first-roguelike--gamedev-13677). Otherwise check out the various completed JS versions on the [Roguelik dev subreddit](https://old.reddit.com/r/roguelikedev/wiki/python_tutorial_series). You will notice that are some Rust versions too with a nice tutorial too: [Rust Roguelike tutorial](https://tomassedovic.github.io/roguelike-tutorial/).

# **Shawn’s Substrate Kitties Workshop**

Shawn at Parity wrote a great tutorial for getting to know Substrate. In his online workshop you will learn how to build a simple DappChain for playing something like Crypto Kitties. All of the game logic sits on-chain while the front end loads in the browser.

Check out: [Substrate Collectible Workshop](https://www.shawntabrizi.com/substrate-collectables-workshop/#/).

![](/images/1*ouwqspz6gADxcCFC2TruBg.png)

*([Image source](https://www.shawntabrizi.com/substrate-collectables-workshop/#/?id=substrate-collectables-workshop))*

**What ingredients from this tutorial am I interested in?**

-   On-chain randomness that I can use to generate a Rogue-like map.
-   Mapping cryptographic keys to game characters.
-   Trading characters and items.
-   The API requests.

## On-chain Randomess

The first time you need to think about the interaction with the node is to grab a random value that’s generated on-chain. This value can then be used as a seed to generate a level map (remember the idea is to make it procedurally generated). In the workshop, the random value was used to provide a unique ID for a cat and to provide some random DNA (will affect breeding). You can fetch randomness from Substrate’s system module:

> <system::Module<T>>::random\_seed()

<system::Module<T>>::random\_seed()

See the following page for further details: [Generating random data](https://www.shawntabrizi.com/substrate-collectables-workshop/#/2/generating-random-data).

You could build the game in such a way that the only interaction with the chain is a source of randomness. This would be a very weak coupling of the game and the chain, but is at least a starting point for testing. This value public and if we mix it in a deterministic way with a public key, then each player’s procedurally generated maps can be reconstructed by anyone. This should give you a sense of being able to check if another player generated a map correctly.

## Linking keys to game characters

From this workshop you can see how it should be possible to have multiple characters that are associated with different public keys, or even multiple characters associated with one key (e.g. one human with many characters). The relevant section is here: [owning multiple kitties](https://www.shawntabrizi.com/substrate-collectables-workshop/#/2/owning-multiple-kitties).

![](/images/0*GFDDmznkM7BIzl_r.png)

*Manage multiple kitties! ([Image Source](https://www.shawntabrizi.com/substrate-collectables-workshop/#/4/rendering-kitties))*

If you have multiple people all able to read and write to the same chain then you can conceive the idea of a shared world. Anyone can re-generate another player’s map and in theory we could allow players to try out the levels that ‘belong’ to another player. In the minimal coupling scenario you can only generate a world from a random value in a deterministic way, but you never push anything back on-chain, and consequently you never need to store anything on-chain.

There is a question of how tightly coupled do you want the game actions to affect the on-chain state? Do you want all actions strictly verified and recorded on-chain such that only the owning player can claim treasure from a dungeon level linked to their account?

A more advanced iteration is to have a shared world where players can interact. I definitely think that is possible for such a simple game like this and is basically what I asked for in a previous blog. I dare say I’ve glossed over some important details that make this harder in reality!

## Trading characters and items

One of the neat things about this tutorial is the ability to trade kitties. This demonstrates how it could be possible for a game to allow the trading of characters or even items in a Rogue-like game.

Check out the section on [buying a kitty](https://www.shawntabrizi.com/substrate-collectables-workshop/#/3/buying-a-kitty).

# **SubRogue**

In this final section I will comment on how to pull it all together. First I suggested that you should understand what a Rogue-like game is, then I suggested trying to build one from one of the many online tutorials. Thirdly, I suggested trying out Shawn’s workshop in order to get familiar with Substrate and hence figure out what pieces of his workshop could be reused in this idea that I propose.

Mixing all ideas together should allow for an interesting game. From the Rogulike tutorial you can add the following features:

> Procedurally generate maps, spawn monsters and fight them using swords, bows, or magic. Plus get buffs using potions!

Procedurally generate maps, spawn monsters and fight them using swords, bows, or magic. Plus get buffs using potions!

From the Kitties workshop you will learn how to add these features:

> Create multiple players (linked to a public key) who can all generate multiple different maps, as well own and trade multiple characters and items.

Create multiple players (linked to a public key) who can all generate multiple different maps, as well own and trade multiple characters and items.

Developers would also be free to skin their games in different ways such that the walls can use a different tile set, or a sword in one flavour of the game could be an axe in another (stats remain the same). The graphics don’t need to be the 80s ASCII art of the original but can look quite sharp like [ADOM](https://store.steampowered.com/app/333300/ADOM_Ancient_Domains_Of_Mystery/) shown above, or this alternative tileset:

![](/images/0*8BxqLOLcy72MDFSZ.png)

*Example: alternative skin for the same mechanics (Source: [RogueBasin](http://www.roguebasin.com/index.php?title=Complete_Roguelike_Tutorial%2C_using_Python%2Blibtcod%2C_extras#Using_Graphical_Tiles))*

Ultimately, you could save the entire level generated inside the runtime, as well as the player state, then track all updates. That was my initial thinking when I first conceived such a game months ago, but in the intervening time I began to fear that such an architecture will have scaling issues in the long run. I now wonder if it would be better to have the world state and game state off-chain but still verifiable in a distributed manner at layer 2.

Cross-parachain or cross-external chain trading in the future would merely be a cherry on top of what could be a fun game: “Gaming DeFi” does sound a bit crazy but hey… someone might want option trading to offset late delivery of their iron ore due to mass pvp ganking!

Finally, I hope this examples demonstrates the possibility of creating a gaming DappChain.

# About me

Currently, I work at the [Web3 Foundation](https://web3.foundation/) (mainly running the [grants program](http://grants.web3.foundation/)). This blog is of a personal nature. It just so happens that my hobby aligns with work.

One of the main projects of the foundation is the [Polkadot network](https://polkadot.network/). A next generation blockchain platform. To read more about the innovation that Polkadot is bringing to the blockchain industry I invite you to read the following blog post: [link](https://medium.com/polkadot-network/how-polkadot-tackles-the-biggest-problems-facing-blockchain-innovators-1affc1309b0f).

# Questions / Comments?

You can create a reply to me here on Medium, or reach out to me on Twitter: [@EAThomson](https://twitter.com/EAThomson).