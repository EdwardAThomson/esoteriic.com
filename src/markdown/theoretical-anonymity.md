---
title: "Theoretical Anonymity"
date: 2016-08-27
tags: security,blog-archive
series: "Anonymity Research"
series_order: 2
description: "Part of a comprehensive thesis on anonymity and anonymous communication systems"
---


---

## 📚 Anonymity Research Series

*A comprehensive study of anonymous communication systems and their practical implementation.*

[Anonymous Messaging over the Internet](/anonymity/)
   *Overview and Index*

1. [Introduction to Anonymity](/introduction-to-anonymity/)
   *Understanding the Need for Anonymous Communication*

**→** **2. [Theoretical Anonymity](/theoretical-anonymity/)** *(current)*
   *Philosophical and Mathematical Definitions*

3. [Concepts and Schemes of Anonymous Communication](/concepts-and-schemes-of-anonymous-communication/)
   *Practical Approaches and Implementation Challenges*

4. [In-depth Analysis of BitMessage](/in-depth-analysis-of-bitmessage/)
   *Case Study of a Practical Anonymous Messaging System*

5. [Conclusion of Thesis](/conclusion-of-thesis/)
   *Summary and Future Directions*

### Navigation

← Previous: [Introduction to Anonymity](/introduction-to-anonymity/)

→ Next: [Concepts and Schemes of Anonymous Communication](/concepts-and-schemes-of-anonymous-communication/)

📖 [Return to Series Index](/anonymity/)

---

## Part 2 – Defining Anonymity

This chapter provides a review of the literature that discusses the definition of anonymity. There are two main sections in this chapter which deal with two different academic schools of thought: the first deals with the literature in philosophy, while the second deals with mathematics. This chapter answers the first part of the first objective by defining anonymity, it also alludes to the difficulty of assessing the assurance of anonymity. A notion of theoretical assurance is provided if a scheme were to match up to the requirements of the 5 layer model.

The philosophical school of thought has tended to focus on anonymity from an individual’s perspective, while the mathematical school of thought has tended to deal with anonymity at an aggregate (or system) level. The structure of this chapter is as follows:

• Philosophical meaning of anonymity  
• Mathematical descriptions of anonymity

### 2.1 – Philosophical meaning of anonymity

The original meaning of the word anonymous meant nameless but the contemporary meaning of the word is more closely related to non-coodinatability in the language of Wallace\[14\] or non-indentifiability as descrived by Morio and Buchholz\[15\]. The meaning of these terms is explored in the following sub-sections of this thesis.

Palme and Berglund noted that email headers provide a trace of the particular route that an email takes across the Internet which may reveal the origin of the sender. The Internet Protocol (IP) address is often enough to make a rough guess of the sender’s geographical location. This could be sensitive information for the sender and supports the notion that anonymity is related to the concepts of privacy and traceability.

##### 2.1.1 – Namelessness and Non-coordinatability

Wallace discussed many ideas about anonymity which are relevant and applicable to this thesis. She stated the word anonymous was related to namelessness: for example, a piece of prose written by a nameless author (“Anonymous”).

She proposed a definition of anonymity which is broader than the concept of namelessness. Wallace suggested that the knowledge of whether someone is not known to exist does not fulfil the criteria of being anonymous, but rather it is when a person who is known to exist but cannot be “coordinated” with a particular action or message. This hints at whether the person has distinguishable traits or characteristics.

The central idea is that anonymity is the “non-coodinatability of traits in a given respect or context”\[14\]. That is to say that despite possessing a single unique trait, which can pick a person out, it is not necessarily possible for all traits to be coordinated together to reveal the identity of the person. In the context of communication over the Internet a person could have a globally unique identifier, such as a handle or pseudonym, but that alone is not enough to reveal the person’s actual identity. For example, a random string could be a globally unique identifier but that by itself does not give away any other information about a person. Such an identifier must be linked (coordinated) to other characteristics to reveal a person’s identity.

Wallace also states that anonymity is not a fleeting concept but should have a degree of sustainability; however, she did not provide any criteria for assessing when this trait was fleeting. Assessing the ephemerality of non-coordinatability can help to provide a notion of assurance of anonymity. One method of achieving this is to use several ephemeral identities which should be hard to link together, as stated by Blunden \[16\]. The identities would be, ideally, single use session IDs.

##### 2.1.2 – Non-identifiability

The concept of coordinatability of personal traits can be compared to the coordinatability of data across phone calls or email. The linking of data, or metadata, may show that two people communicated: duration and rough geographic location of each party. This may be enough to identify either communicant. For example, it might be possible to link an IP address to a person who works as a sole trader. The IP address may appear in an emails header and then be subsequently matched to that of their business website. This means that an IP address (metadata) could be uniquely linked to a single person.

