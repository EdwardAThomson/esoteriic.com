---
title: "Password Managers – Local vs Global"
date: 2017-03-04
tags: ["security", "blog-archive"]
category: "information security"
---

I’ve written a few articles already about the need for better passwords and the necessity of using a password manager. In this article I will point out why I think a local password manager is better.

## Local

A local password manager is one that sits upon one device and does not back up to the cloud or anywhere remote location automatically. My own preference is to use something which is as simple as possible. This minimises the possible attack surface in case the password management software has a flaw. Let me recap what my password manager does / is:

-   Save my passwords in an encrypted file
-   The software is local to my computer
-   There is a automatic backup file which is saved locally
-   I can copy / paste the usernames and passwords

The password file is only saved to the computer on which I’m working. I have one manager on my work computer and one on my personal computer. There is no saving of passwords to the cloud, nor do the password managers have any sort of remote connectivity.

The software only saves passwords. That’s it. Nothing more. Let me outline why this is best.

There is a back up file which is also saved on my device in case the main file is corrupted. It is my responsibility to backup these files elsewhere in case my device should die. This may sound like a pain but I’m happy to trade convenience for extra security.

## Global

Now let’s look at the other option. You could opt for one of the many cloud based solutions which are proving to be rather popular and offer far more convenience. This software offers:

-   A central repository of your passwords.
-   Available from any device, anywhere in the world
-   Automatic management of backups
-   Copy/paste usernames and passwords

If all your passwords are in one place then you are less likely to save two different passwords for the same website in different safes. It is possible that I could save a password in a safe on my work computer but then save a different password for the same website on my personal computer. This can be a pain as you may not know which one is correct. However, resetting passwords is easy enough so not a major a problem.

Having your passwords available on any device anywhere in the world is very attractive. If you needed access to your bank website while at work but you only have that password saved on your personal computer then you would not be able to access your bank account at work. With a global password manager it wouldn’t be a problem. You could bring up the web page of the global password manager and simply retrieve your password.

Convenient but not an insurmountable problem. You could make a copy of your personal safe and put that on to your work computer (assuming you are allowed to do so). There is also the argument that you shouldn’t access personal websites at work, not because of the impact on focus of work activities, but because from an operational security point of view it is better to segregate activities. Think: precautionary principle.

## Trust

What really makes a global password manager unattractive is the necessity for trust and the size of the attack surface. You must trust the computer that provides the service. You need to be sure that they understand cryptography and the protocols in use.

If a flaw is found in their website or mobile app then an attacker may able to compromise several accounts at once (perhaps even all accounts). When you interact with a dynamic website that has millions of users you have to expect that the the system is much more complex than that of a local password manager. If a flaw is found in the software of a local password manager it will be far harder to compromise many accounts in a single attack.

An attack on a cloud based password manager has a huge non-linear payoff for the attacker. Confer this with the scaling of a baker who can only sell as many rolls as they bake, unlike a musician who can upload a single song and have millions of downloads. One is local, the other is global.

Whenever passwords as saved to their web servers it must be transmitted over the internet. Yes, this is sent over TLS (so it is encrypted) but that’s flaws can and are found in the TLS protocol. Moreover, the company will ‘see’ your unencrypted password when it hits their server. Can you be sure they haven’t made a copy of it elsewhere? That’s another risk you have to assume.

## Recent Events

The above highlights where a global password manager necessitates a far larger attack surface. The recent [CloudBleed](https://techcrunch.com/2017/03/01/cloudbleed-investigation-turns-up-a-million-leaks-but-no-signs-of-exploitation/) bug found, much like HeartBleed before it, are just one example of a potential flaw which could reveal sensitive information across the internet.

More worrying still are the revelations that several password managers were discovered to have flaws:

-   [Security slip-ups in 1Password and other password managers ‘extremely worrying’](https://www.theregister.co.uk/2017/02/28/flaws_in_password_management_apps/)
-   [9 Popular Password Manager Apps Found Leaking Your Secrets](https://thehackernews.com/2017/02/password-manager-apps.html)

Google this yourself and you will find even more articles.

The convenience is just not enough of a win to make it worthwhile in my book. Stick with a local password manager.

## Password Safe

Allow me to suggest Password Safe (https://pwsafe.org/). Forgive the lack of design on that website but the product is free and was created by security expert and cryptographer Bruce Schneier.
