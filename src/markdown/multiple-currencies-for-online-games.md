---
title: "Multiple currencies for online games"
date: "2023-01-30"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,defi,medium-archive
category: "blockchain and cryptocurrency"
description: "I propose a 3 currency model to balance online game economies"
original_url: "https://edward-thomson.medium.com/multiple-currencies-for-online-games-77d56e2d39b3"
---

# **Multiple currencies for online games**

**tl;dr**: I propose a 3 currency model to balance online game economies

Here I outline a proposal for multiple currencies within an online game. The idea could work for a traditional online game; however, I think adoption will happen within blockchain gaming first.

Some traditional games already have multiple currencies, but to the best of my knowledge they are all *inflationary* currencies. I think that is problematic, but it can be alleviated by including differing currency types.

The idea presents stems from my own experience that is a culmination of playing MMOs, being a cryptocurrency user, and also from working / discussing with some active blockchain gaming teams.

This blog is a rewrite of an idea I had a couple years ago that can be found in my [open source book on decentralized gaming](https://github.com/DecentralisedGaming/Book/blob/master/08_game_and_token_economics.md#currency-types-1) (unfinished), but I have to admit GitHub repos are not so easy on the eyes.

# Overview 🤔

The idea is that an online game economy should provide 3 currencies of different types. Later, I outline what problems each currency-type solves.

The currencies-types are:

-   Fixed-supply currency
-   Inflationary in-game currency
-   Stable-valued currency

I will argue this is a reasonable minimum and while traditional online games are already successful with only one currency type, they are unnecessarily restrictive and punishing towards the playerbase.

For a blockchain game, it can be argued that a player could easily trade out of any one of these currencies to another via a DEX. So *perhaps,* *only* the inflationary currency would be necessary inside the game. However, friction should be minimized in the front-end. Pushing players out of the game to exchange currencies may cause excess frustration.

In this blog I **won’t** explore the governance of these currencies or the potential for changing the supply rates dynamically over-time, although I do think that is an important concern. I believe the principles laid out here are true regardless: too much inflation can be annoying, while too little inflation may reduce accessibility and upset the gaming experience.

# Inflation in Online Games 💰📉

One of the main problems of traditional MMOs is that the value of the currency is devalued as the supply of the currency increases (confer “[mudflation](https://www.urbandictionary.com/define.php?term=Mudflation)”). However, this design is something of a necessity. Currency should be easy to obtain such that players of any skill level can participate. Ease-of-access necessitates increased supply. See [Raph Koster’s blog on this dynamic](https://www.raphkoster.com/2007/01/17/flation/).

The biggest benefit is that liquidity is rarely a problem, but the decrease in wealth is still a real pain point. This design favours active players who continually obtain currency rather than those hoarding currency. That is desirable in many ways, but punishing to long-term players who take a break.

The inflation of currency supply means that over the long term the price of items increases (can be several multiples). There is perhaps some mitigation of this effect by having rare items. What can happen is that some of the excess liquidity chases these items, which eases price pressue elsewhere, but this isn’t a complete solution.

I believe this to be true from what I have observed in RuneScape over its 20+ year history (I started playing 2002).

![](/images/1*ALCmHtD82PO0bl6Jac1Zmg.png)

*Many items in RuneScape trade for the [maximum cash size of 2.1bn](https://secure.runescape.com/m=itemdb_rs/top100?list=1&scale=0) (largest integer size for RS)*

As blockchain game devs have the design freedom to start from scratch, I think we should consider how to improve this dynamic by offering more options for the players.

# A Path Forward: 3 currency-type model

I will discuss each currency type in turn and provide reasoning as to why they should exist, plus outline a number of associated game design challenges.

## Fixed-supply currency🫰🤑

The expected fix to the inflating in-game currency is to go for a “deflationary” one, or rather a token that arrives at an eventual fixed maximum supply (confer bitcoin). This idea is prevalent across the blockchain gaming space for obvious reasons. The design choices by newer projects are less clear since many opt to add staking which could inflate the supply indefinitely. In some cases, these tokens are also the native-chain token, so are part of the game theory for keeping the chain secure.

I feel this design choice isn’t the ideal or complete solution. A fixed-supply currency may not suffer from the long-term devaluation that an inflationary currency does, however, I fear such a currency won’t be as easy to obtain (game design issue) and could suffer from liquidity issues too. I think this is reflected in the volatile and cyclic nature of cryptocurrency prices.

![](/images/0*7YYKQjOv8TxGhvDO.jpg)

*Bitcoin emission curve ([source](https://en.bitcoinwiki.org/wiki/Bitcoin_Emission))*

For players to trade in a marketplace, the currency must be liquid and only mildly volatile. Players should not get frustrated and quit because they can’t obtain currency either. Typically currencies in MMOs would come from (say) monster drops. With a fixed-supply currency, one wonders if the drops eventually stop. This would be an accessibility problem.

Perhaps there is a fix, where some percentage of every transaction could be used to re-seed the pot of tokens for monster drops such that this problem disappears. That is less clear to me, nor would it remove the price volatility.

That said, there is still a clear use-case for this currency-type as a risky savings account.

To some extent this is the one currency which I think is the least necessary from a game economics point of view. However, the biggest caveat here is that teams often sell such a currency as a means to raise funds for the project. Naturally, there may be an expectation of return from holding such a currency, which therefore requires demand drivers. If there is no reason to buy the token then its value is purely speculative.

Removing this currency from the grand design of the project is perhaps not possible, especially if the token is also a native chain token. Therefore, adding demand drivers to the project design is necessary. One obvious demand driver for a native chain token, is the requirement to spend the token in order to make any transaction on the chain, hence the token is necessary to even play the game (confer: gameplay subscription). The dynamics change slightly if the token is stake-to-play rather than spend-to-play.

Staking that only serves to increase the supply of this token is arguably not a good long-term demand driver. There has been some naivety in designing staking mechanisms, there is a belief that adding staking will in itself be a demand driver. Staking serves to increase the supply and may have some function in the game theory of securing the chain, but otherwise I think it isn’t a wholly suitable demand driver.

However, a staking mechanism that provides other exclusive rewards might work. For example, staking tokens to gain access to a particular part of the game is not increasing the supply side of the equation, but does encourage demand.

Some teams have experimented with providing exclusive items (as a staking reward), but this merely creates inflation in another place, which doesn’t quite solve the problem and if anything the rewards will devalue to the point of not being a demand driver at all. So the problem has not been solved, only moved.

![](/images/0*8dYZc2nR3XcGxxMr.jpg)

*Staking in Nine Chronicles rewards places with items ([source](https://playtoearn.net/news/nine-chronicles-unveils-new-updates-on-monster-collection))*

One of the biggest problems to think on is whether the in-game marketplace should be exclusively priced in this token, or one of the other tokens. I fear this currency type is too volatile for trading items in a marketplace and that I’ve seen it become a problem for a marketplace whenever the value of the smallest unit is significantly greater than the cheapest item. So I offer caution before jumping headlong into this.

# Inflationary in-game currency 🫧->🌊

Despite our misgivings about the erosion of wealth held in an inflationary currency (this was an impetus for cryptocurrency even existing!), it still makes sense for such a currency to exist in a game.

Why? The main currency of a game should be:

-   Liquid
-   Easy to obtain
-   Mildly volatile at worst

The point of “easy to obtain” pretty much guarantees that the currency will be inflationary. Naturally, there are careful considerations required for how to implement such a currency. The design is not for wealth preservation, however, the value (in dollar terms) should not fall to zero too quickly.

![](/images/0*XDYAyGic7lQ4yOTF)

*Dropped loot from an Iron Dragon in RuneScape ([source](https://runescape.wiki/w/Drops))*

Unlike DeFi farming tokens, the currency should have consistent demand drivers within the game. Typically, such a currency would permit players to purchase items from NPCs too. For some blockchain games, there may not be NPCs which presents a potential conundrum, so there should be other mechanisms that make use of the currency (and hence fuel demand). One option is crafting.

Some of the demand drivers for this currency could potentially overlap with the fixed-supply token, but it may be wiser to keep them separate and encourage trading via a DEX. Conceivably, the in-game marketplace could use this inflationary currency. That provides a reason to (say) sell the fixed supply token in order to buy this token before trading for an item.

On the supply side, NPC shops and crafting can help reduce the supply. Although many other burning mechanisms can be considered.

One interesting problem is how to enable anyone to generate in-game currency, as is typical of any MMO, versus protecting the chain from spam that could occur if a player could easily generate tokens that permit transactions on the chain. It would therefore be necessary to separate the two concerns.

As the fixed-supply currency is too volatile and an inflationary currency won’t preserve wealth, perhaps a combination of the two could be the right solution. However, I don’t think it is wise to force your player-base (who may not be cryptonatives at all) into accepting a volatile fixed-supply token.

Ergo, we come upon the third currency that will round out what I think is a minimum offering for blockchain games. Provide options for players that have different risk appetites while allowing the economy to function, and without alienating new gamers.

# Stable-valued currency💲💲💲

A highly volatile game token is not great for non-crypto natives, and a highly inflationary token has the same problem that every traditional MMO has. The middle ground is of course a stablecoin, or similar stable-valued currency. Volatility is minimal and inflation is far less than any in-game currency. What you can’t do with stablecoins is make them easy to obtain, which is why they probably shouldn’t be the sole in-game currency.

![](/images/1*kgdErf_BlDn4XU67Zza3jg.png)

*Gotta break up the text a bit :-) (Stablecoin logos, [source](https://ethereum.org/en/stablecoins/))*

There is no reason to stimulate demand with in-game mechanisms either. This currency type is useful because it is stable valued. That said, care should be taken not to reduce the demand on the other currencies simply because this token is useful. So the in-game marketplace probably shouldn’t allow stablecoins for purchases, otherwise the demand for the other tokens is greatly reduced. However, it definitely should be easy to trade one token for another and minimize friction. Item prices in a marketplace could be shown in (say) USD though: this is a useful reference point for gamers.

People may not like the idea of real-world stablecoins being used in a game because it breaks immersion, but I think we need to be pragmatic and have a currency option that is highly stable. Immersion is a word without consensus about what it means in a game. Frequently, the word is used to push some ideological narrative. A partial way to alleviate this is to rename the token inside the game and provide a backstory for it.

# Concluding Remarks

This all sounds complicated, so why not just have one currency? Or just one currency type? I hope I’ve outlined above that no single currency mentioned can sufficiently cover all of the problems. From my own experience, each might be able to enjoy some amount of success, but that doesn’t mean that there aren’t problems.

Pragmatically, one can launch a game with just one currency type and be successful. That in itself could be reason enough to ignore the other types. However, I think there is more to the problem than just picking one type and being done with it.

There could also be some tokens that are essentially derived from one of the three mentioned but have some fundamental differences. I think there is scope for this, but ultimately would still fall into the broad categories presented.

There is, of course, the thorny topic of governance. Developers of traditional games can alter the monetary supply to help their economies, but it is always done behind closed doors and that isn’t something we should replicate in blockchain gaming.

As stated before, I’ve omitted governance from this blog in order to contain the scope. The inflation rates are important and should probably change over time in order to accommodate a growing, contracting, or stagnating player base.

If the ideal might be to rarely modify the supply of the fixed-supply currency unless there is a major problem, then it would be great if economic problems could be adjusted more nimbly by altering the inflationary currency. I think that is a currency that players will care about less. It is functional, it keeps the market moving, but won’t preserve wealth.

More currencies could be added too, but it would be necessary to put careful consideration into the demand and supply of all tokens together and how they might affect one another. A hard task!

# Acknowledgements

I had some great feedback on this blog from Colin Anderson, Ross Laurie, and Peter van der Watt from Reforged Studios.

Ideas within were shaped by discussion with the [Nine Chronicles](https://nine-chronicles.com/) team and [Xaya](https://xaya.io/). We can be found in the [Decentralized Gaming discord](https://discord.gg/eZEVrSd).

# About me🎯

I’ve been exploring blockchain gaming for a number of years and have a keen interest in decentralized gaming.

Previously, I worked at the [Web3 Foundation](https://web3.foundation/) which launched the [Polkadot network](https://polkadot.network/).