To better understand anonymity Morio and Buchholz created a hierarchy of anonymity:

1.  Visual anonymity;
2.  Dissociation of real and online identities; and
3.  Lack of identifiability.

The three levels are a hierarchy with visual anonymity being the lowest level. The first level can be achieved when sending an email. Even though pictures of the sender are not part of the message, the authors note that people normally receive emails from people they know. Email rarely satisfies the second level of anonymity as they often come in the format of firstname.lastname@somedomain.com which may uniquely identify the sender of an email. In addition to this, a picture of the sender could be hosted on the website of that domain (as is the case for many organizations).

In the example of the previous paragraph the sole trader would have visual anonymity simply when sending an email, but the offline and online identities are only weakly dissociated. Apart from having a picture, the owner’s website will display personal information. In this case, the intent is to explicitly associate offline and online identities, which is to say that anonymity is not always desirable.

The second level of anonymity implies not knowing the other person, Morio and Buchholz suggest chat rooms are a good example of the second level, since the chat rooms allow the use of pseudonyms and for participants to create any persona they wish. Dissociation of identities is not necessarily the intent of using an anonymous communication scheme: they might desire to keep their identities hidden from external observers rather than keeping their identity hidden from the other communicant. This is to say that the communicants want privacy rather than full anonymity.

Morio and Buchholz stated that the final level, lack of identifiability, also incorporates the notion of an individual’s behaviour not being distinguishable from any others person’s behaviour. This is what they believed was the closest to being “truly anonymous”. Their example of such an online service would be a newsgroup that allow messages to be posted without any identifiable markings. These authors did not provide an example within their article but Palme and Berglund\[13\] provided an example newsgroup called anon.penet.f i which fulfils that criteria. That newsgroup was shut in 1996 but a modern example would be imageboard sites (such as 4chan.org).

One weakness with the analysis of Morio and Buchholz is that they assumed that posting on a newsgroup, or anywhere on the Internet, without a distinguishable trait would provide the truest meaning of anonymity. This might be true at the level of the user but it would not necessarily be true for administrators of the website who could see the user’s IP address. It would also be unwise to assume intelligence agencies do not have access to IP addresses. This means that communicants would not be truly anonymous. A stronger notion would be that no external party can prove that communication was occurring: this is almost achievable with a covert channel (see section 3.2.5).

##### 2.1.3 – Untraceability

Palme and Berglund stated that anonymity meant that the real author a message was not known, and that trying to find out who that real author was impossible(untraceability). They qualified the use of the word “impossible” by saying that anonymity on the Internet is unlikely to be perfect. There will always be some way to find the originator of the message, especially if that person continues to use the same anonymity techniques. Taking all of these definitions and considerations together gives a fuller picture of anonymity in communication. All authors suggest that if that data can be coordinated then it shouldn’t contain anything which may identify the real world identities of the communicating parties, and that distinguishing behaviour and characteristics of the user should be concealed.

An additional layer is hinted at by Palme and Berglund which is the idea of not being able to use the metadata of a message to trace the transaction of a communication exchange. For a greater assurance of anonymity the metadata of the users would also need to be concealed or otherwise indistinguishable to all other users.

##### 2.1.4 – Layers of anonymity

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

The fifth level was stated in Wallace, and could be considered in the same way as “cover time” \[17\]: a duration over which the user desires to remain anonymous. Any log of information kept means there is a chance that it can be used to coordinate the data about a user; a defence against this is to ensure that no logs are kept or they are encrypted. The highest level of anonymity should successfully meet all five levels.

### 2.2 – Mathematics of anonymity

The use of mathematics in anonymity research is about quantifying the levels of anonymity offered and where possible to prove that anonymity is ensured. For example, it is desirable to calculate the probability that two members of a set of people are communicating, and whether that knowledge affects the anonymity of other members in the system. This can be modelled as determining whether an edge exists between any two vertices in a graph (sender, receiver). The linking together of senders and receivers is closest in spirit to the “untraceability” definition of anonymity provided by Palme and Berglund.

The authors mentioned in the section on the philosophical meaning of anonymity only looked at anonymity with concern of an individuality, and not whether their actions could affect the anonymity of anyone else within the same system. The five layer model of anonymity is robust under the assumption that no other party within the system can affect the anonymity of another; that is to say that it is descriptive of anonymity, rather than a “hard” mathematical proof.

##### 2.2.1 – Anonymity set

Chaum \[18\] invented the concept of an anonymity set which he defined to the be set of participants who are likely to be the sender or receiver of a particular message. This means that as the size of the set increases then the amount of anonymity for each member also increases. Each participant of such a set could be seen a vertex, while communication between two people would be the edge connecting the vertices. Chaum’s simple metric for assessing the anonymity of the system is to say that the more vertices there are then the greater the anonymity is of all participants.

