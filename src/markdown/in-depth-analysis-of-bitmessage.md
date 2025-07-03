---
title: "In-depth analysis of BitMessage"
date: Sat Aug 27 2016 01:00:00 GMT+0100 (British Summer Time)
tags: security,blog-archive
series: "Anonymity Research"
series_order: 4
description: "Part of a comprehensive thesis on anonymity and anonymous communication systems"
---


## In-depth analysis: BitMessage

One of the most promising schemes for facilitating anonymous communication is BitMessage \[61\]. It has been picked as potentially the strongest candidate for ensuring anonymity in communication, and in theory could achieve all five levels of anonymity (as outlined in section 2.1.4) and that it uses many of the ideas identified in section 3.2 to ensure anonymity of communicants and robustness of the network. In this chapter BitMessage will be discussed in enough detail such that its methods for providing anonymous communication can be understood, both theoretically and in practise. Weaknesses will also be addressed before a conclusion is drawn. This chapter will review the following aspects of BitMessage:

-   Anonymity model
-   Message structure
-   Address system
-   Encryption and key exchange
-   Proof-of-work
-   Scalability
-   Broadcasts
-   Ease-of-use
-   Weaknesses

(Note: this text was first written in 2015 and has not been updated to reflect any possible changes in BitMessage)

### 4.1 – Introduction and overview

This scheme provides a strong theoretical basis for providing anonymous communication as will be explored in this chapter. The main aim of the software was to increase a user’s privacy beyond what is offered by email and PGP, but also to be easier to use. The project, loosely inspired by Bitcoin, was released in November 2012 by software developer Jonathan Warren and is open source under the MIT license. At the time of writing (in 2015) the most stable build is version 0.4.4 (released October 2014) and can be found on GitHub \[77\].

The white paper \[61\] was the starting point of researching this scheme, but the scheme’s wiki \[78\], GitHub page notes \[77\] and source code were also consulted.

The key features of this software are:

-   Fully decentralised peer-to-peer network
-   Trustless
-   Hash-based addressing system (usernames)
-   End-to-end encryption
-   Limited metadata
-   Strong anonymity model for passing messages

Fully Decentralised means that there is no special node in the network that handles administration or routing. All users who download the BitMessage client become a node within the network and have an equal importance, which is to say that the network is fully decentralised. As discussed in section 3.2.3, it is difficult to achieve anonymity without having a decentralised network.

Trustless In this context it means that there it is not necessary to use certificates, or certificate chains, as a means of checking the authenticity of a communicant. The addressing system in Bitmessage is hash-based and is calculated as a hash of a public key. This means that there is a strong link between the addresses and the public keys which are used to exchanged the symmetric keys of message encryption. All public keys are automatically retrieved via the network. This was one of the primary design goals as the creator noted that BitMessage should “bridge the gap between the ease of use of email and the security of PGP/GPG.” \[61\]

For some people, there is an additional layer of comfort offered by this scheme which is that there are no companies or governments performing an administration role which some believe could compromise the independence of development and ultimately privacy. Hash-based addressing system While the addresses are cryptographically linked to public keys, the addresses are not obviously linkable to a person’s identity. For some people this will be a nuisance since the addresses are not memorable, but the trade-off is to break the link with a person’s identity as required for improving anonymity. Computers have no problem at storing addresses so management does not need to be a an issue; current email clients store contacts in an address book which means that there is rarely a need to remember anyone’s email address. A simple email address is easier to confirm as being correct since email addresses are often related to a person’s name.

Addresses can be used ephemerally such that a user can generate as many as they want. Support for addresses that link to DNS-based names and /it Namecoin also exist. Encryption All messages are encrypted before being sent which provides confidentiality of content. Only the receiver can decrypt messages, but not any relaying node, which means that BitMessage provides end-to-end encryption.

