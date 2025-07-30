---
title: "The limits of action verification in blockchain games"
date: "2019-04-06"
tags: blockchain,gaming,polkadot,ethereum,web3,defi,medium-archive
category: "blockchain-and-cryptocurrency"
description: "consideration of an off-chain solution to prevent cheating in blockchain games."
original_url: "https://edward-thomson.medium.com/the-limits-of-action-verification-in-blockchain-games-8f38b7c52a30"
---

# The limits of action verification in blockchain games

**tl;dr**: consideration of an off-chain solution to prevent cheating in blockchain games.

In a [previous piece](https://medium.com/@edward.thomson/blockchain-gaming-putting-the-state-on-chain-cc3915090547) I outlined some thoughts on how I thought blockchain can help with action verification. Player actions are essentially state transition functions. In this context, the distributed state machines of the game can come to consensus on whether the actions that a player submits to the chain are legal.

Obvious examples of checks: ensure that a player doesn’t spend more gold pieces than they have, or run faster than their max speed allows. However, when I think deeper about the problem of action verification I realise that:

-   (1) there are scaling issues, which may not be so easily solved by sharded application-specific state machines; and
-   (2) not all actions can be neatly captured as a set of rules with a clear set of checks.

# Engineering and economics

While distributed consensus in a system is a powerful way to check the legality of actions, it may be an overly-engineered approach to take. Taking a probabilistic approach rather than a deterministic approach *may* be a reasonable trade off.

![](/images/0*-qwqs0nGTsfJXrrw.png)

*Probably safe to link to this Bitcoin logo ;-) ([source](https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png))*

As we know with Bitcoin, the settlement of transactions do not have finality but rather they are probabilistically safe. Nodes are incentivised to be honest and follow the protocol correctly. This was the neat solution to the BGP that made Bitcoin work.

I wonder if an inflation reward paired with a mild level of action verification would be enough to keep most players honest. It is probably true, but I also suspect that it wouldn’t deter the most egregious offenses. Having a deposit and slashing system may be better still; however, it still requires the accurate identification of bad behaviour. The net gain is that there ought to be less offenses and therefore less rollbacks due to illegal actions.

I have to admit that I don’t quite know the best way forward here. I wonder whether these checks should be done on-chain or an off-chain mechanism that only requires proofs to be stored on-chain. Most of efforts, hitherto, seem to be focused on an offchain solution. Part of the reason is that they are using Ethereum as their base layer which currently can’t handle the required through put. Using sidechains or a custom-built chain would be a better bet.

# Subjectivity: the impossibility of verifying all actions?

With simple games it is easy to verify actions, but for complex games it may not always be possible.

Poker is a simple game that consists of players who can perform a limited number of actions with a limited number of cards. The rules are simple enough that determining the correctness of an action is easy.

Aspects such as the colour of the cards have no baring on the rules. As long as players can clearly read a card’s value and determine the suit then the exact colour, shape, or size of symbols are superfluous. Should one player see hearts as purple instead of red doesn’t matter at all. The meaning of the card does not change. Succinctly, there is a small ‘action-space’ for a game like poker.

![](/images/0*NIfJw0BdQiXC8Hw0.jpg)

*Despite the weird golden hue, we still these are playing cards ([Source](https://images-na.ssl-images-amazon.com/images/I/91OC%2BNBo%2B-L._SX425_.jpg))*

For complex games where the rules are more open-ended, the verification of an allowed action can depend upon the spatial dimensions of the environment. Verifying a player action as valid is thus more complicated and requires greater computation. As an example, if a player is running through over an irregular-shaped patch of mud then their max speed could vary in a complex manner compared to if they were running over a flat surface. Such checks will increase the amount of computation required but still the check ought to be binary: player’s are following the rules if their speed is less than the modified top speed.

The most difficult action verification will be for games that have implied rules, where player actions are difficult to perform but not necessarily impossible. These player actions are those influenced by environmental effects in a non-binary way. Checking player speed to be less than maximum is binary, but determining whether a player has changed the rendering of dark to light probably isn’t so easy to check.

If night can be rendered as day, player actions which were previously difficult (not impossible) may now be easy. For example, trying to make a headshot in pitch black room is almost down to luck, but in the light of day it is far more about skill. Making the shot is definitely possible, just unlikely.

![](/images/0*gplO2CplOnJSp4UM.jpg)

*Dark area of a map in CounterStrike ([source](https://files.gamebanana.com/img/ss/maps/86571.jpg))*

Can there be a solution to judging such subjectivity? I will ignore the potential use of AI and suggest that it may be possible check whether the network can be assured that all players are running the same client. This would further help to prevent cheating but I suspect it isn’t foolproof.

# Preventing cheating with remote attestation

One of my shower thoughts last week on this topic made me think of the Golem project. Aren’t they working on the problem of consensually verifying the execution of arbitrary code?

![](/images/1*rKMBSkHGx__uJOJ5hnvWaw.png)

*[https://golem.network](https://golem.network/)*

Use of their network allows users to farm out work to remote machines in a trustless manner. Someone else runs your code, but you have some assurance that the results you receive are as expected. Naturally, all of the computation is done off-chain while payment is done on-chain.

I recalled one of their blogs mentioned the possibility of remote attestation via Intel SGX’s secure enclaves. This can be read on the [Security page of their documentation](https://docs.golem.network/#/About/Security).

I see this problem as analogous to that of decentralised gaming. The hardware in the network is heterogeneous but the execution of the code should be hardware agnostic. As the results should be verifiable, we need to be sure that each node in the network is running the correct code. In gaming terms, there is a desire for each player to see the same thing and be subject to the same rules. It should not be possible to run a modified version of the client that could permit cheating.

Interestingly, Hoard Exchange have also thought about this problem for blockchain gaming. Given that the two teams are part of the Ethereum community in Warsaw, it isn’t a stretch of the imagination to guess that they might have discussed this together!

![](/images/0*YGTgHG6lL6aapgn-)

*Roadmap snippet for Hoard Exchange ([Source](https://hoard.exchange/))*

**Furthermore**, a combination of Golem + Hoard could allow for a decentralised version of Google’s recently announced gaming platform “[Stadia](https://www.ign.com/articles/2019/03/21/google-announces-its-video-game-platform-stadia)”.

# Invitation for feedback

I love getting feedback on my articles. Feel free to create a reply here on Medium, or reach out to me on Twitter: [@EAThomson](http://twitter.com/EAThomson).