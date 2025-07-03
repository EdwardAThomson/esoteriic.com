---
title: "Concepts and schemes of anonymous communication"
date: Sat Aug 27 2016 01:00:00 GMT+0100 (British Summer Time)
tags: security,blog-archive
series: "Anonymity Research"
series_order: 3
description: "Part of a comprehensive thesis on anonymity and anonymous communication systems"
---


---

## 📚 Anonymity Research Series

*A comprehensive study of anonymous communication systems and their practical implementation.*

[Anonymous Messaging over the Internet](/anonymity/)
   *Overview and Index*

1. [Introduction to Anonymity](/introduction-to-anonymity/)
   *Understanding the Need for Anonymous Communication*

2. [Theoretical Anonymity](/theoretical-anonymity/)
   *Philosophical and Mathematical Definitions*

**→** **3. [Concepts and Schemes of Anonymous Communication](/concepts-and-schemes-of-anonymous-communication/)** *(current)*
   *Practical Approaches and Implementation Challenges*

4. [In-depth Analysis of BitMessage](/in-depth-analysis-of-bitmessage/)
   *Case Study of a Practical Anonymous Messaging System*

5. [Conclusion of Thesis](/conclusion-of-thesis/)
   *Summary and Future Directions*

### Navigation

← Previous: [Theoretical Anonymity](/theoretical-anonymity/)

→ Next: [In-depth Analysis of BitMessage](/in-depth-analysis-of-bitmessage/)

📖 [Return to Series Index](/anonymity/)

---

## Part 3 – Concepts and schemes of anonymous communication

This part of the series will introduce the key concepts in anonymous communication. It will start by describing the current problems in achieving anonymity and the difficulties that poses for maintaining privacy. Communication schemes that strive for anonymity are by definition aiming to provide better privacy. Looking at these weaknesses will provide motivation for creating and using schemes which are aimed at providing stonger notions of privacy. The latest range of schemes are presented in section 3.3.

This part covers the latter part of the first objective by highlighting the difficulty of achieving assurance of practical anonymity. The review of the various schemes covers the second and third objectives by presenting the various anonymity schemes and stating how they function. The structure of this chapter is as follows:

-   Difficulty of anonymous communication.
-   Review of theoretical concepts in anonymous communication.
-   Overview of schemes that provide practical anonymity in communication and beyond.

### 3.1 – The difficulty of anonymous communication

Communication can be seen as a conversation between two people or in a more general sense it can be seen as the transfer of information (a transaction) between two nodes. Anonymous communication should consider the confidentiality of the all communicants and the information sent between them. Defining this is possible but it is less clear if anonymous communication is practically achievable.

Four days after the first leak to the Guardian the person who leaked the information identified himself as Edward Snowden. At the time he was in Hong Kong and had recently left his job as a government contractor working in Hawaii. In order to share his leaked information with the public he contacted a number of journalists, but he was determined to keep his identity secret so tried to create a private channel of communication.

Communication between Snowden and the journalists was conducted via email, but the content was encrypted using a scheme based upon Pretty Good Privacy \[25\] (PGP) called GNU Privacy Guard \[26\] (which is free of copyright). Either piece of software provides a means of encrypting data (both symmetric and asymmetric methods) as well as decryption, hashing, compression and signing. He used GPG to provide asymmetric encryption which enables people who do not know each other to share encrypted messages without sharing the same private key. Senders encrypt with one key (public key), and recipients decrypt with another key (private key).

The leaked information showed that the NSA were interested in finding a weakness of popular asymmetric cryptographic schemes but such schemes were found to be resistant to their analysis. If the Snowden leaks on the NSA’s view of PGP are to be believed, then this gives a high degree of assurance that it is still resistant to cryptanalysis, and hence content encrypted with PGP will maintain a high level of privacy. The weakness of PGP is that while it can encrypt data it does not provide a means of sending the encrypted data. It relies upon other means of communication such as email.

The first encrypted email from Snowden, to the journalist team, was to Micah Lee. The email came from a (still) undisclosed email provider with the username “anons108” \[27\]. Lee’s public key was found publicly, but Snowden could not find the public key for Laura Poitras (the journalist he wanted to contact). The article by Lee points out that Snowden forgot to attach his own public key which meant that the reply from Lee, with Poitras’s public key, was sent as cleartext. It was inconsequential to the chain of events. As there was no other content in the email all that could be gained was that Poitras’ public key was sent to “anons108”. An eavesdropper identifying her public key would need to intercept the email and then match the public key in the mail with Poitras’ public key from somewhere else (if possible).

The instructions from Snowden to Poitras was for her to: encrypt text using GPG; communicate from an “anonymous email account”; and to use the TOR web browser \[28\] “that masks your identity on the web”. All of this was to make it desired to make  
it harder for any eavesdropper to track their activities. As an additional point of trust, Snowden required the fingerprint of Poitras’s public key to be posted in a public place (Twitter). The fingerprint proved that Poitras’ public key belongs to her, and hence any encrypted information sent to her can only be decrypted by her.

