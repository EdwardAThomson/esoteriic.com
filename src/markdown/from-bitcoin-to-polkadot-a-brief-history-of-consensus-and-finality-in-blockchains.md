---
title: "From Bitcoin to Polkadot: A brief history of consensus and finality in blockchains"
date: "2018-09-05"
tags: blockchain,polkadot,ethereum,medium-archive
category: "blockchain-and-cryptocurrency"
description: "From Bitcoin to Polkadot: A brief history of consensus and finality in blockchains"
original_url: "https://medium.com/polkadot-network/consensus-and-finality-in-blockchains-21b1f634fd00"
---

# From Bitcoin to Polkadot: A brief history of consensus and finality in blockchains

![](/images/1*oBj-Anx6PDXVJ9sGuHzzXA.png)

This piece will explore the need for fault tolerant consensus algorithms in blockchain networks and where development is headed in the near future.

To understand why we need consensus algorithms in blockchain technology we need to understand what problems were solved by Bitcoin’s use of blockchain technology. I will posit that there are essentially two key problems:

1.  double spending, and
2.  centralised money creation.

This blog post is divided into three sections. Section one will provide a brief explanation of how Bitcoin solved these problems. Section two will discuss some of the subtleties of consensus such as fault tolerance and finality. Section three will discuss individual projects and future direction.

# What problems did Bitcoin solve?

To understand why fault tolerance is important for blockchain it is necessary to explain the two problems that Bitcoin solved (double spending, centralised money creation).

In other words, Bitcoin creates money in a predictable, transparent, and decentralised manner that prevents the false creation of money. The mechanism that governs the process of sending and creating money is the consensus algorithm, which works by ensuring agreement (consensus) over the entire history of transactions.

Consensus algorithms are not new for the blockchain era of technology, so it is important to highlight why Bitcoin was so innovative: its ability to reach consensus in a public and permissionless network and in the presence of potentially malicious actors.

![](/images/1*6EIUBjs2OHUbRaCqc7Y2MA.png)

# Bitcoin’s consensus algorithm

As we all well know, the nodes in Proof-of-Work (PoW) blockchains, like Bitcoin, contribute to the security of the network by attempting to win the reward of new coins that comes with the creation of a new block. The reward provides an incentive to behave honestly while creating new blocks as fast as possible.

The catch is that creating new blocks involves solving a unique and computationally difficult mathematical puzzle. The difficulty essentially limits the rate at which new blocks can be produced, while the uniqueness of the solution enables the identification of the winning node (via their address). Malicious behaviour is not actively punished but rather it is discouraged due to the opportunity cost entailed from not behaving honestly.

One problem is that the communication time between nodes is not instantaneous and therefore it is possible that different geographic regions of the network may receive differing blocks that claim to solve the puzzle (network partitioning / forking). It is possible that two different nodes (miners) can legitimately find a solution to the problem, coincidentally, but as communication is not instantaneous different regions of the network will choose to build upon different winning blocks (temporarily). This causes a temporary fork, but as new blocks are added to either branch, eventually one branch will be longer than the other.

Following the longest branch of blocks is actually Bitcoin’s rule for achieving consensus and is known as the longest chain rule. The blocks on the shorter branch will be discarded and any of the transactions not in the main branch will eventually be added to block. Note that illegitimate transactions, e.g. those that attempt to double spend, will not be included into blocks that form the longest chain. Blocks containing such transactions will also be discarded as any “coin” can only be spent once. The caveat here is that the majority of nodes are honest (at least 51%) and are not trying to break the protocol.

It is theoretically possible that a new longest chain could be created by having a greater amount of mining power create a new longest chain. This risk is greatest for blocks closer to the “head of the chain” (the most recent block). The deeper a block is within the blockchain, then the less likely it is to be reverted.

This illustrates that blocks within PoW chains always have some probability of being reverted, and that the transactions of these blocks may not happen. In a maliciously created chain, it should not be assumed that transactions will be saved for inclusion into newer blocks as suggested above.

In the Bitcoin whitepaper, it was suggested that waiting for 6 blocks was enough time to ensure that a transaction wouldn’t be rejected since the probability of blocks being discarded at that point was vanishingly small. From here we can build an understanding of ‘finality’: blocks that can’t be reverted are said to be final. In Bitcoin and other PoW blockchains finality is not perfect since blocks have some probability of being reverted.

All of this shows that Bitcoin is robust against faults and that money can be created in a decentralised manner across a public and permissionless network. Ensuring a greater level of safety is possible by exploring methods in which we can guarantee finality. This idea will be explored later in the section on fault tolerance.

# Proof-of-Stake Blockchains

It should also be noted that some Proof-of-Stake (PoS) blockchains also work in a similar way to Bitcoin. Most PoS chains replace mining with block proposing. Instead of having a winning miner create the next block, new blocks are produced by a randomly selected node (“leader”).

The probability of being selected is weighted by stake. The idea is that having a greater number of coins suggests having a greater interest in seeing the chain succeed and hence such nodes will have a greater probability of producing the next block.

