---
title: "Conclusion of thesis"
date: Sat Aug 27 2016 01:00:00 GMT+0100 (British Summer Time)
tags: security,blog-archive
series: "Anonymity Research"
series_order: 5
description: "Part of a comprehensive thesis on anonymity and anonymous communication systems"
---


## Part 5 – Conclusion

This thesis has attempted to clarify the notion of anonymity within the context of communication and to assess the possibility of achieving anonymity. Broad concepts were reviewed along with a plethora of schemes before providing an in-depth analysis of BitMessage which is the schemes that arguably provides the strongest notion of anonymity for communicating across the Internet. This chapter re-states the objectives of this thesis and provides a brief answer to each question. The main sections of this thesis are concluded in their own section of this chapter before a final comment is given on the theory and practicality of anonymity schemes.

### 5.1 Objectives

This section provides a review of the questions (goals) asked in section 1.3. The questions asked were:

1.   What does anonymity mean in the context of communication, and what assurance of anonymity can we have when communicating?  
    Chapter 2 reviewed the meaning of the word “anonymity” with reference to the context of communication, but the notion of assurance becomes more apparent through out the thesis. It is not answered exactly in any single chapter. Chapter 2 provides a notion of anonymity assurance in a theoretical sense, while Chapter 3 covers this from a practical aspect.
2.  What schemes or proposals exist for facilitating anonymous communication?  
    This question is answered in Chapter 3. Section 3.2 provided an overview of the key concepts in anonymous communication. Not all of the concepts reviewed are necessarily used but are at least related to the idea of transferring data anonymously. This naturally leads to a review of current schemes and proposals (section 3.3) which facilitate anonymous interaction across the Internet. As with the “concepts” section of this chapter, the discussion focusses upon technology that provides anonymous data transfer but there was also a brief review of host security which is mainly concerned with protecting host access and the logs contained therein.
3.  How do they compare and is there a one which is better than the rest?  
    Various schemes were presented in a brief overview in section 3.3. All of the available communication schemes are open source and feature the use of encryption and decentralisation with the aim of providing untraceability. It was clear that BitMessage was one of the stronger schemes since its model for sending messages is theoretically secure.
4.  BitMessage was proposed as a candidate “best scheme”, such that we ask: what are the strengths and weaknesses of this schemes and how can it be improved?  
    Finally, Chapter 4 provided an in-depth review of BitMessage. It covered how the schemes worked and pointed out the potential strengths and weaknesses it has.

### 5.2 The meaning of anonymity

The meaning of anonymity was investigated in the relevant literature and distilled to into a concise layered model. This model outlines what anonymity means from the perspective of an individual user.

1.  Namelessness or visual anonymity
2.  Dissociation of real and online identities
3.  Lack of identifiability
4.  Untraceable
5.  For all time

The first level is about breaking the link of a user’s name, or their visual identity to the content they have created. Before the Internet existed this would have been a more meaningful level of anonymity; for example, publishing a nameless text would be difficult to match up to a real (or visual) identity. The lack of records about a person’s behaviour also made this easier to achieve long before computers existed. In theory all actions on a computer can be logged which can subsequently be used to link a user to their actions. The second level is the breaking of the connection between a user’s real offline identity and the persona they publish online. An example of this would be to post anonymously to a website. Using a pseudonym will make it hard to identify the real publisher, but it is not impossible since there are other indicators such as writing style or behavioural pattern.

The third level is the breaking of the link between the writing style and behavioural patterns and a user’s real identity. This would require a user to mask their style and behaviour which may be a difficult task. The fourth level is about ensuring that no possible data, or meta-data, leaks the location and identity of a user. Combined with level three this would be the highest level of  anonymity from a user’s perspective. Being able to assure this for all time would satisfy the fifth and final level.

### 5.3 – Comparison of existing schemes and proposals

Chapter 3 provided a broad overview of the necessary concepts and schemes available (section 3.3) for providing anonymous communication. The chapter started with a statement about the difficulty of achieving anonymity, even if it can be defined theoretically; the ingredients that are required to provide anonymous communication are imperfect and can be undermined by human behaviour. An illustrative example provided was that of former NSA contractor Edward Snowden who (debateably) communicated anonymously with the reporters of The Guardian, and despite his training, still made mistakes.  
While the human aspect is important (disciplined behaviour) it is also clear from reviewing the literature and schemes available that many such schemes are not sufficient by themeselves to provide anonymous communication. Some schemes should be used in tandem with one another, while some appear robust enough to provide a theoretical notion of anonymity.

