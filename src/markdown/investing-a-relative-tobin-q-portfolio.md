---
date: "Tue Sep 03 2013 20:18:00 GMT+0100 (British Summer Time)"
title: "Investing: A Relative Tobin Q portfolio"
description: ""
category: "investing"
---
I was struck with the idea of using the Q ratio to construct a portfolio, much in the same way that one might create a Smart Beta portfolio by trying to optimise the [Beta](/web/20160405122757/http://esoteriic.com/thoughts/32-reviews/148-the-little-book-of-commonsense-investing-john-c-bogle "Common sense investing") profile (see previous article). I have no idea if anyone has tried or if any literature exists on it. In a similar fashion I'm wondering if companies can be weighted relative in such a way to optimise the Q-profile. Obviously this approach is more suited to passive / index style investing, it may have use in active management but I'm not considering that here. I propose creating a universe of stocks that is filtered by relative Q values and then weighted either equally or perhaps by an inverted-Q ratio.

The idea only came to me after reading a recent FT article which suggested that the stock market (S&P 500) was over-priced due to a high value of Q for the market (and from CAPEs valuation too). If Q is high relative to its historical average then the market is over-priced. The Tobin Q ratio is roughly the cost to replace all assets (Google the definition if curious). I haven't checked to see whether such a work exists, but rather I'm writing down my own ideas and I roughly describe how I would implement such a method. I also expect the Q ratio to be fairly well correlated with price-to-book ratio (just a hunch, not idea if that's true).

If the Tobin Q ratio can point out when a company is over-priced relative to the market, and when the market is over-priced then it could be rather useful in constructing a less risky portfolio (debates on risk are for another day). Also I wonder if it could be used to "accurately" rebalance a portfolio in order to be "risk efficient" (again, I'm sticking with fairly consensual thinking on risk here for expediency, otherwise read [here](/web/20160405122757/http://esoteriic.com/thoughts/32-reviews/182-the-black-swan-the-impact-of-the-highly-improbable "Black Swan")).

How to filter the stock universe:

\* Get all the Q values for the companies in a given index (e.g. S&P 500).

\* Calculate the average Q value for the market.

\* Re-weight stocks relative to the average value. Can also rebase the average Q value of the market to 1. This should be reminiscent of the market's Beta being 1 by definition.

Relative Q value

Here the relative Q value of the market would also be 1, but the absolute measure can easily be above 1. The absolute Q value would suggest whether a stock or market is over-priced compared to the long-term averages. However, if the market as a whole is over-priced then the underlying Q values will be higher than they "should be". If stocks are filtered by Q value then using the absolute Q value may cause us to over-filter the stock universe.

Stock filtering

Ideally, we should keep as much of the market in the portfolio that the rules would allow for. If the market as whole climbs to very high Q values then our stock filter could theory suggest a portfolio of very few stocks. This may only be a theoretical concern but I think that by using a relative measure for stock filtering then it can be avoided.

If the market as a whole is going to tank then we have to accept the whole portfolio will go down too. From a long-only perspective this is simply an inherent risk of investing: the market can go down as well as up. That said, if the market has a whole is over-valued then I'd wager that this method is likely to have a lower maximum draw-down since the portfolio should (on average) contain less growth stocks and more defensive stocks. A classical sign of the market turning down was when investors rotated to defensives. Likewise, investors may have rotated to bonds but that seems like a poor choice in the current climate.

Stock weighting

The fund/portfolio manager can decide upon which multiple of relative Q that they will filter by, but that doesn't suggest how the portfolio should be weighted. One simple method is to use equal weights (the Scientific Beta guys have made a good case for that); i.e. filter by relative Q then weight all remaining stocks equally.

The stocks could also be weighted by market cap or whatever really. Unfortunately as lower Q implies cheaper and here I am naively assuming 'better' then there isn't a natural weighting that I am aware of. Perhaps an inverse Q value can be calculated for each stock, then those new values can be taken as a percentage of the total inverted-Q value for the market? i.e. More money goes into cheaper stocks.

A manager may also rule out stocks which are "highly" undervalued on the basis that stocks in that territory are cheap for a reason (would be best to be guided by data on that one). I could see a fair reason for only picking stocks which are close to that of the market: essentially picking a portfolio which represents the market without buying the entire market. Which means I wouldn't be surprised if the resultant portfolio would have a Beta similar to the market.