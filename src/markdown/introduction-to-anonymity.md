---
title: "Introduction to Anonymity"
date: 2016-08-27
tags: security,blog-archive
series: "Anonymity Research"
series_order: 1
description: "Part of a comprehensive thesis on anonymity and anonymous communication systems"
---


## Anonymity Part 1 : Introduction to Anonymity

Note: This has been edited from the original to suit the blog format. Original thesis available upon request.

This blog series on anonymity will investigate the meaning of the term anonymous and whether anonymous communication across the Internet is achievable. The literature on this topic provides differing definitions of this term, as well as differing ways to measure the anonymity of a system. It is clear however that anonymity can be viewed as layers of assurance, where the highest layer provides the strongest notion of anonymity while the bottom layer provides the weakest notion. In section 2.1.4 a five layer model is presented that consolidates the differing notions and levels of anonymity into a single coherent list.

It should be self-evident that anonymity is strongly associated with the terms privacy and confidentiality, and encompasses these terms but also that the highest level of anonymity requires a fuller definition that distinguishes it from both privacy and confidentiality.

**Privacy** is about keeping something private to a person. In the context of communication and the Internet, this “something” can be called ‘data’ with the understanding that this data is only known to the person (often the creator of the data) and other selected (trusted) people. Strictly, it _does not_ necessarily extend as far as keeping the identity of the data creator private but rather about keeping the content of the data private.

When considering the layers of anonymity the concept of privacy is a necessary part of defining anonymity. The strongest notions of anonymity would require that the identity of the data creator is not identifiable and that any metadata is also not identifiable.

**Confidentiality** is used instead of the word privacy when it concerns data which does not pertain to a human. Otherwise it can be seen as interchangeable as a concept.

The protocols and schemes discussed in this blog series are complicated and often expressed in abstract mathematics; however, the concept of anonymity can be described in simple terms which are easy to understand. People who lack a mathematical background can understand the philosophical ponderings on anonymity, and can appreciate at a high level how the different schemes work. That is to say, that it is not necessarily to have a full understanding of the protocols, or mathematics, in order to achieve a working level of knowledge of the various schemes.

Philosophical research on anonymity has differing definitions on what the word means and a number of authors allow for different levels of anonymity. The philosophical literature discussed in this thesis is not abstruse and only describes the concept at a high level which is useful for assessing the goals anonymity and what needs to be achieved in the broad sense. One draw back of philosophical literature is that it focuses on individuals.

The mathematical research has tended to focus upon particular definitions of anonymity (rather than concepts) with discussions of how to preserve anonymity in a strict mathematical sense. This includes definitions of how to measure anonymity. Such analyses are also useful at the algorithmic and protocol level. The mathematical literature tends to look at the system as a whole, rather than individuals.

Both approaches are abstract and do not fully consider the practical difficulties in achieving anonymous communication. A discussion of the difficulty of achieving practical anonymity is provided in Part 3, this discussion relates back to the definitions of anonymity and why it can be difficult to achieve theoretical anonymity.

That chapter also explores the necessary concepts which provide practical anonymous communication; that is to say that it discusses the necessary “ingredients” which are typically found in anonymising schemes or that may be useful in future schemes. Some concepts are discussed which are often sought after “ingredients” but may not actually be appropriate.

An overview of various schemes are presented with the intention of highlighting their strengths and weaknesses and how they might be used together to give stronger assurance of anonymity. Finally, an in-depth analysis of one of the schemes, BitMessage, is presented in Part 4. This scheme was chosen as one of the best schemes which provides a high level of anonymity. The analysis will discuss the theoretical underpinnings of the scheme as well as the practical implementation. Weaknesses are discussed along with possible solutions.

Before discussing anonymity it is pertinent to illustrate why there is a growing interest in privacy preserving, or anonymising, forms of communication in recent years. This increase in interest is one of the largest motivating factors in the creation of this thesis. The following sections in this chapter covers one of the most notable reason for this increased interest: the leaking of sensitive US government documents to The Guardian (the UK news provider).

### 1.1 – NSA leaks to The Guardian

On 5th June 2013 The Guardian announced that it had obtained sensitive documents from the National Security Agency (NSA), the US intelligence agency. The following day the newspaper published an article which stated that the NSA was collecting millions of phone records from VeriZon customers everyday \[2\]. In that article the authors stated that the US government was able to legally collect these calls because it only monitored metadata and not the actual content of the messages:

> “The information is classed as “metadata”, or transactional information, rather than communications, and so does not require individual warrants to access.”

While collecting metadata has been a popular topic among privacy advocates for a long time, the release of this article arguably marked the beginning of the topic being brought into public interest. The article also stated why this metadata was useful to the intelligence agencies:

> “Those records enable the government to know the identity of every person with whom an individual communicates electronically, how long they spoke, and their location at the time of the communication.”

Later articles from the leaked documents stated that email and private messages on social networks were also targeted. The exact division between whether message content was also collected or just metadata was blurred. The net result is that more people wanted to know which data was being collected and how they prevent its collection (or at least how to prevent anyone from benefiting from collecting information about the user).

Interest in “anonymisation technologies” grew as a direct result of these articles, but it is not clear if such technology can match up to their claims. This thesis will address this concern by considering a variety of schemes that offer varying levels of anonymous communication. It will become clear from reading this thesis that anonymisation has something to do with the removal (or hiding) of metadata or anything which identifies parties are communicating.

The Guardian has taken the stance that privacy is important and that no organization should be collecting data in such a way as to violate privacy. Their reasoning for protecting private data is that they belief it is a necessary liberty. The news group encouraged its readers to protect their privacy and published an article to educate their readers about how to protect privacy while browsing the Internet:

