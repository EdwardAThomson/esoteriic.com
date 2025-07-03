---
title: "Creating better passwords"
date: 2016-08-14
tags: ["security", "blog-archive"]
category: "information security"
---

**TL;DR**: use a password manager.

Allow me to suggest Password Safe ([https://pwsafe.org/](https://pwsafe.org/)). Forgive the lack of design on that website but the product is free and was created by security expert and cryptographer Bruce Schneier.

**Password Memes**

Everyone has undoubtedly seen the memes that illustrate our common frustrations in picking a password for a new account. A new website has gone live and everyone is racing to join it and try out the new service. There is a large fear of missing out (aka #FOMO), but you may need to pick a username that hasn’t already been taken. John1 has likely been taken even if you’re an early bird, but in the case where you just have to use your email address as your username there is always the dreaded next step of choosing a password. We scratch our heads and feel the sensation of guilt when our brain falls into the groove of recalling our favourite password.

![Password meme](https://web.archive.org/web/20200922045830im_/http://weknowmemes.com/wp-content/uploads/2014/01/creating-a-password-cabbage.jpg)

The struggle….

I will outline the usual problems with password creation and storage, and then make the case for password managing software. My aim is not to complain about bad behaviour nor chastise anyone for having a weak password. We’ve all been there. I’ve even typed passwords into group chats: “MyCompany789!$”. Oops! I’ve had a few moments of embarrassment while I frantically change a terrible password that I shared with everyone.

This is a non-technical article and should be readable without any specialist knowledge! This is intended for everyone and to help improve real world security for people in their personal and professional life.

**Creating and remember passwords is a pain**

Experts tell us never to reuse the same password; to make it long and complex; to make it unguessable and unique. We push ourselves to think of something new, but that sensation of missing out on some new service pushes us to rush through this step and pick whatever password we can get away with. Now that your heart is racing you try old faithfuls like “Password1” or “myaddress123”, but neither are acceptable. The website returns a message in red text telling us we did something wrong. The sense of embarrassment pervades as we know that not only was our choice terrible for this website but for any website. It was our old faithful password that we use everywhere from banking to Facebook to Gmail. That red text tells you the requirements and in many cases it can feel like the requirements for creating a password are unreasonable. It lead to the creation of various memes that highlight the apparent absurdity: you need a capital letter, a lowercase letter, a number, a special character, a gang sign, and a hieroglyph. Also it must be 12 characters long. Who can even do that?

![Password Creation Meme](https://web.archive.org/web/20200922045830im_/http://cdn.someecards.com/someecards/usercards/MjAxMy1mYzEzN2U0NzhlZWZmNDU3.png)

Password Creation Meme

We can barely create, let alone remember such passwords. Worse still that we are encourage to have a unique password per site. At home I have more than 60 accounts that I have passwords. At work the number of passwords is at least half as many. Trying to remember just 10 or 20 unique passwords is tricky, even simple ones, is very tough. Inevitably this means that people reuse the same password across many sites. To combat this problem, it is common to hear that people use a hierarchy of passwords: sites that have a low value for us will have a password which is reused on many sites, while a high value site may have a unique password. It can also mean that passwords are created with common stems but have different endings: e.g. a password for Facebook might be “passfacebook123” while Gmail might be “passgmail456”. This is a mild improvement on reusing a weak password across sites, but far from ideal.

Password creation is a pain. Trying to remember them is a pain and not something we are well suited to. Worse still is that longer passwords take longer to type and are far more prone to typing errors than short passwords. A simple solution would be to write them down. That would save you the chore of remembering them and would at least allow you to have long unique passwords. This at least satisfies the requirements of length and complexity. Only those with physical access would ever be able to see them. How well can you manage the risk of someone never being able to see those sticky notes under the keyboard, or worse yet, attached to the monitor? At home, perhaps that’s an easy one to manage. At work, it definitely isn’t a good idea as there is no reasonable way to assume you’d have sufficiently privacy to keep a list of passwords private.

**Password Managers**

Fortunately, there is a way to have it all: unique, long, complex passwords that you never have to remember.

![SChneier's Password Safe](https://web.archive.org/web/20200922045830im_/https://pwsafe.org/images/treeview.png)

Schneier’s Password Safe – Simple and secure

Great! Let’s just create a spreadsheet full of long and complex passwords? If we randomly hit keys then surely all is right with the world. We can even put our usernames and email addresses next them. Won’t have to remember anything. No one else has access to my computer so it has to be fine right? If you could be absolutely sure of that then you might have a point. It is similar to have passwords written on sticky notes at home where only you and perhaps the most trusted people you know have access. The problem is, of course, the risks that you don’t think about. It might be that you invite someone over for dinner and they see the passwords written down on the stick notes. Perhaps a colleague looks over your shoulder while your password spreadsheet is open? You might not want to share your passwords. The unexpected can happen so let’s not take that risk.

Software exists, for free, that can create and properly store our passwords for  us. The passwords are kept secret via encryption. We must remember a master password to open the safe but once it is open we can access all of the passwords we’ve saved. Most of the software let’s you copy and paste passwords so you don’t even have to type them. They can also store usernames, email address, and web addresses to make life more convenient. Even when the safe is open the passwords are not visible on your screen so you don’t have to worry about ‘shoulder surfers’  (people looking over your shoulder). Something so simple that mitigates almost all of the problems with password management from a user’s perspective.

As I type this article I can confidently say that most of my passwords are unknown to me. They don’t have to. Most can be easily reset since they are linked to my email address so easy to recover. There are only a few passwords that I really need to remember. I need to remember the password to login to my computers and my safes. Beyond that I don’t need to. There are a few more that I’ve learnt from typing them over and over: they are now committed to muscle memory.

**Two Factor Authentication** (2FA)

Where possible you should turn on Two-Factor Authentication. This is supplementary to having a password manager and strong passwords. To an extent enabling 2FA mitigates the need for a long and complex password but as a point of good security it isn’t worth falling in this trap (it is lazy and weaker!). Many major sites / services support 2FA (e.g. Facebook and Gmail). Not all implementations of 2FA are strong as each other but having any form of 2FA is essentially better than none.

![2-FA from Google](https://web.archive.org/web/20200922045830im_/https://paul.reviews/content/images/2014/Sep/two-factor-authentication-02.png)

2-FA from Google

**Gotchas**

These are true of passwords in general, but I’ve found them to be particularly noticeable since switching to using a password manager.

**Symbol abuse**: Where I’ve been caught out is when a password contains a symbol that appears in different places on different keyboards. If you have an ‘@’ character in your password then be aware that it will be above the ‘2’ key on an American keyboard layout but to the right of the semi-colon and ‘L’ keys of a British keyboard. That has caught me out a couple of times where the computer operating system has a different layout than what I can physically see. There are some places when you can’t copy and paste passwords, but that doesn’t mean you shouldn’t store them. In those cases you will ned to view the password inside the management software.

**Truncation**: I recently updated my PayPal password and was potentially hit with 2 problems. The first being the above mismatch of symbols between what my password manager has stored and what PayPal thinks I pasted into the update password boxes. The second problem is truncation. I entered a 24 character password into the update password boxes but it cut it down to 20 characters. It seemed that when I updated my password it truncated to 20 characters but when I came to log in it tried to accept all 24 characters and hence threw an error. I didn’t fully check that this was the problem since I suspected there was a problem with symbols too (and I was in a rush!). Providing the login page also truncates the password in the same way (forever and always) then truncation is ‘fine’. However, you should really store the shorter password in your password manager since that is the correct one.

**Copy/Paste Failure**: One of the great benefits to a password manager is the ability to copy and paste a password. This saves time both terms of typing time and a reduction in failed attempts to login. However, there are a few times that copying and pasting doesn’t work. Here are a couple places they have failed or can’t be done:

-   **Logging into a Virtual Machine for the first time**. If you bring up the console of a virtual machine in (say) Virtual Box then you will find that you can’t copy and paste a password for the first log in.
-   **Digital Ocean Online Console.** Really frustrating this one. DO are a VPS provider. T hey allow you to spin up a virtual instance of Linux in their cloud for whatever reason you want. There is a couple of times that I’ve killed SSH access by accident (IPTABLES! ugh) and needed to go through their online console which is accessible from the DO website. For whatever reason I can’t seem to copy paste into that box.
-   **Apps on a different computer**: Ok, this is an obvious one but still a valid problem. The password manager I use is local to my machine. I don’t use a cloud-based password manger (I’m too scared). This means that I need to somehow share passwords securely between different computers. If I create and store a LinkedIn password at home but if I wanted to check it at work then I need to get the password from the safe on my home computer on to my work computer. I could try to remember. I could write it down. I could load up both computers side by side, but none of those are ideal if you have to move many at once. What I ended up doing was transferring the safes via USB. The safes are encrypted but I opted not to mail them and go for a local transfer.

**Password change**: I include this under a gotcha because simply having a password manager installed is only a fraction of the required effort. The real pain is updating all your passwords across all (or at least most) of your accounts. It is easy to forget which accounts you have and also which of you many default passwords from your hierarchy that used for that particular account. It took me a while to do this. At work I used a password manager from the beginning so that has been an easy process but transitioning from hierarchies to a manager in my personal life has been a gradual process.

**Backups**: You ought to back up your password safes too. If you have a hard drive failure then there is no hope of ever recovering those passwords. I’d suggest making a local backup rather than a cloud back up. Sure, that’s a pain from an availability perspective but from my own personal perspective it is preferable for managing my own security. While you may lose those passwords recall that you don’t necessarily lose those accounts. The password resetting process for many services requires that you have access to your emails. This does place a lot of risk into one basket but I think it is a reasonable risk since it allows you to recover an account in the event of losing a password (or even a whole safe of passwords).

**Conclusion**

Despite any associated problems and teething issues of adopting a password manager it is the only reasonable solution to creating and storing passwords.

Beware of the “Gotchas” but don’t let those put you off adopting one. You will eventually save time and typing frustration in the long run.

Allow me to re-iterate my suggestion: Password Safe ([https://pwsafe.org/](https://pwsafe.org/)). The product is free and was created by security expert and cryptographer Bruce Schneier.

Comments / feedback / improvements welcome.
