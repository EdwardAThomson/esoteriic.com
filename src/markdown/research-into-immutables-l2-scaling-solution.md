---
title: "Research into Immutable’s L2 scaling solution"
date: "2022-12-02"
tags: blockchain,gaming,polkadot,ethereum,cryptocurrency,web3,investment,medium-archive
category: "blockchain and cryptocurrency"
description: "An overview of the Immutable L2 scaling solution"
original_url: "https://edward-thomson.medium.com/research-into-immutables-l2-scaling-solution-46af832a3d62"
---

# Research into Immutable’s L2 scaling solution

tl;dr: an overview of the Immutable L2 scaling solution

**Disclaimer: nothing in this blog should be taken as investment advice. The writer owns various crypto assets and expresses no opinion on whether the reader should buy or sell crypto assets.**

Recently I’ve been digging into Ethereum Layer 2 scaling solutions in order to better understand the technology and their ecosystems. I have some idea about how the technology works, although before starting this research I only had a surface level idea of the various L2 projects. Some of the motivation is to better understand how Ethereum will evolve, but also to get a better idea of how the technological direction of Ethereum differs from Polkadot.

My first L2 target for a deep-dive is Immutable. The team is also keen on gaming so I figured it was a good place to start.

First I will provide an overview of the project to get an impression of the project from a high level. Later, I will cover some of the technology and highlight some risks of the technology. In the next blog I will take a closer look at [a few of the games within this ecosystem](/top-5-most-active-games-on-immutable-e0c2c61b2b24).

One benefit to teams using Immutable is that some transactions are free, with certain caveats.

![](/images/0*1elrGFrjmqu-nUsJ)

# Overview 📜

Immutable is a Validium layer 2 solution deployed on top of Ethereum. The main use-case that the team is pursuing is NFT trading and by extension crypto gaming. It enables token trading that’s faster and cheaper than current Ethereum mainnet, but it does not offer full EVM compatibility.

The technology achieves faster and cheaper transactions; however, their solution is centralized and highly specific to the problem of token trading. It can be reasonably argued that security is inherited from Ethereum itself, so assets should be safe.

A project co-founder claims there are over 100 teams building in the Immutable ecosystem, although I’m not entirely sure how to verify that.

**Short official description**

> “ImmutableX is the leading platform for building web3 games on Ethereum. Powering the next generation of web3 games.”

“ImmutableX is the leading platform for building web3 games on Ethereum. Powering the next generation of web3 games.”

## **General info**

**Token name:**

-   $IMX

**Launch date:**

-   November 2021?

**Team pictures**?