Soon after Lee and Poitras helped Glenn Greenwald to get set up with his own GPG public key and running on a particular version of Linux called TAILS \[29\] which uses the TOR network by default for its web traffic. This was an attempt to facilitate anonymous communication between Snowden and Greenwald. The TOR and TAILS schemes are outlined later in this thesis, TOR is a browser that uses an Onion routing protocol to mask which web services a user is connecting to.

According to the Lee article Snowden used one more pseudonym (“Verax”) from an undisclosed email provider and then finally used his real name when sending an email from the Lavabit email provider. In mid-2013 Lavabit was taken offline by its owner citing that it had been subpoenaed by the US government. Given the timing of the Snowden leaks and the shutting of Lavabit it can be argued that the two events were linked.

##### 3.1.1 – Towards better private communication

The Snowden articles published by the Guardian marked the entrance of the debate on Internet privacy into the public domain, but it also highlights the difficulty of trying to communicate anonymously. It would not be unfair to regard Snowden as an expert in this subject area but despite this he still had difficulty in achieving a private communication channel and also made at least one error.

The details above came from the article written by Lee and highlight the problems with using PGP / GPG to encrypt emails. It doesn’t correctly illustrate the laboriousness of using PGP which has stunted its adoption as a mainstream technology.

While encryption can hide the content of a message it does not hide the metadata, nor does it prevent a centralised server from being shut down. There is also a problem of creating and then distributing the public keys. It is worth remembering that PGP was created to encrypt data not to make communication anonymous.

The use of anonymising networks such as TOR and I2P (also discussed later in section 3.3.1) may go a long way in protecting Internet traffic, but they do not prevent web services from logging data nor will they offer much extra privacy if a user has an account with a strong association to their real identity: using a personal gmail account across TOR will only offer privacy to the level of providing Google with the IP address of a TOR node (just like using a VPN) rather than the user’s real IP address. Improving privacy for webmail would require using an email address which is not strongly linked to a user’s identity.

Neither PGP nor TOR provide end-point security. The presence of malware may steal a user’s private information and send this across the Internet unbeknownst to the user. Most projects that attempt to offer anonymous communication state that privacy is likely to be compromised in the presence of malware.

There are operating systems available to end users which are less-prone to malware and hardened from a security point of view. The Linux distribution known as TAILS prevents the logging of user data and keeps itself entirely within the computer’s memory. It also forces all Internet traffic to run over TOR. While such operating systems may offer resistance to malware and do appear to make it difficult to trace Internet traffic they don’t address the activity of the user. If malware was to be present within a TAILS volume then it will not be able to gain much from exploiting user; in theory, there would be no identifiable user data.

A summary of difficulties in trying to create a private communication channel:

-   Use of several different usernames (pseudonyms) adds complication to procedure.
-   Possibly more than one email provider (different companies / websites) that offer incompatible levels of privacy.
-   Email providers use a centralised topology which have a single point of failure.
-   The necessity of using a third-party anonymity tool such as TOR (only anonymises a user’s connection to, for example, the website of an email provider).
-   Use of a third-party program to encrypt (GPG), but PGP / GPG are not known for ease-of-use.
-   Use of anonymous communication software may not be compatible with current forms of communication.
-   Failure to include one’s own public key would make it impossible for the receiver to reply with encrypted content (unless the public key is posted publicly).
-   There are inherent trust issues with using a public key: need another channel to provide authentication of counter-party’s identity (for example, fingerprint posted publicly).
-   Anonymising networks and software are not necessarily resistant to malware.
-   User activity is guaranteed only by the user. Enhanced privacy will require user education.

Many of these problems are solved, at least in theory, by the BitMessage scheme which is reviewed in depth in Chapter 4. Providing the necessary solutions to many of these issues was a determining factor in reviewing this scheme in such depth.

### 3.2 – Review of key concepts for providing practical anonymous communication

This section will review some of the concepts which are necessary for improving the anonymity offered by current communication schemes. These concepts will reference the difficulties outlined above and explain to what extent they can overcome those difficulties.

##### 3.2.1 – Email Traceability and PGP

Email is a popular method for communication across the Internet; knowing its structure and protocols involved will be key to understanding the degree of possible anonymity. It is likely to continue being a popular medium for communication, and in principle, is similar to any other asynchronous form of text communication across the Internet. The structure of email was most recently defined in RFC5322 \[30\]. The two main elements of this structure are the body and the header section. The body of an email contains the message content that a sender wishes the receiver to read, while the header section contains control information which is used by the email providers to route the message. The data in the header section is often referred to as metadata, it is not encrypted since it is used to route the message: for example, the sender and receiver’s email address and the IP of their email servers.

Email providers may retain a full log of all emails sent along with the IP addresses (which indicates geographic location) of the sender. This provides a problem for anonymity as the notion of non-coordinatability of personal information cannot be fleeting but must last for a significant amount of time.

The data in the body of an email is not encrypted by default, but all major email providers use Transport Layer Security (TLS) to encrypt the data sent between mail servers. For a sender and a receiver to communicate without the content being visible to either email provider then they will need to use a third-party program that provides end-to-end encryption. The message would be encrypted using this third-party program and then copied and pasted into the body of an email. This could be done using symmetric encryption, if both parties have a pre-shared key, but is more typically done using asymmetric encryption: as with PGP, but there is no increase in anonymity when using an email account that’s strongly associated with one’s real name.

