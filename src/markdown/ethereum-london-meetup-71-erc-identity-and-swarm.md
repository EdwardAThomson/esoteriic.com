---
title: "Ethereum London Meetup 71: ERC Identity and Swarm"
date: '2017-10-13T23:02:06.000Z'
category: blockchain-and-cryptocurrency
---
[Ethereum London](https://www.meetup.com/ethereum/) (the original and largest Ethereum meetup in the world and has operated since January 2014) hosted an event at Imperial College London where two talks were given.

In this post I provide a recap of the two talks which were presented:

*   ERC Identity
*   Swarm

All mistakes are my own. If you spot a mistake then feel free to provide clarification in the comments below.

![Image](https://steemitimages.com/DQmWrVZsW8QLj4D75xGR5dnXJ58w7ptYAXvry7jhKgGw2Vo/image.png)

ERC Identity
------------

Fabian Vogelsteller - [http://frozeman.de](http://frozeman.de)  
[https://twitter.com/feindura](https://twitter.com/feindura)

About Fabian: "As I've worked on, and build a few of Ethereum's most known projects, like the Mist Browser, the Ethereum Wallet, web3.js and especially proposed together with Vitalik the ERC-20 Token Standard."

Fabian kicked off with a brief discussion of what Identity means, or could mean, and essentially stated that it amounts to 'claims'. His example was that of a passport which we all know and accept as a proof of identity. He stated that passports are a proof of legal identity and are issued by a central authority (yep! I'd agree). He also suggested that the passport is a proof of claims: at some time in the past you obtained your passport by providing (e.g.) a birth certificate, a photograph, and physically visited a passport office. The suggestions that the government has accepted these claims as true and issued you with a passport to prove that they accept your claims.

### ERC725

The question is then how to translate that to a decentralised notion of identity where there may not be a single issuer nor even necessarily a centralised issuer. Obviously, for this discussion he was mainly concerned with Ethereum but the concept applies far wider. Just as ERC20 is a standard for tokens, Fabian proposed [ERC725](https://github.com/ethereum/EIPs/issues/725) as the standard functions for processing identity on Ethereum. Alongside the standard functions, Fabian has proposed a standard data structure [ERC735](https://github.com/ethereum/EIPs/issues/735).

If I have understood correctly ERC725 is proposing what a standard set of identity functions should be called and what parameters they should take; however, it doesn't look like it proscribes exactly how an identity verification (authentication) protocol should work. Certainly, Fabian provided a high level example of a challenge-response protocol but I don't think that is enforced in this standard.

### ERC735

ERC735 is an accompanying data structure:

    struct Claim {
        uint256 claimType; // The number which represents the type of claim.
        address issuer; // The issuers identity contract address, or the address used to sign
        uint256 signatureType; // The type of signature
        bytes signature; // For example: sign(this.address + claimType + data)
        bytes data; // The ERC suggests this should be a hash of the data - which /may/ be reasonable but I'm skeptical
        string uri; // The location of the claim, this can be HTTP links, swarm hashes, IPFS hashes, 
    }
    

In the proposal (see the link below) It sounds like the **signatureType** variable was not part of the original design but was later added. This means that almost anything could be used: it wouldn't need to be a valid signature function or even hash function. The outcome of this is that this standard is highly flexible but also open to abuse. Poor implementations of this standard could lead to some potentially lead to horrific data leaks or embarrassing authentication failures (false negatives: the contract doesn't think you are a malicious actor when you actually are).

#### Conclusion

Overall, I think the structure is sensible. It has the right elements but the implementation will be down to the individual projects that decide to adopt the standard. Some projects will do it well (I hope) while others will do it hideously wrong. Hitherto, there has been quite a few projects trying to tackle identity management but essentially none of them have used certain key words that make me confident in what they are doing. There is one exception to that and I've forgotten the name of the project but it was posted in the Web3 Slack. It was the only project in the blockchain space that I recall using the term "k-privacy". I don't know if they are doing it right but it did make me think: "ok, at least these guys understand the problem."

What problem? Well, I really wouldn't endorse putting personal data (PII) or any sensitive data on a public blockchain. Nor would I suggest simply hashing that data and naively concluding that data is safe. Personally, I think more efforts should be made to anonymise the data where it is held. Should there be a breach then it wouldn't result in personal data being easily recoverable (it is anonymised - using a proper anonymisation scheme). I think anonymisation is hard and it is truly underestimated how difficult it is. I had hope to write more on anonymisation but just haven't got around to it. I do have some writing here: [Anonymity](https://odinnsecurity.com/index.php/anonymity/).

Further reading:  
[ERC725](https://github.com/ethereum/EIPs/issues/725)  
[ERC735](https://github.com/ethereum/EIPs/issues/735)

Swarm
-----

Viktor Tron - [https://twitter.com/zeligf](https://twitter.com/zeligf)  
Swarm: [http://swarm-gateways.net/bzz:/theswarm.eth/](http://swarm-gateways.net/bzz:/theswarm.eth/)

This was an interesting yet fairly technical presentation. I had heard of Swarm before but not looked into the details. I think I need to read further into the details to properly understand. I will try my best to provide a simplified overview. In a nutshell: "Swarm is a distributed storage platform and content distribution service, a native base layer service of the ethereum web3 stack."

The services provided by Swarm:

*   Document Storage
*   Content Distribution
*   Internode Messaging
*   Decentralised Database Service
*   Payments & service guarantees

The "promises" of Swarm (my wording):

*   Zero downtime
*   Fault tolerant (content is stored redundantly)
*   Censorship resistant
*   Self-sustaining
*   Auto-scaling (popular content replicates more -> leads to lower latency)

Which sounds pretty neat. Everyone in the blockchain space can see the obvious benefits that these features bring. Some questions that come to mind are how to guarantee that unpopular content doesn't disappear just because it is rarely access. To counter this, the team is trying to build in an insurance system to protect files which are rarely accessed (e.g. Grandma's photo album).

Apart from providing a broad overview of Swarm, Viktor also introduced 3 specific mechanisms that will help to facilitate the "governance" of storage contracts:

*   **Swap** (transact) - Peers swap / transact service requests
*   **Swear** (commit) - The ability to promise / commit to a service contract (collateralisation)
*   **Swindle** (enforce) - Takes care of enforcing the service contract (judgement)

The last one sounds like suing in order to uphold a contract.

One of the more complex mechanisms behind swarm was the notion of sending cheques which are a promise to pay but are not a proof of funds. It sounded like cheque payment functioned in a similar way to payment channels but I really need to revise this topic further to get a better understand of it. I tried to access one of the whitepapers but it failed.

Slack Channel
-------------

For follow up conversations on Web 3 technology check out their Slack chat channel.

Live chat: [Web Three Community Slack](https://tiny.cc/web3slack) - Channel: [#mtp](/trending/mtp)\_london
