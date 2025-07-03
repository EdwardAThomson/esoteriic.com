---
title: "Building Private Loot Systems with Fair and Verifiable Randomness Using VRFs"
date: "2024-09-08"
tags: blockchain,gaming,cryptocurrency,medium-archive
category: "blockchain and cryptocurrency"
description: "Generating loot privately on a player’s device using VRFs."
original_url: "https://edward-thomson.medium.com/building-private-loot-systems-with-fair-and-verifiable-randomness-using-vrfs-746039dc0aa4"
---

# Building Private Loot Systems with Fair and Verifiable Randomness Using VRFs

**tldr**: Generating loot privately on a player’s device using VRFs.

In modern games, random loot generation is a core feature that can greatly enhance player experience. Whether you’re looting treasure in an RPG or getting randomized rewards in a multiplayer game, the fairness of these systems is often questioned. Players want to know:

-   **Is the loot truly random?**
-   **Can it be tampered with?**

To address these concerns, we can use [**Verifiable Random Functions**](https://en.wikipedia.org/wiki/Verifiable_random_function) **(VRFs)** — a cryptographic technique that guarantees both **unpredictable randomness** and **verifiable fairness**. This technique can be used in any game requiring randomness.

Moreover, loot generation can be performed on the player’s computer meaning that the outcome can be kept private until it is the time to reveal the result. This is especially useful in **blockchain gaming**, where outcomes are either kept private by a trusted third party or made fully public when decentralized. With VRFs, we can achieve **private computation** in a **decentralized** manner, removing the need for third-party trust.

In this blog, I’ll introduce how VRFs work, why they are a perfect fit for loot generation systems, and how we’ve implemented them in a simple proof-of-concept. The code is on GitHub: [VRF-based Loot Generation](https://github.com/EdwardAThomson/vrf-loot-generator?tab=readme-ov-file).

![](/images/0*fMP3KbhXASx7AEga)

*[Genshin Impact](https://en.wikipedia.org/wiki/Genshin_Impact) is a well-known game that uses [gacha mechanics](https://www.youtube.com/watch?v=56OcV44Judc) for funding. Do you trust the randomness? ([source](https://play.google.com/store/apps/details?id=com.miHoYo.GenshinImpact&hl=en))*

# What Is a Verifiable Random Function (VRF)?

At its core, a **VRF** is a function that produces **random outputs** that are tied to a specific input (for blockchain games it could be a blockhash). What makes it powerful is its ability to generate **proofs** that allow anyone to verify the correctness of the random output, without knowing the underlying private key.

VRFs ensure that:

-   **The output is unpredictable**: Without the private key, no one else can generate the output by just knowing the input (e.g. a blockhash or transaction ID). **No player** can game the system or predict the outcome of loot drops. Similarly, **developers** can’t rig the loot distribution, ensuring transparency and trust.
-   **The output is verifiable**: With the corresponding public key and a proof, anyone can confirm that the output was correctly generated based on the input.

# Why VRFs Are Useful in Games

In most games, especially those with multiplayer or competitive elements, **fairness** and **randomness** are key factors in maintaining player trust. When players believe that the loot system is biased or easily manipulated, it erodes their engagement and trust in the game.

Here’s why VRFs are particularly valuable in game development:

1.  **Fairness**: Players want to feel that everyone has an equal chance of receiving valuable items. With VRFs, you can **prove** that loot was generated fairly, which is especially important in games that allow real-world trading.
2.  **Unpredictability**: In a typical game, random number generation (RNG) can sometimes be predictable or even exploited. VRFs ensure that the randomness is **cryptographically secure**, meaning no one can predict or influence the outcome. Some care is required in managing how players obtain their inputs to ensure unpredictability.
3.  **Player Trust**: When players know that the randomness behind loot drops can be **verified** and is tamper-proof, they are more likely to trust the system. This can boost engagement, especially in competitive or multiplayer games where fairness is critical.
4.  **Auditable and Transparent Mechanism**: In decentralized games or games that use blockchain technology, having an **auditable trail** of randomness ensures that everyone can verify how items were distributed. It can help combat accusations of cheating or unfair practices.
5.  **Private loot**: While it is important that the mechanism for generating randomness is **transparent**, it’s equally important that players can keep their **inventory private**. In current blockchain games, the results of randomness are public, forcing player inventories to be visible. VRFs offer a solution that allows randomness to be generated privately on the player’s device, keeping their inventory hidden until they choose to reveal it.

# VRFs in Blockchain Games and NFTs

Both [**Axie Infinity**](https://chain.link/vrf) and the [**Bored Ape Yacht Club**](https://www.chainlinkecosystem.com/ecosystem/bored-ape-yacht-club) **(BAYC)** projects used the Chainlink VRF system to generate **NFT traits**. This solution ensures that the traits are **provably fair**, which is critical for NFT distribution. However, for games where maintaining a **private inventory** is important, such a system is not appropriate. Opting for centralization is possible but not desireable, as it reintroduces trust issues.

![](/images/0*dk2YDFW2dbpVkczh.jpeg)

*BAYC NFTS ([Source](https://www.chainlinkecosystem.com/ecosystem/bored-ape-yacht-club))*

As VRFs can be computed on a player’s device without impacting the other properties (e.g. fairness). However, the choice of input is important. In this proposal, we suggest that a player should send a **transaction** that shows their intent to generate loot. This intention is made public and is recorded on an immutable ledger, while the **blockhash** from the transaction confirmation can be used as the input to the VRF.

This approach reduces the risk of a player **brute-forcing** VRF outputs to find a favourable result, ensuring that the process remains both **fair** and **secure**.

## Example games using blockhashes

Determining the result of gameplay from a blockhash is not new. As best I understand, this technique features in [Nine Chronicles](https://nine-chronicles.com/), an already playable blockchain-powered idle RPG.

> Nine Chronicles is a fully open-sourced online RPG without servers, governed by its players, and supported by a complex economy driven by supply and demand.

Nine Chronicles is a fully open-sourced online RPG without servers, governed by its players, and supported by a complex economy driven by supply and demand.

![](/images/0*Ag2P7yhD0clHDXdN)

Transactions are registered on-chain in the manner described in the previous section. The result of combat or of the traits found in crafting items is derived from blockhashes. While Nine Chronicles is decentralized, all of the results are calculated using publicly available values. The fact that anyone can check the calculation is good reasons of cheat prevention.

In my own [blockchain-based dungeon crawler](https://medium.com/@edward-thomson/subrogue-the-build-so-far-ca39edb4edc3) (still a PoC), I essentially used the same technique. Blockhashes were used to provide a random seed while the map and its contents were derived deterministically from this seed. Pushing calculations off-chain to be more scalable is a technique honed by the guys at [Xaya](https://xaya.io/).

# Going forward with a Simple Proof of Concept

The next step in developing this idea is to use **VRFs** to generate loot and other in-game results, like combat outcomes. Each item would have its own **VRF Output**, calculated deterministically but kept private to the player. The results generated we be done in the same secure, verifiable manner.

Here, the VRF calculation would take a **blockhash** (from a transaction confirming the player’s intention) as an input. Some **metadata** could be included in the transaction, specifying its purpose (e.g., loot generation, or combat resolution), ensuring that the intent is recorded immutably on-chain.

VRFs are similar to digital signature functions. A **private key** is required to perform the calculation, while a **public key** is used to verify the result. The calculation produces a pseudo-random output that is cryptographically secure and cannot be guessed or manipulated.

The inputs to a VRF are:

-   **Private key**: Held by the player.
-   **Message**: A blockhash or other deterministic input (e.g., from a transaction).

The outputs from a VRF:

-   **VRF Proof**: This includes the **scalars s** and **t**, which prove the validity of the calculation.
-   **VRF Output**: A pseudo-random value used to determine loot or other game outcomes.
-   **VRF Index**: A hash of the output, used for verifying the result later.

The key idea of this solution is to keep the VRF Output **private**. The player stores this output locally on their computer and only reveals it when necessary — for instance, when they want to trade the item to another player. In such cases, the output would only need to be shared with the other player, ensuring that no one else knows the contents of the loot or other private results.

The VRF Proof and the VRF Index are **public** values and can be stored on-chain. This allows the verification of calculations, ensuring that the process was performed fairly without revealing the private results to everyone.

## VRF verification

To verify a VRF result, the following elements are required:

-   **Public Key**: Used to verify that the result was generated by the correct party.
-   **VRF Proof**: The proof (scalars s and t) that ensures the calculation was performed correctly.
-   **VRF Output**: The pseudo-random value generated by the VRF, which is needed to reveal the actual result.
-   **Input Message**: Typically the **blockhash**, which serves as a public and immutable seed for the randomness.

As stated, while the **VRF Output** is withheld, it becomes **impossible to verify the result**. This ensures that no one can determine what loot was generated until the player chooses to reveal the output. By keeping the VRF Output private, the player maintains complete control over the visibility of their inventory or other sensitive game results.

This mechanism is especially powerful in games that require both **privacy** and **transparency**. Players can keep their generated loot hidden until they decide to share or trade it. Meanwhile, the public **VRF Proof** and **VRF Index** allow others to verify that the loot was generated fairly without knowing its exact contents.

For more details on how the VRF works and the deeper technical explanation, check out the [VRF.md file](https://github.com/EdwardAThomson/vrf-loot-generator/blob/master/VRF.md).

![](/images/0*kL48l7qkuTHhoRCp)

*The important values in the calculations (source: my [GitHub repo](https://github.com/EdwardAThomson/vrf-loot-generator/blob/master/Screenshot_20240906_section1.png)).*

## Code: Proof-of-concept

In the loot generation system we built, we use a VRF to:

-   **Generate Loot Rarity**: Each item has a chance to be **Common, Rare, Epic, or Legendary**, with **Common** items being much more likely than Legendary ones. By slicing different parts of the VRF output, we can adjust probabilities and ensure that rare items remain rare.
-   **Assign Item Types and Modifiers**: Items such as **Swords, Axes, Shields**, and others are assigned based on slices of the VRF output. Modifiers like “Flaming” or “Holy” are added to give the items unique characteristics.
-   **Ensuring Verifiability**: Anyone can verify that the loot was fairly generated by checking the proof associated with each loot drop, ensuring that the system was not manipulated.

The code for this project is on GitHub: [VRF-based Loot Generation](https://github.com/EdwardAThomson/vrf-loot-generator?tab=readme-ov-file).

![](/images/0*UV_In1EVFE4lWY_j)

*Example output from the loot generation code (source: my [GitHub repo](https://github.com/EdwardAThomson/vrf-loot-generator/blob/master/Screenshot_20240906_section2.png)).*

# Conclusion

Using VRFs in games can revolutionize how we handle **randomness** and **fairness** in loot generation, making it impossible to cheat the system or rig outcomes. In games where fairness and transparency are key to keeping players engaged, VRFs provide an ideal solution that can be both **trusted** and **verified**.

As we continue to build more complex and decentralized gaming systems, VRFs can play a critical role in ensuring the integrity of core game mechanics like loot drops, random events, and competitive fairness.

# Acknowledgements

-   I used ChatGPT to help write the code and also for copy editing here.
-   Everyone at the Decentralized Gaming Association [DGA Discord](https://discord.com/invite/eZEVrSd)