##### 3.2.2 – Disposable user names, email addresses, and anonymous remailers

Snowden’s use of pseudonymous email addresses had no link to his real name and were likely disposable with the intention of being single use or of limited-time use. The lack of a link to his real name provides some level of non-coordinatability while the use of PGP would make the content secret except for the intended recipient.

While the email providers used by Snowden have not been revealed (except Lavabit), it is possible to investigate services that specialise in disposable email addresses. Mozilla maintain a list of websites that provide this service: Mozilla Temporary Addresses \[31\]. Such email providers allow users to create ephemeral email addresses that last for a fixed period of time. The website www.10minutemail.com provides email addresses that exist for 10 minutes and have a pseudo-random string for the user’s handle (the name before the symbol in the address).

These addresses offer visual anonymity and a stronger notion of dissociation of real and online identities. This is level 1 and 2 of the layer anonymity model presented earlier (section 2.1.4). If the mail contains no, or limited, characteristics of the communicant then it would also satisfy level 3 (possible when the body is encrypted). Given their ephemeral nature, the limited lifetime of one particular handle therefore limits the amount of data associated with that handle.

Where this likely fails is that it these email providers may still log the IP address of its users and hence not provide the fourth level of anonymity (untraceability). If TOR (and I2P) can be trusted to fulfil their goals of anonymising web traffic then the inclusion of an IP address in the metadata could be argued to be meaningless, and hence the use of such networks with a disposable email address could provide a simple way to achieve all five levels of anonymity.

Anonymous remailers, also referred to as anonymous servers in Palme and Berglund, attempt to make the coordinatability of the sender and receiver harder. There is a tax-onomy of anonymous remailers (du Pont 2001 \[32\]) of which disposable email addresses

(or pseudonyms email addresses) are at the bottom layer. The higher level types aim to provide more layers of obscurity, that is to say that they make it harder to perform traffic analysis in order to determine which users are communicating with each other. To improve upon the current remailers, du Pont states that users of anonymous remailers should use a zero-knowledge mechanism where there is “zero knowledge” stored in the logs which indicates who spoke to whom and that traffic analysis of the network would reveal “zero knowledge” of who spoke to who. In essence, it should be a system which can be proven to making coordinatability impossible. Users of remailers naively assume that such a privilege is possible; however, he notes that many remailer operators are becoming less willing to protect their users in face of legal liabilities. In order to prevent such litigation du Pont notes that anonymous communication should be done via a peer-to-peer (P2P) scheme.

##### 3.2.3 – Decentralisation and Peer-to-Peer networks

The term “decentralised” when used with regards to networks can be used to distinguish between two different levels (\[33\], \[34\]). The first level of decentralisation is used to describe the topology of the network: nodes communicate with each other without necessarily being connected to a central node for the entire time (but do so at least once). The most well known example of this is Napster. It allowed people to share files with each other in a manner which can be described as peer-to-peer (or P2P, a term which is used synonymously with decentralised); however, the Napster network was not fully decentralised (the second level) as it required users to search a central repository of known files which was owned by a company of the same name.

Minar and Hedlund \[34\] stated that a fully decentralised system is one where “every host \[is\] an equal participant” and that there are “no hosts with special facilitating or administrative roles.” Peterson and Davie defined a decentralised network as one where the “nodes are hosts that are willing to share objects of interest (such as music and other assorted files), and the links (tunnels) connecting these nodes represent the sequence of machines that you have to visit to track down the object you want.”

It is clear that Napster did not satisfy either definition of a fully decentralised network. The legal entity “Napster” had a special facilitating role where it provided the information required for a client to track down the object it wanted. This lead to Napster being shut down for copyright infringement since it provided a service by which users share copyrighted data (such as music).

Peterson and Davie \[33\] pointed out that the Internet could be considered a fully decentralised network since there was no (single) central authority, although certain nodes within the certainly have a privileged position. They also noted that Gnutella was the first file-sharing service which was fully decentralised as it provided the same capabilities that Napster did but without the centralised registry of files. This means that the developers of Gnutella should be less vulnerable to legal litigation; however, the users would still be committing copyright infringement if they share copyrighted material.

In the case of Lavabit it is not clear if they used a decentralised topology for their network but it is clear that it was not a fully decentralised network. Lavabit, like Napster, had a centralised node that held a special role which meant that it is easy to take down that network by legally asking the company to cease all activities. This could also affect disposable email address providers which means that even if a high degree of anonymity is possible the company may not be able to survive for long.

Crowcroft et. al. \[35\] noted that the Internet as a decentralised network has an emphasis on global fault-tolerance and massive scalability. This means that the network grows quickly by granting easy access to new users and is resilient to faults. They also state that “true anonymity is two layer requiring some form of anonymized IP routing system (such as onion routing, see section 3.3.1) as well as application layer mechanisms to protect privacy.” Implicitly, these statements will map to level 4 and levels 1 − 3, respectively, of the five anonymity layers described in section 2.1.4.