[NXT](https://nxtplatform.org/), which was one of the first PoS chains, uses this random leader method for block creation. Consensus within NXT is the same as Bitcoin: as new blocks are produced, they are added to the longest chain. Any forking is resolved by following this rule and nodes continue to produce blocks on the longest chain.

# Fault Tolerance

A fault occurs when an actor performs an action that breaks a protocol. For blockchains, we would like a protocol that is safe against arbitrary faults, as there may be malicious actors trying to exploit protocol weaknesses. Any protocol that is safe against arbitrary faults will also be safe against random faults and malicious actors.

A Byzantine Fault Tolerant (BFT) protocol is one that works even if a small percentage of actors behave arbitrarily. The misbehaving nodes could be accidentally faulty or they could be malicious. Naturally, this assumes that the majority of actors are correctly following the protocol. The phrase was introduced in a research paper called “[The Byzantine Generals Problem](https://www.microsoft.com/en-us/research/publication/byzantine-generals-problem)”. The titular problem concerns that of many actors finding consensus on 1-bit of information.

When consensus is found in a BFT protocol, the result that’s agreed upon is guaranteed to be correct. This means that the agreed result can be thought of as deterministically correct rather than probabilistic. When applied to blockchains, BFT algorithms guarantee finality on transactions. This means that once agreement is found upon a block, the block becomes final and transactions within that block cannot be reverted.

Clearly, this is different from Bitcoin and the other PoW chains. As described above, those chains are only probabilistically final. The type of consensus present in Bitcoin is often called “Nakamoto Consensus” and it is easy to see under why it can be confused with BFT since both are fault tolerant, but only the latter can guarantee finality. Further confusion comes from the fact that block production and the consensus algorithm in Bitcoin are heavily intertwined. This doesn’t need to be the case.

One of the proposed future directions for Ethereum was to continue producing blocks as they do now with miners, but to enhance consensus by having some group of nodes act validators to provide finality. The validators vote upon blocks that have already been produced. By voting upon a block they are stating that they believe it is correct. Once two-thirds of validators have voted then the block is said to be final. The mechanism for providing post-mining BFT consensus is being called a ‘finality gadget’.

# Future Directions

Most of the new projects being developed split block production from consensus. Some of the future blockchains will also employ a hybrid consensus algorithm. This section will cover some of the future directions being explored.

![](/images/1*e8t_v-R2Xn0tcYbgF_QnjA.png)

# Cosmos

Block production is also done by randomly selected leaders (but weighted by stake), but Cosmos doesn’t use the longest chain rule for consensus. Instead, it employs a BFT algorithm called Tendermint. This means that finality is guaranteed for every block. Furthermore, Cosmos is being designed to halt if the validators can’t come to consensus on a single block, thus avoiding a fork.

![](/images/1*IEaoDmqYGxI8drAttj8bqA.jpeg)

# Polkadot

The plan for Polkadot is to employ a hybrid consensus algorithm. Blocks will be produced by a random leader who adds the next block to the longest chain. There will also be BFT agreement, but rather than vote every round there can be multiple blocks finalised in one vote.

One of the benefits of using a hybrid consensus mechanism is that chains can continue to produce blocks by building on the longest chain, while BFT finality will eventually be found without hampering liveness (i.e. the chain will never halt).

Right now on Polkadot’s current testnet, PoC-2 (aka Krumme Lanke), consensus is similar to Cosmos. Blocks are produced by randomly selected validator nodes and then finalised via BFT agreement before moving on to the next block.

![](/images/1*x9QmmBsqdAqmPBsJg_2KjQ.png)

# Cardano

In naive terms, Cardano has a consensus algorithm that’s similar to Bitcoin (longest chain rule). As with NXT, block production will be done by a randomly selected leader. The team behind Cardano has gone to great lengths to address some of the weaknesses in selecting a random leader. They have chosen to ensure that the randomness in leader selection mirrors how blocks are produced in Bitcoin now.

While Bitcoin is leaderless, the blocks are produced by random miners. The distribution of winning mining solutions will cluster around those miners of greatest hashing power.

![](/images/1*Wd4iif2NDQTgcGPFiYKF_w.png)

# Ethereum

Ethereum was, at one time, also looking to enhance their consensus algorithm to include a post-processing of blocks that ensures finality. Blocks would have been produced as they are now via PoW, but there would be a group of validator nodes who vote upon the correctness of produced block. This is a so-called “finality gadget”. This means that there is a combination of the longest chain rule plus BFT: i.e. a hybrid of two consensus algorithms.

The most recent indications seem to suggest that Ethereum will potentially replace PoW with Proof of Stake (PoS), placing Ethereum in line with the newer blockchains under development. Blocks will be produced by a random leader and then eventually finalised by a finality gadget.

# More than one way to skin a blockchain

The ‘old’ days of blockchain were centered around using PoW mining and employing the longest chain rule to enforce consensus across the network. Later attempts started to use PoS as a means of replacing mining with something more energy efficient. The old PoS chains still relied upon the longest chain rule; however, in recent years there has been a push to include BFT agreement either: instead of the longest chain rule (Cosmos) or in tandem with it (Ethereum and Polkadot).

In a follow-up post we will have a deeper dive into how the consensus algorithm in Polkadot will work. A formal specification has also been created but has not yet been officially published.