##### 2.2.2 – Measuring anonymity

Serjantov and Danezis \[19\] and Diaz et. al. \[20\] went further than Chaum and created a measure of anonymity based upon Shannon’s formula of entropy:

![](https://web.archive.org/web/20210422205136im_/http:///wp-content/uploads/2017/03/shannon_entropy.png)Equation (2.1)

S is the entropy, n is the number of users in the anonymity set, and p\_u is the probability that a user u had a role r ∈ {sender, recipient} for a particular message.

Diaz et. al. added a normalization factor to their equation and called the final result the degree of anonymity: d = S/Smax . The outputs of their equation were in the set \[0, 1\], where 0 denotes no anonymity and 1 denotes full anonymity. These entropy methods give an effective size of the anonymity and states the amount of additional information an attacker needs to determine whether a user is a sender or receiver of a particular method.

The drawback of entropy methods is that they only consider entropy from the perspective of a single vertex Edman et. al. \[21\], but do they do account for the size of the system unlike most philosophical considerations. These authors proposed another metric which they claim can measure the anonymity of the whole system. Their metric relies upon calculating the permanent of a matrix:

![](https://web.archive.org/web/20210422205136im_/http:///wp-content/uploads/2017/03/permanent_of_A.png)  
Equation (2.2)

the summation is over all permutations of 1, 2, …, n. For a (0, 1)-matrix, the summation terms in (2.2) are either 0 or 1. A term in the summation is 1 if and only if all entries A(1, π(1)), A(2, π(2)), …, A(n, π(n)) are 1, which means that a graph, G, has a perfect matching (1, π(1)), (2, π(2)), …, (n, π(n)).

The problem with their metric is the complexity in the calculation. Calculating the permanent of a (0, 1) − n × n matrix is _NP_\-hard; calculating permanents in more general matrices is #P-hard (proven by Valiant’s theorem \[22\]) which is harder than _NP_. The problem is hard due to the requirement of counting the number of perfect matches of a bipartite graph.

Edman et. al. discussed that some progress has been made to find solutions using a fully polynomial randomized approximation algorithm which provides an approximation in polynomial time. They also point out that an upper bound to the problem can be  
found in polynomial time.

##### 2.2.3 – Differential privacy

Once known as indistinguishability, differential privacy’s \[23\] goal is to maximise the accuracy of information retrieved from a database while minimising the probability of identifying the records. Such a scenario is common for researchers who want to access a sensitive database (such as medical records) but do not have enough privilege to gain access to the raw entries. Instead, the researchers will work upon an “obfuscated” but statistically accurate database. This construct should preserve the privacy of the users’ details contained within the database. The term indistinguishability could be compared to non-identifiability (section 2.1.2) discussed in the previous section: the inability to pick out an individual from a collection of individuals.

##### 2.2.4 – K-anonymity

Sweeney \[24\] formulated k-anonymity as a way to allow databases containing personal information to be queried while maintaining privacy of the individuals’ details. The data is assumed to be structured as in a table or database. In order to achieve the personal details are either replaced with a special character (for example, “\*”), this is called suppression; or replaced with a range of values or a close but incorrect value, this is called generalisation.

An example of suppression would be to replace all names with an “\*”, while an example of generalisation would be to replace an age (say 25) with a range (such as 20 – 30).

The name is descriptive of the amount of anonymity provided: if data is released then a single person in the data should be indistinguishable from at least k −1 other individuals whose details are also in the data. This also highlights an obvious comparison with differential privacy; however, it differs since there is no randomisation in k-anonymity. This type of anonymity pertains to querying structured data which is less useful for general communication of unstructured message such as email, but the notion of indistinguishability is still relevant. That is to say that k-anonymity can also be compared to the notion of coordinatability (section 2.1.1).

### 2.3 – Concluding remarks

Part 2 provided an overview of the differing definitions and perspectives of anonymity from the philosophical literature. These definitions were consolidated into a single list that became a five-layer model of anonymity; each layer providing progressively greater assurance of anonymity.

The second section in this chapter review the main mathematical definitions of anonymity. The key distinction between the philosophical and mathematical definitions is that the latter considered anonymity from the perspective of the system as a whole and sought to quantify the “amount” of anonymity that a user has. The measurement provided by Edman et. al. attempts to go further by measuring the anonymity of the system as a whole, and not just the anonymity of a user in relation to the whole.

Read the next section: [Concepts and schemes of anonymous communication](/concepts-and-schemes-of-anonymous-communication/)

[Bibliography](/anonymity/)