The authors described these requirements as necessary to protect the identities of sources and sinks of requests, and to mask location information in order to resist traffic analysis. It is clear that any non-P2P network will struggle to provide the non-traceability, or ephemerality of logs, in order to facilitate anonymous communication. That is to say that P2P network topology is not necessary for anonymity but is desirable.

##### 3.2.4 – Steganography

Steganography can be translated from Greek as “covered-”, or “concealed-”, “-writing” \[36\]. In simple terms it is about hiding a message within something else such as an image, sound, text etc. A simple example is when a message written in invisible ink upon a piece of paper which contains another message (written in regular ink) to conceal the “invisible” message \[37\].

A central idea of steganography is concealment: to think that one message is being sent while in fact the true message is concealed, which makes it an obvious candidate for transferring data anonymously. Some steganographic schemes work by trying to obscure the hidden message within the cover message, while others use a key (as with encryption). In steganography the cover message is generally much larger than the hidden message: this can be seen as message expansion.

Encrypted data appears as (pseudo-)random strings but it can be simple to guess that the data is not random but encrypted from the context (such as TLS packets over the Internet), the amount of message expansion is minimal and so encryption can be seen as more efficient that steganography but it lacks the ability to make a message hidden within a benign container.

Despite the potential advantages available there are very few schemes that make use of steganography \[38\]. Such a scheme would make use of the message hiding properties to disguise content, not just for confidentiality reasons, and obscure the location of the communicating parties. A self-contained steganographic communication scheme would be conspicuous enough to arouse suspicion and encourage attacks on said system. Ideally, a fully anonymous scheme would provide no traces of any communication nor even the intention to do so. It could be argued that steganography could do this by concealing messages within covering images, which are then disguised as innocuous hosted on the public Internet.

##### 3.2.5 – Covert Channels

A category of communication channels which could easily be confused with Steganography is that of covert channels. In a broad sense can be described as a type of “secret” channel which is hard to detect. The difference between a covert channel and steganography, is that the latter is a secret message (hard to detect) which is sent across a legitimate channel while the former is the creation and use of an illegitimate channel which is not allowed within the security policy \[39\]. The two terms are often confused with each other.

There are two kinds of covert channels \[40\] (although it should be noted that no fundamental difference exists):

-   Storage channels – “involves the direct or indirect writing of a storage location by one process and the direct or indirect reading of the storage location by another process.” (section 2.2.1).
-   Timing channels – “involves a process that signals information to another by modulating its own use of system resources (for example, CPU time) in such a way that this manipulation affects the real response time observed by the second process.”

As such channels are able to break a security policy in order to create a hidden channel it may seem like a natural method for facilitating anonymous communication. This is not practical since such channels offer low bandwidth and would be better served by steganographic methods.

##### 3.2.6 – Private Information Retrieval and Oblivious Transfers

Rabin \[41\] devised a protocol which would allow for the transmission of an encrypted message which could be decrypted to reveal the plaintext message with the probability 1/2. While the sender knows that an encrypted message was sent they don’t know if 2the receiver was able to decrypt the message. This is known as an oblivious transfer. The idea was adapted such that two messages were sent but encrypted using different keys: the receiver would request a particular message (for example, a database entry) but the sender would be unable to determine which of the two messages were requested. The sender can only guess with a probability of 1.

This is known as a 1-2-oblivious transfer (or, “1-out-of-2”). This idea was generalised to “1-out-of-n” where n messages are sent to the receiver, and then further generalised to “k-out-of-n” where the receiver desires many (k) messages (or many entries from a database) and receives a collection (n) of messages. When more messages are sent the sender has a decreased probability of knowing which ones were desired by the receiver and hence this is a way of measuring the degree of privacy in such a protocol.

Private Information Retrieval (PIR) \[42\] is a concept that has a similar overall goal to oblivious transfers but has a couple of important differences. PIR allows a user to retrieve an entry from a database while preventing the sender from learning nothing about that entry. One way to achieve this is for the receiver to obtain an entire copy of the database: in such a case it would be theoretically impossible for the sender to know which entry was accessed (which is to say that privacy is perfectly preserved). In many settings this inefficient and may be infeasible due to physical constraints (bandwidth / memory / time). There is not necessarily any cryptography being implemented here. Oblivious transfers have the additional requirement that the receiver only learns about the entry they asked for.

##### 3.2.7 – Zero-Knowledge Mechanisms

Zero-knowledge proofs allow for a transaction of data such that a verifier can legitimately authenticate a user without the prover giving out their secret knowledge or any clue as to what their secret is. A mark of a strong encryption algorithm is one where upon seeing the ciphertext an attacker gains no additional information about the plaintext (confer Kerkhoffs’ principles \[43\]). This is similar for zero-knowledge proofs: the verifier cannot gain additional information about the secret knowledge that the prover has; however, the verifier must still have a way to uniquely identify the prover with a very small probability of impersonation.

Zero-knowledge password protocols allow for users to be authenticated by passwords without ever revealing the password: for example, Encrypted Key Exchange (EKE) \[44\]. It is also possible to use such a scheme for sharing and verifying usernames. A zero-knowledge proof of identity means that a user’s privacy is not compromised yet there can still be a unique way to identify them. Such schemes are likely to be heavily featured in future anonymity protocols and are starting to find their way into the latest cryptocurrencies: for example, Zerocash and Zerocoin (see section 3.3.4.1).

