---
title: "It may look complex and unpredictable but is it really?"
date: 2016-11-14
tags: ["security", "blog-archive"]
category: "information security"
---

A key idea in security is that of unpredictability. If I can’t guess your password then it ought to be secure. This is almost true, except the problem isn’t about whether I (as a human) can guess your password but whether a computer can iterate through all possible passwords and find your particular password within a sufficiently short timeframe. There is a mistaken assumption that if your password is hard for a human to guess then it is a good password to use. I heard an anecdote that went something like “My password is ‘JohnSmith’. No one will guess that because my name is Bill Jones.” This line of thinking is based on whether someone you know is likely to guess your password.

  
Perhaps no human will be able to guess that, but it would still be a bad idea to use this as your Facebook password. An attacker can go to Facebook and try to login using different password guesses. If they are lucky then they might guess a simple password. Adding a number or symbol will make this password mildly harder to guess, but it won’t really make it secure. Humans are slow to guess passwords but computers are very good at password ‘guessing’. It is possible to tell a computer to try logging in to Facebook in an automated fashion. Computers can try every single password one-by-one in order to find the right one. This is known as a brute-force attack. Given enough time this attack will always be successful; however, if our passwords are sufficiently complex then it will take far too long for a computer make enough guesses to find the correct password being used (millions upon millions of years).

Picking a strong password requires a good length and a minimum amount of complexity to be deemed ‘secure enough’. At the time of writing, we recommend the following guidance:

-   Be a minimum of 9 characters in length.
-   Consist of a mix of upper and lower case characters, at least one number and at least one non-alphanumeric character.
-   Not contain the username or application name.
-   Not be based on a dictionary word.

Ultimately, using a password manager is the best way to handle this. Password management software can generate sufficiently complex passwords and store them for later. This is probably the most effective AND efficient method of creating and using passwords.

This leads to another commonly mistaken assumption which is that if something looks complex then it must also be hard to predict. Given a long string of apparently randomly chosen characters how does one determine if it is actually random? This can be quite tricky. It is possible to run statistical tests on the strings to see if they at least pass a “smell test”, but it would not guarantee that the strings were generated in a properly random manner.

Let’s have an example. The following list has 5 strings of apparently randomly chosen characters:

1.  c4ca4238a0b923820dcc509a6f75849b
2.  c81e728d9d4c2f636f067f89cc14862c
3.  eccbc87e4b5ce2fe28308fd9f2a7baf3
4.  a87ff679a2f3e71d9181a67b7542122c
5.  e4da3b7fbbce2345d7772b0674a318d5

Each string is long and even looks complex, so it is easy to assume that if we used those as passwords then no human or computer could ever guess them. This mistake is related to the misunderstanding that if something looks long and complex then it must have high entropy. In the vernacular the word entropy is used to mean ‘disorder’ which has an obvious link to something being complex. This is not the proper definition of entropy but for now we can work with it meaning ‘disorder’.

Running statistical tests on these strings should show that they are reasonably random, which is how they appear to the eye, but this is where the source of confusion comes in. These strings look random but ultimately they are not. Putting the first string into Google will show that the first string is actually equivalent to “1”. The second string is equivalent to “2”, and so on for all items in the list (1-5), which means that this list is not random but a well structured list. This type of output is known as “pseudo-random”: it looks random but it isn’t actually random. The process for creating the strings was to take each number 1 to 5 and put them into an md5 hash generator.

Hash functions do a great job of making their output look random. One of the key traits of a hash function is to make it hard to guess what the input is from a given output. From looking at the list of strings above it isn’t obvious by eye that they map to the numbers 1 – 5. Further more there is no formula that gives the right number either. Matching up inputs and outputs essentially requires creating a decent amount of computing power and (potentially) the creation of a large database, then searching through that database in order to find the right answer.

If the input to a hash function is simple and short then it is possible to find the answer with only a minimal amount of computing power. In this case the answer could be found from Google. If the input to a hash function is sufficiently long and complex then matching up the input and output is very difficult and could require millions of years to find the right mapping. Hash algorithms are actually how web applications try to keep their user passwords safe: if the password database is breached then hopefully the attackers can’t work out the inputs (the users’ passwords).

The illustrations used in this article were based upon passwords but the logic applies to any piece of data that appears to be random. It is worth questioning how that random data was created. The final point is that entropy (the amount of disorder) does not strictly increase by merely shuffling pieces of information around. This is a subtle point which is widely misunderstood. The amount of entropy in a piece of data is dependent on the process that generates the randomness. Simply shuffling those random numbers around never actually adds extra randomness to a system. The amount of randomness, or entropy, in a system is solely determined by the quality of the random sources which are taken as inputs into the system. Merely appearing to be random or complex does not guarantee that a quantity is either complex or random.
