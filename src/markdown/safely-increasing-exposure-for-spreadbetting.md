---
date: "Sun Jul 29 2012 22:24:00 GMT+0100 (British Summer Time)"
title: "Safely increasing exposure for spreadbetting"
description: ""
category: "investing"
---
**One of the potential benefits of spreadbetting is the possibility of using leverage to boost investment/ trading gains. It isn’t entirely correct to say that spreadbetting or leverage is dangerous but rather they encourage excessive fear and greed. It is entirely possible to create a leveraged position that is less than the total cash in your count (essentially an unleveraged position); however, I’ve been thinking about how to build exposure for a spreadbetting position in a safe manner. Here, I consider how to build a position and cap your losses to zero.  
**

**Introduction  
In spreadbetting you open a position by entering the number of pounds you wish to bet per penny of increase in a share’s price. So you may wish to bet £1 per point on a company that has a price of 500p. This means that for every penny the price increases you will gain £1, and conversely for any decrease. This is equivalent to buying 100 shares in the company except in spreadbetting you don’t need the full amount of cash to do this but are essentially borrowing to enter the trade.  
  
Naturally it is possible to have a stop (or stop-loss) to prevent your maximum loss. When the company falls to a certain price then your position is automatically sold and hence your loss is capped.  
  
If the price of the company increases then we may wish to buy more shares in the company, or in spreadbetting language we wish to increase the size of our exposure. I decided to do some quick maths and figure out a formula for building up a position in a safe manner. This idea is naturally suited for a bull market. A sideways market is not ideal and going short will require a slight inversion in thinking but ultimately it is the same idea.**

**Opening a position  
Whenever a position is first opened there is no profit or loss (let’s ignore the spread), so the initial price is the break-even price (labelled, b). There is also the stop price, s, which is where a stop will be placed. Profit is obviously the current price, P, minus the break-even price,b : Profit = P - b. If the market goes the other way then the loss is the break-even price minus the stop price: Loss = s - b. Once the market starts to move in our favour (upwards) then we can move our stops upward so that we can ‘’lock in’’ profits. At worst we can set the stop price equal to the break-even price: loss = s - b = 0 for s = b (ie, our loss is zero).  
  
For placing stops we ideally want the current market price to be far greater than the stop loss price, at closest the two prices should differ by the volatility. We don’t want our positions to be closed out early because of volatility. So ideally the price should be, at least, the stop price + monthly volatility (shorter timeframe probably isn’t wise): p > v + s. For example if the price is 650 and the volatility is 40 then we want our stop to be at 610.  
  
Once the position is in play and the price is far above the break-even price then we can set the stop as the break-even price and hence obtain: p > v + b (as b = s).**

**Increasing exposure  
Now we wish to increase our exposure and buy in at a higher price. Say we want to buy in a further £2 per point but we ideally want to buy at a price where our loss is minimized and potentially even zero. This is definitely possible. Once the market is moving in our favour and our stops are, at worst, equal to the break-even price then we can structure our investment such all new positions ensure our loss to be zero at worst. Getting to this formula for the optimum price requires a little bit of maths....  
  
An open position will have a price O with an exposure of £m per point. The new position will have a price P and an exposure of £n per point. Obviously a opening a further position will increase the average price of the position that’s already open. This average price, A,  accounts for the two prices and the two exposures: A = (m\*O + n\*P) / (m +n).  
  
However, we really want to find what the optimum price is. This average price is actually the break-even price: A = b. From our formula above P > v + b we will eventually obtain:  
  
P >  O + v\*(1 + (n / m)).  
  
This new formula relies only upon the old price, the volatility and the exposures. We don’t need to know what the new average price (although it is simply A = b < P - v). For example if we have an open position at price O = 670, which an exposure m = £3 per point and then which to open a new position with exposure n = £2 per point then we use the formula above to calculate the optimum P at which to open this position. For a volatility of 10 then the price to buy in at is 686.66p. Our total exposure is £5 per point and the break-even price is 676.66p.  
  
Conclusion  
If we remember to set our stops, s, at the break-even price, b, then our loss is always zero. The break-even price should ideally be far enough away from the current market price to avoid being stopped out when the market is trending in our favour. Naturally this assumes that you have an open position that is already trending in your favour. It also assumes that you willingly bring your stops up to the break-even price once the market starts to move and naturally it assumes you have the discipline to follow a trading plan. It is possible to open the new position at a sub-optimal price but it has the risk of being stopped out earlier. This is not necessarily a problem but it is something to be mindful of. The loss is not greater in this case if we the stop-loss is set to the break-even point (which assumes that a hard stop can be placed).**