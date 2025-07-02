---
title: "What is a Blockchain? (in simple terms)"
date: 2017-06-24T13:05:10.000Z
category: blockchain-and-cryptocurrency
---

A blockchain is a set of data blocks which are linked through certain mathematical formulas. In most blockchains that currently exist the blocks of data have contained information about transactions. Bitcoin is an obvious example of this. Each block of data in the Bitcoin blockchain contains information about transactions in a 10 minute period. This description tells us what's inside each block of data and that the blocks **are** linked but not **how** they are linked. In simple terms, that is a blockchain.

**Integrity preserving**  
The way blocks are linked is to do with certain functions that detect a change in data integrity. The functions, actually called hash functions, take any chunk of data as an input and produce a value at the end which is (essentially) unique to that block of data. This is to say that each block of data has a unique hash value. If the data inside the block was modified by a single bit then the hash value calculated would be completely different. This is how we can tell if a block has been modified: the hash value would be different and hence we have a very strong notion of data integrity. Moreover, it is these hash functions that link the data blocks together as a chain. The hash value of the previous block (which is a block of data containing previous transactions) is included in the next block of data.

If you look at the current block in the Bitcoin blockchain, i.e the latest block, it contains transaction data for the previous 10 minutes plus the hash value from the previous block. This linking of blocks is done continually: in the case of Bitcoin new blocks are added to the chain every 10 minutes (on average).

**Digital Ledgers**  
In my view, blockchain technology is wider in scope than just money. The data blocks don't have to just be financial transactions, or transactions of any sort, but I admit that this has been the most common application so far. As most blockchains are a list of transactions we can see why this can be called a ledger. It is my view that this blocks of data could be anything. The linking of the data blocks via chains of hashes is what makes it a blockchain in my mind.

Let's go to Google and see what a ledger is:

> The ledger is a permanent summary of all amounts entered in supporting journals which list individual transactions by date. Every transaction flows from a journal to one or more ledgers. A company's financial statements are generated from summary totals in the ledgers.

This fits with how Bitcoin's blockchain has been implemented: it is a summary individual transactions by date.

Let's also Google for the definition of Blockchain and see if they match:

> A digital ledger in which transactions made in bitcoin or another cryptocurrency are recorded chronologically and publicly.

I'd say that's a match. However, this definition lacks one important fact which is true of Bitcoin and all other cryptocurrencies: the ledger is distributed. That said, I don't believe this is necessarily true of all possible blockchains.

**Distributed Ledgers**  
One of the key features of Bitcoin is the fact that the data is public and that anyone can view the transaction information. This allows for transparent verification that a transaction has taken place.In addition, this data can be stored on any computer around the world. You can, in theory, download the entire Bitcoin blockchain. This concept leads to the definition of a distributed ledger, which is to say that the ledger does not reside in a single place but in many places.

Moreover, as Bitcoin is essentially automated with no centralised nodes of power it can also said to be decentralised. At least, in theory. There are a number of caveats as to why that isn't perfectly true in the real world but as an ideal let's just say that Bitcoin is a **public, distributed, and decentralised ledger**. That is perhaps the best definition of Bitcoin and of almost all cryptocurrencies.

**Addendum: Cryptography**  
When I was getting into cryptocurrencies I started to teach myself cryptography. I did what I could from online sources but eventually purchased a text book. I would recommend the same thing to everyone getting into blockchain technology. It is worth your time understanding what cryptography is and why it works. My review of it (written in 2014) can be found here: [Amazon review – Everyday Cryptography](https://www.amazon.co.uk/review/R2IOFU3J6EI4LA/ref=cm_cr_rdp_perm).