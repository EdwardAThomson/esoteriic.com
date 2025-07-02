---
title: Learn the basics of cryptography so you can grill ICO project leaders
date: '2017-07-16T23:01:51.000Z'
category: cryptography
---
This article covers some of the basic cryptographic primitives along with their intended uses. This article is not exhaustive but with a little bit of knowledge about how cryptography works then more people can start to grill the people behind ICOs and other blockchain projects. If the folks floating ICOs don’t understand what they are doing then it will show up pretty quickly.

Obviously not all projects being launched require an incredibly deep understanding of cryptography. Some ICOs are just raising funds (e.g. for movies) so it doesn’t make sense to ask these projects about cryptography. However, any project claiming to build a protocol on top of Ethereum should really have a clue what they are talking about.

I intend to keep this fairly light so I won’t dig into all the necessary details for a full understanding of each primitive. However, even a basic understanding of each one will help to discern when they are being abused.

The primitives that I will look at in this article are:

*   Hash functions
*   Encryption
*   MAC functions
*   Digital Signatures

![Image](https://steemitimages.com/0x0/https://steemitimages.com/DQmY5pYzQoFBqEtFfAPy4MAqPJeh9ch4okSQSn4ncNBUb4J/image.png)  
[Source](http://spectrum.ieee.org/image/62374)

Confidentiality, Integrity, Availability
----------------------------------------

Before I look at them I want to present the criteria by which they will be assessed: Confidentiality, Integrity, Availability. This has been a standard method for assessing security since [Saltzer and Schroeder’s paper in 1975](http://www.cs.virginia.edu/~evans/cs551/saltzer/).

Here are a few simple illustrations of what each word means.

*   **Confidentiality**: a loss of confidentiality means that sensitive data has been revealed to people it should not have. Example: customer names, addresses, and credit card data are published to a public website (in plain text).
*   **Integrity**: means that data has been changed in an unauthorised manner as such it is no longer trustworthy. Example: customer names, addresses, and credit card data have been accidentally corrupted while being processed.
*   **Availability**: data should be accessible by an organisation when it needs access to it. Example: an administrator has rebooted a system but has forgotten the password to unlock it. The data can still be encrypted with its integrity preserved but the organisation no longer has access to it.

Outline of the primitives
-------------------------

### Hash functions

**Hash functions** provide a notion of **integrity**. They take an input of data (of any size) and produce a fixed length output (fixed size). Every input produces a unique output, and if you are given the output string it is impossible to work backwards and recover the input\*. The process is one-way. Hash functions can be used to **detect** whether data has been tampered with, they don’t technically prevent tampering.

Hash functions do not encrypt anything. They don’t provide confidentiality. All modern operating systems use hash functions as a means of protecting passwords. The passwords themselves are never stored (ever). However, it is possible to hash a password and check that the result is the same as the very first time when you created the password. This is a simple form of authentication and is something that is ubiquitous (e.g. logging into Steemit :-) )

Passwords should never be encrypted (why? operational security tends to be the biggest problem here rather than the theoretical hardness of the algorithm being used). It is for that reason that encryption alone is not sufficient for handling authentication.

Hash functions are designed to either be fast or slow. The fast hash functions (e.g. SHA256) are very efficient and will happily hash gigabytes of data in reasonable time. Slow hash functions (e.g. scrypt as found in Litecoin etc) are generally used for protecting passwords.

Bitcoin and Ethereum use hash functions to provide integrity of transactions: i.e. show that a transaction is correctly formed.

\*Not quite true, but good enough for practical purposes. Collisions and cracking are more advanced than we need to discuss here.

### Encryption

**Encryption** only provides **confidentiality**. Modern encryption algorithms are great for protecting sensitive data, but such algorithms don’t prevent tampering (integrity) nor do they provide any way of detecting that the encrypted message hasn’t been changed. This is another way of saying that encryption does not provide any notion of integrity.

When you connect to Steemit in your web browser the connection is over HTTPS. This means that all traffic is encrypted en-route. For example: when you type in your password to Steemit it is encrypted while in transit. This is to say that it is kept confidential. Once your password hits the Steemit website it will be hashed. This hash will be compared to the hash stored in a database. If you typed your password correctly then this calculated hash will match the original hash when you first created the password. Matching password hashes allow you to authenticate to Steemit. Obviously, this doesn’t actually prove the person who typed the password was actually you.

**Symmetric encryption**: this is where the data is encrypted and decrypted with the same key. Symmetric encryption algorithms are fairly efficient so they are ideal for encrypting bulk data (can be GB or TB).

**Asymmetric encryption**: this is where the data is encrypted and decrypted with different keys (let’s skip splitting hairs about Diffie-Hellman here). As asymmetric encryption is less efficient it makes less sense to use it for bulk data encryption; however, it does allow for the sharing for secrets (e.g. keys, passwords) across an untrusted public network. Private keys never have to be shared unlike symmetric encryption (only one key and must be shared). Hopefully this is clear why asymmetric encryption is often used to securely share a key used in symmetric encryption.

If keys are lost then **availability** is lost.

![Image](https://steemitimages.com/DQmVnggv5DpopTKEMQUMMD1vNXPXZpedp8AzqWDqFRHW7E1/image.png)  
[Source](http://www.nsaneforums.com/topic/292578-7-important-encryption-techniques-you-need-to-know-about/)

### Message Authentication Code (MAC)

**Message Authentication Code** (MAC) functions provide a notion of **integrity**. This notion of integrity is stronger than that of a hash function. In short: a MAC function is a hash function that also requires a key. The addition of a secret key means that even if an attacker has a hold of the data they can’t tamper with the data and change the hash output in an attempt to to fool you. An attacker would need the correct key in order to calculate the correct MAC value. It is assumed that the MAC key is pre-shared safely (public key / asymmetric cryptography).

While we are talking about safely sharing keys it is worth noting that keys should only be used for a particular purpose: a MAC key should be used in MAC calculation, it shouldn’t be used for encryption. Conversely, a key for encryption should be used only for encryption and not for calculating MACs. Simply, it is just good practise.

A MAC can be created from an hash function or it can be constructed specifically as a MAC function (this is known as an HMAC):

*   MAC(k,message) = hash(k|hash(message))

The left side is a MAC function while the right side is an HMAC which builds a MAC using a hash function. Here "k" is a key.

Practical example with SHA256:

*   message=bitcoin is cool
*   key=mypassword
*   SHA256(bitcoin is cool) = da260860373538ca1539e6dde565835f5db154549ee3fdd25b829ca01e97043c

So let's use these plus the SHA256 hash function to construct a simple MAC:

SHA256(mypassword|SHA256(bitcoin is cool))  
\= SHA256(mypassword|da260860... 1e97043c)  
\= 17b49357dcf52fa41ca25224493cd90057801a3331014b9f738078fa7be7cfdd

I used the following link to calculate SHA256 hashes: [http://www.xorbin.com/tools/sha256-hash-calculator](http://www.xorbin.com/tools/sha256-hash-calculator)

### Digital Signatures

**Digital Signatures** provide a notion of **integrity** and of **authenticity**. In fact they also provide a notion of non-repudiation: the sender was definitely the sender and no one else (think about cryptocurrency transactions!). Note that they do not provide confidentiality. These algorithms are fairly heavy weight in comparison to a hash function, so it makes sense only to use them only when it is required.

Digital Signatures Algorithms fit under asymmetric cryptography which is to say that they have two keys. One key is used for signing data (this is private) while the other key is used for verification (this is public).

Bitcoin and Ethereum use digital signatures to sign transactions in order to prove that a transaction actually came from an address. A valid signed transaction proves that the transaction has not been tampered with (integrity) and that it came from the correct address (authenticity / non-repudiation). Obviously, there is the caveat that non-repudiation is not quite an absolute. Generally, we don’t see the other person actually typing at their computers so we can’t say (with perfect confidence) which person actually signed a transaction but rather we know that it came from a particular address with perfect confidence.

CryptoCompare have a nice article which goes into the details of [how digital signatures work in Bitcoin](https://www.cryptocompare.com/wallets/guides/how-do-digital-signatures-in-bitcoin-work/)

And at that I think I'll stop there. This should be enough to get started. :-) If you want to learn more I do highly recommend picking up the book Everyday Cryptography by Professor Keith Martin.

Disclaimer: this is my own opinion and not that of my employer.
