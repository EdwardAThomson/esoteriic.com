---
title: Theoretical Anonymity - a description
date: '2017-10-16T20:21:27.000Z'
category: anonymity
---
The following post is an excerpt from my MSc thesis that I finished in August 2015 (the topic was: "Investigating the security of anonymous messaging over the Internet"). In this post I describe what is meant by the term "anonymity".

While doing my research on this topic I found out that defining the word was trickier that first thought. Moreover, achieving anonymity in any sort of practical sense is very difficult. There are textbook ways of achieving anonymity, but many implementations (including blockchain projects) seem have ignored the textbooks and rolled their own version of an anonymity protocol. I can't overstate how dangerous I think that is.

In my thesis I proposed a 5-layer model for describing anonymity which relates to various assurance levels. This is included below. A fuller version of this text can be found here: [Theoretical Anonymity](https://odinnsecurity.com/index.php/anonymity/theoretical-anonymity/). Most of my thesis is available on that website but I do have a PDF version on my LinkedIn profile.

Interesting point: I mentioned both Ethereum and Zerocash / Zerocoin. That's worth noting since I published this in August 2015. That was about the time Ethereum was going live and was the time when Zerocash, now called [Z cash](https://z.cash/), was just a simple website but hadn't gone live (went live end of 2016).

![Image](https://steemitimages.com/DQmTZgeGBS4Y5BRa8LpJDxzhjT9ng2o3uyvvxXGdkMY6n3i/image.png)

Introduction
------------

The original meaning of the word anonymous meant nameless but the contemporary meaning of the word is more closely related to non-coodinatability in the language of Wallace \[1\] or non-indentifiability as descrived by Morio and Buchholz \[2\]. The meaning of these terms is explored in the following sub-sections.

Namelessness and Non-coordinatability
-------------------------------------

Wallace discussed many ideas about anonymity which are relevant and applicable to this thesis. She stated the word anonymous was related to namelessness: for example, a piece of prose written by a nameless author (“Anonymous”). Wallace suggested that the knowledge of whether someone is not known to exist does not fulfil the criteria of being anonymous, but rather it is when a person who is known to exist but cannot be “coordinated” with a particular action or message.

Wallace also states that anonymity is not a fleeting concept but should have a degree of sustainability; however, she did not provide any criteria for assessing when this trait was fleeting. Assessing the ephemerality of non-coordinatability can help to provide a notion of assurance of anonymity. One method of achieving this is to use several ephemeral identities which should be hard to link together, as stated by Blunden \[3\].

Non-identifiability
-------------------

The concept of coordinatability of personal traits can be compared to the coordinatability of data across phone calls or email. The linking of data, or metadata, may show that two people communicated: duration and rough geographic location of each party. This may be enough to identify either communicant. For example, it might be possible to link an IP address to a person who works as a sole trader.

To better understand anonymity Morio and Buchholz created a hierarchy of anonymity:

1.  Visual anonymity;
2.  Dissociation of real and online identities; and
3.  Lack of identifiability.

The three levels are a hierarchy with visual anonymity being the lowest level. The first level can be achieved when sending an email. Even though pictures of the sender are not part of the message, the authors note that people normally receive emails from people they know. Email rarely satisfies the second level of anonymity as they often come in the format of firstname.lastname@somedomain.com which may uniquely identify the sender of an email.

The second level of anonymity implies not knowing the other person, Morio and Buchholz suggest chat rooms are a good example of the second level, since the chat rooms allow the use of pseudonyms and for participants to create any persona they wish. Dissociation of identities is not necessarily the intent of using an anonymous communication scheme: they might desire to keep their identities hidden from external observers rather than keeping their identity hidden from the other communicant. This is to say that the communicants want privacy rather than full anonymity.

Morio and Buchholz stated that the final level, lack of identifiability, also incorporates the notion of an individual’s behaviour not being distinguishable from any others person’s behaviour. This is what they believed was the closest to being “truly anonymous”. Their example of such an online service would be a newsgroup that allow messages to be posted without any identifiable markings. These authors did not provide an example within their article but Palme and Berglund \[4\] provided an example newsgroup called anon.penet.fi which fulfils that criteria. That newsgroup was shut in 1996 but a modern example would be imageboard sites (such as 4chan.org).

Untraceability
--------------

Palme and Berglund stated that anonymity meant that the real author a message was not known, and that trying to find out who that real author was impossible(untraceability). They qualified the use of the word “impossible” by saying that anonymity on the Internet is unlikely to be perfect. There will always be some way to find the originator of the message, especially if that person continues to use the same anonymity techniques. Taking all of these definitions and considerations together gives a fuller picture of anonymity in communication. All authors suggest that if that data can be coordinated then it shouldn’t contain anything which may identify the real world identities of the communicating parties, and that distinguishing behaviour and characteristics of the user should be concealed.

Layers of anonymity
-------------------

The authors are in the previous subsections are in broad agreement with each other; however, by combining the concepts presented by each of the authors’ work together it is possible to create a consolidated list that enumerates the varying levels of anonymity. This list will be useful for discussing the various categories of communication and the anonymity schemes which are discussed later in this thesis.

1.  Namelessness or visual anonymity – not being able to name or see communicants.
2.  Dissociation of real and online identities – breaking of real identifiers between  
    communicants and their online personae.
3.  Lack of identifiability – concealment of identifiable characteristics in content.
4.  Untraceable – concealment of identifiable characteristics in metadata.
5.  For all time – the strongest notion of anonymity would be where the identity of  
    the communicants is kept private indefinitely.

Historical anonymity, namelessness as mentioned by Wallace, fits most closely with level 1 and 2, while non-coordinatability is at least level 3 and could arguably fit with level 4 (although Wallace did not explicitly mention metadata).

Levels 1 − 3 come directly from Morio and Bucholz, while level 4 comes from the work of Palme and Berglund. Namelessness, level 1, is comparable with visual anonymity. Being able to see a communicant without their name is roughly similar to being able to name a communicant without knowing how they look.

The fifth level was stated in Wallace, and could be considered in the same way as “cover time” in cryptography \[5\]: a duration over which the user desires to remain anonymous. Any log of information kept means there is a chance that it can be used to coordinate the data about a user; a defence against this is to ensure that no logs are kept or they are encrypted. The highest level of anonymity should successfully meet all five levels.

Further Reading
---------------

[Introduction to anonymity](https://odinnsecurity.com/index.php/anonymity/introduction-to-anonymity/)  
[Theoretical anonymity](https://odinnsecurity.com/index.php/anonymity/theoretical-anonymity/)  
[Concepts and schemes of anonymous communication](https://odinnsecurity.com/index.php/anonymity/concepts-and-schemes-of-anonymous-communication/)

Bibliography
------------

\[1\] K. A. Wallace. Anonymity. Ethics and Information Technology, pages 1 (1), 23–35., 1999.  
\[2\] H. Morio and C. Buchholz. How anonymous are you online? Examining online social behaviors from a cross-cultural perspective. AI and Society 23, pages (2):297–307, 2009.  
\[3\] B. Blunden. When strong encryption isn’t enough. [http://www.alternet.org/print/news-amp-politics/when-strong-encryption-isnt-enough-protect-our-privacy](http://www.alternet.org/print/news-amp-politics/when-strong-encryption-isnt-enough-protect-our-privacy), 2015.  
\[4\] J. Palme and M. Berglund. Anonymity on the Internet. [http://people.dsv.su.se/~jpalme/society/anonymity.html](http://people.dsv.su.se/~jpalme/society/anonymity.html), 2002.  
\[5\] K. M. Martin. Everyday Cryptography: Section 3.2.2 Cover time. Oxford University Press, 2012.

**Disclaimer**: this is not the opinion of my employer.
