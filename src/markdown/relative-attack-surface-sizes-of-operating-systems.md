---
date: "Thu Aug 06 2015 15:54:00 GMT+0100 (British Summer Time)"
title: "Relative attack surface sizes of operating systems"
description: ""
category: "computing"
---
The recent [Thunderstrike 2](/web/20160405122202/http://www.wired.com/2015/08/researchers-create-first-firmware-worm-attacks-macs/ "Thunderstrike 2") attack on Macs and the debate surrounding which operating systems are the most secure. The problem here that neophytes have missed is that the attacks demonstrated attack the computer a level lower than the operating system. It is at the firmware (device) level and so it is to an extent independent of OS.

Part of the "buzz" surrounding these attacks (plural, not just the Mac based one) is that Macs have been attacked which is rarer than for Windows, and that users appear to be more complacent because malware is less prevalent.

Which leads to many touting Macs as being more secure than Windows, and in this case it does seem that Windows computers are probably affected worse. The articles are focusing upon Mac because of the rarity despite the lessened severity.

**The problem**

This leads me to the main point of contention in such debates: the macro-level attack surface of operating systems is not necessarily the same as the local-level attack surface. The local level being a single computer with OS of choice, while the macro level being all such computers that use the same OS.

I appreciate that may not be clear enough, so let me re-state: the fact that there are more attacks on Windows does not logically lead to the conclusion that Windows is less secure than <your-OS-of-choice>.

The greater number of attacks on Windows is due to its popularity globally and that it is used by organizations that operate / protect high-value assets. It is an obvious choice of target, and it certainly does not help that Windows paid little heed to security in the past. They focused on ease-of-use / availability in order to sell as many products as possible. However, it would be unfair to say that they have no mind for security now. From NT4 onwards they have pushed their own developers to use a Secure Development Lifecycle (MS SDL).

This does not guarantee that modern versions of Windows are secure, but they are certainly more reliable than previous versions. Moreover, the pains of Windows gone by does not logically lead to the conclusion that modern Windows is inherently less secure than Mac.

It \*might\* be true that Mac and Linux are more secure than Windows both at the local level and the macro level, but that is not easy to assess. Linux developers are not necessarily security focused, most software developers are not. I'd bet that Mac developers \*are\* security minded but that doesn't mean that the OS is miraculously impervious. When there is millions of lines of code it can be forgiven when mistakes are made or that sophisticated attacks are found which exploit a non-obvious flaw.

**Local security : Evaluation Assurance Levels**

Both modern Macs and Windows have been evaluated at level 4+ EAL ([Evaluation Assurance Level](/web/20160405122202/https://en.wikipedia.org/wiki/Evaluation_Assurance_Level "Evaluation Assurance Level")) for particular configurations. Naively, this gives neither the edge over the other. Despite the difficulty in assessing the security of modern OSes at the local level the consensus (among Mac and Linux users!) is still that Windows is more insecure. I say difficult because most people are not expert security assessors and probably don't know about the EALs (although I'm sure they can spell it ;-) ).

The confusion is that as Windows is attacked more, therefore it must be more insecure. Whereas the reality is that Windows is the more popular platform which means that the gains from exploiting it are potentially larger than exploiting Mac. Even if Windows was more secure than Mac, it would still be a better target of attack due to the payoff rather than the "pain" sustained while trying to figure out the exploit.

**Conclusion**

The conclusion is that we cannot easily judge the relative attack surfaces of various operating system at the local level when most data is about the relative attack surfaces at the macro level.