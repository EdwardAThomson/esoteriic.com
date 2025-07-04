---
title: "Emergent Currencies in the Gaming Metaverse: Unleashing the Power of Player-Created Money"
date: "2023-04-07"
tags: blockchain,gaming,ethereum,cryptocurrency,medium-archive
category: "blockchain and cryptocurrency"
description: "an outline for implementing player-created currencies"
original_url: "https://edward-thomson.medium.com/emergent-currencies-in-the-gaming-metaverse-unleashing-the-power-of-player-created-money-7b36b449503c"
---

# Emergent Currencies in the Gaming Metaverse: Unleashing the Power of Player-Created Money

**tl;dr**: an outline for implementing player-created currencies

Player-created currencies in decentralized games appear to be a natural progression, given the freedom provided by these platforms. I contend that the concept of player-created currencies aligns with the principle of permissionlessness that underpins the very foundations of blockchain technology.

The idea revolves around empowering players to **mint** and **manage** their own currencies within a game. It is not about players repurposing existing commodities to function as currencies.

This blog expands upon an idea I once tweeted, it just took a while to get here:

*My tweet is the tl;dr of the article.*

First, I will explain why I believe this concept is compatible with decentralized gaming and why it is feasible at this point in time. I will then explore how player-minted currencies could potentially be incorporated into a blockchain game, illustrating possible paths forward.

Next, I will briefly discuss instances where players have used existing commodities as makeshift currencies. While these historical examples offer valuable insights, they are not quite the same as the idea I am proposing here.

Finally, I will delve into the benefits and challenges associated with player-minted currencies.

# How is it even possible?

To better grasp the concept, let’s illustrate how it might work by building the idea step-by-step. Then I’ll iterate with further possible paths forward.

# First Steps 👶

To better grasp the concept, let’s illustrate how it might work by building the idea step-by-step. We’ll use the blockchain game Axie Infinity as an example. Although Axie Infinity is not fully decentralized, it serves as a suitable foundation for our discussion.