Encryption is provided via the Elliptic Curve Integrated Encryption Scheme which is a framework for key exchange and derivation for encryption and MAC computation. BitMessage uses Elliptic Curve Diffie-Hellman for the key exchange, AES-256-CBC for bulk encryption of messages, and a MAC is provided by HMAC-SHA-256. All of these terms are defined in section 4.5. This provides encryption for messages in transport but unfortunately BitMessage does not encrypt data at rest.

Metadata The amount of metadata is limited and gives no indication as to who the sender or receiver of a message is. This is one of the main flaws in using email and PGP with the hope of achieving anonymity.

Anonymity Model BitMessage uses a model which can be described as “everyone gets everything”, which is a form of Private Information Retrieval known to be theoretically secure but also inefficient. This model makes it difficult, if not impossible, to determine which messages are for which users and hence there is a strong notion of non-linkability and untraceability. Combined with the lack of metadata, BitMessage seems close to achieving this in a practical sense too.

Proof-of-work An additional feature of BitMessage which is not directly related to anonymity is an anti-spam, or anti-message-flooding, mechanism that requires a proof-of-work calculation (see section 4.6) to be calculated before a message is sent. Additionally, all messages are retrieved via pull requests from the other connect clients (which is to say that messages cannot be pushed out to the network). If the proof-of-work is correctly calculated then the other clients in the network will pull (take) the message. In the sections that follow in this chapter the main concepts of the BitMessage software will be discussed in greater depth.

### 4.2 – Anonymity model: Everyone gets everything

BitMessage offers strong anonymity from the type of message passing model that it implements. It is a form of Private Information Retrieval known as “everyone gets everything” which was outlined in section 3.2.6. This model requires that all nodes within the network receive and pass on every message to each other, this means that all nodes keep a copy of every message ever sent. Under such a model it is essentially impossible to determine which message was intended for whom. Messages are also encrypted and have limited metadata which stymies attempts to link the sender and receiver of messages. Messages are kept “alive” in the network for 2 days and then discarded in order to keep storage requirements at a reasonable minimum value.

Clients attempt to decrypt all messages received in order to determine if a message is intended for an address managed by that client. If the message decrypts then that client had the correct private key and is therefore able to verify the message authentication code (MAC). Without having the correct private key, the user would not have the correct (symmetric) decryption or MAC key and hence the checking of the MAC would fail.

### 4.3 – Message Structure

There is a distinct lack of metadata and it is clear that the data packets for BitMessage have no personally identifiable information. The whitepaper offers little in the way of details of the message structure other than to suggest that metadata is limited. The project’s wiki sit offers more details as to what the message structure could be but the arrangement of information is cluttered and unclear \[79\]. It would seem that the bulk of the message is the ciphertext along with the necessary values such as the MAC. That said, all messages will be encapsulated in IP datagrams before being sent across the Internet which provides a level of traceability. Naturally, this scheme can be used with TOR and I2P.

### 4.4 – Addressing

The addressing system of BitMessage is one of its most important features and a key component for providing anonymity. The addresses are the identifiers in which messages are sent to and from. A user may have as many addresses as desired; both the keys and the addresses can be considered as ephemeral. There is no link between a user’s identity and the address, which provides level two anonymity, therefore any compromise in the address system could lead to a compromise in anonymity.

BitMessage addresses look like random strings but are essentially a hash of a public key. The address is therefore strongly linked to the public key, this design choice is the main reason that BitMessage is considered trustless: knowing the address provides a strong guarantee of having the correct matching public key.

If a message is received from a particular sender then it can be known with good certainly that the message was not spoofed. The process of address generation involves a SHA512 hash followed by a RIPEMD160 hash the conversion process is outlined in section 4.4.3). According to the ECRYPT II \[80\] recommendations listed at keylength.com a SHA512 is secure far beyond 2030, however a hash of 160 bits may only provide protection until 2015. The security level is described as “Very short-term protection against agencies, long-term protection against small organizations.” Finding a collision in the hash algorithm does not necessarily mean the corresponding key has been found but rather it would allow an attacker to impersonate a particular address and convince other users that their public key is correct. This finding suggests that the RIPEMD160 hash may need to be replaced with a hash of a longer output for  
future versions of the scheme, if the developers have any fears of compromise by state actors (“agencies”). Inevitably this will make the addresses longer. There are two main types of address: randomly and deterministically generated. Each of which are discussed in their own sub-sections that follow.

