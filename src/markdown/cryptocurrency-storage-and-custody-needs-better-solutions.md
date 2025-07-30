---
title: "Cryptocurrency storage and custody needs better solutions!"
date: "2019-09-08"
tags: blockchain,polkadot,ethereum,cryptocurrency,web3,defi,medium-archive
category: "blockchain-and-cryptocurrency"
description: "“Vanilla” Shamir Secret Sharing has a race condition, but it can be fixed. I outline the problem with some practical solutions."
original_url: "https://edward-thomson.medium.com/cryptocurrency-storage-and-custody-needs-better-solutions-3eb316ec856e"
---

# Cryptocurrency storage and custody needs better solutions!

**tl;dr**: “Vanilla” Shamir Secret Sharing has a race condition, but it can be fixed. I outline the problem with some practical solutions.

Lately I’ve being doing some research into the various methods for securing cryptocurrency wealth. I’ve explored the use of of hardware wallets as well as airgapped devices. Using the best cryptographic tools is important, but having a good process is more important. Two useful resources have been a [blog by Jameson Lopp](https://blog.lopp.net/fifteen-men-on-a-dead-man-s-switch/) and the [Glacier Protocol](https://glacierprotocol.org/). I’m hoping I can type up more on that in later blogs. It was while thinking about what my own process should be that I discovered a problem in using the ‘vanilla’ [Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) Scheme.

After further research, plus some discussion with a colleague, it looks like the problem is well known about and there are mitigations. The problem has been known about probably since the inception of the idea and proposed mathematical solutions since the mid-80s. Wikipedia has a reasonable article on this topic: [Verifiable Secret Sharing](https://en.wikipedia.org/wiki/Verifiable_secret_sharing ). The biggest remaining problem is lack of implementations inside cryptocurrency wallets. Perhaps this is due to a lack of awareness.

![](/images/1*pfMK6QXzkfvkbs57cWbfRg.png)

*The model T (left) now supports Shamir Secret Sharing (Source: [Trezor](https://trezor.io/))*

In this is past week [Trezor announced](https://blog.trezor.io/shamir-backup-the-revolution-of-private-keys-backup-is-here-858687ed7fe7) that they now support the Shamir Secret Sharing Scheme. I haven’t dug into the details, but there is a chance that it is still vulnerable. I’m not saying the attack is necessarily easy, but when the stakes are high it is something that would be best to avoid. Pushing the industry to go this direction I think is overall a good thing, but more has to be done.

# **Quick explainer: Shamir Secret Sharing**

The scheme let’s you ‘scramble’ a sensitive string of characters (e.g. a password) and then represent those by multiple long numbers. It has a nice property that it is a threshold scheme that let’s you define how many pieces long numbers you want and how many pieces are required to recalculate the original sensitive string of characters. Revealing one long number doesn’t break confidentiality. This makes each individual long number robust against being stolen. The scheme is also agnostic to the input you give it.

This makes the scheme attractive for splitting up:

-   the master password of a password manager,
-   private keys,
-   the recovery phrases / mnemonics of private keys.

There is no single point of failure once the shares are split.

![](/images/1*87kyp4ddUDGuHJCHhatr2g.png)

*“SSSS” is a tool for creating splitting the secrets as described. (See: [Link](http://point-at-infinity.org/ssss/))*

**Here’s the problem**

If the scheme is used to split up a single private key (e.g. a Bitcoin private key), then the first person to recombine enough of the pieces will be able to spend the tokens. This is a race condition since the first person to recover all pieces may not be the true beneficiary. How come? Well, the main problem being that cryptocurrencies can be spent from any computer anywhere in world, all you need is the private key. I also think there is a reasonable chance that someone could be cheated into revealing their share. Perhaps this can be done by presenting a fake share and encouraging the other legitimate holders to reveal their shares. This really isn’t the ideal security posture for securing large amounts of value.

This problem is outlined in the Wikipedia article on [Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing), plus there is some discussion on going on at [Eth Research](https://ethresear.ch/t/security-considerations-for-shamirs-secret-sharing/4294).

# **Practical Solutions**

Let me outline some possible solutions. Each has their own drawbacks.

**Current multisignature schemes**

Here I’m thinking about current multisignature schemes, e.g. as in [Bitcoin](https://en.bitcoin.it/wiki/Multisignature) and Ethereum. These schemes don’t require holding all the secret values on one device: they can be used to sign messages from different devices at different times and should yield a better chance of rewarding the true beneficiary.

For example: a Bitcoin multsig requires multiple keys to sign a message to make a transaction happen. It is expected that these keys are not held by the same person. I hope that it is apparent why this is useful: e.g. preventing a single person from running away with company funds, and likewise a custody provider can hold a key without putting the stash at risk. In the latter case, this also reduces the risk on the funds being stolen should the beneficiary come under attack.

Security here relies upon the security management processes of each key holder. If enough keys of the threshold amount are poorly managed then the tokens might as well be deemed as insecure. [Trail of Bits wrote a nice blog](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) that mentions some of the basics of securing tokens with hardware wallets, the blog also mentions the use of multisignature schemes at the end. Specifically, they note that the security of the host devices is important.

**Split a password, not a mnemonic or a key**

The suggestion here is that you can use hardware wallets to secure the tokens, which is sensible, but this leaves the problem of securing the mnemonic. The mnemonic phrase that you write down when you buy a hardware wallet can be used to recover the token should the device fail. I may refer to either the recovery phrase or the mnemonic, but I mean the same thing here.

![](/images/0*7N4CbwV0JssYO9UW)

**Y’know, this thing! ^ (Image credit: Ledger, Reddit user ‘moodyrocket’)**

The device itself is a single point of failure, as whoever controls the device can spend the tokens. For a single person securing their tokens that isn’t necessarily wrong! In most of my analysis I had been assuming that there is a single person who owns the tokens. As a point of good practise you must be strict in your management of the recovery phrase. Having access to this phrase is as good as having control over the tokens, which means that managing this phrase is as difficult as managing a private key.

One method to secure the phrase would be to save it in a password manager. This would require saving the phrase in an offline password manager that only saves files to the local computer. Moreover, you should only use the password management software on a fully airgapped computer. I won’t lie: this is a pain. Assuming you can do this, then you can also use the airgapped computer to perform the necessary calculations of Shamir Sharing. The trick now is to split the master password of the password vault and **not** the recovery phrase. The shares of this split password can now be shared with people of trust.

Why is this different? Well, the first person to recover all of the password shares can not immediately spend the tokens. That is surely a win. In order to spend the tokens you need both the password vault (a file) and enough of the secret shares. The file should be copied and stored across a number of drives, but perhaps should not be so widely distributed.

This technique can also be used with one of the common multisignature schemes.

**Require signing from participants**

The real fix to the problem would be to require signing the shares, but to the best of my knowledge no wallet supports this yet. Below I will outline where code exists and roughly how it is applied.

**HOPR**

![](/images/1*lyufADxo7AInB7zTb7E35Q.png)

*(Source: [HOPR](https://hopr.network/))*

The HOPR network is a mixnet for anonymous communication where the nodes are incentivised to route the messages. Payments to the nodes are conducted via state channels, but there is some difficulty in making sure that nodes are only paid for the message they route and are not able to bluff or otherwise steal payment due to other nodes. For payment, each node discloses the shares they received but the shares need to be summed and then multiplied (elliptic curve multiplication) by a signing value (which is also secret).

This particular use of a signature works in this use case since there is a smart contract to enforce it. For the use case I outlined above things will be different.

For more details, see their relevant [design document](https://github.com/validitylabs/HOPR-PL-Substrate#secret-sharing).

**Schnorrkel**

After describing the race condition problem to my colleague Jeff he said that it was a solved problem and he pointed me towards his [Schnorrkel library](https://github.com/w3f/schnorrkel). In this library it is a Schnorr multisignature, but it is currently implemented as an aggregate signature (m-of-m) rather than a threshold signature (m-of-n). The mathematics certainly allows for the latter but it hasn’t been coded yet. The main problem here is that this library doesn’t exist in any wallet software yet (AFAIK). While the [Polkadot Network](https://polkadot.network) includes the library, I don’t believe any of the wallets use the multisignature capabilities yet. Parity Signer should included this capability in a future version.

![](/images/1*zEluXsEYppxP33VrovmAjw.png)

*(Source: [Parity](https://www.parity.io/signer/))*

[Parity Signer](https://www.parity.io/signer/) is an app that you can use on your phone for protecting Ether and in the future DOTs too. If the app is used on a phone that’s kept offline then you can essentially keep the private key airgapped. The signing of transactions happens via QR codes.

The mathematics is compatible with Bitcoin too. As I understand it, there is no modification required to Bitcoin all that is required are the wallet builders to implement it. Interestingly, Schnorrkel builds upon the work outlined in a paper written by some of Bitcoin core’s contributors: “[Simple Schnorr Multi-Signatures with Applications to Bitcoin](https://eprint.iacr.org/2018/068)”

# Conclusion

-   Build us wallets that support verified secret sharing!

This will enable better custody management and should make your cryptocurrencies more resilient to being stolen.

# Next blog

Hopefully, I will be able to share some more of my thoughts on securing private keys. A process rather than yet another piece of technology. We need good apps (vis-a-vis this blog) but we also require good processes otherwise the good apps mean nothing.