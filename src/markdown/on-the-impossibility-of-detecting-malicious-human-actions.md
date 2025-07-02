---
date: "Thu Sep 03 2015 16:09:00 GMT+0100 (British Summer Time)"
title: "On the impossibility of detecting malicious human actions"
description: ""
category: "computing"
---
Creating a computer program which can determine if another program will halt is impossible in general (for all inputs and all variations of code). This can be extended to cover the impossibility of creating a perfect detector of malicious software. I go on to suggest that this implies that it is impossible, in general, to detect all malicious human behaviour.

**Imperfect malware detection and the halting problem**

While anti-malware scanners can get better and better over time they will never be perfect. It actually turns out to be impossible to create a perfect malware detector. If it was possible then you'd have something which could solve the halting problems: this has been shown to be impossible.

A summary of the proof:

Assume you have a perfect malware detector D.

*   When it detects scans an arbitrary piece of code and determines that it is malware then the function will halt (malware is detected).
*   If an arbitrary piece of code is not malware the scanner (detector) will continue.

A perfect malware detector must halt when it determines that an arbitrary piece of code is malware. If this was at all possible then this detector would solve the "halting problem". As this is impossible then no such detector can exist. This is not to say that detecting new malware is impossible before the event (ex-ante), but rather that it is impossible to determine this for all possible variations of code: there is always a way in which malware can be re-written to avoid detection.

**Detecting malicious human behaviour**

If malware is any code which performs an unwanted action then it is possible to see how this notion can be generalised to human behaviour. This is to say that it would be impossible to determine if any arbitrary human action can be pre-determined to be malicious. Malicious human behaviour is not limited to social engineering. It can include any type of physical or mental threat and abuse, or treachery of any kind. Nuisance behaviour could also be classified as unwanted human behaviour.

The proof on the impossibility of creating a perfect malware detector can be extended to prove that it is impossible to create a perfect detector for malicious human behaviour. We can perceive that an action may be malicious but we cannot detect that any arbitrary human action is malicious.

**Programmatic actions**

This informal proof via reasoning compared malicious human behaviour to that of malware. The impossibility of solving the halting problem was used to prove the impossibility of detecting arbitrary malware which I suggested can be extended to proof the impossibility of arbitrary malicious human actions. A more direct route would be to look at the halting problem. So far I've avoided discussing that actually is.

From Wikipedia:

"In [computability theory](/web/20160405122553/https://en.wikipedia.org/wiki/Computability_theory_\(computer_science\) "Computability theory (computer science)"), the **halting problem** is the problem of determining, from a description of an arbitrary [computer program](/web/20160405122553/https://en.wikipedia.org/wiki/Computer_program "Computer program") and an input, whether the program will finish running or continue to run forever. [Alan Turing](/web/20160405122553/https://en.wikipedia.org/wiki/Alan_Turing "Alan Turing") proved in 1936 that a general [algorithm](/web/20160405122553/https://en.wikipedia.org/wiki/Algorithm "Algorithm") to solve the halting problem for _all_ possible program-input pairs cannot exist."

It is clear to see the relation of this problem to that of detecting malware. The halting problem cannot be solved in general for all cases. Malware cannot be detected in general for all cases. Naturally, it seems obvious to suggest that malicious human behaviour in general cannot be detected. XKCD also did an amusing comic on the problem: [1266](/web/20160405122553/http://xkcd.com/1266/ "Halting Problem").

One aspect of my suggestion which people may have difficult in agreeing with is that humans are not computers. Human behaviour may be predictable but it is not deterministic. Although naively that would make detection harder, not easier. Moreover, computers can be programmed to deal with randomness in order to make decisions which is what this problem is about: decidability. The undecidability, or indeterminacy, of behaviour of humans is very fitting for this problem. The Wikipedia article also points out the following reason why I think this is appropriate:  
  
"many other undecidable problems have been described; the typical method of proving a problem to be undecidable is with the technique of _[reduction](/web/20160405122553/https://en.wikipedia.org/wiki/Reduction_\(complexity\) "Reduction (complexity)")_. To do this, it is sufficient to show that if a solution to the new problem were found, it could be used to decide an undecidable problem by transforming instances of the undecidable problem into instances of the new problem."

Where my suggestion might indeed fail is if the human brain is not equivalent to a Turin machine but something more powerful which has a process that could ultimately solve the halting problem (plus the malware detection problem). However, this appears to be an open question. Malicious human behaviour therefore shall elude a Turning machine indefinitely in general, but it is not yet known if malicious human behaviour can elude the human brain in general.

**Conclusion**

While the brain is not yet known to be better than a Turing machine my intuition suggests that humans will always suffer from the misdetection of malicious behaviour. This appears to be naively true form observation (anecdote) and is a reason why humans will always be susceptible to social engineering. Obviously, this problem is compounded as human actions are not reliable and repeatable in the same way that computers are. People make mistakes even if they follow procedures. A person who is well trained in avoiding social engineering is still susceptible, albeit the attacks are likely to be more sophisticated or from using new / unexpected techniques. If we were to speculate on human evolution over the next many thousands of year and whether the human brain could ever solve the halting problem then we'd have a fantastic science fiction story.