##### 4.4.1 – Randomly generated addresses

Randomly generated addresses use a random value as a seed to the generation of the public key, and without knowing this value the address cannot be regenerated. Addresses can be shared on multiple systems by copying and pasting the key file (key.dat) from one system to another.

As with any process that requires a random value as seed the process is susceptible to “poor” randomness. This is when the input variable produces an output which is easier to predict than it should be. A well-known study that demonstrates this is Lenstra et al’s research article “Ron is wrong, Whit is right” \[81\] which found that poor randomness lead to some people having the same public keys (especially among RSA public keys). It is clear that this could be a problem for BitMessage where participants could eventually have the same public keys for a smaller data set that is otherwise theoretically predicted. BitMessage uses the OpenSSL libraries for implementing random number generation, encryption, and hashing.

Randomly generated addresses are automatically broadcast to the network upon creation, but before being sent out there is a proof-of-work calculation as an anti-flood mechanism. Deterministic public keys are never broadcast and must be specifically requested.

##### 4.4.2 – Deterministically generated addresses

Deterministic addresses use a user-supplied value to seed the address generation algorithm. They have the potential advantage that the passphrase can be easy to remember and thus generated at a different location (or in case of file corruption: regeneration), but if the seed value is easily guessable then anyone could generate that address and read all future messages.

These addresses are not broadcast upon creation so no proof-of-work calculation required. The public key is only sent when it is specifically requested. This style of address can also be used for creating and joining decentralised mailing lists known (see section 4.8).

##### 4.4.3 – Converting a Public Key to a BitMessage Address

As a BitMessage address is a hash of a public key then the public key has to be created first. This section outlines how to turn a public key into an address and clarifies the steps provided on the BitMessage wiki \[82\].

1.  Create a public-private key pair for negotiating shared secrets and verification-signing keys for signing
2.  The public key and the verification key are merged together in an uncompressed format (X9.62). Merging is achieved a simple addition of the two quantities before they are hashed (next step). Call this A.
3.  Take the SHA512 hash of A. Call this new value B (512 bits in length).
4.  Take the RIPEMD160 hash of B. This is C (160 bits in length).
5.  These four steps are repeated until a value, C, is found that starts with a zero (users can request two zeros in order to have a shorter address). This value which begins with a zero is called D.
6.  Remove the leading zero(s) from D. Call this E.
7.  Prepend the stream number, as an integer, in front of E. Call this F.
8.  Prepend the address version number, as an integer in front of F. Call this G.
9.  Calculate a nested SHA512 double-hash on G and use the first four bytes as a checksum which is appended to the end of G. Call this H.
10.  Encode H into base58. This is J.
11.  Prepend J with “BM-”. This is the address.

The reason for choosing base58 is that there are no ambiguous characters that can look similar to each other depending on font. For example, “I” and “l” can look like each other in certain fonts while base58 removes these ambiguities. The intention is that humans can clearly read an address and therefore be less likely to misread it. This choice of encoding can also be found in Bitcoin \[83\].

##### 4.4.4 – DNS names, Namecoin, and email providers

The long and (psuedo-)random nature of BitMessage addresses mean that they are not easy to remember. The use of a third-party application to access BitMessage is likely to be unappealing for many people who would rather access email within a web browser. Solutions to these problems have been developed which aid convenience but may affect anonymity.

One of the developers, Ayra (pseudonym), has created add-ons for BitMessage which include associating DNS names with BitMessage address. DNS names can associated a URL with a BitMessage address via a plugin \[84\]. The URL would be publicly accessibly and is likely to be shorter and easier to remember that a typical address. The DNS plugin also provides integration with N amecoin \[85\]. This is an alt-coin (confer section 3.3.4.1) which provides a decentralised DNS look-up service.

