---
title: "Investigating the security of anonymous messaging over the Internet"
date: 2016-08-27
tags: ["security", "blog-archive"]
category: "information security"
---

The topic of strongly encrypted communication has been receiving a lot of press coverage over the last few years and is a politically sensitive issue. Adding the possibility of making such communication anonymous makes it more sensitive. This work is based upon the thesis that I submitted for my MSc. The layout of the sections plus some of the wording has been tweaked to fit better as blog posts. The intent is to present the information across several pages.

![Anonymity over the internet](https://web.archive.org/web/20210506191036im_/http://dmr2dn0zhdkwo.cloudfront.net/wp-content/uploads/2016/08/troll.jpg)

Can we be anonymous on the Internet?

In this post I am introducing a new section of the blog which will be devoted to anonymity and privacy.

This blog will investigate to what degree anonymous communication over the Internet is possible. The result is unclear: theoretically possible but unlikely to be true in most real situations. Sources will be provided where necessary and may be acaedmia in nature or from the media. The combination of the two will show the cultural relevant of the topic and to highlight the interface between researchers, software developers and the general public who have no formal training in this area.

First it will be essential to provide the necessary theory needed to explain what anonymous communication is and what concepts are needed in order to create the software which facilitates anonymous communication. These concepts include encryption, decentralisation and providing untraceability. In addition, I will provide a taxonomy of anonymity which is presented as a five layered model and can be used to subjectively compare the various schemes. To the be of my knowledge this is a unique model and ought to be useful to differentiate between the assurance provided by various anonymity schemes but also to discuss the level of anonymity needed for a particular situation.

After laying the theoretical foundations of the topic I will discuss the concepts that need to be implemented in order to achieve practical anonymity. A brief overview of popular, and emerging, schemes is provided and intends to cover the broad landscape of anonymous communication software. There is an attempt to provide extensive answers but it cannot claim to be exhaustive.

Finally, an in-depth analysis of BitMessage is provided. This scheme was chosen as being one of the strongest offerings in the space of anonymous communication. It goes a long way to achieve it’s goals and it can be argued that it is the closest scheme to do so. BitMessage is not without fault and some weaknesses have been identified.

The ethics of anonymous communication is not covered as the main focus is to determine if such a concept is possible and what is necessary to achieve this. Some of the reference literature discusses the use of anonymising software and whether there can be ethically justifiable reasons for pursuing it. The reader is encouraged to consult this material if it is of interest. Some attention is paid to the application and settings within which anonymous communication could be useful (such as government, business, Internet of Things) but that is not the focus of this thesis.

For further reading check out my anonymity section:

[Anonymity](/anonymity/)