##### 3.2.8 – Homomorphic encryption

Encryption is a well-known method to provide confidentiality of of data \[45\] but in order to manipulate the contents of the data it must be decrypted first. For example, when a search request is made to Google of HTTPS the traffic is encrypted such that the contents cannot be seen anyone else. Google’s servers can automatically decrypt the contents sent over HTTPS and then match the request to their databases.

While it is also possible for Google to match an encrypted string to a stored copy (which maps to a plain text string) it would require the use of the same key, or for the strings to be saved as hashes. It is clear that a search engine (such as Google) can determine the contents of the encrypted data since it matches with a known plaintext value. Homomorphic encryption could be a solution to this problem if (in the future) such a scheme can be made to compute within a reasonable time. This form of encryption allows the ciphertext to be manipulated in such a way that the resulting ciphertext can be decrypted to yield the same plaintext which would be obtained if the equivalent manipulation had been applied to the original plaintext. There is no requirement to first decrypt the ciphertext before operating upon it.

This can be stated more concisely with an example. The multiplication of two cipher-texts (encrypted plaintexts) is equal to the encryption of the two plaintexts multiplied together:

E(p1 ) ∗ E(p2 ) = E(p1 ∗ p2 )  
(equation 3.1)

It had been theorised for many years homomorphic encryption might be possible but only partial solutions were available. Unpadded RSA is such an example of a partial homomorphic encryption method, it was possible to have an arbitrary number of multiplications but no additions.

Fully homomorphic encryption is when any arbitrary operation is possible (multiplication, addition etc). The first method to allow this was in 2009 when Gentry published a fully homomorphic encryption algorithm in his PhD thesis \[46\]. This algorithm allows for public key encryption but uses a different type of mathematics than is found in current asymmetric cryptographic algorithms. He used lattice-based method called “Learning with errors”.

The benefit that this has for anonymity schemes is that data can be sent to another party for outsourced computation without the need to share any keys or reveal the underlying data. That is to say that confidentiality of data is preserved which decreases the amount of trust required between the two parties. In terms of anonymity, there still needs to be thought put into a protocol which will facilitate message passing in order to minimise linkability (such as Private Information Retrieval).

### 3.3 – Practical anonymous communication

This section provides an overview of real-world anonymous communication schemes: it summarises the schemes which are available, or in development. Achieving practical anonymity is more difficult than simply installing a piece of software. The currently available software offer limited practical anonymity, and it would be inadvisable to use them in a stand-alone capacity. As alluded to in Chapter 1 existing anonymously within society would require more than just being able to communicate in an anonymous fashion. For example, an anonymous payments networks can supplement anonymous communication to provide a greater ability to be anonymous within society.

While this section provides an overview of software available, it omits one important aspect of anonymous communication which is user education. Using the available software in the correct manner is as important as possessing the software. The topics covered in this section are:

-   Anonymity networks
-   Host security
-   Anonymous communication
-   Anonymous commerce

The first item considers the use of anonymity networks for sending data across the Internet, while the second point emphasises that using an anonymity network alone is not enough to guarantee anonymity if the host machine is vulnerable to attack. This is important as hosts often contain logs of activity as well as sensitive data (such as personal details or key material).

The third point considers anonymous communication schemes: some require anonymity networks for transmission of messages, while others have their own transmission protocols. The final point of the list summarises anonymous commerce schemes which are a requirement for living in an anonymous society.

##### 3.3.1 – Anonymity Networks

Anonymity networks are a type of overlay network which hide the IP addresses of all participants. Such networks are also known as darknets with the most famous example being the TOR network. It is worth noting that these schemes do not provide a means of creating messages but rather route messages created by another program. The following schemes do not form an exhaustive list.

**3.3.1.1 – TOR**  
The Onion Router (TOR) \[28\] is an open-source project which provides an anonymous network where the IP address of communicants is obfuscated. The content of packets sent across the network are encrypted multiple times and sent past three random-selected nodes within the network before exiting to the intended recipient. The multiple layers of encryption and routing are the reason for TOR’s name: the layers of encryption around the data are like layers of an onion.

Nodes within the network cannot see the origin and destination IP addresses, which means that the TOR network provides a strong notion of untraceability of communicants. If used in the correct way (lack of personal identifiers) then TOR can provide a good level of anonymity as identified in section 2.1.4. It should be noted that the final hop in routing between the exit node (of the TOR network) and the recipient is not encrypted, hence TOR does not provide end-to-end encryption by default but clearly this can be added on top.

Accessing the network requires purpose-built software, such as the TOR Browser. There are special TOR-only websites, known as hidden services, which require the TOR browser in order to be accessed. The URLs for these hidden services appear as a random string with “.onion” (confer “.com”) at the end. A current drawback of TOR is its limited bandwidth which makes surfing the (dark)web relatively slow.

**3.3.1.2 – I2P**  
A less well known variant of TOR is the Invisible Internet Project (I2P) \[47\]. This software (also open source) also encrypts data packets multiple times (four in this case) but it differs from TOR in two important ways:

