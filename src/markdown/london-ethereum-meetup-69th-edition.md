---
title: "London Ethereum Meetup 69th Edition"
date: 2017-07-01T12:00:46.000Z
category: blockchain-and-cryptocurrency
---

[London Ethereum Meetup 69th Edition](https://www.meetup.com/ethereum/events/239826945/)

In this article I provide a brief summary of the ideas presented at the Ethereum London Meetup held in London on 16th June 2017 in the Sir Alexander Fleming building of Imperial College London.

Summary of talks
----------------

**Polkadot – Gavin Wood**  
A key problem in the cryptocurrency space is that of interchain communication. Most blockchains, and tokens, are unable to 'talk' with each other. Trading between coins or sending information across blockchains is not straight forward and often requires external parties which are centrally controled. Ideally, the whole process of sending information from one blockchain to another would be fully decentralised. This is where Polkadot comes in.

It sounds like it will be a platform for facilitating this process but also potentially a set of minimum requirements (like a standard) which are necessary for cross-chain communication to happen. Polkadot is not the only project to tackle this problem. There is also Internet of Coins and Hyperledger. The latter is perhaps not exactly the same but there is an attempt to have cross-chain communication.

One of the key drivers here is that there are so many blockchains now (count all the altcoins in existence) and that to a great extent they are disconnected from each other. It is certainly possible to trade from one to another using an exchange, but most of those are centralised, and the overall process is not smooth as it could be. One suggested benefit was that if a particular blockchain had lower fees than another, then by leveraging an interchain communication protocol you could take advantage of that price difference and save money on your transaction (or computation). That part I'm sure ought to eventually be possible. One comment that did make me scratch my head was that the more blockchains there are within this whole ecosystem then the more secure it is. Intuition suggests to me that more chains equals a greater attack surface. A poorly implemented chain could have a number of security issues. Pairing it with a more secure chain may be beneficial for it, but I doubt that relationship is reciprocal.

There was also some discussion around Web 3.0 and the future of the blockchain industry.

Gavin is a former lead developer of Ethereum.

**Charity DAO – Christoph Jentzsch**  
The founders believe there is a need to have charitable donations transacted via a blockchain in a transparent and honest way. It is their belief that charities are too opaque and that the donations don't necessarily get to the people who are supposed. Too often the organisers of the charities take too much money for themselves.

Christoph Jentzsch is a founder of Slock.it and previously lead tester of Ethereum.

**Aventus – Alan Vey and Annika Monari**  
Aventus aims to be a fair, secure, and transparent blockchain-based event ticketing solution that practically eliminates fraud and unregulated touting. The main idea is that organisers can create, manage and promote their events and tickets with dramatically reduced platform costs, and can set price controls and receive commissions on secondary market sales.

I have my doubts. Both on the economics side and the technical side. On the economics side, they are trying to remove the 'black market' and with particular focus on scalping. Large scale ticket traders take risk away from the venue by buying bulk; they assume the risk and then sell at a profit in order to cover their risk. There was some suggestion that the team would like to completely kill this. That may not quite be the case but it did make me worry. While excessive profits on an event is unpleasant it isn't wise to completely remove all large ticket buyers. I dare say that for large events all tickets would sell out, but probably not the case for small events. When a venue holds all the tickets they need to do the all the leg work in trying to sell them. Aventus did explain that tickets could be resold (a fixed number of times) so it might still be possible to have large buyers, but they also suggested that they could kill the black market by doing so. How would they prevent an out-of-channel sale? Even if the recorded transaction says $20 per ticket as according to public ledger there is no way you can check whether extra money has been sent on the side. Trying to prevent / stop / kill a black market is not as easy as dreaming.

On the technical side I was worried about the idea of putting personal data on to any blockchain. Data Protection laws are not favourable to this, especially in the EU. When GDPR hits next year I'm expecting things to get messy for such projects. The suggestion of putting credit card data into a blockchain also fills me with worry. I'd need to re-read on PCI for clarity, but I'm not expecting it to be favourable.

The suggestion of hashing the data is completely inappropriate. That's not to say that a hash function, as a cryptographic primitive, can't be used but rather not simply as a hashing the personal data. The whitepaper offers no further clarity. It merely states that the data can be "encrypted or hashed". I'd say encryption isn't really an appropriate choice. The indecision here suggests that it hasn't been properly thought through.

**Funfair – Jez San**  
This is a decentralised application (dapp) that sits on top of Ethereum and provides gambling functionality. They are aiming to provide this dapp to existing online casinos rather than run their own online casino. The claims are that it is transparent, fair, and scalable. The scalability comes from the use of state channels such that individual bets and transactions are done at a peer-to-peer level. Only the final balances are put into the Ethereum blockchain.

I managed to have a quick chat with Jez in the pub afterwards. Part of the fairness aspect of Funfair apparently comes from having both peers contribute to the random seed, and since this is on the Ethereum blockchain it is transparent. While this makes sense in theory I have my doubts as to whether it is free from being 'gamed' (the random seeds can't be tampered with). The transparency aspect means that crud randomness should be spotted it wouldn't prevent it before the fact. If we have learned anything from Dual EC DRBG is that even good looking randomness might not be. Moreover, from a security perspective you should never trust user input. I cannot say why such concerns will be manifested inside Funfair but it wouldn't surprise me.

Jez San, OBE, is one of the people behind Star Fox (classic Nintendo game). See: funfair.io

**Balance – Richard Burton**  
A blockchain enabled browser. I'm having difficulty finding more details on this. I will update once I can find it.

It is worth pointing out that Balance is not the only browser to push these features.