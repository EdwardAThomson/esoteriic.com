---
date: "Thu Sep 10 2015 19:53:00 GMT+0100 (British Summer Time)"
title: "On-the-fly deterministic password generator"
description: ""
category: "computing"
---
Choosing a memorable but difficult to guess password is bane of our lives. The requirements for a good password get stricter as computers become more powerful; however, the tougher these requirements get stricter the ability to remember these passwords diminishes. Moreover, passwords should really be unique for every service that we use. Truly, passwords suck.

I will propose a solution which provides enough protection against password cracking, without having the usual difficulty of not remembering passwords. Ultimately what I propose will be deterministic password generator which does not save the output.

**Password requirements**

To begin with I shall re-state some general password requirements.

Requirements on passwords:

1.  Per-user diversification
2.  Per-service diversification
3.  Difficult to guess
4.  Memorable (or at least, manageable)

Comments on the requirements:

1) The password of all users is ideally unique to that user.

2) The password used with one service is not used with another service: e.g. use a different password for every website.

3) No one should be able to guess your password is a given, but more importantly it should be difficult for computers to guess your password via brute force. Random strings are arguably best here but have management and memorability problems.

4) Strong passwords are hard to remember which leads to users either choosing weak passwords, writing down or saving strong passwords.

**Typical Solutions**

There are two obvious solutions to the problem of passwords:

1.  generate non-memorable random passwords and save those somewhere for later use,
2.  use an authentication scheme which relies upon something else such as biometrics (e.g. fingerprints), smart cards etc.

Comments on solution 1:

The first requires maximum reliance in the technology being used. These passwords if generated correctly will provide the highest level of protection against password guessing (cracking). The downside is that they are not memorable and hence must be saved somewhere safe, and then copied / pasted for every use. That's a lot of hassle for most and perhaps too much of a learning curve. Another problem is where to save the passwords: they can't be saved in the clear (nor should the hashes). Online sites like LastPass are an option, as is Schneier's PassSafe (offline program), but that requires trust in each of those technologies. If either is breached then it is advisable that you will have to change ALL passwords.

Comments on solution 2:

Replacing passwords with other forms of authentication is a preferable solution in the long run, or even in combination with a passphrase to provide multi-factor authentication. These solutions eliminate remembering a password and also tend to be cryptographically strong. This solution isn't new but it incurs additional costs to set up and entails other problems (not within the scope of this article).

Solution 1 is a pain to manage and doesn't necessarily help in the event of a data breach. While solution 2 is complicated and requires the service provider (e.g. gmail) to implement it. I think there is a better way to generate and manage passwords.

**On-the-fly Deterministic Passwords**

My proposition is slightly experimental but based on good principles. I will outline how it works and point out potential weak points. I am suggesting a method to generate passwords which are deterministic: given a set of inputs produce the same password (output) every time. The passwords are generated when needed. They are never saved by the user which means the end-point security easier, and there is no reliance upon a password manager such as LastPass.

The trick is to take multiple strings which are memorable and then put those through a cryptographic hash function to produce a password which looks random. This will be difficult to remember and provide a high level of security. There is no requirement for a user to remember each password, not the save any password, since the passwords are generated on-the-fly when they are required.

Hash functions produce pseudo-random output where it is very difficult to guess the input. Otherwise known as one-way functions. Given any inputs which differ the output should also be different (the usual caveats apply for those who understand how hash functions works... and yes we are really using a key derivation function).

This scheme was designed with web services in mind but it could be used for far more services.

The inputs:

Username - if all usernames of a given website (service) as unique, then this provides per-user diversification. This is very easy to remember but is also a public value.

URL - the website's URL is unique to it. This means that the passwords will be different for every website. This is also very easy to remember and is also a pubic value.

Passphrase - the secret value that underpins everything.

Salt - these are added to passwords before they are hashed (and saved) in order to force per-user diversification. Arguably they could be skipped here since there is already per-user diversification, but since they are public values anyway they are more of a hurdle rather than a roadblock in a brute-force password guessing attack. Generating a good random salt which is unique per-user shouldn't be a waste of time. Salts can be unique per-generated password and saved on the host computer in the clear. If these are lost then it will essentially be impossible to re-generate the password.

**Threat Model**

Three of these values can be considered public or non-secret. They force diversification which is necessary, increase the possible input space which can help resist brute-forcing, and in the case of the salt it can provide an additional source of entropy if properly chosen.

The passphrase input is the real secret and would be typed into the generator each time a password is require. We don't want to save the passwords since they provide a valuable target for attackers.

You could take your regular password and put it into this generator. The output will look random and without knowledge of this generator it would be hard to brute-force. Long passwords which appear to be random strings are hard to crack. From the point of view of resisting threats it would be wise to assume that an attacker also has a copy of this generator (Kerkhoff's principles): therefore, the passphrase should also be difficult to guess.

This will sound like a chicken and egg scenario since I'm trying to avoid having to remember difficult phrases. However, this is only a single phrase. Remembering one single phrase is easier than many, as all passwords are derived from this one then it should be kept safe. If this passphrase is ever breached then all passwords are at risk (safest assumption), but if one of the derived passwords is found the others are safe.

Assuming you have no desire to remember a 64 character random string (not even once) then you could use the "book method" of generating a password. Pick a book and then take the first character from each word in a randomly chosen sentence. Throw in some numbers and capitals and should be pretty good. Obviously short sentences won't help so find a good one.

Pseudo-code:

*   Request user inputs (username, URL, passphrase)
*   Retrieve salt from a file
*   Hash: e.g. I did SHA512(username + URL + passphrase + salt) and then iterated it a million times.

Example input values:

username = "John"

URL = "gmail.com"

salt = "EGB0fui9NZRuD3Roz1Jl6w=="  (encoded base 64)

passphrase = "abcdef"

rounds = 1,000,000 (number of times the output is re-hashed)

output length = 88 characters (this should be the raw output of a base 64 encoded SHA512 hash)

**Output** = kf8FclGi97bI+um25hPjYZrla17ove51lmTz9l70dq0hjw2IEcd9YB+RPy/5pKGSEYek77cM14nbb8V5zVmrhA==

This is the **password**. No part of this looks guessable although it is obviously deterministic. It is also possible just to take fraction of the number of characters for the actual password.

Despite 1 million sounding like a high number of iterations it was quick to generate on my laptop (64bit, i5). Any attacker will also be forced to go through multiple iterations too which will be very slow for thousands or millions of users. While SHA512 is secure it is not the most appropriate for password protection. Really we a slow hash function such as bcrypt or scrypt here. I found a library for the latter but it ran slower than expected. Since this is more like a proof of concept then it doesn't matter so much.

Once you generate a password you would copy and paste it into the service being used. This is then sent encrypted (HTTPS) to the website. In theory an attacker would never see the password. The service provider also subsequently hashes all passwords before they are stored.

**Conclusion**

It is clear that this method does involve additional hassle but in the few cases where security is paramount then this may be a worthwhile option. Coding up a generator like this is not particularly difficult either so there is no need to rely upon what I've created. The computing power is not particularly burdensome for a single user on a single machine but I could see it being slow at enterprise level when dealing with potentially millions of users simultaneously. My proposition was aimed at the end user rather than for large organizations.

Generating a hundred such passwords for a user would not take long at all, although this is yet to be measured. As no passwords (or hashes) are saved by the user then this method is immune to brute-force attacks on the user's machine (in the absence of malware or a sophisticated attacker). If unique salts are used for every password then it would mean that if a password hash was ever stolen from a service provider then no other password should be at risk.