---
date: "Fri Mar 08 2013 23:47:00 GMT+0000 (Greenwich Mean Time)"
title: "Quality, Value, Momentum Investing"
description: ""
category: "investing"
---
In this article I will explore method of investing that uses 3 different metrics for selecting an equity portfolio. This exercise is purely academic (disclaimer at the foot of the page). The metrics are based on Quality, Value and Momentum as suggested by Novy-Marx. I've chosen to use his suggested metrics since he has already done some testing of the metrics for the US market and has written a convincing narrative to go with it ;-). I make no guarantee that it will beat the market in the future but I was curious to see how a UK equity portfolio would look if it was built along the lines of the QVM metrics. I examined the top 300 companies and produced a list of the top 25 UK mid and large cap companies. NB: QVM is my own acronym.

Inspiration

With the recent release of Buffett's annual letter there has been a spate of articles on value investing, again. Two particularly interesting articles are from [Business Insider](http://www.businessinsider.com/warren-buffett-on-high-quality-stocks-2013-3/ "Business Insider - Warren Buffett on high quality stocks") and [Monevator](http://monevator.com/4-investing-methods-that-beat-the-market/ "Monevator - 4 investing methods that beat the market").

In these articles the authors highlight a couple of strategies that have beaten the market over the long run. These strategies tend to a Value bias, similar to Mr Buffett, and naturally they attract both the smart and the greedy. Definitely a fascinating subject (beating the market) but not one that everyone has to try, nor try in the long run. Due to the intellectual challenge it poses I am naturally drawn to it.

The Business Insider article links to the study by Novy-Marx which contain the QVM metrics and whose methodology for portfolio creation I roughly follow. I suggest reading over the Busienss Insider article for a primer as to why these metrics were chosen over other metrics. Research: [Novy-Marx research paper on Quality, Value and Momentum stock picking.](http://rnm.simon.rochester.edu/research/QDoVI.pdf "Novy-Marx - Quality, Value and Momentum stock picking")

QVM metrics

Value - is about finding cheap stocks which are potentially neglected by the market (under-valued). The metric used is the ratio price-to-book: price per share / book value per share (or Market Capitalization / Book value of the company). A lower ratio indicates a cheaper stock.

Quality - is used to rank companies which are productive, this will be reflected in the metric total revenue (sales) / total assets. A higher ratio indicates that a company is more productive with the assets it has.

Momentum - reflects whether the price of a company is moving in an up or down trend. Momentum is the ratio of the price today divided by that of 12 months ago. The idea is that the market should have picked up on the positive ratios of a company already and started to buy it. If a company has been in a down trend over the last 12 months (say) then you may want to ignore it for now. This can be tweaked over various time frames depending on your preference, I chose a 1 year time-frame. A higher price change over the last year will result in a higher momentum rank.

Methodology

In the above descriptions I have stated how I calculate each metric. I did this for each of the top 500 (or so) companies in the UK. I split the mid and large caps into one set of ranks, while I put the small caps into a different set of ranks. This is mainly personal preference (bias) but need not be the case. The rough idea is that small caps are less established and so seen as riskier.

I created three lists of the stocks, one list for each metric. In the first list I sorted the companies by price-to-book, that is the companies which have the lowest price-to-book are ranked best. The best rank on the list is 1. Then I took the second and third lists and sorted them according to the other metrics. The company with the highest revenue / assets was assigned a rank of 1 and likewise for momentum where the company with the biggest 12 month gain was ranked with a 1.

This gives each company a rank for each metric. The final step is to calculate a total rank which simply adds up the three individual ranks. Note that where a company doesn't have a particular ratio, such as missing revenue or book value data then they were removed from the lists. This doesn't kill that many shares. It depends what sort of list you can import into Excel.

Results

Here is a table of the top 25 companies (best at the top) according to my Quality, Value and Momentum metrics.

![QVM Investing](/pix/trading/QVM_investing.png)

Columns descriptions:

\[1\] The first column contains the final rank. The top row contains the highest rank (1).

\[2\] Name

\[3\] Total Revenue / Total Assets

\[4\] Price / book value (per share)

\[5\] Price today / Price 1 year ago. (8th March 2013 divided by the price of 7th March 2012).

\[6\] Rank for Revenue / Assets. Sorted on the basis of higher R/A ratio being better. Companies ranked between 1 (best) and (circa) 300 (worst).

\[7\] Rank for Price / Book. Sorted on the basis of a lower price to book ratio being better. Companies ranked between 1 and 300 (best to worst).

\[8\] Price Change rank. List was sorted on the basis of higher price change being better. Again, rank 1 is best.

\[9\] The computed QVM rank taken by summing all ranks together: R/A + P/B + Price change.

Discussion

I need to warn that the quality ranks needed to be adjusted. When the lists were created I left in the large investment trusts which are floated on the stock exchange. They don't have either revenue or assets listed but appeared in the list I worked from, consequently their ratio in Excel gave "#DIV/0!". I removed these trusts from my final list.

I included stocks with had a negative book value and hence negative P/B value. I didn't wish to make any prior assumptions or pre-filter on this basis in case the market had already accounted for this fact and hence there would have been little momentum in these stocks. The point of this whole process was to rank stocks according to different factors rather than just one factor.

One thing that is obvious is that Revenue and Assets are fundamental to the company with no input from the stock market (does not rely on share price for calculation). Price-to-book and Price change obviously rely upon the Price which is the market's opinion, and naturally their is a correlation between these two factors. Some may believe there is a double count or at least a double weighting for price. This could be true and not something I will debate in this article, I'm staying true to the suggestion within the research above.

Perhaps the most important thing that I haven't done is plan how to take this from the number crunching stage into implementation. The original paper suggests that the "ultimate" strategy is to hedge the stocks in a particular manner to provide the best return. I haven't given a great deal of thought to it, so can't comment further. As a first stage I'd be more interested in creating simple portfolio weights based upon the weights: higher rank = higher weight in the portfolio.

**Disclaimer:**

If you invest according to some random guy on the internet then you are likely to lose money. :-) Invest at your own risk; this articles does is not a recommendation.  If you invest according to some random guy on the internet then you are likely to lose money. :-)