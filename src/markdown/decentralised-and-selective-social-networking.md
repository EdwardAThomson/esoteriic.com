---
date: "Sun Jul 26 2015 19:53:00 GMT+0100 (British Summer Time)"
title: "Decentralised and selective social networking"
description: ""
category: "culture"
---
This article addresses the security of information on social networks: it discusses some basic and fundamental common problems as well as discussing some defenses to these problems. The title is obvious give-away as to what the article entails. Moreover, the suggestion of decentralisation can be extended beyond social networks to any organization looking for a more secure way to store data.

It is worth noting that in a previous article I outlined that there is an over-saturation of social networks; in short, I believe that there was and still is too many social networks which have over-lapping functionality.

Apart from the wide choice of social networks, most of them suffer from the same problems of being centralised which I will argue is bad from an information security perspective. There is discussion of privacy but no real nod towards anonymity. The latter will appear in subsequent articles in the coming months.

**Over-saturation**

Looking at all the available social networks is similar to looking at the zoo of Linux distributions: there are a ton and from a naive perspective they're all offering similar functionality. There is too much choice even at the "majors" level (e.g. Facebook, Twitter etc) but if you dig a little deeper then you can also find out about social networks which are: specialist interest, open source roll-your-own, or those in development and under the radar of most people.

There is a mild benefit to one's security by having people join different websites: if we don't all join the same social network then we don't all have our information in one place. The benefit comes from considering "what if there was only one social network with all out data in one place?" If that one place is hacked and the database leaked then all user information would be breached.

**Centralisation**

