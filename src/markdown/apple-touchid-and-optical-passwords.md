---
date: "Mon Sep 23 2013 21:50:00 GMT+0100 (British Summer Time)"
title: "Apple TouchID and optical passwords"
description: ""
category: "science-technology-nature"
---
With the recent unveiling of the iPhone 5c/s there is much hullabaloo about the security of the fingerprint scanner and the ethics of biometrics. All greats topics for debate, but after the dust settled (and quickly too) it turns out that the security provided by a fingerprint scanner is not that great. This isn't news to anyone familiar with (say) the guide published by the Chaos Computer Club in Germany. They are the first to demonstrate that the fingerprint scanner on the new iPhone is not that impervious. It is worth noting that the phone can still be secured with a password, and I believe that it can be "doubly" secured by using both a password and a fingerprint. The trade off is naturally security versus convenience: a commonly occurring quote in the media is of Marissa Mayer (Yahoo! CEO) stating that she doesn't use a passcode on her iPhone.

I suspect we me hear of further hacking attempts and most likely hear of simpler or cheaper ways (not like the current hack is that difficult). That said, I do see a lot of merit in optical password verification. It is definitely simple to use and highly convenient, but ideally you don't want to have a copy of your password "printed" on everything you touch. Two things came to me over the last couple of days: (1) a written or printed password that can be scanned, (2) a more physical type of password-key with ridges/ indentations that can be scanned. Both of these are very similar, and in fact are perhaps the same thing when considered from the point of view of security.

There is enough code in the open source domain to do this already....

First idea:

The first idea simply involves having a piece of paper with a QR code on it. This QR code is your password. Obviously you could have all your passwords on the same piece of paper, or you could have multiple QR codes that represent a single password. For example, you could have 4 QR codes on a piece of paper that once scanned and combined in the correct order will reproduce your password. However, this extra flourish does't really provide any extra security to a skilled hacker: it only provides mild additional security against the untrained. Someone with a little bit of savvy can find the paper and then use a computer to try all possible combinations (4 nPr 4).

The QR codes merely obfuscate the password rather than actually encrypt it. The suggestion here is the codes are scanned in raw form to give a password. This provides convenience and strong protection against password crackers who don't have your QR codes. Protect the code(s) and you can protect your secrets can be strongly protected. A QR code could easily represent a 50 character password: which would be very difficult for a human to remember, but it would be very easy to scan such a code.

Second idea:

A simple variation of the first idea would be to create a latex thumb with a random pattern printed on it, perhaps this is something that can be 3D printed. The material needs to be capacitive like human skin (allow electricity to conduct). I actually wonder if it could be done with a capacitive acetate (or similar). The object could be like a thimble  (fitting over the thumb) or perhaps a glove, although in actuality it can be any shape and would be much like a key fob except that it is optically authenticated instead of electronically.

Simple algorithm:

1) Think up a \_memorable\_ password (For illustrative purposes the length doesn't matter).

2) Generate a QR code of the password.

3) Print (then scan it when needed).

More complicated:

1) Think up a \_memorable\_ "Password" (let's assume it is fairly short -> 16 characters or less). This  is your master key.

2) Create a hash of the password to make it longer (using, say, SHA-256)

3) Go to step (2) in the simple version (print create QR code of the hash).

The master key is used to recover QR codes. It is not the password that you will use on your device and it should be easy to remember.

Even more complicated:

1) Generate a "long" random number that you have no intention of remembering.

2) Either save this number (key) in an encrypted file, or print it on regular paper and keep well hidden.

2b) Depending on length you may want to create a hash of the password for extra length.

3) Go to step (2) in the simple version (print / create QR code of the hash).

  

Recovery (in case QR code is lost / stolen):

\[Algo 1\] Recall password. Use generator to create another QR code. Unlock phone (/ device) then reset it with a new password/ QR code.

\[Algo 2\] Recall password, create hash again, print hash as QR code. Unlock phone (/ device) then reset it with a new password/ QR code.

\[Algo 3\] Recover password from encrypted vault or from the print out. This process is the most secure but also carries the greater risk of forgetting where the master is stored (or you forget the code to the password safe). Hence process \[2\] is perhaps the best compromise of all aspects.

None of this is actually new, in fact here is a working example of the algorithms:

bitaddress.org

This site creates Bitcoin address but the principle is the same. The site asks you to move the mouse and create some randomness, it uses that with SHA-256 to generate a QR code. This code is what I'm suggesting could be your optical password. Obviously it needs to be kept safe (either print it on paper or securely on the computer).

Some concluding thoughts:

It can be copied if stolen, but otherwise it isn't printed everywhere like a real thumb print. Easy to recover if lost (not assuming stolen here). Optical passwords are convenient to use with "high" information density, assuming that it isn't stolen/copied then an attacker will have great difficulty accessing the phone (cracking SHA256 isn't easy).