This developer also hosts the website bitmessage.ch which provides a webmail-like service within a browser. Users register with the site and generate an email address which is bound to a BitMessage address created via the random generation method. The username is selected by the user (for example, user@bitmessage.ch) and therefore easier to remember than a BitMessage address. A similar email service is provided also by mailchuck.com, but it allows the user to generate their own BitMessage address.

It can be argued that the binding of an additional identity to the BitMessage address would decrease anonymity if the address is easily traced to another online or offline identity, but a sufficiently diverse choice of username ought to maintain a user’s anonymity. This omits the need to download the BitMessage software and it can be argued that when the site is access via the TOR Browser Bundle that greater assurance of anonymity can be achieved since TOR is supposed to prevent discovering the real location and identity of its users.

##### 4.4.5 – Address anonymity

In terms of anonymity the random appearance of the addresses provides a good dissociation between online and offline identities, but unlike Bitcoin the addresses are not stored in a public record along with a transaction of every message ever sent. The blockchain of Bitcoin was designed to make all transactions, including the addresses of the sender and receiver, public. While it could still be theoretically possible to achieve anonymity using Bitcoin it is harder to do this when addresses and transactions are stored publicly forever.

If there are weaknesses in address generation, such as poor randomness or a poorly chosen passphase, then it would be possible to receive messages intended for those addresses. The integrity of the address relies upon the cryptographic algorithms and either:

-   The random number generator for the randomly generated addresses.
-   The choice of phrase used for deterministically generated addresses.

Any weaknesses in addressing could lead to impersonation or to a compromise in the confidentiality of the content of the messages, however this is not necessarily a breach of anonymity. If the contents of messages do not contain any personal identifiers then it may not be possible to link the message content with an offline identity. Due to the lack of metadata, and therefore the difficulty of coordinating the identity of communicants, then BitMessage is naturally resilient to attacks on anonymity.

An obvious defence against poor address generation is for users to omit personal details and other offline identifiers from all message content. It can be acknowledged that this is an ambitious goal as writing style can provide clues to the person that wrote the content. The language used could help to reduce the number of possible people too; from Chaum \[18\], the smaller the number of possible communicants then the higher the probability of identifying a communicant.

### 4.5 – Encryption and key exchange

The encryption scheme used by the BitMessage software provides end-to-end encryption which gives a strong guarantee that the content of a message is confidential such that only the intended recipient, who has the correct decryption key, can recover the message. Such a scheme prevents any intermediate party from accessing the contents of the message. This section aims to clarify the information found on the encryption page of the BitMessage wiki \[86\] and in the source code on GitHub \[87\]. The scheme used is called Elliptic Curve Integrated Encryption Scheme (ECIES): in particular BitMessage uses EC Diffie-Hellman for the key exchange, AES-256-CBC for bulk encryption of messages, and HMAC-SHA-256 for message authenticity (integrity). The elliptic curve chosen was secp256k1: this is a Koblitz curve defined over a 256-bit prime field.

The Advanced Encryption Standard (AES) is the current standard published by NIST for symmetric encryption. Cipher-Block-Chaining (CBC) mode is still used by some websites for providing a TLS tunnel but is deemed not to be as efficient AES-128-GCM (AES in Galois Counter Mode). The latter is more efficient as it provides authenticity as well as confidentiality. BitMessage calculates a MAC over the ciphertext separately using HMAC-SHA-256. This means that the hash function SHA-256 is used to construct a MAC by performing a nested hash over the ciphertext and the key:

> HMAC = Hash(key(Hash(ciphertext)))

A separate key for calculating the MAC is used from that of encryption which is a good practise known as separation of keys \[88\].

##### 4.5.1 – Encryption Procedure

The process of key exchange and encryption of data is outlined below. The details were found in the BitMessage wiki but have been expanded up to provide greater clarity. The destination public key (denoted K) must be already known: requested automatically if a randomly generated address or requested at-time-of-use if communicating with a deterministic address.

