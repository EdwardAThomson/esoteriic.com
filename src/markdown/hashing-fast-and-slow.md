---
title: "Hashing, fast and slow"
date: 2017-03-04
tags: ["security", "blog-archive"]
category: "information security"
---

Integrity is an important consideration for security assurance. In this article I will explore the importance of hash functions and an associated type of function known as a Key Derivation Function (KDF).

## Fast hash functions

In an digital setting we would like to know that if we are given a particular file that it is the one we expect. Part of that assurance will come down to whether we trust the source of the file; however, hash functions are a technical control that can help us to gain assurance that the file we just obtained is the file we want. This is important as there can be errors in the transmission of data and that an attacker could try to modify a file while it is in transit. There are more sophisticated scenarios which will be ignored for the purpose of this illustration.

If given two objects which appear to be exactly the same then we might say one is an exact copy of the other. We could inspect both objects (think about files, e.g. an image) bit-by-bit and verify that one is a perfect copy of the other.

This would be laboriously and inefficient if done for every file. Modern operating systems are now occupy gigabytes of space while modern hard drives provide terrabytes of space. This will have a serious impact on bandwidth use if a double of each file had to be sent (more sophisticated attacks are ignored). Fortunately, hash functions provide a way to solve this problem.

What we need is a way to determine if the file has been altered even by a single bit, but we need to do so in such a way that doesn’t require sending another full copy of the file. Moreover, we need to uniquely determine if the file we have received is the correct one. Parity checks and cyclic redundancy checks can show when there is a difference, even by a bit, but their weakness is that multiple files can result in the same output from these functions hence you can’t determine if you have the uniquely correct “answer”.

This is where hash functions come in. They provide an assurance that the file is modified and unique. Such a function will perform a calculation over the contents of any file and produce an output (the digest) which is a multiple-digit number. This number is unique and only a fraction the size of the original file (again, ignoring sophisticated attacks).

## Properties of hash functions

There are three key properties that a hash function must satisfy in order to provide the necessary assurance that we need. Define the input as “x” which goes into a hash function “h”, and produces an output “y”. The input x can be a file, while y is the digest; this can be written as h(x) = y.

The three properties are:

1.  Pre-image resistance: Can’t perform: x = h^-1 (y)
2.  Second pre-image resistance: h(x’) = h(x), if and only if x’ = x.
3.  Collision resistance: Can’t find: h(z) = a, h(w) = a.

Restated without maths these three properties are:

1.  Can’t reverse the output to calculate the input.
2.  Can’t find two inputs with the same output.
3.  Can’t find any output with differing inputs.

The second property involves trying to find two specific but different inputs which match up to the same hash output. This is often confused with collision resistance since the two properties are similar. In the [recent ‘collision’ found for the SHA1 hash function](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html) it was actual a violation of second pre-image resistance rather than a violation of the collision property. The latter is about ‘accidentally’ finding any two inputs that give the same output. The SHA1 ‘collision’ was two specific inputs matched to the same output.

The rules essentially guarantee that the output of the hash function, the hash of each input, must be unique and that it would be hard to find another input with the same output. So even if someone tries hard to find a file, or create a malicious a file, they have a very slim chance of getting the outputs to match. This says that if a hash function satisfies these rules then we have reasonably good assurance that the file we received is the real one.

When the size of the input is large (e.g. large files such as videos) then we need a hash function which can calculate the digest quickly. At the time of writing hash functions such as SHA256 and SHA512 would be well-suited to calculating such digests. These functions satisfy the rules above and they work quickly such that a hash can be calculated from large inputs.

## Slow hash functions

Interestingly, history has shown that hash functions are also suitable candidates for storing passwords. Using a reversible method for obscuring stored passwords (e.g. encryption) has proven to be less ideal under many circumstances. Obviously, password managers use encryption to store passwords but the associated nature of that is different. Hash functions are used for authentication: i.e. checking a password to grant access. If access is granted then a password manager will reveal the rest of its contents which is essentially a database of passwords.

Hash functions are irreversible meaning that you can’t find a function which will reverse the output and find the input (in this case: the password). To find out which inputs match to which outputs requires trying each input in turn in order to calculate the desired output. This iterative process is also known as brute-forcing. Given enough time it is guaranteed that a match will be found. The trick to keep passwords safe is to make sure that the time taken for a brute-force attack is infeasible.

Consider that passwords are relatively small when compared to the size of videos. Hashing a few characters, even if you somehow have a whopping 127 character password, is still tiny compared to the size of a video. This means that a function for hashing passwords should ideally be slow. The inputs are small so let’s slow down that process of brute-forcing the matching of hash digests.

There are a number of factors which help to push the brute-forcing time into ‘infeasible’ territory. As you would expect using a non-obvious input will make it hard to find the matching hash. This corresponds to enforcing a good password policy where every password has sufficient complexity that no password is likely to be found.

The use of salts will guarantee that all hash digests are unique. It is certainly possible that two users could have exactly the same password and hence the digest would be exactly the same. Salts are a random string which are taken as an input along with a user password in order to produce a unique output. While this does not slow down the calculation of a single hash calculation it does mean that the compromise of one password won’t lead to the compromise of another password. Salts also increase the amount of memory needed but such attacks are not the direction of this article.

## Key Derivation Functions

Finally, there is the obvious replacement of a fast hash function with a slow hash function. The latter are known as Key Derivation Functions and are used specifically for storing passwords. Examples of the functions are bcrypt, scrypt, and now [Argon2](https://en.wikipedia.org/wiki/Argon2).

Just how slow is slow? Well, it is worth considering that whenever a user tries to gain access to a system they don’t want to wait a long time to be authenticated. The process of authentication has to be quick enough for a single access attempt but slow enough in an aggregate sense that trying to find the digest of multiple of passwords becomes infeasible.

There is still some room for debate of using a KDF such as bcrypt or using a fast hash function with a high count of rounds. Check out this reply on Stack Exchange by Thomas Pornin:

[Why bcrypt is somewhat better than PBKDF2](https://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage)
