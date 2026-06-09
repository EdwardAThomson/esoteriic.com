---
title: "The hard part of building with AI isn't the code anymore. It's the deployment."
date: "2026-06-08"
tags: AI, deployment, Cloudflare, Supabase, DungeonGPT, serverless, DevOps
category: "artificial-intelligence"
description: "How I deploy AI-powered apps in production: the providers, the architecture, and why I do the first deployment by hand before automating, with DungeonGPT as a worked example."
---

I've written before about handling determinism and non-determinism when working with AI. What I haven't talked much about is the other half of shipping a product: actually getting it into production. I've shared a few of the apps I've built and dropped hints about how I built them — but almost nothing about how I deployed them. This is that post.

## The easy case is genuinely easy

If all you need is a static site or a simple web app, deployment is close to a solved problem. Host the code on GitHub and deploy it as a GitHub Page, or push it to one of the services that run simple apps for free: Cloudflare Pages, Vercel, and friends. Do it once and it becomes muscle memory. The free tiers are generous, the docs are good, and AI can walk you through any gap in minutes.

The trouble starts the moment your app needs a real backend.

## Where it gets hard

A static frontend has nowhere to keep state, no way to talk to an AI model without leaking keys, no place to store user data, and no way to send a sign-up email. The cheapest plans push you toward a particular shape of architecture — serverless functions, managed databases, third-party email — and stitching those pieces together is where the plumbing multiplies. AI assistance takes the edge off, but it doesn't make the complexity disappear. You still have to understand how the pieces fit, because when something breaks it's you, not the model, who has to fix it.

## A concrete example: DungeonGPT

[DungeonGPT](https://dungeongpt.xyz/) is an AI-narrated fantasy RPG. Here's the full production stack:

- **GitHub** — source code
- **Cloudflare Pages** — the JavaScript frontend
- **Cloudflare Worker** — a single Worker that handles AI requests *and* proxies the database API
- **Supabase** — the database
- **Resend** — transactional email (sign-ups and the like)

A couple of things are worth unpacking.

The Worker does double duty. It's one Worker (`dungeongpt-api`), but it mounts several route groups: one for text generation, one for embeddings, one for images, and one that proxies all database access. That last point matters: data never goes from the frontend straight to Supabase. Every database call is proxied through the Worker so it can enforce row-level ownership before anything touches the database. The AI runs on Cloudflare's Workers AI binding using curated open-weights models, which means no API keys to manage for text or embeddings. The latter is ripe for change in the near-future, but was correct at the time of writing.

### Why split it across so many providers?

The honest answer: cost. The goal was to keep my bill near $0 while I built the app, tested it, and tried to grow an audience (did I ever mention I'm not a fan of marketing?). Each provider has a free tier that's generous enough to carry a project from zero to its first real users. The trade-off is that you're now operating five services instead of one, each with its own dashboard, its own limits, and its own failure modes. I've already started bumping into a few edge-case limits — the kind you don't notice until traffic or data crosses an invisible line — which is its own argument for understanding each tier before you lean on it.

## How I actually deployed it: by hand, on purpose

Here's the part I think is worth sharing, because it runs against the grain of "let the AI automate everything."

For DungeonGPT, I did the whole deployment manually the first time. Yes, I used Wrangler to manage the Cloudflare Worker — that's just the tool. But I deliberately did *not* reach for the Cloudflare or Supabase MCP integrations, even though they would have let the model drive more of the process directly.

On a different app — a FastAPI / Caddy / Postgres backend deployed to a VPS from GitHub over SSH — I went one step further. I had AI generate a deployment playbook: the full sequence of steps to provision the server, set up the reverse proxy, harden it, and ship the code. Then I walked through that playbook by hand, reading each step before I ran it. I didn't hand it a script and look away; I treated the playbook as something to understand, not just execute.

What I found was reassuring. The hardening steps AI suggested — locking down SSH, firewall rules, least-privilege database access, the usual list — tracked closely with what I already knew from doing this the old way. It wasn't suggesting anything unnecessary; it was surfacing the same fundamentals, just faster.

## The point of doing it the slow way

Going through it manually was the calibration step. I now know what AI recommends for a deployment of this shape, and I've confirmed first-hand that its suggestions hold up. That changes the risk calculus for next time.

Going forward, I'll automate much more of this with scripts. I'm confident in what AI will suggest, precisely *because* I've already worked through a playbook it wrote and checked it line by line. Automation absolutely makes sense — but not before you've earned the trust to skip the reading.

Calibrate first. Then automate.