1.  Create a new EC key pair: generate a random value r which becomes the private key, then generate the public key R.
2.  Perform an EC point multiply with the recipient’s public key K and own private key r. This gives public key P , which is the shared secret used to derive the same symmetric keys.
3.  Use the x component of public key P and calculate the SHA512 hash: H = SHA512(P x ).
4.  The first 32 bytes of the hash H give the symmetric encryption key k e and the last 32 bytes provide the MAC key k\_m .
5.  Pad the input text to a multiple of 16 bytes, in accordance to PKCS7.
6.  Encrypt the data using AES-256-CBC with IV as the initialization vector and k\_e as the encryption key and the padded input text as payload. The output is the ciphertext, C. Generate the IV as 16 random bytes using a secure random number generator.
7.  Calculate a 32 byte MAC with HMAC-SHA-256, using k m and IV + R + C as data.
8.  The output from this procedure is IV, R, C, and the MAC; all of which are sent as part of the message.

##### 4.5.2 – Decryption Procedure

The recipient should have the private key k which corresponds to their public key K.

1.  Perform an EC point multiply with private key k and the public key R. This gives the public key P , which is the shared secret (as previously).
2.  Use the x component of public key P and calculate the SHA512 hash H (same as with encryption).
3.  The first 32 bytes of the hash H give the symmetric encryption key k e and the last 32 bytes provide the MAC key k\_m.
4.  Calculate MAC’ with HMACSHA256, using k m and IV + R + C.
5.  Compare the calculated MAC’ with the MAC which was sent with the message. If they are not equal then decryption will fail.
6.  Decrypt the ciphertext using AES-256-CBC with IV as the initialization vector and k e as the decryption key. The output is the padded input text.
7.  Padding is removed when the message is displayed in the user interface.

##### 4.5.3 – Appropriateness of cryptography used

The cryptographic libraries used in BitMessage are from the OpenSSL library. The use of open source code is highly recommended for cryptography since the strength of these algorithms is, in rough terms, dictated by the size of the keyspace rather than the “obscurity” of the calculations (part of Kerkhoffs  principles as mentioned earlier).

**4.5.3.1 – Appropriateness of encryption algorithms**

The implementation of both types of encryption in BitMessage, elliptic curves and AES, are based on open-source libraries which is considered good practise. Should a serious vulnerability be found in either the design or implementation of the algorithms then confidentiality could be lost.

The elliptic curve secp256k is a standard published by Standards for Efficient Cryptography \[89\], and should be secure beyond 2030 (according to NIST \[90\]). AES with a keylength of 256-bits should be secure far beyond 2030 \[90\]. A keyspace of 2^256 keys is so large that it is computational infeasible to generate all possible keys, even to attempt brute-force decryption with a meaningful number of trials should take an infeasible amount of time.

A strength of ECIES is that different encryption and MAC keys are generated for all pairs of communicating addresses: there is one symmetric encryption key for each pair of communicants and there is no re-use, or sharing of, that key with other communicants. All of this suggests that BitMessage uses the appropriate algorithms and keylengths.

**4.5.3.2 – Appropriateness of MAC algorithm**

As mentioned previously, the MAC is calculated from the nesting of SHA-256 with the ciphertext and a share secret (the MAC key). This algorithm is one of the standards recommended by NIST to be secure beyond 2030 \[90\]. It is an appropriate choice.

##### 4.5.4 – Encryption for data-at-rest

