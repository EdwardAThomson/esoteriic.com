---
title: "Preventing cheaters in Fog Of War Games"
date: "2020-05-31"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,defi,medium-archive
category: "blockchain and cryptocurrency"
description: "I think we can use blockchains to solve cheating in Fog of War games."
original_url: "https://edward-thomson.medium.com/preventing-cheaters-in-fog-of-war-games-69f202fbe107"
---

# Preventing cheaters in Fog Of War Games

**tl;dr**: I think we can use blockchains to solve cheating in Fog of War games.

Can Fog of War be solved for decentralised blockchain games? I think so! Moreover, the nature how blockchains work make them uniquely suited to solving this problem.

**So what’s the big deal?**

On Twitter, I recently posted a picture that suggests two players are looking for each other within some gaming world.

![](/images/1*tJGNbCTbwyDOppUNRsw-sA.png)

*Link: [https://twitter.com/EAThomson/status/1264994996807176199](https://twitter.com/EAThomson/status/1264994996807176199)*

It is typical that games have some element of surprise, where the initial map may not be fully revealed or that player positions are initially hidden from each other. In addition, the respective fields of view should also not be known to each other.

It turns out that players who are skilled programmers can actually cheat and peek into the hidden parts of the map and even look at hidden player positions. Naturally, this seems like it would also be a problem for blockchain games where actions are stored publicly.

Part of the solution to the problem involves an interesting piece of cryptography known as Private Set Intersections. This is something that I also mentioned recently on Twitter:

I believe this is an important piece of technology that we need to enable real-time decentralised games such as [RTS](https://en.wikipedia.org/wiki/Real-time_strategy) and [FPS](https://en.wikipedia.org/wiki/First-person_shooter) games. While PSI helps, it isn’t robust against players who are dishonest. I’ll discuss what all of this means in this blog.

# **What is Fog of War?**☁️

From Wikipedia, Fog of War (FoW) is defined as:

> “FoW is the uncertainty in situational awareness experienced by participants in military operations.”

“FoW is the uncertainty in situational awareness experienced by participants in military operations.”

The concept applies to many different types of games not just those about war. Fundamentally, it is about having some piece of the gaming map that’s hidden from the player’s view.

Gamers from the 1990s and early 2000s should fondly remember the Real-Time Strategy genre that was dominated by titles such as [Command & Conquer](https://en.wikipedia.org/wiki/Command_%26_Conquer), [Red Alert](https://en.wikipedia.org/wiki/Command_%26_Conquer:_Red_Alert), and [Total Annihilation](https://en.wikipedia.org/wiki/Total_Annihilation). FoW was an important part of these games as they forced players to make plans, have a strategy, and mange their risk.

When a new game is started only a small section of the map is shown to the player, the rest is hidden until a player moves into the respective unrevealed terrain. Certain units had better “eyesight” so could reveal the map faster as they moved.

![](/images/0*AIS0gXsO8wmGdLKD.jpg)

*Total Annihilation had both Fog of War and true line of sight ([source](https://www.youtube.com/watch?v=zE1CPlqarJc))*

**Quick note**: Fog of war and line of sight are similar problems in spirit and probably even have similar solutions. For simplicity, I will ignore references to line of sight, but I do think they can be both be solved in a similar way.

# **Cheaters, Peekers**👀

As mentioned, it is possible to create a program that can look into the computer’s memory to see the whole map and all of an opponent’s units. This is possible as most game developers in the past didn’t try to solve this problem. They assumed that most players wouldn’t be sufficiently skillful.

This is a problem for multiplayer gamers where a person with such a tool could easily cheat and win the game. For RTS games, the multiplayer mode was always done in a peer-to-peer manner meaning that there was no central server to dictate which units should be revealed.

# **Can we solve the peeking problem?**💡

Yes, I think we can.

Interestingly, back in 2011, a team of researchers demonstrated a practical solution, the big caveat of their solution is that players couldn’t lie about their position. **In this blog I’m proposing how to fix this, such that we CAN deal with players who lie. Keep reading!!!**

The following is a link to their paper:

> [OpenConflict: preventing real-time map hacks in online games](https://www.shiftleft.org/papers/openconflict/)

[OpenConflict: preventing real-time map hacks in online games](https://www.shiftleft.org/papers/openconflict/)

The nature of this problem feels like it could be solved by throwing cryptographic at it, somehow. If we can throw a multiparty computation, homomorphic encryption, or zero-knowledge-”something” then we ought to be able to solve it. It’s fine to dream what the solution might look like, but better to have something practical.

It is worth noting that the original work doesn’t consider blockchain technology for dealing with adversarial players.

Let’s take an overview of the OpenConflict approach.

**Firstly**, the team created a tool that let them peek into computer memory in order to prove that cheating was possible. They were able to see the map and their opponent’s units, as expected.

![](/images/1*j05NLI1vVplZF6j9xc0SZg.png)

*Picture showing the in-game view and a representation of memory ([source](https://www.shiftleft.org/papers/openconflict/))*

In addition, they also developed a practical cryptographic solution to help hide a player’s units in memory. This is where they used Private Set Intersections (interestingly, this is also a technique that has been proposed to be used for contact tracing for COVID-19).

![](/images/1*x1iqZuD74QA4m_N6U3KGDw.png)

*A simplified protocol run ([source](https://www.shiftleft.org/papers/openconflict/))*

What PSI allows is for players to share their units with each other in such a way that the position of the units, and their respective fields of view, are not revealed unless the opponent should actually be able to see them in accordance to the proper rules of the game.

One extra important point to add is that the naive method of implementing PSI doesn’t hide the number of units that a player has. Therefore, the researchers suggested to add padding in order to obfuscated the true number of units.

For the games studied by these researchers, the computation time was actually reasonably rapid even back in 2011. So the extra complication here does not add much overhead.

The PSI solution works whenever players only desire to peek into memory of their own computer (passive cheaters). The solution fails whenever a player lies about their position in order to gain better visibility of the map. When a player lies about their position they are an active attacker. Such an attack would require creating a custom tool, but not impossible for a programmer with the right skills.

Huge thanks to [Anuj Das Gupta](https://medium.com/@half_baked) for linking me to this piece of research.

# **How can we prevent active attackers?**🔨

From skimming through research papers on Private Set Intersections, it seems that there isn’t a general solution that’s secure against dishonest actors. That said, I do believe that there will be a good cryptographic solution to the problem in the future as it does not seem unsolveable but I also think we can find good solutions for particular instances of the problem.

As homomorphic encryption improves I do expect something to come out of it that solves this problem in general (assuming that isn’t already the case!). I also hope that the solution can be efficient.

For FoW in games there might be some way to encode all the game logic with the same cryptographic mechanisms as previously presented, but I don’t have a clear picture of that in my head.

In a practical sense, we ultimately need to reveal the end state of the game and all the actions that happened and then determine who the honest winner was.

A simple approach is to appoint an trusted-third party as an arbiter. This could be a single person or a group of people, but if this is done using a simple centralised architecture then it will be prone to collusion. For a decentralised blockchain game, this isn’t a solution.

# **Can blockchain prevent active attackers?**⛓️

Given the public and immutable nature of data stored on a blockchain, then we can envision a possible solution where the **initial state**, the **end state**, and **all the actions** that happened in between can be stored on-chain.

Blockchains can help solve the problems of trust, but there are still a few more tricks required since the player moves cannot be put on-chain where they reveal data that is supposed to be hidden.

The [Xaya team](https://twitter.com/XAYA_tech) have built a battleships game ([Xayaships](https://xaya.io/xayaships/)) that uses [game channel technology](https://github.com/xaya/libxayagame/blob/master/ships/README.md) to hide the positions of the 2 players’ battleships. The processing of gameplay happens off-chain in what they call a game channel (state channel in Ethereum parlance), which means that gameplay can happen almost in real-time. The resolution and determination of the winner is at the end of the game and settled on-chain.

This is something that sounds inspiring for finding a solution to FoW in a decentralised game; however, what Xayaships doesn’t have is moving pieces nor a visibility for each ship. In fairness, it doesn’t need it.

In the example mentioned in the research paper, players play in a purely peer-to-peer manner which in itself sounds like a game channel. A reasonable guess is to use the Private Set Intersection method used in that previous research paper where players share obfuscated positions and visibility sets, but the determination of the winner has to occur at the end of gameplay in a decentralised way.

**To solve the decentralised arbitration problem**, players could use a transaction to put hashed positions of their units on-chain. The hashes would be unique per unit and be computed from their position and a unique per-unit salt. (There might be a better scheme, this is just a suggestion). This means that the players can’t later change their starting positions to alter the outcome of the game.

As with the research on PSI in the previous section, it is likely necessary to add padding in order to obfuscated the true number of units.

At the end of the game, these initial positions (held on-chain) would be revealed along with a log of all the actions performed. The game physics must be deterministic so it would be possible to determine from knowing the initial starting state, which is public but initially hidden, and then checking that the actions lead to the correct end-state.

Should a player try to cheat during the game and say that they were in position where they weren’t then verification of the game actions would show whether the player was in the correct position or if they lied.

This method does all the verification at the end of the game, but there may be alternative methods where unit hashes are committed to the chain with every move. This puts a lot more data on-chain, but may be necessary in order to find a working solution for an open-world MMO game.

# Acknowledgements 🏅

I’d like to give thanks to the following people from feedback on my previous blog or for engaging in discussion about Fog of War and the related privacy techniques in this blog.

-   [Anuj Das Gupta](https://twitter.com/anujdasgupta), an independent researcher
-   Andy and Daniel (from [Xaya](http://xaya.io/)).
-   [Killari](https://twitter.com/Qhuesten) from an yet unnamed project.
-   Jeff (from W3F).

# About me🎯

Currently, I work at the [Web3 Foundation](https://web3.foundation/) (mainly running the [grants program](http://grants.web3.foundation/)). This blog is of a personal nature. It just so happens that my hobby aligns with work.

One of the main projects of the foundation is the [Polkadot network](https://polkadot.network/). A next generation blockchain platform. To read more about the innovation that Polkadot is bringing to the blockchain industry I invite you to read the following blog post: [link](https://medium.com/polkadot-network/how-polkadot-tackles-the-biggest-problems-facing-blockchain-innovators-1affc1309b0f).

# Questions / Comments?❓

You can create a reply to me here on Medium, or reach out to me on Twitter: [@EAThomson](https://twitter.com/EAThomson).