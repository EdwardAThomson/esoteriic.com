---
title: "The gospel of Polkadot as told by GPT3"
date: "2022-10-19"
tags: blockchain,polkadot,cryptocurrency,web3,medium-archive
category: "blockchain and cryptocurrency"
description: "I generated this blog in  OpenAI’s playground "
original_url: "https://edward-thomson.medium.com/the-gospel-of-polkadot-as-told-by-gpt3-fe2873fae772"
---

# The gospel of Polkadot as told by GPT3

tl;dr — I generated this blog in [OpenAI’s playground.](https://beta.openai.com/)

![](/images/1*-DqXok4p5G1wQtUaFQlVkg.png)

*OpenAI’s [Dall-E](https://openai.com/dall-e-2/) generated a nice image for the blog.*

I told the playground what I wanted and got the blog below. I have included the prompt as well as the response.

I tidied up some whitespace, bolded the titles, but otherwise left it unedited so you can assess the “performance”. I have some commentary at the end of the blog.

![](/images/1*yK1Jmxle1pZCyjEsKjOzGg.png)

*OpenAI can generate text based upon a user-supplied prompt*

I need to write a blog that explains the Polkadot blockchain network. The blog should be detailed.

The important sections of the blog:

\- How Polkadot’s unique architecture enables scalability and interoperability

\- What does Polkadot’s relay chain do?

\- The role of validators in the Polkadot network

\- How does Polkadot’s governance work?

Write out the section title before starting each section, then write 3 paragraphs for each of the 4 sections.

## \## How Polkadot’s unique architecture enables scalability and interoperability

Polkadot’s relay chain is the main data structure that links together all the different parachains. The relay chain is also responsible for block production, transaction ordering, and cross-chain communication. This unique architecture enables Polkadot to be scalable and interoperable.

Polkadot is scalable because each parachain can process transactions in parallel. This means that the more parachains there are, the more transactions can be processed.

Polkadot is also interoperable because each parachain can communicate with each other. This is possible because of the relay chain. The relay chain acts as a centralized hub that connects all the different parachains. This allows for data to be exchanged between parachains, which is not possible with other blockchain networks.

## \## What does Polkadot’s relay chain do?

The relay chain is responsible for block production, transaction ordering, and cross-chain communication.

Block production is the process of creating new blocks of data on the blockchain. The relay chain produces one block every six seconds. Each block contains a list of transactions that have been processed by the network.

Transaction ordering is the process of order transactions by when they were received by the network. Transactions are first stored in a pool of unordered transactions. The relay chain then orders these transactions by when they were received and includes them in the next block that it produces.

Cross-chain communication is the process of exchanging data between different blockchain networks. Polkadot’s relay chain enables cross-chain communication by connecting different parachains together. This allows for data to be exchanged between parachains, which is not possible with other blockchain networks.

## \## The role of validators in the Polkadot network

Validators play an important role in Polkadot’s consensus algorithm. They are responsible for validating transactions and blocks, and for producing new blocks on the blockchain.

In order to validate transactions and blocks, validators must have a certain amount of DOTs staked on the network. DOTs are Polkadot’s native cryptocurrency. The more DOTs a validator has staked, the more weight their vote has in the consensus algorithm.

## Get Edward A Thomson’s stories in your inbox

Validators are also responsible for producing new blocks on the blockchain. They do this by participating in a lottery system where they are assigned a slot to produce a new block. If a validator does not produce a new block when their slot comes up, they are fined and their stake is reduced.

## \## How does Polkadot’s governance work?

Polkadot’s governance system is based on two concepts: referendums and voting periods.

A referendum is a proposal that can be voted on by all members of the community. Referendums can be used to decide anything from changing the fee structure to adding new features to the protocol.

A voting period is a period of time during which members of the community can vote on referendums. Voting periods last for two weeks. During this time, members of the community can discuss referendums and cast their votes. After the voting period ends, all votes are tallied and the referendum either passes or fails.

# Parameters

The parameters used in addition to the prompt to generate this response.

-   Model: text-davinci-002
-   Temperature: 0.7
-   Top P: 1
-   Frequency penalty: 0.5

# Commentary

The content is reasonable, perhaps a few things could be tidied up. I do wonder how much is (essentially) copied and pasted from the source.

If you have never played with such AI tools then the first question might be why is the prompt so long and detailed? It would be nice to think that you could give a short and concise question and that the tool would just give a great result.

In reality, it isn’t so easy. It is better to be more explicit and write out a more detailed request in order to get a response that matches what you want.

This prompt and response is actually the series of trial and error. I was teaching myself how the playground works by trying to generate a blog on a topic that I understand well.

My initial attempt was to generate a list of section titles. Afterwards I tried to generate a few paragraphs based upon each of those titles, and if successful I’d attempt to run everything at once with a very short prompt, such as:

> Create a list of topics about the Polkadot blockchain network and generate a detailed description of each.

Create a list of topics about the Polkadot blockchain network and generate a detailed description of each.

This didn’t work though. Some of the sections suggested by OpenAI lead to spurious text that tended to be either:

-   factual but then repeated many times as OpenAI struggled to generate new content; or
-   repetition is low but some of the content obviously false as the *temperature* parameter is turned up.

The temperature parameter is a way of letting the tool take some creative liberties. This allows the tool to make guesses about the correct content that you want, but also leads to inaccuracies. There are other amusing things that come up too, such as text that says “click here” which would obviously have been a hyperlink in the original source text (GPT3 hoovered up a lot of public data on the Internet) found in one of the Parity or W3F’s websites.

It was from the trial and error of picking a list of topics that are “good” that I could generate the above blog in one-shot given the prompt.

I’ve come across some people who have created scripts to auto-generate a blog using the OpenAI API. For popular topics I could imagine it is easy to give a short prompt and get a decent answer, but for niche topics it involves a lot more trial and error.