BitMessage does not provide encryption of data at rest which means that if a node is compromised then it could be possible to gain access to the BitMessage client and read all stored messages. Morever, there is no authentication to the software. The use of a self-encrypting hard drive would thwart all attackers who try to physically access the machine after it has been powered down (as mentioned in section \[90\], but Malware or other remote attacks will not be thwarted by such a hard drive when it is powered up. Defending against live attacks requires a number of measures which would ideally include encrypting BitMessage data when at rest. This would require creating an encrypted folder using software such as VeraCrypt (mentioned in section 3.3.2.2).

### 4.6 – Proof of Work

The Proof-of-work (PoW) calculation must be completed in order to send a message. This is intended to be an anti-spam mechanism such that it is economically unattractive to attempt to send spam messages. The calculation for a single message is still quick enough that users should not be seriously affected. There is no intention for PoW values to increase or decrease the level of anonymity offered. It is no yet known if a flooding attack will lead to deanonymisation.

It is calculated as a partial hash collision where the difficulty is proportional to the size of the message and set such that the average computer must spend 4 minutes of work to send a typical message. Each message, and PoW calculation, contains the time to prevent malicious users from re-broadcasting old messages. To re-send a message at a later time requires updating the PoW to use the new time in the calculation of the nonce.

SHA512 was chosen as it is widely supported and also so that Bitcoin PoW hardware (ASIC processors) cannot be used for efficient Bitmessage PoW calculations. If the latter was possible then such a user may be able to flood the network with spam messages. Another key difference is that the PoW is not dynamically set by the network as it is Bitcoin. The PoW calculation for BitMessage is only modified when the developers update the code.

##### 4.6.1 – Creating a POW value

This is an outline of how the 8 byte POW value is calculated before a message is sent. The calculation is deemed successful once the trial value is smaller than the target value. The trial value is initially chosen to be a large number and is then iteratively updated as part of a hash until it is smaller than some target value (dependent upon payload length). The detail in this section are a clarification of the details found on BitMessage wiki PoW page \[91\].

1.  Start with trialValue = 99999999999999999999.
2.  Set nonce = 0 (the nonce is 8 bytes in length).
3.  Iteratively calculate the trial value. The final value is the 8 byte nonce which is prepended to the front of the payload. This is calculated just before a message is sent.

The code \[92\] for the iterative calculation is as follows:

> while trialValue > target:
> 
> nonce = nonce + 1  
> resultHash = hash(hash( nonce || initialHash ))

trialValue = the first 8 bytes of resultHash, converted to an integer As mentioned before the trial value is initialised as a large dummy value, while the nonce starts at zero and is incremented by one each time. The nonce is hashed twice with the initial hash (a hash of the payload). The first 8 bytes are the new trial value. Whenever this value is finally smaller than the target, the calculation ends. The nonce is sent along with the message as it proves that work was done.

##### 4.6.2 – Checking a POW value

The process of checking a PoW value is simpler than creating one. There is no iteration but rather just a simple comparison of the POW value sent and against a calculated target value.

The receiver calculates hash of the original message with the received nonce and compares the hashed result to the target:

> resultHash = hash(hash( nonce || initialHash ))

The POW value is the first 8 bytes of the resultant hash after it is converted to an integer. The target must be calculated by the receiver to independently prove authenticity.

### 4.7 – Scalability

The issue of scalability is a key concern for BitMessage. While it may offer a high level of anonymity and privacy of content, the use of “everyone gets everything” is inefficient. That is the trade-off of anonymity versus efficiency; however, at some point this will become infeasible. Billions of users sending tens of messages everyday would produce a vast number of messages that must be stored by all users.

The suggested solution is to segregate users into “streams”. There will be a threshold value for the maximum number of users in each stream. Above this maximum value users will be put into a new stream. Ultimately this means that users only get the messages from the stream in which they belong, and not all other streams.

The streams are arranged into a binary-tree hierarchy. The client software keeps a note of addresses in the streams in the layer above and below. Stream 1 is the top-most level while stream 2 and 3 are on the next layer down. This means that it is still possible to find the public key from, and send a message to, a user in another stream. This feature is not yet implemented although the addresses include an encoded stream number as a means of being future proof. As it hasn’t been implemented then it is hard to asses how effective streams will be at handling scalability.

Another suggested improvement is to implement the client as a “trusted peer” node, which is one that only forwards messages but does not have any addresses associated with it. This is intended to provide some robustness and reliability to the network, but it would also make sense to have more load on the trusted peers than the clients for efficiency purposes.

### 4.8 – Broadcasts

There are two types of broadcast in BitMessage: subscription lists and decentralised mailing lists (DML). The former is also called a “broadcast address” while the latter is also known as a “chan” (channel).

##### 4.8.1 – Subscription list

A subscription list \[93\], or mail list, is a particular type of address which simply broadcasts all messages it receives but there isn’t an actual list. Clients can listen to the list without ever participating (sending a message). Once a user sends message to a mailing list their address is revealed to subscribers.

A broadcast cast acting in this way is created by one user, the address is “owned” by that user and then listed or given to potential subscribers outside of BitMessage. Currently there is no way to search for subscriptions lists within the software. In contrast to other messages, the public key of the broadcast address is used to derive a symmetric encryption key that subscribers use to decrypt messages.

##### 4.8.2 – Decentralised Mailing Lists

The other variant of broadcast is a DML \[94\] which does not require an address to act as a centralised forwarding “hub”; a DML address does not broadcast the messages it receives, but rather the DML address is generated by any users who wants to participate. The users generate identical public keys and addresses. Unlike a subscription list address there is no single user who “owns” the address.

Gaining access to the DML requires knowing the passphrase in order to join and is equivalent to sharing a passphrase for a deterministic address. The user would type that phrase into the user interface when joining the DML, if the list doesn’t already exist then there will be the option to create a new DML. Joining a DML requires knowing the address, stream number, and the passphrase.

In the model of “everyone gets everything” then it is easy to see that there is no need to have a list of subscribers: users that know the passphrase can deterministically generate the public key and hence subsequently decrypt any messages sent to that address. This why such a “list” is accurately described as decentralised. The fact that there is no list of users means that a breaching a single client does not reveal a list of all clients who are on that “list” which preserves the anonymity of communicants.

The down side to sharing an address is that they lack protection against impersonation and spam. Since the address is deterministic, and the public key isn’t published, then without generating the address a user cannot send messages to it. If a passphrase is easily guessed then the content of the DML can be accessed.

### 4.9 – User Interface and ease-of-use

The usual way to access BitMessage is via the freely available client. The interface is simple which contains a basic text editor for writing messages. All of the management processes are automated, and there is no need to install additional plug-ins or copy-and-paste encryption, or signing, keys from another program. Greater levels of automation reduce the need for a human to be involved in the process of sending messages. This also provides a stronger assurance of anonymity since there are less places where human error can reduce anonymity. BitMessage’s ease-of-use arguably is better than using email with PGP, and with limited metadata it becomes a more obvious choice for anonymous communication.

### 4.10 – Weaknesses

This section outlines the main weaknesses of BitMessage and suggests possible solutions:

-   Everyone gets everything is theoretical perfectly secure but inefficient and may not scale well.
-   Difficult to remember addresses.
-   RIPEMD160 used in addresse generation.
-   Poorly chosen phrase for deterministic addresses could lead to a compromise of message confidentiality.
-   Lack of native encryption for data-at-rest.
-   Limited uses – only a messaging system.
-   User behaviour.

Inefficiency of “everyone gets everything” The PIR model used by BitMessages provides the strongest notion of anonymity known but is inefficient. Other options exist that provide high levels of anonymity without being as expensive in the number of messages sent. The reason for considering another model would be to enhance scalability of the network, even once users are segregated into streams it is not obvious that the system cannot become clogged with an over-abundance of messages. Sending messages requires checks of proof-of-work calculations.

There may also be weaknesses in the protocol logic which could be exploited to breach anonymity. None have been found so far, but they may exist.

Difficult to remember addresses It is clear that the addresses in BitMessages are not easy to remember since they are a 32-34 character (pseudo-)random string. This is in contrast to email addresses which are often based upon a person’s real name and therefore often easy to remember. The difficulty of memorising addresses is a weakness for some users, but the nature of the addresses requires them to be (pseudo-random) since they are hash-based.

Possible solutions include creating or using a BitMessage Gateway or DNS name. The website bitmessage.ch acts as a gateway for users to access an email-like interface on the browser and have an email address which is bound to a BitMessage address (never deterministic). The username is selected by the user and therefore easier to remember, and the service can be accessed via the TOR and I2P networks. A similar service is provided by mailchuck.com, but it allows the user to generate their own BitMessage address first.

RIPEMD160 used in address generation As identified in section 4.4. The use of a hash with an output length of 160 bits may not be appropriate for future security. Deterministic addresses These addresses are only secret by the fact that their passphrase is only shared to participants who should know it. This problem is essentially the problem of creating a non-guessable password; however, one attack is to generate all possible passwords in the hope of finding some of the shorter and more guessable phrases. The addresses would be generated and then imported into the client in order to “listen” for messages to that address.

Defending against this, while keeping the passphrase memorable, is difficult. Adding an additional factor of authentication is straight forward, in theory, for a single-user address but it is not straight forward for a decentralised mailing list.

An alternative would be to use a shared random string that is passed to all users in the DML which is used to create a sub-sequent DML that has a stronger passphrase. This boot-strapping of a stronger shared passphrase is weak in the first step whether an attacker could have already generated the address. A more inefficient method is to share the passphrase via individual messages from user to user; the shared random string to generate the DML would be passed only to the correct users via an ordinary message.

Traceability It is not entirely clear whether the data packets in BitMessage are traceable to the IP addresses of either communicant; the developers claim a global passive attacker would not be able to tell the difference between a user who passes on a message and a user who creates a message under the message passing protocol used by BitMessage. Naively, if every message can be seen and enumerated (despite a lack of metadata and content being encrypted) then it ought to be possible to determine the origin and destination (IP address) of messages. A possible mitigation would be to use a VPN or TOR.

Encryption for data-at-rest BitMessage provides strong end-to-end encryption but has no encryption, or authentication, of data-at-rest. This leaves stored messages susceptible to open remote intruders that want to read the contents of the messages. An attacker would ideally known that a user has the BitMessage client on their machine and then gain access to the computer: once achieved, the attacker could find and read the messages. This is likely to lead to a breach of anonymity.

The developers could implement encryption and authentication to the client to prevent against this, or a user can encrypt the BitMessage folder using either already instead encryption solutions within their operating system or download specialist software such as VeraCrypt. One of the developers (Ayra) has a separate add-on which he has called BitCrypt. It is designed to encrypt the .dat files, this can be found on his website \[95\]. Limited uses The software has been designed primarily as an alternative to sending emails and provides a good level of anonymity, which is exactly as intended, but by itself does little to offer anonymity in other aspects of life. For example, sending payments or goods requires the “transaction” of personal details. While the Silk Road was a supposed “anonymous” market place using Bitcoin, it was ultimately compromised.

There are myriad services that people like to use the Internet which has questionable or unknown privacy models. Enhancing privacy could be done by creating software that uses the BitMessages network, for example creating a social network or a payment processor that operates along side the current software client. BitXBay (previously mentioned in section 3.3.4.6) was an attempt at creating such a decentralised marketplace, like eBay, that runs over the BitMessages network. However, it has become inactive. One project which is in active development, albeit with limited progress, is BitMarket which is also being developed by the BitMessage developer Ayra \[96\]. User behaviour A system is only as strong as its users. If a user chooses to breach their own anonymity, or that of other communicating party, then even the most sophisticated schemes will struggle to preserve meaningful anonymity. The best defence is for a scheme to reduce such risks by providing as little metadata as possible, just as BitMessage does.

### 4.11 – Concluding Remarks

Chapter 4 provided a thorough review of BitMessage which was chosen as being a strong candidate for offering anonymous communication. The message passing model is theoretically secure and so far no breaches of anonymity have been announced. That is not to say that the scheme is secure as the it could be that the limited popularity has made the scheme unattractive for any potential attackers. In the review of BitMessage this chapter provided an overview of the key components that make the scheme work with particular interest paid to the areas that support anonymity. Weaknesses were also highlighted with suggestions for future improvements. It is clear that BitMessage goes far to achieve its goal of anonymous communication and that future anonymity schemes could learn a lot studying how it works.

Read the next section: [Conclusion of thesis](/conclusion-of-thesis/)

[Bibliography](/anonymity/)