The creatures in the game are NFTs that can be purchased or traded on a [marketplace](https://marketplace.axieinfinity.com/) developed by the Axie team or on platforms like [OpenSea](https://opensea.io/collection/axie). Both marketplaces exist outside the game experience.

Currently, trading takes place exclusively in ETH. However, since both marketplaces are centralized, they could potentially support trading in any currency, be it fiat or crypto. In this sense, they possess functionality akin to other centralized exchanges, such as Binance or Coinbase.

![](/images/1*rGzv-uRCA948bEJGTQBKvw.png)

*Axie Infinity [Marketplace](https://app.axieinfinity.com/marketplace/) (6th April 2023)*

The ability to trade externally is crucial for demonstrating the viability of player-created currencies, albeit with numerous caveats. Nothing prevents the player base from establishing their own marketplace and facilitating trade in a different currency. Players can already mint their own currencies, like ERC20 tokens on Ethereum, and begin trading those new tokens for Axie NFTs.

This serves as the initial phase in understanding how player-minted currencies can be integrated into decentralized games.

**Brief aside**: It could be argued that the various guild DAOs emerging in blockchain games have already achieved this to some extent. Their tokens possess currency-like qualities and, although they exist outside of the game, they *can* enhance the gaming experience with new meta-mechanics.

# Player-Mods As A Path Forward 🛠️

While players can create their own currencies to trade NFTs outside the game, integrating this feature within the game’s UI likely requires support from the development team. However, decentralized games should be open-sourced, which means players can modify the code and create their own UI.

By doing so, it creates the *illusion* of players trading their own currencies within the game itself. However, there is a significant caveat: the player-minted currency won’t have utility within the game. So far, I’ve only suggested modifying the UI to facilitate trading.

Nonetheless, with the premise of open-source code, it’s possible for players to develop new functionalities for the NFTs they own. While these features would exist outside the official gameplay experience, they could generate natural demand.

The exciting aspect is that, given sufficient traction or interest, the official development team could choose to support and even integrate player-written code into the game’s official UI.

This demonstrates the power of open-source code. In essence, it aligns with the metaverse narrative, but with a focus on building something tangible.

![](/images/0*3_GIjb_mqkf0aP9m)

*Nine Chronicles ([source](https://store.steampowered.com/app/1279500/Nine_Chronicles/))*

[Nine Chronicles](https://nine-chronicles.com/) is an [open-source](https://github.com/planetarium) decentralied game, but does not yet have the capabilities to allow integrated player-created currencies. It would be possible to have an external currency though. There are some player mods already that allow for an enhanced experience, e.g. faster combat resolution.

# Proactive Approach to Enabling Player-Minted Currencies 💸

In the previous two sections, I’ve outlined potential paths for incorporating player-minted currencies. However, these paths are reactive: players create a new experience external to the game, and then the official development team integrates it afterward.

While this might be a safer approach, allowing ideas to be tested and gain traction before implementation, an alternative is for developers to build tools that support player creativity within the game itself.

What if game developers proactively enabled player-minted currencies? Although the idea sounds daunting, it could take player empowerment to new heights. This would involve providing players with the necessary tools.

Rather than essentially forcing players to code their own meta-mechanics externally, developers could integrate features that allow players to trade their own currencies within the game UI. To stimulate demand, developers could let players set any currency as a means of payment within areas of the game they control.

For instance, if a player owns a piece of land, they could charge a fee in their own currency.

Naturally, this approach presents challenges in building network effects around a single currency and requires careful consideration for implementing such features. One possibility is to limit currency creation and management tools to guilds, which would create a barrier that necessitates a minimum economic mass before a new currency could be minted within the official gameplay experience. This constraint would ensure that only established groups with sufficient resources and commitment could introduce new currencies, potentially mitigating some of the risks associated with a more open approach to player-minted currencies.

The most radical approch would be one where the devs never launch a token (so no direct fundraising), but rather let the community figure out what to do. I wonder if this provides the least hassle for the team in term’s of regulation, but I don’t know. Probably best you ask a lawyer about that.

**An idea** 💡: An NPC that accepts any cryptocurrency. The address could be a dev wallet or even a DAO. It could also be a burn address (0x0000…). Most of the currencies will be useless, but eventually one may emerge as the winner. Well actually there could be many winners. This sounds weird but interesting and emergent behaviour may appear and that’s worth exploring.

# When Commodities Became Currencies 💎🪙

A little history….

To the best of my knowledge, there aren’t any games with player-minted currencies. However, there are numerous games where players have repurposed a commodity as a currency.

For example, in RuneScape, players used Spirit Shards instead of gold pieces. These shards were abundant enough to facilitate easy trading between players. Additionally, since they had utility within the game and were consumed upon use, they retained natural value.

Given that RuneScape allows for player-to-player trading, almost any commodity could function as a currency. The Runes used in magic were similarly abundant, making them akin to a currency.

## Get Edward A Thomson’s stories in your inbox

A comparable situation occurred in Diablo 2. Although I didn’t play much of D2, I was directed to a [YouTube video that delved into the history of currency in the game](https://www.youtube.com/watch?v=VKOSQD2pVN4).

There was also an academic study of Diablo 2, one where researchers explored the emergence of currencies within the game: [Currency Emergence in Absence of State Influence: The Case of Diablo II](https://cosmosandtaxis.files.wordpress.com/2015/03/ct_vol2_issue2_salterstein.pdf) (thanks for the links Colin!).

However, these examples don’t align with the concept of player-minted currencies. Players don’t mint commodities within a game, nor do they control their spawn rates. There’s a degree of empowerment absent in these cases, which sets them apart from the idea I’m exploring.

Nevertheless, there might have been attempts by players to repurpose in-game items in a way that allowed them to create a currency. I explored this idea in my notes for Shroud of the Avatar. Although the game didn’t develop as I had hoped, it offered an interesting feature in the form of books. These books enabled players to write in them and subsequently “publish” them. Publishing a book made it uneditable, and since we already trust the game developer with the content, it was essentially immutable. While this method would be clunky compared to what’s possible with cryptocurrencies, it at least provided a way to create something rudimentary.

In that sense, I believe player-created currencies could also be implemented in traditional games. However, it seems unlikely that developers would willingly add the necessary tools to facilitate this. The primary concern would likely revolve around real-money trading.

# Benefits 🚀

I acknowledge that this idea is mostly speculative, so the benefits are based on my expectations. It wasn’t long ago that cryptocurrencies didn’t exist and have faced much criticism since their inception. Ideas that seem crazy at first might become less so in practice.

Some potential benefits that may arise from player-created currencies include:

-   Facilitating wealth creation
-   Stimulating economic competition
-   Supporting player-driven markets
-   Encouraging collaboration and community-building

You might still be wondering, why bother? If you’re still skeptical, I would ask: why wouldn’t you want your players to be prosperous, entrepreneurial, risk-taking, wealth creators?

Despite the idea sounding wild, I think it can attract new players to a game. There will always be the opportunity to be an early adopter in a new venture, even if the game itself has been around for a while. This is something that’s lacking in MMOs.

The thought of joining a late-stage MMO as a newcomer with no wealth, poor stats, and a vast gap in experience between a newcomer and the majority of players is daunting. I feel like I missed WoW because I chose not to start playing in the early years. It didn’t really appeal back then and now even less so.

Could I be attracted to an old MMO if there were still opportunities to create wealth? Probably, yes. I can’t think offhand if any exist right now. I mean outside of gold farming which is not within my capabilities. Encouraging players to create wealth could help alleviate the feeling of being left behind. It would be interesting to see if this phenomenon eventually occurs.

![](/images/1*umi8IcMXNBxC8_QjcaRRmg.png)

*Concept art for Player-Created Currencies. (Image created with Midjourney)*

# Challenges 💀

Let’s outline some of the potential problems with player-created currencies, many of which are familiar concerns from the cryptocurrency space:

-   Nefarious activity: Scams, Ponzi schemes, frauds, pump and dumps, etc.
-   Broken token economics (but otherwise well-intentioned).
-   Failure to gain traction / Loss of adoption (trending towards worthlessness).
-   Lack of utility (demand drivers) within the game, and ultimately distracting.
-   Adverse effects on the game’s overall economy.
-   Governance issues.

The challenges here closely resemble those of launching a new cryptocurrency or crypto-token. They will, of course, have a game-related twist, but the overlap is substantial. That said, we have learned much about how to address these issues, albeit imperfectly.

For instance, allowing any player to include a currency within the game’s official UI is similar to letting any ERC20 trade within the official Uniswap UI. It’s reasonable for Uniswap to block scams or other harmful projects within the official UI. Remember that the UI is open source, so access to the protocol isn’t completely blocked.

Creating utility and demand presents significant challenges, but that’s true for any new currency.

In my previous blog I wrote about the need for different currency types. This blog is something of a curve-ball that would require me to think more. Let me outline something that occurred to me: the creation of dozens or even hundreds of “deflationary” tokens could resemble a single inflationary currency in some aspects. New players can create their own tokens, allowing the number of coins to expand dynamically as the player base grows.

I wouldn’t say this “solves” the problem of requiring an inflationary currency (see [my previous blog](https://medium.com/@edward-thomson/multiple-currencies-for-online-games-77d56e2d39b3)), but it does at least give me pause for thought.

At some point you might also ask “won’t this impact developer revenue?” In the short term, it might, but if such a radical idea goes viral, it may lead to the creation of more wealth than would otherwise be possible. Also, let me reiterate that the concept is about empowering users. We should let them enjoy a share of the wealth created; these are multiplayer games. They are communities. They are economies. Wealth is created, but mostly at the expense of the player whose wealth is trapped.

Think less of creating a new walled garden and more about building an open Eden.

![](/images/1*Bi6Xsj_t58rxaf2iiqhnLA.png)

*I’m still learning Midjourney prompting.*

# Concluding Remarks 🤷‍♂️

In conclusion, the concept of player-created currencies in decentralized games opens up a new world of possibilities for enhancing gameplay experiences and empowering players. By embracing the freedom and permissionless nature of blockchain technology, developers can pave the way for innovation and economic growth within their games.

While the idea is not without its challenges, such as potential nefarious activities or adverse effects on the game’s overall economy, the benefits of wealth creation, economic competition, and community-building cannot be ignored. By carefully considering the implementation of player-minted currencies and learning from the successes and failures of the cryptocurrency space, developers can create a more immersive and engaging gaming environment.

The future of gaming is ripe for exploration and experimentation, and player-created currencies could be a key component in this evolution. As the industry continues to grow and adapt to new technologies, it is crucial to keep an open mind and stay receptive to groundbreaking ideas that have the potential to reshape the gaming landscape.

# Acknowledgments 🙏

[Colin Anderson](https://twitter.com/denkicolin) ([blog](https://funandfungibility.substack.com/)), ChatGPT. Thank you guys! 🙂

I wrote this article but got hit with writer’s block for weeks. I used ChatGPT to help me reword it and provide a conclusion… plus the title. I’m never so creative with titles. 😅