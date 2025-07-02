---
title: 'Review: Inaugural Enterprise Ethereum Alliance meetup in London'
date: '2017-07-29T15:09:33.000Z'
category: blockchain-and-cryptocurrency
---
This meeting was the first public meeting in London of the EEA. It occurred on 26th July 2017: [meeting web page](https://www.meetup.com/eea-london/events/241600108/)

The EEA is a loose organisation of companies who are interested in contributing to the evolution of blockchain technology. The emphasis falls towards to the technologies found within Ethereum but I suspect that is due to the possibilities offered by something like Ethereum as opposed to simpler implementations such as Bitcoin.

[EEA website](https://entethalliance.org/)

I shall do my best to recall the details of this meeting. All mistakes are mine.

This meeting
------------

This meeting was organised through meetup.com and open to anyone who wanted to attend. I heard about it early enough to secure a space for myself and a friend who's also active in this space. Overall, I have to say that this has been **one of the better meetings** I've attended in the blockchain space. All of the presentations were interesting and highlights some of the cool projects of the future.

The meeting followed a fairly typical conference format with a few presentations followed by some networking (many thanks to Clearmatics for the free beer behind the bar!). The attendees were all fairly cool, with no air of pretense, which helped to provide a casual atmosphere even though the meeting format was structured.

The following is a brief summary of each presentation. One clear theme through out the night was the use of zero knowledge protocols. This is interesting as it suggests that privacy is a particularly strong concern. Baking strong privacy preserving technology into projects from the beginning ought to improve security and make the products more secure than they might otherwise be if security is left until the end.

### Enterprise Ethereum Alliance Overview

Jeremy Millar, ConsenSys

Following a brief welcome from Conor in the EEA, Jeremy provided an overview of how the EEA started and where it hopes to go. The origins, he stated, were at Devcon2 in Singapore. He mentioned chatting to the Ethereum developers at the time, along with Anoop Nannra from Cisco, about setting up the EEA. After some discussion the EEA became a 'thing'. Interestingly, despite Cisco being in that first meeting and helping to make the EEA a reality they didn't officially join until recently. The source of information is 18th July 2017: [Enterprise Ethereum Alliance Becomes World's Largest Open-source Blockchain Initiative](https://entethalliance.org/enterprise-ethereum-alliance-becomes-worlds-largest-open-source-blockchain-initiative/)

![Image](https://steemitimages.com/DQmbYrh9MstZkLx3CLJfk2A3VehkV6VuVXbcawnyv6D9YGC/image.png)

### Mobius: Blockchain Transaction Privacy using Ring Signatures

Matthew Di Ferrante, Clearmatics

Matthew presented an alternative zk protocol that uses ring signatures instead of zk-snarks which have been popularised in Zcash.

This one was pretty maths heavy. I have to say I enjoyed that and even got a few questions in at the end. :-)

### Member Updates

A few brief updates from some of the member companies in the alliance.

**Alex Batlin, The Bank of New York Mellon**  
I can't remember all the details of Alex's talk. From memory, BNYM are not yet building anything in this space but are keenly watching. Alex is the chief guy in BNYM for watching future technology trends and determining their impact on the bank. Given that BNYM is the largest custodian in the world it is clear why they would want to keep an eye on this space. Being a custodian means that they are involved in the clearing and settlement of financial instruments. Blockchain is all about making settlements quicker and more secure. Do math!

One thing I believe he called out was what he say as the key features that EEA members want:

*   No proof of work. EEA members want pluggable consensus (i.e modularised consensus mechanisms).
*   Privacy of data in smart contracts.
*   Permissioning. Enable privileges to those who need it.

EEA members want to standardise this such that there is interoperability. They don't want to duplicate effort either. This means that there is no point having everyone create their own chain.

**Tyrone Lobban, JPMorgan**  
JPM are building a private blockchain called Quorum. They have forked the Geth code and added zk-snarks. This sounds like a cool project and one worth watching. Their code is public and currently listed on Github.

[JPM Quorum](https://www.jpmorgan.com/country/US/EN/Quorum)

**Jack Gavigan, ZeroCoin Company (creators of Zcash)**  
My memory is failing on me here. Can't quite recall what he said! Nice guy though. Chatted briefly with him afterwards.

### Zero-Knowledge Proof at ING

Cees Van Wijk, and Coen Ramaekers, ING

Presented their latest work in this space which is a zero knowledge protocol for verifying numbers. For example, someone wants to buy alcohol so they must prove that they are at least 18 years old; however, they may not wish to provide their exact age. With this protocol it would be possible to verify that the age fell within a particular range without revealing it.

The ING team have actually implemented this in a modified version of Geth (iirc). The protocol is more efficient that zk-snarks but also more limited in application: the protocol has a specific job which it appears to do well. One caveat is that the entity that calls the contract in order to verify a number must be a trusted entity. That is to say that if you were malicious you could, in theory, call the contract over and over again until you found the exact answer. That said, I do like the direction and think it makes sense to tackle these type of problems in a better way we currently see in the world at large.

Disclaimer: this is not the opinion of my employer.
