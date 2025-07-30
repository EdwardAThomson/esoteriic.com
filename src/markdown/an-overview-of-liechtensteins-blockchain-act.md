---
title: "An overview of Liechtenstein’s Blockchain Act"
date: "2018-10-24"
tags: blockchain,polkadot,ethereum,web3,defi,medium-archive
category: "blockchain-and-cryptocurrency"
description: "the Trusted Technology Law, or Blockchain Act, of Liechtenstein"
original_url: "https://edward-thomson.medium.com/an-overview-of-liechtensteins-blockchain-act-52ffbda0886b"
---

# An overview of Liechtenstein’s Blockchain Act

**tl;dr**: Liechtenstein have a law in a proposal stage that will hopefully be enacted: the Trusted Technology Law, or Blockchain Act.

**Disclaimer**: I am not a lawyer. This blog post does not constitute legal advice.

You have probably heard that Liechtenstein have a proposed Blockchain Act in the works and you may even be wondering what it is about. The law has not yet been enact, but rather it is in an consultation phase.

Versions: [German](https://www.naegele.law/Downloads/2018-08-29_VNB_Blockchain-Gesetz.pdf), [English](https://www.naegele.law/downloads/2018-10-05-Unofficial-Translation-of-the-Draft-Blockchain-Act.pdf)

In this blog I shall describe, at a high level, what the law is about. My knowledge of the law draws upon the presentation given by Thomas Nägele at the Fintech-Li conference in September 2018. I gave a summary of this conference in my previous post: “[Summary of the 2018 Fintech-li conference](https://medium.com/@edward.thomson/summary-of-the-2018-fintech-li-conference-1d2d55b7276)”.

![](/images/1*9xZfO6ChNnz14ylzPiSaGw.jpeg)

*One of my pictures from the Fintech Liechtenstein conference*

Mr Nägele and his legal firm contributed significantly to the draft version of the act. I now have a copy of his presentation plus a translation of the law. It should be noted that English is not recognised as an official language in Liechtenstein for legal purposes.

The images in this presentation were taken from the aforementioned presentation.

# In Brief: Definition of a token

The law is an attempt to legally define a token. The authors settled upon a definition that describes tokens as a container. The law does not classify tokens in any way, so there is no mention of utility tokens, payment tokens, security tokens, etc. The description is generic.

The current draft of the law in English provides the following definition of a token in Article 5:

> “Token”: Information on a TT System that can embody fungible claims or membership rights to an individual, goods, and/or other absolute or relative rights and ensuring the assignment to one or more Public Keys;

“Token”: Information on a TT System that can embody fungible claims or membership rights to an individual, goods, and/or other absolute or relative rights and ensuring the assignment to one or more Public Keys;

# Token Container Model

Essentially, this is a new type of legal entity or ‘institution’ as it was called in the presentation, and one which can embody rights of any kind.

![](/images/1*0bQJ6M45_xu4WUG69mZjhA.png)

*Tokens can contain rights. (Image source: Thomas Nägele of [Nägele Rechtsanwälte](https://www.naegele.law/))*

The previous picture shows examples of what kind of rights could be inside a token. It seems that the law is generic enough to allow any kind of right imaginable. Therefore, it is possible to have security tokens or the rights of home ownership embedded within a token.

![](/images/1*HGRmNrNyyqsMrDIZXszbZw.png)

*Trusted Technology System (Image source: Thomas Nägele of [Nägele Rechtsanwälte](https://www.naegele.law/))*

This latest picture shows how tokens and keys fit into the overall picture of a “TT system”. It also shows the possible chain of execution between someone who holds a private key and someone who may be authorised to dispose of the token. In short, I expect that custodians may hold private keys on behalf of another entity.

# Transfer of tokens, aka Disposal

As you would expect, it is possible to trade tokens and the rights embodied within the token are transferred when the token is traded. When a token is transferred, it is called a ‘disposal’. Oddly, that would be intuitive for a UTXO blockchain but perhaps less obvious for an Ethereum-like chain that has explicit accounts-and-balances. It is worth noting, that to make a transfer of a token a private key will need to sign a transaction and ‘dispose’ of the tokens associated with that key. The rights would be transferred to another key.

There are clearly challenges here whenever an item is transferred off-chain. The proposed solution is to have a physical item validator: i.e. someone who can verify the ownership of an item, and therefore determine who has the right to dispose of the token.

# Physical validators

> A person who ensures the enforcement of rights relating to property in the sense of Property Law embodied in token on a TT System;

A person who ensures the enforcement of rights relating to property in the sense of Property Law embodied in token on a TT System;

![](/images/1*b4CvkmFs1kiMeuC3JFS3Ow.png)

*Physical validators check that an item can be put into the token (Image source: Thomas Nägele of [Nägele Rechtsanwälte](https://www.naegele.law/))*

The presentation carries one further clarification, that it is ‘according to the property law of that country’. This means that the assets within the token could reside within a different country, they don’t need to be present in Liechtenstein. This raise some questions though. Can an a token be regulated in Liechtenstein, but contain a right or asset that is immovable and in another country? I think the answer is yes, but I’m not 100% sure. See the section below on ‘Physical Location’.

# Ownership

From reading the translation of the law I’m trying to understand how ownership is determined, and what it means to own a token.

## Get Edward A Thomson’s stories in your inbox

From Article 3.1:

> Trustworthy technologies within the meaning of this Act are technologies that ensure the integrity of tokens, their unambiguous allocation to the owner whom possesses the power of disposal and their disposal without an operator.

Trustworthy technologies within the meaning of this Act are technologies that ensure the integrity of tokens, their unambiguous allocation to the owner whom possesses the power of disposal and their disposal without an operator.

This seems to suggest that those who have the power to dispose of a token, by having the private key, will be the legal owner of tokens. The law further points out that having the power to dispose of a token means that the key holder is the owner of the rights embedded within the token. As I understand it, tokens can also be held by fiduciary on behalf of a legal owner.

From Article 9:

> the person authorised to dispose of the token against the obligor shall be deemed to be the legal owner of this right.

the person authorised to dispose of the token against the obligor shall be deemed to be the legal owner of this right.

However, in Mr Nägele’s presentation he states that a token is a not a thing in the sense of property law.

# Physical location

In a previous section I mentioned that there is a challenge in keeping the offline and online worlds in sync. There is a solution by using people who can validate the ownership of the rights and of the private keys, thus keep both worlds in sync. However, there is a question about what happens when (say) physical items are not located within Liechtenstein. Given that the country is particularly small and that blockchain networks are global, then at first sight it may seem that this law is very short in its reach.

Let’s confer with Article 12:

> If Liechtenstein Law is applicable according to Art.11, the token is considered to be an asset located in Liechtenstein.

If Liechtenstein Law is applicable according to Art.11, the token is considered to be an asset located in Liechtenstein.

In short, Article 11 is about the tokens being generated by a trust service provider in Liechtenstein and so if that is true then the assets would be considered as located in Liechtenstein. Clearly, this is an issue for (e.g.) immovable items, such as property, based in another country.

I believe there is probably a way to resolve this. In pure speculation on my part, I can imagine a Special Purpose Vehicle domiciled in Liechtenstein could be the owner of the property, and therefore of the tokens and the private keys. The property could be in (e.g.) the UK, and the SPV would be based in Liechtenstein. The owner of that SPV could be somewhere else. I’m not a lawyer so I don’t really know and this should not be considered advice.

# Service Providers

There are different types of service providers defined in the law, but ultimately the point is that these service providers won’t need to apply for a licence but they do need to register with the FMA (Liechtenstein’s equivalent of FINMA). There was a conscious choice not to go with the traditional licensing route.

There are a number of requirements in order to be accepted as a service provider. Recall that this is not yet in law, so these requirements can only be seen as suggested.

-   Register with FMA
-   Have no criminal background
-   Need 100,000 CHF (not a fee)
-   Need a clear organisational structure
-   Need written internal control mechanisms

There are more requirements, but these seemed like the main ones. The process for registration is intended to be fairly quick (less than a year).

# Thanks

I want to extend thanks to Thomas Nägele for allowing me to use the pictures from his presentation, and to Alexis Esneault of Nägele Rechtsanwälte for sending the English translation and for answering a couple of quick questions with regards to the wording of the law.