The most necessary elements are modern encryption, decentralisation, (pseudo)-random user IDs, a lack of metadata, and an appropriately chosen communication protocol to move the messages between communicants. From all of the schemes available BitMessage was chosen as the strongest candidate for  
achieving anonymous communication. Part of that decision was based upon the belief that it solved many of the problems highlighted in the list in section 3.1.1.

### 5.4 – BitMessage

It is clear that BitMessage (Chapter 4) is one of the stronger proposals since it is underpinned by a message exchange protocol which is theoretically secure. The addressing system is sophisticated and should provide a level of anonymity which is theoretically untraceable. Unless flaws are found in the protocol logic, the main threats to anonymity are related to the scheme’s practical use: human behaviour determines whether communicants can stay anonymous and secure while using BitMessage. When the addresses can be associated to offline identities (such as an address which is published to a user’s  
personal blog). Encryption has been guided by standards and uses vetted schemes which gives assurance that it has been done properly, but it does not provide a guarantee that no weaknesses exist. It seems more likely that the addressing system will lead to a breach of anonymity before the encryption scheme does.  
The lack of encryption for data-at-rest is perhaps its biggest weakness and is unambiguously the poorest design choice. While it is possible for a user to create their own encrypted container (directory) using a third party application this is not user friendly and requires a minimum level of knowledge which is not ideal for appealing to a broad as possible user base.

### 5.5 – Concluding Remarks

While extensive in scope this thesis cannot claim to be exhaustive in its review of the various schemes that provide anonymous communication. There is a strong interest in this and there are hopes that a scheme will exist to provide full anonymity; however, it is not clear that such a scheme does exist or ever will exist. There is a large attack surface over which users must be sure that no vulnerability exists. The use of an anonymous communication scheme which is perfectly anonymising is only a part-solution: the OS could be hijacked to leak data or the hardware itself could be prone to stealthy malware as highlighted in section 3.3.2.3.

The problem is harder still as even if it were possible for a user to have a perfectly secure system, OS and anonymous communication scheme a user must maintain discipline in order to ensure that they don’t insert any personal detail into an online service which is insecure or will otherwise breach their anonymity. Additionally, most of the services that a user interacts with may not preserve the confidentiality of any data sent to it. The security of end-services is out of the user’s hands and not so easy for them to audit and therefore any real data which is given to such a service must be done so that the data could be leaked.

It could be debated that if all services were open source and built with anonymity and security in mind then there could be some level of trust that the end party will preserve the user’s anonymity. New schemes are being built with privacy in mind (such as Ethereum) which may also allow for a strong notion of anonymity but many real services, particularly governmental, require real user data which makes it difficult for any person to ever achieve full online anonymity within society.

This requirement from governments is not likely to change which means that real personally identifiable information will be transacted with some online services: an anonymous data transfer scheme should, however, in theory allow for a zero-knowledge proof of a user’s identity in order to authenticate them to a government service. The caveat is that getting this data to the user’s must en-masse and in an authenticated manner which suggests that an offline channel would be necessary.

The future of communication schemes should be ones which are decentralised and have security as a major part of the design. The protocol should be designed with anonymity in mind and should use encryption which conforms to the latest standards. It would also be wise for future schemes to ue an addressing system like BitMessage where the address can guarantee that communicants have the correct private key, or another zero-knowledge mechanism to authenticate users.

An obvious application of homomorphic encryption would also be in anonymity-preserving schemes since it preserves the confidentiality of data which is being operated upon. In addition to this, the first working fully homomorphic public key encryption algorithm uses a different type of maths to that of the current asymmetric schemes. This is important as the current asymmetric cryptographic schemes are thought to be insecure in the advent of the creation of quantum computers. The security in asymmetric schemes come from the difficult in reversing (factoring) the public values which is believed to orders of magnitude quicker on quantum computers.

Such a computer could therefore be used to break confidentiality of all Internet traffic by factoring public keys and then gaining the symmetric encryption. This would affect both TLS and BitMessage, and hence anonymity would definitely be compromised. It is worth noting that symmetric encryption is suspected to be robust, especially with longer key lengths as used in AES-256, so unless an symmetric encryption key was pre-shared via an offline channel, the future of asymmetric cryptography will rely upon a different type of maths (perhaps that seen in Gentry’s homomorphic algorithm). Recently, August 2015, the NSA issued a statement \[97\] that recommended which protocols and keylengths should be used to provide near-term resilience to a quantum computer factoring attack until post-quantum computer asymmetric primitives prove to be robust and efficient. The next generation anonymity scheme must pay heed to these recommendations and developers should be aware of other changes in the technological landscape which could breach data confidentiality and user privacy.

[Bibliography](/anonymity/)
