---
title: "Setting up a validator node in Polkadot PoC-1"
date: "2018-06-25"
tags: polkadot,medium-archive
category: "blockchain-and-cryptocurrency"
description: "Setting up a validator node in Polkadot PoC-1"
original_url: "https://medium.com/polkadot-network/setting-up-a-validator-node-in-polkadot-poc-1-96526ae000c3"
---

# Setting up a validator node in Polkadot PoC-1

**TL;DR**: a short list of instructions, but basically the same steps as Gav [wrote on GitHub](https://github.com/paritytech/polkadot). FYI, I started from a fairly clean install of Ubuntu.

To make things easy I will put all the necessary commands into code blocks, plus I have included pictures of how those commands look when they run.

# Getting Started

First off I’ll provide an overview of all the commands in a single picture. It is worth kicking things off with an ‘apt-get update’, while it is not strictly necessary it is good practise to keep things up-to-date. Too many times I’ve had installations fail because a dependency wasn’t the latest version.

![](/images/0*GhxW9gT5ykSC0X2w.jpg)

*All instructions in one place!*

# Get the latest version of Rust

First get started by installing the latest version of Rust:

![](/images/0*1ub-s6FlL4TF-U1_.jpg)

*Install the latest version of Rust.*

Once you’ve installed Rust, you need to add it to your path (rebooting should work too) and then check that it was correctly added. You should see something similar to the following picture.

![](/images/0*OFh1Efz3pM08ZyQy.jpg)

*Add Rust to your path.*

# Install Clang

The next step is to install Clang. I have to admit that I’m not familiar with Clang, it is in the GitHub instructions, and Googling reveals: “Clang is a compiler front end for C, C++ etc”. The following also makes sure you have the latest version of ‘make’.

![](/images/0*ZBK-im7qxY3BM2iX.jpg)

*Install Clang.*

# Download and install Polkadot PoC-1

Finally, download and install the [@polkadotnetwork](http://twitter.com/polkadotnetwork) PoC-1 code:

![](/images/0*6AmRXhW8qmDKsa0y.jpg)

*Download and install the Polkadot PoC-1 code.*

# Run the code!

Hopefully, you have made it this far and can run the Polkadot PoC-1 code. Exciting, I know! The following picture shows my computer syncing with the global testnet and with that you can celebrate. 🍾 🎉

![](/images/0*jaVr-bbYMxPlLUSl.jpg)

*Run Polkadot and join the global testnet!*

# Public User Interface

It is also possible to play with the public UI written by Jaco ([Parity Technologies](https://paritytech.io/)): [here](https://poc-1.polkadot.io/).

![](/images/0*VPGjW0zTtq8VVM2r.jpg)

*Public UI for Polkadot PoC-1*

To do anything on the testnet, you will need some testnet DOTs. Stop by our [Riot](https://riot.im/app/#/room/%23polkadot-technical:matrix.org) channel to get some! You will need to know your address when asking for DOTs. The address that corresponds to your node can be found by navigating to the [Accounts](https://poc-1.polkadot.io/#/accounts) section in the UI. It would be wise to save your seed somewhere as clearing cookies will delete the seed.

If you plan to stake, you will need more testnet DOTs than the lowest staked validator, currently staking 24,901 testnet DOTs. In POC-1, there are 12 validators. You can query the addresses of the current validator set and query the balances of those addresses [here](https://poc-1.polkadot.io/#/storage). New validators are chosen every 24 hours based on their stake.

![](/images/0*7SQhLrkFyXQLVI-h)

*Current Validator Set*

Once you have your DOTs you need to navigate to [https://poc-1.polkadot.io/#/extrinsics](https://poc-1.polkadot.io/#/extrinsics) and Submit Extrinsic to stake > Select Address > staking > stake().

![](/images/0*K_XyEMuzhtcVj_rN)

*Submit intention to stake*

Now you are in the queue on [https://poc-1.polkadot.io/#/storage](https://poc-1.polkadot.io/#/storage) > staking > intentions().

![](/images/0*q8gS1Sj2_5JUd0og)

*Accounts in staking queue*
