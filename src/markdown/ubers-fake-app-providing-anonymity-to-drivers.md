---
title: "Uber’s fake app providing anonymity to drivers?"
date: 2017-03-07
tags: ["security", "blog-archive"]
category: "information security"
---

An interesting revelation was dropped in the news this week about Uber implementing a mechanism to provide some level of protection from law enforcement in cities where Uber is prohibited (if I have understood correctly). It would seem that the mechanism affords the driver a level of anonymity.

[Bruce Schneier wrote a comment](https://www.schneier.com/blog/archives/2017/03/uber_uses_ubiqu.html) on the revelation and focussed on the surveillance aspect of this. While I’m a fan of Bruce, I’m less inclined to focus on the surveillance aspect of this story and look more at the ‘anonymising protocol’ employed by the app. Interestingly, while Bruce was critical of Uber it would seem that many of the commenters defended Uber’s actions.

The interesting part from an anonymity perspective are highlighted in the following quotation from the NYT:

> Uber has for years engaged in a worldwide program to deceive the authorities in markets where its low-cost ride-hailing service was resisted by law enforcement or, in some instances, had been banned.
> 
> \[…\]
> 
> officers like Mr. England posed as riders, opening the Uber app to hail a car and watching as miniature vehicles on the screen made their way toward the potential fares.
> 
> But unknown to Mr. England and other authorities, some of the digital cars they saw in the app did not represent actual vehicles. And the Uber drivers they were able to hail also quickly canceled. That was because Uber had tagged Mr. England and his colleagues — essentially Greyballing them as city officials — based on data collected from the app and in other ways. The company then served up a fake version of the app, populated with ghost cars, to evade capture.

This roughly works as in a manner that an anonymising protocol should. The scheme was implemented in cities where the number of uber drivers could be very low. If the app shows a bunch of cars on the map (inside the app) which all appear to be legit taxis then you’d have no reason to assume only one taxi was operating in the city. This means that finding the one real taxi in the midst of a bunch of fake taxis could be tricky and hence this protects the identity of the real driver.

Obviously I don’t know how foolproof this is. It seems that the investigators knew that Uber were doing something, and hence prohibited, in the city even if they couldn’t prove which drivers were involved.

   
I wrote up a summary of the theoretical aspects of anonymity here: [Theoretical Anonymity](https://odinnsecurity.com/index.php/anonymity/theoretical-anonymity/)

And, a summary of the concepts of anonymous communication here: [Concepts and schemes of anonymous communication](https://odinnsecurity.com/index.php/anonymity/concepts-and-schemes-of-anonymous-communication/)
