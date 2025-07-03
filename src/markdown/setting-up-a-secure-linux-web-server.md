---
title: "Setting up a secure Linux web server"
date: 2016-08-14
tags: ["security", "blog-archive"]
category: "information security"
---

**Goal**: by the end of this guide you should have a reasonably secure Linux web server.

Part of the reason I set up this was to improve my understanding of creating a secure website. I know how to assess a website for security problems but I didn’t have as much practical knowledge on the implementation side. As I worked through various online guides and books I decided that it made sense to document what I was doing and then share it here.

I could have just created a static website made purely from HTML and congratulate myself on having a secure server, but there are almost no real world scenarios where this is useful. Most people want a feature and content rich website which is also secure.

Many of the principles apply equally well to Microsoft IIS servers but from my own personal perspective going the Linux route is easier.

![Secure server](https://web.archive.org/web/20210621015853im_/http://www.gethackingsecurity.com/wp-content/uploads/2013/05/Data-Secure-on-Windows-File-Servers.jpg)

Securing a server

\[Currently a work in progress\]

**Prerequisities**

-   Some knowledge of Linux.
-   Some knowledge of web servers.
-   Some knowledge of security is helpful but not assumed.
-   A Linux box to host the server.
    -   If you are just playing around you could much of this on a locally stored Virtual Machine.
    -   To get the most out of this guide I’d recommend having a dedicate Linux box. There are many options for spinning one up in the cloud.

**Creation Guide**

-   Install the Linux flavour of choice
    -   I recommend buying a cloud-based VPS.
-   **SSH**
    -   This provides a way to manage the box across the Internet.
    -   We will work through steps to harden this service.
-   **IPTABLES**
    -   A simple firewall
-   **Apache**
    -   The web server software.
    -   We will work through steps to harden this service.
-   **HTTPS**
    -   A must for any website. No compromises. 😉
    -   I went with **Let’s Encrypt.** It’s free.
-   **PHP**
    -   Necessary if you want to go with WordPress and other popular CMSes.
-   **MySQL**
    -   Necessary if you want to go with WordPress and other popular CMSes.
-   **WordPress**
    -   Not necessary, but as I went that route I’ll add some comments about securing WordPress.
-   **OpenVPN** (optional functionality)
    -   This step is not necessary at all for a web server. It shouldn’t be on the same box as your web server either. I will walk through some steps to set up an VPN server with some steps for hardening. I chose to use OpenVPN to implement this.
-   **Intrusion Prevention System**
    -   More advanced than a simple firewall.
-   **Linux Hardening**
    -   General Hardening.
    -   Apart from making the Apache and the website more secure it is worth putting some time in to checking that the Linux box itself is secure. Arguably this should come first, but as a point of getting something up and running I’ll try not to get bogged down in the details of hardening a Linux installation. Through the tutorial I will, of course, look at SSH and securing the application level.