-   The final hop, between exit node and destination, is encrypted, hence I2P provides end-to-end encryption.
-   Multiple messages are sent together.

These reasons (layering and mixing) give rise to the term Garlic routing. The bundling of messages is supposed to provide resistance to traffic analysis, but otherwise it provides a similar level of anonymity to the TOR network.

**3.3.1.3 – FreeNet**  
A slightly older and less well-known anonymous network is Freenet. It was introduced in a master’s thesis by Ian Clarke: “A Distributed Anonymous Information Storage and Retrieval System” \[48\]. It is also open-source and still in active development like TOR and I2P, but there are important differences between Freenet and TOR (or I2P); the former is an entirely self-contained network which allows for sharing among users within Freenet, while TOR and I2P allow users to connect to any website (even those outside of the network, non-hidden services) such as Facebook and Google. Freenet offers two different modes of use: connecting to friends only (darknet), connection to anyone (opennet).

**3.3.1.4 – HORNET**  
The High-speed Onion Routing at the Network Layer (HORNET) \[49\] is a recent proposal designed to provide high-speed (low latency) end-to-end anonymous channels. It only uses symmetric cryptography but offers transfer speeds of 93 GB/s. The main difference between HORNET and TOR is that the nodes in the latter keep per-connection state while in the former this information is encoded in the packets.

**3.3.1.5 – Netsukuku**  
This routing protocol is not for Internet communication but rather for a mesh network and is currently in the experimental stage \[50\]. As it is design for a mesh network the protocol it is fully decentralised and has the additional design goal of providing anonymous communication.

##### 3.3.2 – Host Security

Securing the host computer which is used for communication should not be forgotten when considering how to conduct anonymous communication. A browser such as TOR does not keep logs of the websites visited which would otherwise give away a user’s browsing habits if such logs could be accessed by malware; while this would be a problem for other browsers but it does not mean that TOR is safe because it keeps no logs. There is no guarantee that the TOR browser is immune to malware that can deanonymise users. The user can use the latest and most secure operating system and software but that is still dependent upon trusting the hardware and relying upon it not to breach anonymity. In this subsection a couple of considerations for host security are presented.

**3.3.2.1 – Security focussed operating systems**  
Operating Systems (OS or OSes) which are security focussed try to make it hard for attackers or malware to gain access to the computer, and subsequently gain escalated privileges. The developers OpenBSD \[51\], for example, tries to reduce the possible attack-surface by having a thorough review of source code before publishing. Operating systems such as TAILS \[29\] and Whonix \[52\] route all Internet traffic over TOR and optionally I2P. Both are based on the Debian distribution of Linux and have limited applications pre-installed.

TAILS only runs as a live operating system which keeps no record of previous boot states, and has minimal logging once booted: should a user’s computer be compromised or seized then the lack of logs will make it harder to prove the identify of the user and link it to their online behaviour. This means it is designed to provide a high degree of untraceability when sending data over the Internet (required for level four anonymity as discussed in section 2.1.4). Separating online and real identities depends mostly on user behaviour, but such operating systems help to facilitate this by reducing traceability.

**3.3.2.2 – Self-Encrypting Drives**  
If the TAILS operating system is not being used then a user should ideally encrypt all communication logs. This can be achieved by using the encryption services provided by the operating system (such as BitLocker in premium versions of Windows \[53\]) or via the use of an application such as VeraCrypt \[54\] (a successor to the famous TrueCrypt \[55\]) which provides encryption at the file system level.

A stronger notion of encryption is provided by so-called self-encrypting drives which encrypt at the hardware level. These devices are independent of the operating system and are more efficient that software based encryption. The Trusted Computing Group has published two standards (Opal \[56\] and Enterprise \[57\]) that govern the design and manufacture of these devices.

These devices are intended to make it difficult to retrieve the unencrypted data. The data encrypting keys should not leave the device and be otherwise computationally infeasible to find the key by a brute-force attack. This should ensure that when the device is powered down the data is encrypted and non-recoverable. Any attack on anonymity must occur when the system is live: such as recovering communication logs after the user has authenticated to the drive.

**3.3.2.3 – Trusted Hardware**  
The use of a secure operating system and with an anonymising communication scheme is not enough to ensure that communication is ultimately secure. While it is debatable whether “ultimate”, or perfect, security can exist it is clear that anonymity of communication can be breached it any of the communicating hosts are insecure. To that extent a user needs to trust that both their hardware and software is secure.

Hardware which has been compromised can fool software into believing that the system is secure. Malware detectiong software does not necessarily scan hardware by default and can also be fooled into believing that no malware resides in the hardware’s firmware. Recently there was a firmware rootkit \[58, 59\] created by security researchers which could infect any systems with an x86 CPU (Intel processors). They discovered six vulnerabilities that affect EFI firmware. One of these vulnerabilities was used to create a stealthy worm which could infect any modern Mac computer \[60\].

Such attacks can spread without detection and could be used to install monitoring software on to a target system and could lead to a stealthy breach of a user’s anonymity. A suggested fix for this problem is to ensure that all firmware is cryptographically signed (digital signature) and that all subsequent patches to the firmware are also signed. This would ensure that the firmware comes from the manufacturer but it would not guarantee that the manufacturer is not malicious or has not been compromised.

