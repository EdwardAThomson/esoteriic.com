---
title: "Polkadot Update: PICOPs + Preliminary Analysis of the ICO Contract"
date: '2017-10-08T21:25:30.000Z'
category: blockchain-and-cryptocurrency
---
Some more news has been released from the Polkadot camp.

![Image](https://steemitimages.com/0x0/https://steemitimages.com/DQmVopwhfA8kt2eJYdsKAVw36AC48UisqPfCvVmWnS3ghtg/image.png)

General ICO information
-----------------------

From the project's [website](http://polkadot.network/)

Firstly:

*   US and Chinese residents **CANNOT** participate.
*   There will be a 3-day countdown timer, not a 14-day countdown timer as first stated.
*   No date has been set.
*   A ["lightpaper (PDF)"](https://github.com/w3f/polkadot-light-paper/blob/master/Polkadot-lightpaper.pdf) has been released. This is a more readable overview of the project than their whitepaper. Note that there will be 10 million DOTs in genesis block (of which 5 million will be sold in the ICO).
*   The Polkadot auction will be using Parity's PICOPS [https://picops.parity.io](https://picops.parity.io) as its KYC service.

PICOPS will perform KYC which is a way of verifying the identity of contributors. If you don't get verified you won't be able to participate.

Contract analysis
-----------------

The team have pushed their ICO contract to GitHub. This is my first reading of their contract. I will offer what I understand of it but I cannot guarantee the accuracy of what I am saying. I looked at the code line by line and present my findings in a similar manner below.

Reference: [Second Price Auction](https://github.com/w3f/polkadot-auction/blob/master/src/contracts/SecondPriceAuction.sol) from the Polkadot GitHub.

**Key points**:

*   "Price starts high and monotonically decreases until all tokens are sold at the current price with currently received funds." (logarithmic) \[line 21\]  
    Recall: all participants receive the same price.
*   Admins can 'inject' (add) a purchase. Presumably this is to fix mistakes, but could be done at their discretion. \[line 32\]
*   Looks like there is a hard maximum duration of 15 days. Although the auction could end earlier. This somewhat contracts information I found later. I'm not that hot with code. There is a calculatedEndTime() function which may override this. \[line 66\]
*   There is a bonus period where the DOTs are cheaper, or rather a bonus offered for participation in the first 24 hours. \[lines 87 and 393\]  
    (there is a typo on line 392)
*   The bonus is initially 15% but decreases over the bonus period. Looks like the bonus period can end early if there is no new interest. \[lines 85 - 98, 340, and 396\]
*   No refunds will be given (I always thought this would be true, and looks true if I understood correctly) \[lines 105 and 106\]
*   Admins can inject (add) purchases without requiring a payment and where the bonus is automatically given. Not entirely sure what 'payment' means in this context. Perhaps it is just a way of adding a bonus to an address which has already transferred ether to the contract? \[lines 121 - 136\]
*   Admins can pause the ICO and also drain the funds when needed. \[lines 178 - 182\]
*   Price formula is given in the code comments \[lines 187 - 199\]
*   The starting effective cap (EC) is $30b (more ether than exists, so like a pseudo-infinity which prevents instant sell-out).
*   After 48 hours, the EC reduces to approx. $1b. At just over 10 days, the EC has reduced to $200m, and half way through the 19th day it has reduced to $100m.
*   Can't send from a contract address \[line 308\]
*   The token cap is a public value but looks like it will be passed to the contract when it is instantiated. \[line 56 and 364\]
*   Minimum investment is 5 finney \[line 376\]
*   There is a hard conversion ratio of dollars to wei (essentially dollars to Eth) used in the contracts calculations. 1 dollar is 3.226 finney, or 0.003226 Eth, or $309 = 1 ether. \[line 399\] (Check my maths here with: [https://forum.ethereum.org/discussion/304/what-is-wei](https://forum.ethereum.org/discussion/304/what-is-wei)). This is a price that would correspond to today 8th October and of yesterday by the looks of the contracts update history on GitHub.

Also, FYI, Matthew Di Ferrante of Clearmatics did an audit of the code. His findings are here: [PDF](https://github.com/w3f/polkadot-auction/raw/master/parity-audit-final.pdf).

Keep your eyes peeled and watch for updates on GitHub until the ICO goes live.

Previous Polkadot posts:
------------------------

*   [Polkadot DOT token pre-sale has been announced](https://steemit.com/polkadot/@edwardthomson/polkadot-dot-token-pre-sale-has-been-announced)
*   [My preliminary analysis of the Polkadot ICO](https://steemit.com/polkadot/@edwardthomson/my-preliminary-analysis-of-the-polkadot-ico)

Please also subscribe to [Polkadot Market sub-reddit](https://www.reddit.com/r/polkadot_market/). A community driven sub that's following Polkadot.

Disclaimer: this is not investment advice.  
Disclaimer: this is not the opinion of my employer.