> “21 tips, tricks and shortcuts to help you stay anonymous online” \[1\]. Despite the title of the article, which includes the word “anonymous”, it is debatable whether the tips offered actually provide meaningful anonymity. Some of the schemes mentioned can be used together in a meaningful way which this thesis will argue could provide a good level of anonymity. The biggest weakness of the article is that it is scant on details about how to correctly use the schemes presented. The most poignant tip is final one which suggests “living in a cave”, this seemingly flippant point illustrates the difficulty of achieving anonymity online: to achieve full anonymity a person would need to live in a cave. Even if a fully anonymous communication scheme exists, it would not necessarily provide any other service which is needed to live in an “anonymous society”.

Anonymous communication schemes can allow for a “transaction” of private messages but not necessarily for an “anonymous society”. Without an anonymous infrastructure for payments and delivery of goods the degree of interaction between these anonymous communicants and the real world would be highly limited. The current versions of real world schemes and services that offer payment and delivery are not designed to preserve anonymity (caveat: cryptocurrencies — see below). For example, the online shopping website Amazon.com limits the value of items that can be bought with gift cards which were purchased “anonymously” using cash. Such a measure is to prevent money laundering \[3\].

Privacy-conscious developers are aware of this difficulty and in recent years there have been numerous developments in monetary systems that allow for anonymous payments: there are now cryptocurrencies (see section 3.3.4.1) such as Bitcoin and also websites and services that accept these currencies. eBay \[4\] recently announced that it was looking into Bitcoin but their focus is on ease-of-payment rather than privacy or anonymity. The notorious Silk Road \[5\] marketplace only accepted Bitcoin and was only accessible via TOR (see section 3.3.1). It claimed to be an anonymous marketplace but was shutdown by the FBI as most of the goods on it were illegal. This also highlights the difficulty in achieving anonymity even if the latest and most popular schemes are used. More recently decentralised marketplaces which are being developed such as those planned for OpenBazaar \[6\] and Ethereum \[7\] and could offer a greater notion of anonymity (see section 3.3.4.5 for more details).

As more devices become connected to the Internet then there are more logs and more opportunities to track a person’s activities. Cars, such as Tesla’s Model S, are being designed to be connected to the Internet in order to provide various services but the  
anonymity of the car or user are not part of this design. While the Tesla Model S is connected to the Internet it seems that its current design is strongly secure according to research by Mahaffey and Rogers (reported by Heisler in BGR) \[8\]. That said, security does not equate to anonymity. It is less obvious what degree of anonymity is offered, but it was noted that there is a level of privacy via the use of a Virtual Private Network (VPN).

Li, Malip, and Ng \[9\] proposed a scheme to facilitate anonymous in vehicular ad hoc networks. The aim here was to make a secure and private messaging system that allows vehicles to send updates to each other about road conditions and traffic. This is a clear illustration of anonymising schemes which has a practical benefit to society by helping to improve security, and is perhaps something that Tesla (and other car manufacturers) can include in their vehicles.

There is also a lot of talk about the “Internet of Things” (IoT) which has the intent of having many more devices connected to the Internet \[10\], such as TVs or coffee machines such that they can be activated or interacted with across the Internet. It does not seem a stretch of the imagination that even simple devices will have logging capabilities and that even if they use a secure channel (such as HTTPS) for interaction they are unlikely to be designed with anonymity in mind. Recently, the National Security Agency (US) gave a grant of $299,000 to University of Alabama in Huntsville to design a “safer” (secure) IoT \[11\].

A pertinent question is “can anonymising protocols enhance the security, or protection, of the devices and their host network?” Through the exploration of anonymous communication in this thesis it may be possible to provide an answer for this question. A recent opinion piece in The Guardian was negative about the possibility of ensuring privacy through the IoT \[12\] despite any advancement in protocol design. Their main gripe is the exchange of “free” services which are paid for by the user’s personal details being collected by the organisations providing the services. They see this being more prevalent in the IoT; despite that, protocols are being developed which would aid the design of the IoT with anonymising features.

### 1.2 Reasons for pursuing anonymity

Enhancing, or protecting, privacy is often stated as a goal of using anonymity software it is worth looking considering why this can be considered as a good thing, and also what consequences might there be from allowing anonymising software to exist. The reasons presented below come from relevant literature but is not supposed to be exhaustive nor definitive.

Palme and Berglund in their article “Anonymity on the Internet” \[13\] discussed potential positive and negative purposes of being anonymity. This blog series will present a summary of their discussion here, but not go further in discussing whether anonymity is good or bad. Given that anonymous communication has come into the public eye since the Guardian article was released, the main objective of this thesis is to determine to what extent anonymous communication is possible.

Palme and Berglund’s positive reasons for allowing anonymity:

-   People who desire to divulge information about serious misuse within an organisation but fear repercussions.
-   People in an oppressive regime who desire to avoid persecution.
-   Point of view could be equal since there is no other factor such as gender, age, etc.
-   People may communicate important but embarrassing situations.

Consequences of allowing anonymity:

-   Can be used by criminals to hide their activity, which is generally illegal.
-   Can aid people causing disruption which may be legal but socially unaccepted.

They conclude their article by stating that anonymity should be possible but it should  
also be regulated and legally accountable. This would provide some level of anonymity,  
but as shown in this thesis it would prevent true anonymity.

Read the next section: [theoretical anonymity](/theoretical-anonymity/)

[Bibliography](/anonymity/)