There are numerous examples of websites hoarding all data in one place. The recent breach at Ashley Madison (July 2015, 37 million users' data leaked) being a notable example which would place it at rank 2 on the list of data breaches maintained by  "[haveibeenpwned](/web/20160405003040/https://haveibeenpwned.com/)".

The main problems are:

1.  Over-centralisation of user data.
2.  Availability of data: i.e. how public a profile is.

The breach at Ashley Madison was apparently due to a flaw in their website where an attacker was able to exploit a weakness on the password page, and then ultimately make a copy of the entire user database. This is point (1).

The most basic defense against this is not to have a single database of all user information, but rather to have several databases located at different locations. This could provide a simple defense, but depends on how it is handled. Splitting data up in encrypted compartments, at different locations, is not unsound as a security principle. Alone, it does not guarantee safety of data but it does make it harder. The use of multiple locations is not necessary decentralised, at least in the way the term is used in computing (see below). There is additional overhead, sure, but it should be offset with the possibility that a singe leaked database reveals only some user data rather than all user data.

I wonder, and even suspect, that Facebook and Google store their data across several data centres rather than at one single location. This doesn't mean that they operate a fully decentralised network but have, at least, the first level of decentralisation (more details below).

**Selective Sharing**

The latter problem, point (2) is a tricky one to solve for websites that require "public" profiles.

While Ashley Madison uses TLS (SSL, if you must) and prevents user data being available to Google, which is the first line of defense, they made all profiles viewable to any user who registered for free. Part of this design is a requirement of many social networks (e.g. Twitter is mainly public) and is especially true for dating websites. Having a wide availability of information allows users to browse before connecting.

That by itself was not the cause of the data breach, as mentioned above, but it is does an unnecessarily large attack surface for gaining user information. The attackers in this case by-passed this method of data retrieval by finding a flaw that gave them access to the entire database. The simple solution is to allow for selective sharing which is already implemented by many social networks, and can be seen as different privacy levels for a single profile. The different levels define who can see which data. What I'd ask for, over and above this, is fine granularity over all actions. Facebook offers varying levels of privacy but it also has a tendency to default towards breaking its own policies by letting certain actions be visible to all.

For example, I was added to a public group. That is to say that I was forcibly added without being asked to agree, moreover this action seemed to be "public" which lead me to think that anyone could have been this. This seems like a violation of even basic privacy levels and requirements. This is to say that Facebook displays far too many actions without enough granularity in the privacy levels.

**Fake data or limited data**

One solution to data breaches, although not entirely attractive, is for users to use fake data in their profile. People join social networks in order to connect with people they know. This is not exactly true of data websites, so it could be argued that such websites \*could\* be populated entirely with fake data.

This makes sense for creating an account on some websites, particularly those which are unknown or of questionable reputation. There is a debate at the moment as to whether data can ever be made truly secure and therefore we should either give up or insert fake data. This does nothing for promoting proper security or privacy of real data, nor does it make it easy to build trust and verify members.

**Decentralised / Distributed Social Networks**

Finally this leads me to decentralised / distributed networks which are also known as peer-to-peer (p2p) networks. Such networks are popular among the offerings within the file sharing community and essentially come in two flavours (or levels). The first level is a p2p network lets users (nodes) share files directly between each other but there is a special central node which connects users together: e.g. Napster. The second level is a network which does not require a central node for administration / connecting users, e.g. GnuTella, this is a fully decentralised network.

Previously, I guessed that Facebook and Google might use a distributed network of their own and don't store all their data in one place, but obviously their network is managed by themselves such that they perform the connecting of users and data. This is to say that that they would fulfill type 1 / level 1.

What is required is a fully decentralised social network AND has fine granularity for its privacy settings.

In a fully decentralised social network each user would become their own node within the network. They would host their own data and help to provide routing capabilities for other users connected to the network. The latter point is about aiding users to find one another, while the former is more obvious: all users host their own profile with the data stored on their local machine.

It becomes hard to collect data en masse given when it isn't stored in one (or a few) central location(s): therefore data breaches / leaks are also harder to achieve although not strictly impossible. Moreover, it would remove / dampen liability (fines / litigation) from data breaches too.

In such a network a user's profile information is only shared with others users who are "connections" / "friends" / "followers"; moreover, there would be different levels of privacy such that the different levels of "friends" can only see the information they are allowed to see. It is feasible for public profiles, or public sections of profiles too if desired. Fine grained privacy settings give users a greater notion of ownership over their data and how they connect to other users.

As there would not be a central ruling authority then a user could create multiple profiles, or have multiple aliases per account. Naively, this creates problems for trust, but it would allow for users to join "groups" under a pseudonym where it is expected that the group may not be entirely trustworthy: confer an less reputable social network or dating website (no names). Such aliases could, perhaps, have fake data but could still be verified by being linked (cryptographically) to the main account and hence verifiable. The point here is not about total anonymity but rather a mild breaking of two online personas; trying to reduce traceability to zero is a discussion for another day.

Trust can also be engendered via (cryptographic) digital signatures. The rough idea is that users could digitally one another's accounts: more signatures should (on average) show greater authenticity of a user. It isn't quite that simple of course. However, it can be "solved" by looking at the Bitcoin community for inspiration: people post pictures of themselves holding up their Bitcoin address. Again, not 100% foolproof but a first draft of creating a web of trust.

**Examples**

To the best of my knowledge the decentralised social networks that exist are free / open source but still in the early stages of development, and quite a few are still conceptual with no public release of the code. The most popular is Disapora which was launched on the kickstarter website back in 2010.

Wikipedia has two relevant links for getting an overview of what's available:

*   [Distributed social network](/web/20160405003040/https://en.wikipedia.org/wiki/Distributed_social_network)
*   [Comparsion of software and protocols for distributed social networking](/web/20160405003040/https://en.wikipedia.org/wiki/Comparison_of_software_and_protocols_for_distributed_social_networking)

This is a non-exhaustive list of projects with direct links to their homepages. They were the among the top hits on Google. The above link to Wikipedia is more extensive.

*   [Disapora](/web/20160405003040/https://wiki.diasporafoundation.org/Main_Page)
*   [Synereo](/web/20160405003040/http://www.synereo.com/)
*   [Tsu](/web/20160405003040/https://en.wikipedia.org/wiki/Tsu_\(social_network\))