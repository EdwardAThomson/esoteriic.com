---
date: "Sat Aug 31 2013 21:01:00 GMT+0100 (British Summer Time)"
title: "Investing: An introduction to Smart Beta"
description: ""
category: "investing"
---
To understand Smart Beta one should really understand Beta. Many websites of high repute will tell you that beta is a measure of volatility, but that isn't quite right. [Beta](/thoughts/32-reviews/148-the-little-book-of-commonsense-investing-john-c-bogle "Commonsense investing") provides a "correlation" of one financial time series versus another, but is adjusted by a volatility factor. That is to say that it provides a measure of "correlated volatility" (Wikipedia wording) of a stock versus the underlying index: for example Apple and the S&P 500.

Simply stated: if the market is going up and has a particular volatility then how does Apple compare to those characteristics? Is Apple appreciating in price at a faster rate than the market as a whole, and is it more volatile? This is what Beta is trying to account for. If Apple is appreciating at a faster then it is likely to have a higher Beta. That is to say that Beta provides a notion of comparative returns. If Apple has a steeper price line then its return will be greater than the rest of the market (for that period), and it will therefore have a higher Beta.

The market is defined, or rebased, to have a Beta equal to one. Naturally the market is composed of many underlying stocks each with their own individual Betas, these numbers only make sense in relation to the market in which they are compared. The first conclusion to draw might be that if Apple is known to have a higher Beta than the market then it must have a higher return than the market, and therefore as an investor you should invest in Apple because it will beat the market. Well, it isn't quite as simple as that.

In fact I don't want to delve too far into picking stocks that beat the market or active management in general. The data shows that over the long run very few people will beat the market. Even if one fund manager is able to do so, what are the odds that you will place you money with that person? The odds aren't in your favour. It is easy to understand the mantra of passive investing: buy the market. It is likely to be the lowest cost solution and provide the most consistent returns.

Obviously this provides the return of the market with some given volatility, but you accept this and get on with life. Now we introduce Smart Beta which is about accepting the returns of the market but with a slight twist. The twist is to try and achieve an improvement on the returns and / or to improve the volatility. That is to say that you might achieve market returns with lower volatility or perhaps higher returns than the market with comparable volatility.

The idea is to develop a systematic process that selectively buys stocks in the market in order to achieve a particular goal. The process does not necessarily have to buy the entire market but it should be free from human judgement (in operational terms, i.e. no manager discretion).

Beta Profile

A simple yet insightful graph is to plot the percentage value that each Beta represents in a given strategy. Another way: create a histogram of Betas of the underlying companies for the strategy. The histograms bins have to be fine enough to show the structure of the profile but also coarse enough to "make sense". As there might only be (say) 100 companies in a portfolio then it is easier to find a lot of empty bins. If we do this for the UK 100 then we will find that about 20% of the portfolio (i.e. 20 companies of the 100) about the mean Beta value, which for the market is defined as 1.0. The width of the bin is 0.1, i.e. the 20% has Beta values between 0.95 and 1.05.

It is interesting that the resulting graph is somewhat reminiscent of a Maxwell distribution, except that there is a second bump of high beta stocks. Not sure I have a good explanation for why it has that shape (well, except that the underlying returns data is roughly Gaussian in the same way that the speed distribution of a gas is). Hopefully this is clear enough to show where your money goes when you buy a simple passive fund (a market tracker -- I've obviously assumed market cap weighting here).

Now I can clearly show what Smart Beta does graphically by comparing beta profiles. Take a random Smart Beta strategy and produce a histogram of the Betas as suggested above then plot it against the original market cap weighted histogram. This simple graph will show where the key differences between strategy in question and the underlying market. Some strategies which offer a lower average beta must show a "skew" towards higher percentages in the lower Beta bins of the histogram and hence a deficit in high Beta stocks.

This doesn't say that a strategy is better or worse but it does provide a very insightful tool for evaluating a strategy and determining if it does what it says on the tin.

Styles

I would break Smart Beta into two types, one is well known as Fundamental Indexing while the other is what I'd call [Algorithmic Indices](/thoughts/31-investing/189-quality-value-momentum-investing "Quality Value Momentum"). The latter is my own choice of wording.

**Fundamental Indices** - this indices are created using fundamental measures of the underlying companies such as book value, revenue, forecast dividends etc. It is obvious to understand what the advantages are supposed to be: it does't use price as an input as the market cap indices do.

**Algorithmic Indices** - these indices are based upon statistical measures of the company stock prices. Such as creating an index that minimizes volatility by picking stocks with a low standard deviation. Clearly these indices use price but are not necessarily prone to the same pitfalls of a market cap index. One popular strategy is "min vol" (i.e. minimum volatility) however the strategy is not just about low volatility but also about the correlation of the stock price to the market as a whole. This is obviously highly dependent on the concept of beta which I defined above as "correlated volatility". Such an index would filter out stocks with low correlation to the market and with volatility much higher than the market as a whole. The result is likely to concentrate the portfolio around Beta = 1.