##### 3.3.3 – Anonymous Communication

The main theme of this thesis is anonymous communication but in this subsection a brief review of popular schemes will be presented.

**3.3.3.1 – BitMessage**  
This scheme \[61\] is inspired by Bitcoin and provides a strong notion of anonymity while sending messages asynchronously, but it is worth noting that it is not built on Bitcoin’ blockchain technology. This is an open source project and is reviewed in-depth in Chapter 4 This scheme was chosen because of its strong theoretical model for exchanging messages  
anonymously.

A very similar project and perhaps simply a clone of BitMessage is the service called BeePip \[62\]. The website makes claims similar to BitMessage but there is no code available to review. On this project’s website the contact address is a BitMessage address with the characteristic “BM-” prefix.

**3.3.3.2 – Pond**  
Pond \[63\] is a project, of comparable age to BitMessage, that attempts to provide encrypted message content similar to PGP. It tries to improve on PGP by offering forward secrecy (to prevent “leaking traffic”). At the time of writing the project appears to be mostly inactive, although a small amount of new code was submitted to the GitHub repository in early August 2015 \[64\].

**3.3.3.3 – TorChat**  
This scheme \[65\] is an instant messenger which uses the TOR network. The messages are encrypted to provide privacy of the content while the TOR network facilitates the anonymity of communicants. Users are given an ID which is a 16 character random string: this prevents users from having an ID which is connected to their real identity. Staying anonymous will depend on how the ID is used and shared, and whether it can in any way be linked to their real identity.

**3.3.3.4 – Off The Record (OTR)**  
This is a cryptographic protocol \[66\] for instant messaging which is available as a plugin for instant messaging schemes such as Pidgin and Kopete. OTR provides forward secrecy and malleable encryption. The latter is a means of providing deniability and hence refute whether a message was sent. This provides a strong notion of private content but not of anonymity. The deniability feature is intended to allow users to deny that a previous message was sent and hence it is an attempt to break the link between a message and the user who sent it.

**3.3.3.5 – RetroShare**  
This open source scheme \[67\] is a decentralised file sharing network that uses end-to-end encryption and has a wide variety of services: file sharing, email, instant messaging, forums, voice and video chats. All data is encrypted using the OpenSSL libraries and the software can be configured to operate purely in a friend-to-friend (f2f) topology (similar to FreeNet) which is designed to provide privacy. The developers claim that using the f2f mode provides anonymity, but a full analysis of these claims is outside the scope of this thesis.

##### 3.3.4 – Anonymous Commerce

Communication, in and of itself, is limited in what services it provides. Achieving a strong notion of privacy, or anonymity, in society will require than anonymous communication schemes. A natural area to investigate is that of anonymous payment schemes given there an overlap with the anonymous communication schemes. While progress has been made with such payment schemes there has been no development of anonymous delivery of real-world items which means that anonymity is limited to online actions. The biggest development in this area was the launch of Bitcoin an electronic decentralised currency which became known as the first cryptocurrency. The code is open source and has lead to hundreds of variants, and eventually lead to the development of decentralised market places.

**3.3.4.1 – Cryptocurrencies**  
Bitcoin \[68\] a peer-peer electronic cash system, released in 2009 as open source software, was the start of the cryptocurrency phenomenon which has resulted in hundreds of copies \[69\] and bold claims of facilitating anonymous payments.

One of the key innovations in Bitcoin is its distributed database, known as the blockchain, which provides a public ledger of all transactions which have ever occurred using Bitcoin. Each node in the network is supposed to have a full copy of the database in order to verify that transactions are correct. Verifying a transaction is statistical such that an increased number of verifications (more nodes checking a transaction) gives a decreased likelihood that the transaction is fraudulent.

The addresses of Bitcoin are pseudo-random strings which provide a level of unlinkability between the user and their address. However, it is often the case that a user publishes their address in a public place contains personally identifiable information (such as a user’s personal blog).

**3.3.4.2 – Alt-coins**  
As Bitcoin is open source then it allows for cloning and modification of its code to create alternative cryptocurrencies. These modified versions are known collectively as Alt Coins (or alt-coin). Each of these schemes have their own blockchain and may have different levels of scarcity and generation rates. Map of Coins \[69\] claims that as of January 2015 there are over 700 alt-coins, of which more than 500 are publicly available. CoinMarketCap stated that only 10 currencies had a total market value (market capitalisation) above $10 millions dollars \[70\]. In the following sub-sections attention is drawn to two particular alt-coins which have focussed on improving the anonymity aspects of Bitcoin.

**3.3.4.3 – Zerocash**  
One of the strongest contenders for providing fully anonymous payments is the alt-coin known as Zerocash \[71\], which improves upon the authors’ earlier protocol Zerocoin \[72\]. The latter was not a separate “coin” but rather an extension of Bitcoin (or any cryptocurrency) in order to provide anonymity, while the former is entirely separate. One of the main features of Bitcoin, a publicly searchable blockchains, has become its biggest problem for stopping anonymity. To increase anonymity while using Bitcoin, a user can:

-   Increase the number of addresses used in order to decrease the probability of correctly guessing that a user owns a particular address.
-   Use a third party mixing service – multiple transactions are collected together and then sent to a new address.

