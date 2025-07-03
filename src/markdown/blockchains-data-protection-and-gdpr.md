---
title: "Blockchains, Data Protection, and GDPR"
date: 2017-07-02
tags: ["security", "blog-archive"]
category: "information security"
---

Recently I came across an interesting problem which is to do with data regulation and blockchains: what are the regulations surrounding storing data on blockchains? While there are very few regulations which are specific to blockchain technology it is worth considering which existing laws already apply to blockchain technology. Governments, and their associated regulatory institutions, have been fairly hands off but that’s not to say that no laws apply.

The SEC in the US have strict laws around registered exchanges. Simply setting up an exchange using blockchain technology in order to skirt around the SEC isn’t going to cut it.

## Data Protection

Likewise for data storage and transfer there are already existing laws. In the Europe Union the current legislation (at time of writing) comes from the Data Protection Directive.

The key point of this directive is as follows:

> The data protection rules are applicable not only when the controller is established within the EU, but whenever the controller uses equipment situated within the EU in order to process data. (art. 4) Controllers from outside the EU, processing data in the EU, will have to follow data protection regulation. In principle, any online business trading with EU residents would process some personal data and would be using equipment in the EU to process the data (i.e. the customer’s computer). As a consequence, the website operator would have to comply with the European data protection rules.
> 
> Source: [Wikipedia](https://en.wikipedia.org/wiki/Data_Protection_Directive)

This states that any business that processes data on EU citizens should really do so inside the EU. I believe there are acceptable provisions to process the data outside the EU if there is an adequate level of protection. So even under existing regulation there should be concerns about where online businesses are processing personal data.

However, as also noted in Wikipedia:

> The directive was written before the breakthrough of the Internet, and to date there is little jurisprudence on this subject.

Despite there being little jurisprudence there are still fines handed out for privacy breaches. The current risks from non-compliance are small(ish) fine and some wrapped knuckles. I don’t recall any company becoming bankrupt from a data breach.

## General Data Protection Regulation

This time next year the situation will be different. The General Data Protection Regulation (GDPR) is due to kick in next year (25th May 2018). I’m not saying business will go bankrupt, but they could be fined rather heavily. Fines can be up-to 4% of global revenue or 20 million EUR, whichever is higher.

Both the current legislation and the upcoming GDPR laws essentially look disfavourably on blockchain technology for storing personal data. Let me clarify the usage of blockchain here: I should really say a distributed blockchain where the data is stored across multiple computers around the world. The aspects of public and decentralised are not necessarily the problem but rather the possibility of any data being ‘distributed’ to countries where the data protection laws are not as strict as in the EU.

Under the GPDR the definition of personal data is going to be broader and essentially includes any piece of data which could identify a person. It could be their name, address, their credit card number, or even their IP address. It wouldn’t surprise me if other pieces of seemingly tangential or seemingly pseudonymised data also fall under this definition. If the data can lead to a person being identified then it would be personal information, and moreover it could lead to a fine.

## Blockchains

With all the buzz around blockchain technology it does feel like this has been overlooked. Even outside of the blockchain community it isn’t clear that GDPR is well known or well understood. The lack of awareness gives me little hope that adequate protections will be baked into current and future blockchain projects. Where I do see some hope is that many people within the blockchain community are interested in privacy and security. In the older times when Bitcoin was taking off the community was much more heavily focused on privacy and while certain projects have continued that line of thinking I can’t say it is true of all projects.

As the technology becomes more mainstream it is inevitable that regular folks who are less concerned about privacy will be creating projects in this space. It is a fear that future project creators would acknowledge that privacy is a trendy topic within the blockchain community, and hence they would have a desire to market their project as “privacy preserving” or “fully anonymous”, but otherwise forgo the hard work in making privacy a fundamental property of the project.

## Looking for failures

The projects I’d look at first for failures to protect personal data are projects that:

-   store any sort data in bulk on any blockchain (expect personal data to be in there too);
-   providing identity management (almost exclusively personal data);
-   assistance with the Know Your Customer regulations.

I don’t know how it will play out when a breach occurs in terms of who will be taken to court or whether there will ultimately be any charges brought but I think it is likely to occur. Any group with a presence in the EU is at far higher risk too. Groups outside the EU may be lucky to escape being charged since I see it being hard to enforce the GDPR on an entity that lies outside of the EU.

## Further reading

I came across an interesting article on Coin Desk that I think is worth reading: [Blockchains and Personal Data Protection Regulations Explained](http://www.coindesk.com/blockchains-personal-data-protection-regulations-explained/)