-   I find it strange that teams don’t add pictures of themselves. While pseudonymity is acceptable, there should be links to profile pages of team members on (e.g.) Twitter. This helps me to build an impression of the team’s background. By chance after browsing the project’s Discord I found out that a co-founder is [active on twitter](https://twitter.com/0xferg/status/1591232280592543744). So this is a team of (pseudo)anons.

**Github**?

-   There is a GitHub repo, but the link isn’t so easy to find from the main website. Finding code is an important factor in determining legitimacy and whether any team is committed to building in the ethos of blockchain. I did find a repo eventually in the document pages. ([GH page](https://github.com/immutable/)).

**Decentralization?**

-   Immutable is a single centralized sequencer for ordering and batching transactions at layer 2.
-   The batched transactions go to L1. User assets live on L1.

**Investors**

-   I couldn’t find a list of investors on their website, but did find some in the whitepaper, plus there were numerous quote tweets of the co-founder from investors that I found in the recent history.
-   Investors include Coinbase, Galaxy Digital, Continue Capital, Kenetic, Arrington, and others.

# **Activity** 📊

One of the first places of investigation was to discover how much activity Immutable had. The project ranks well according to L2 Beat, which was one of the major factors for considering to investigate the project. According to [L2 Beat](https://l2beat.com/scaling/activity), Immutable was ranked 2 for activity (at time of writing) only behind Ethereum mainnet itself. It should be noted that as activity is ever-changing, the rank did fluctuate while writing this report.

During the launch of the GameStop marketplace launch, Immutable claim they ranked 2nd for NFT sales ([Twitter](https://twitter.com/Immutable/status/1588305022747492352)). I’m not familiar with the data and no source was provided. However, there is some amount of believability here since GameStop shot to fame during the meme stock trading period in recent years.

![](/images/0*LCjAUd23FPbz3z7g)

*Graph of 30 Day activity according to L2 Beat ([Source](https://l2beat.com/scaling/projects/immutablex)).*

![](/images/0*SkLehaVl5ATfCF9D)

*Comparison chart of L2 activity from L2 Beat ([Source](https://l2beat.com/scaling/activity)).*

From the chart we can see Immutable is currently a leading L2 by activity according to L2 Beat. When looking at Total Value Locked (TVL), Immutable ranks lower than other leading L2 solutions. TVL is likely to be much more sticky than activity; however, they are rather different things.

## **IMX Token** 🪙

**Date: 1st December 2022**

![](/images/1*Olex5P9KygMquD4GuG2BCA.png)

Comparing market cap and fully diluted value gives an impression of how many tokens are due to be unlocked. We are approximately one year after the launch of IMX, so it isn’t a surprise that less than half of the tokens are locked. If the FDV is so much greater than MC then there could be problems. There is nothing here that’s obviously out-of-line for a fairly new project with the scope of an L2.

For comparison we can look at the numbers for Optimism, another leading L2 solution, and see it has a lower market cap but the FDV is much higher (Optimism MC: $230m; FDV: $4.6bn). I find that more worrying, although in the peak of the bull I do think everything will pump but the FDV of Optimism is less appealing.

I also like to do a headcheck of Twitter following versus market cap. If either is far away from the norm of similar projects it makes me wonder if something is wrong. There isn’t any obviously wrong at first sight.

I think the demand drivers for the token are to on-board as many projects as possible and therefore see an increase in activity in the NFT marketplace deployed by Immutable.

**Staking**

Information taken from [IMX token page](https://www.immutable.com/imx-token)

-   “Staking works on 14-day cycles. Protocol fees are collected and 20% of those fees are converted to IMX and made available for distribution to eligible IMX stakers as a form of reward.”
-   So staking rewards are fee rewards, but according to discussions in Discord, this isn’t true yet. In the future it should be true, but right now staking rewards come from the inflation of the supply.
-   Fee rewards for stakers would be preferable, but providing a higher staking rate sounds attractive to people who think they can compound their returns. It is somewhat true for those who stake, but if most people are staking then the dilutionary effects become more important.

**Supply**

-   The max supply does seem to be a hard cap, although I wouldn’t be wholly surprised if there is some massaging to enable staking rewards to push this number higher. It wasn’t wholly obvious one way or other from all the evidence I could gather, however without a very strong statement defending the hard cap it wouldn’t be surprising if the cap is softer than implied.
-   From the unlock schedule (see below), it seems that a big unlock is due around month 12, which may have just occured in November 2022.
-   I went into the team’s discord to ask about this and eventually got an [answer from one of the community members](https://discord.com/channels/765480457256042496/883250549619851326/1044745643131945042). The graph below is apparently inaccurate. The big 12 month cliff has already unlocked at the time of writing. I am assuming this is correct, I haven’t verified to a deeper level myself. There is a [comment on Twitter](https://twitter.com/0xferg/status/1585966240505290753) from a founder that big holders aren’t selling. Given we are perhaps near the bottom of the market it wouldn’t make sense either.
-   The rate of supply increase will slow down now going into the second year of the project being deployed.

![](/images/0*fp0N4FkhrMxBFJJz)

*This chart shows the unlock schedule and was taken from the [whitepaper](https://assets.website-files.com/62535c6262b90afd768b9b26/6304335ed396fd9c8d8dfe5e_Immutable%20X%20Whitepaper.pdf).*

According to a discussion in Discord, this chart is inaccurate (at least around the 12 month mark. See comments above about supply unlocks).

![](/images/0*xBCgmoYostVRVE7R)

*This table provides the details of the unlock schedule and was taken from the [whitepaper](https://assets.website-files.com/62535c6262b90afd768b9b26/6304335ed396fd9c8d8dfe5e_Immutable%20X%20Whitepaper.pdf).*

# Technology 🖥️

As mentioned, Immutable is a lawyer 2 solution deployed on top of Ethereum. It is an instance of the StarkEx technology that was developed by StarkWare. It is an example of a Validium, which uses zero-knowledge proofs but keeps most data off-chain.

The main scaling benefit is found by collecting batches of transactions away from Ethereum mainnet and then submitting that batch as a single transaction. In essence, that is true of all rollups. Here, a zero-knowledge proof (STARK) is calculated over the transactions to prove they are valid. The validity of the submitted transaction can be checked by a special contract on Ethereum mainnet. The benefit of STARK proofs is that they scale very well as the number of transactions goes up.

One key point is that a StarkEx rollup doesn’t offer full EVM compatibility. Immutable is highly tailored for token trading. Consequently, the solution is “gasless”. Gas was introduced to Ethereum as a metering mechanism to prevent the maximum possible amount of computation per block, given that Ethereum offers arbitrary computation. Immutable avoids gas by allowing only highly specific transaction types ([more details in this blog](https://immutablex.medium.com/fees-on-immutable-x-79d3e7207b12)).

![](/images/0*lCUHkt3e_VQiJBFy)

An overview of transactions being batched and sent to L1 ([Source](https://immutablex.medium.com/a-guide-to-nft-platform-security-30d7129cedd3)).

From my understanding of Immutable’s literature there is a single operator (known as a sequencer) processing the batching of transactions. The transactions are essentially arranged into blocks and stored in a database. Like a blockchain but there’s no consensus layer.

That said, it is possible to deploy a validium with (say) a small group of operators to provide some improved level of resilience. Adding more operator adds some complexity and likely to be slower, but typically that is a desirable feature in this industry.

Validium rollups do not post all data necessary to reconstruct the state. I understand this as: the proof is stored at L1, but not all of the data required to construct the proof is stored on-chain.

Interestingly, it seems that NFT tokens are deployed to Ethereum mainnet directly (L1), but interactions can happen at L2 with Immutable’s solution. This should mitigate some of the concerns of a centralized operator, but there are still possible attacks. A discussion of the weaknesses of a validium versus a full ZK rollup can be found in a [blog by Matter Labs](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263).

The Immutable team states that given the nature of the proofs it isn’t possible for the team to insert invalid transactions, nor supposedly to steal assets. However, that general point is disputed in the Matter Labs blog.

As Immutable are the sole operators of the sequencer, they can implement spam protection off-chain. This makes it somewhat web2-like. One feature that teams might find attractive is that some transactions are free transactions while transacting on Immutable itself. Deploying to, or exiting to, Ethereum naturally has costs.

# Technological Risks 🚨

The guys at L2 Beat did a good job to enumerate and explain the major risks.

![](/images/0*t89SDzykF1WzkR1H)

*Summary of risks according to L2 Beat. [Source](https://l2beat.com/scaling/projects/immutablex)*

# Further Reading 📕

The information for this thread was sourced from Immutable’s docs and blogs, L2 Beat, plus I found a useful cross-check of information with the Gods Unchained docs too.

A good place to start understanding the tech is [Immutable’s blog on NFT security](https://immutablex.medium.com/a-guide-to-nft-platform-security-30d7129cedd3).

A deeper understanding can be gained by reading through or (better) working through the team’s tutorial on how to mint NFTs ([Deep dive into minting](https://docs.x.immutable.com/docs/deep-dive-minting/#there-are-two-main-components-of-token-smart-contracts-that-enable-minting)).

**Useful Links**

-   [Website](https://www.immutable.com/)
-   [Blog](https://immutablex.medium.com/)
-   [CMC](https://coinmarketcap.com/currencies/immutable-x/) / [Coingecko](https://www.coingecko.com/en/coins/immutablex)
-   [Twitter](https://twitter.com/Immutable)
-   [GitHub](https://github.com/immutable/)
-   [L2 Beat](https://l2beat.com/scaling/projects/immutablex)
-   [Whitepaper](https://assets.website-files.com/62535c6262b90afd768b9b26/6304335ed396fd9c8d8dfe5e_Immutable%20X%20Whitepaper.pdf)

# Final Thoughts 🤔

Immutable’s solution is interesting, but the biggest downside is the inherent centralization. The risks outlined by L2 Beat are by no means the worst risks that you can find from other L2 projects.

The scope of the solution is limited. It is a reasonable trade-off, but by itself the apps on-top will never be decentralized. There will need to be other solutions combined (perhaps a StarkNet deployment would help).

The team seem to be enjoying some success and I’d put that down to:

-   Building for Ethereum, which already has a large user base.
-   Providing faster and cheaper transactions.
-   Deployment of a solution created by an industry leader (StarkWare).
-   Targetting the NFT market which was the most hyped in 2021.

In the next blog I will provide an [overview of the 5 most active gaming projects in the Immutable ecosystem](/top-5-most-active-games-on-immutable-e0c2c61b2b24).

# About me🎯

Lately, I’ve been investigating the buzz around Ethereum’s L2 scaling solutions.

Previously, I work at the [Web3 Foundation](https://web3.foundation/) which launched the [Polkadot network](https://polkadot.network/).

I’m on Twitter: [@EAThomson](https://twitter.com/EAThomson).