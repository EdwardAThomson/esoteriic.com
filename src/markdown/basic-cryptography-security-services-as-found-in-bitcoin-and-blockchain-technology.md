---
title: >-
  Basic cryptography: "security services" as found in Bitcoin and blockchain
  technology
date: '2017-08-11T19:24:15.000Z'
category: cryptography
---
Further to my previous post on basic cryptography I figure it is worth revising some more basic definitions. To recap my previous post see here: [Learn the basics of cryptography so you can grill ICO project leaders](https://steemit.com/cryptography/@edwardthomson/learn-the-basics-of-cryptography-so-you-can-grill-ico-project-leaders)

Understanding what the terms mean is both important for developers who want to create something in this space but they are also helpful for investors who are trying to critically evaluate a project. Sophisticated investors can likely hire someone to the heavy lifting here, but for the rest of us we are at least fortunate to have the Internet and good books.

Source Text - Everyday Cryptography
-----------------------------------

As an excellent starting point to cryptography I will re-iterate my recommendation of the book [Everyday Cryptography by Professor Keith Martin](https://www.amazon.co.uk/Everyday-Cryptography-Fundamental-Principles-Applications/dp/0198788002)

Some of the book is available from Google Books which is helpful for me creating this post since it allows readers to easily check what I'm saying with a trusted source. Obviously if you don't trust me then there is a chance you would trust Oxford Press and Professor Martin. Trusting both, or either, does not require to mine anything. There is an implied consensus mechanism by people gossiping that they trust Oxford Press and / or this Professor but that isn't a cryptographic proof. Something to think on.

While writing this article I came across a set of explanations which are very similar to those found in the aforementioned text and can be found at the following website: [Cryptography quick guide](https://www.tutorialspoint.com/cryptography/cryptography_quick_guide.htm)

Security services - definitions
-------------------------------

The following are basic definitions for community security services (as they are known). I've taken the definitions from Everyday Cryptography but tweaked a little bit of the wording for readable. Feel free to confer with the [Google Books copy of Everyday Cryptography](https://books.google.co.uk/books?id=1NHli2uzt_EC&pg=PR15&source=gbs_selected_pages&cad=2#v=onepage&q&f=false)

*   **Confidentiality** is the assurance that data cannot be viewed by an unauthorised user. Data confidentiality does not give assurance on its correctness (integrity).
*   **Data integrity** is the assurance that data has not been altered in an unauthorised (which includes accidental) manner. This assurance applies from the time that the data was last created, transmitted or stored by an authorised user.
*   **Data origin authentication** is the assurance that a given entity was the original source of received data. This proves to the receiver that the data originally came from the original source (e.g. Alice) but it doesn't prove when that happened. DOA is also known as message authentication: it requires data integrity but is a stronger requirement.
*   **Non-repudiation** is the assurance that an entity cannot deny a previous commitment or action. Non-repudiation is the assurance that the original source of some data cannot deny to a third party that this is the case. It is a stronger requirement than data origin authentication, since data origin authentication only requires this assurance to be provided to the receiver of the data. Non-repudiation provides strong assurance of integrity and identity to any third party.
*   **Entity authentication** is the assurance that a given entity is involved and currently active in a communication session. This requires a freshness mechanism to provide the notion of 'active', or real-time, authentication. This can also be referred to as identification. Entity authentication requires data integrity, but technically not data origin authentication. However, data origin authentication plus freshness provides entity authentication. If two participants in an exchange of data perform this form of authentication with each other then it is known as mutual entity authentication (probably not a surprise!).

It should be clear from the above that authentication requires integrity. This is how cryptography defines it.

The following table shows the primitives that can achieve a particular security service on their own.

![Image](https://steemitimages.com/0x0/https://www.tutorialspoint.com/cryptography/images/primitive_service.jpg)

Recall that I covered each of the cryptographic primitives in a previous post: [Learn the basics of cryptography so you can grill ICO project leaders](https://steemit.com/cryptography/@edwardthomson/learn-the-basics-of-cryptography-so-you-can-grill-ico-project-leaders). Refer back to that post for a reminder.

This picture is essentially the same as the table on page 16 of Everyday Cryptography. I'm not sure who copied who though.

Security services used in Bitcoin
---------------------------------

To understand how some of these have been implemented in blockchain technology let's have a look at how they have (or have not) been implemented in Bitcoin.

**Bitcoin addresses**: the original style address (that start with a '1') are hashes of a verification ("public") key. The hash provides both an integrity check that the key is correct and makes the identities easier to display (compare length of hash to the key). This is data integrity.

**Bitcoin public keys**: these keys, verification keys as they should really be called, are used to verify signed transaction hashes (they are found in the locking script of a Bitcoin transaction). The signed transactions provide data integrity as well as data origin authentication.

Moreover, the fact that the signed hashes are publicly verifiable by anyone then there is also non-repudiation. Which is to say that we have a strong undeniable link between a transaction and the verification key. This is obviously by design since we want to have complete trust that a transaction was authorised (let's ignore the stealing of signing keys for now).

**Blockchain hashes**: it is almost self-explanation by now to say that the hashes stored in the blockchain are proofs of data integrity.

**Peer-2-Peer authentication and encryption** (BIP 150 / 151): By default Bitcoin doesn't provide confidentiality of transactions nor does it provide authentication of the nodes in the network (node != address). BIP-150 provides a scheme by which nodes can authenticate with each other (mutual entity authentication), but is dependent upon BIP-151 which is a proposal to introduce encryption between nodes. AFAIK, only one wallet provides these functionalities. The combination of the two provide confidentiality and mutual entity authentication.