The first point is not the best solution from a usability perspective: it requires that a user correctly manages more addresses. The latter point requires trusting a third party and it does not guarantee anonymity. Zerocoin was the first attempt by this development team to get around the fact that Bitcoin’s anonymity was not as strong as it could be \[73\], and that relying on third parties was not ideal.

The Zerocoin protocol was designed to extend Bitcoin protocol by providing an in-built anonymous mixing service. A user would “purchase” zerocoins using Bitcoin and then sell the zerocoins back into Bitcoin to complete an anonymous transaction. The transactions were designed to be unlinkable but provable with a zero-knowledge proof (zero-knowledge mechanisms were introduced in section 3.2.7). The biggest problem with zerocoin is that it would have increased the verification time of transactions by six times and also doubled the storage requirements of the blockchain.

Zerocash is intended to be its own blockchain that includes a mixing service that uses zero-knowledge proofs to provide unlinkability of transactions. Verification of a transaction is fast, and the storage requirements for Zerocash are smaller than for Zercoin but the initial database is large (1.2 GB) and the spending of coins is slow (between 87 – 178 seconds) \[74\].

**3.3.4.4 – CryptoNote**  
This altcoin \[75\] is not derived from the original Bitcoin code but is a complete rewrite using similar ideas. There is a blockchain like Bitcoin but in this case the exact balances of each address are not known, and the sender and receiver in a transaction cannot be matched.

Sender privacy is achieved by the use ring signatures, this means that several senders are grouped together into a single signature such that each sender becomes equiprobable for each transaction within the group. Receiver privacy is achieved by the generation of a new public key for each transaction. In principle this should make it difficult to link the sender and receiver of this altcoin, and hence some level of untraceability is provided.

**3.3.4.5 – Decentralised Trading Networks**  
Due to the increased popularity in Bitcoin many software developers and investors have been pushing for decentralised market places. Such trading networks would be ideally facilitated by cryptocurrencies in order to maintain privacy, they could also be served by the traditional means of payment (such as credit cards). It is accepted that the more usual forms of payment would not allow for full anonymity but the user would have greater control of their own data.

**3.3.4.6 – BitXBay**  
The BitXBay \[76\] project planned to use the BitMessage network to facilitate a decentralised payment network, but it appears that BitXBay has become inactive. Anonymity should be comparable to that offered by BitMessage but it has not been assessed in this thesis.

**3.3.4.7 – OpenBazaar**  
Another attempt to make a decentralised market place is OpenBazaar \[6\]. It is an actively developed open source project that facilitates the buying and selling goods via Bitcoin. Users are in control of their own data rather than a centralised service which helps to ensure privacy; however, it is not clear what level of anonymity is offered. If a user was to connect to OpenBazaar over TOR and use a pseudonym then there is a strong delinking of their real identity and that presented to other users. This trading system only seems to allow for transactions in Bitcoin which is known to provide some level of anonymity but it is questionable whether fully anonymous transactions are possible.

**3.3.4.8 – Ethereum**  
This project \[7\] is in active development and has just had its first public release “Frontier”. The following is an excerpt from the project website (ethereum.org, August 2015):

Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third party interference.

The project has been developed by enthusiasts in the cryptocurrency community who want to take the next logical step: facilitating decentralised contracts. It makes use of blockchain technology as a means of providing accountability and naturally provide a comparable level of pseudo-anonymity.

The mention of “without third party interference” is an implication of Ethereum being privacy-preserving but not necessarily anonymous. Ethereum is a platform that facilitates decentralised applications so it is naturally suited to limiting traceability (as suggested in section 3.2.3). Not all applications will be designed with full anonymity in mind, but the creation of contracts using Zerocash would give a strong notion of anonymity.

### 3.4 – Concluding Remarks

This chapter provided a broad overview of the practical aspects of anonymous communication. The definitions of anonymity in Chapter 2 were descriptive rather than prescriptive; they stated how to know if something was anonymous, not how to build something that preserves anonymity. Progressing from theory to practise has been an iterative process over several years. It is clear from today’s perspective that a decentralised topology is more robust against potential anonymity breaches.

Practical rather than theoretical considerations will eventually be the deciding factor as to whether a scheme can provide anonymity in communication. Worse still is that robust schemes still rely upon disciplined human behaviour. The chapter opened with a recounting of the steps Snowden took while trying to achieve anonymous communication with The Guardian journalists. Despite his training he was also prone to making mistakes. It was also implicitly assumed that Snowden trusted the OS and hardware that he used, which is not something that should necessarily be assumed.

Several schemes were introduced in this chapter that claim to provide anonymity in communication and data transfer. A brief review was provided for each scheme but thorough analysis is beyond the scope of this work. A key point of this chapter is that anonymous communications schemes are limited in scope; the range of services required by society goes beyond simply being able to communicate with one another. For example, those schemes do not provide a payment network upon which anonymous sales and purchases can be made and while progress is being made towards creating these schemes they are still in their infancy.

Read the next section: [In-depth analysis: BitMessage](/in-depth-analysis-of-bitmessage/)

[Bibliography](/anonymity/)
