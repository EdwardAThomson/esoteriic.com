---
title: "On Infinite Multi-User Dungeons"
date: "2020-03-29"
tags: blockchain,polkadot,web3,medium-archive
category: "blockchain and cryptocurrency"
description: "I present an algorithm for generating an infinite dynamic dungeon for a blockchain-connected multi-user Roguelike game."
original_url: "https://edward-thomson.medium.com/on-infinite-multi-user-dungeons-4ef13d275a35"
---

# On Infinite Multi-User Dungeons

**tl,dr**: I present an algorithm for generating an infinite dynamic dungeon for a blockchain-connected multi-user Roguelike game.

I’m wouldn’t be surprised if someone else has done this before, but from a quick look I didn’t see anything obvious. In this piece I’ll highlight what I’ve done so far and then outline what I’ve been thinking about. I cover both game design and algorithm design.

# SubRogue: Previous work

[In a previou blog](https://medium.com/@edward.thomson/subrogue-8c0a537f02d4) I discussed my plans for building a Roguelike blockchain game that I dubbed SubRogue. Initially, suggested as a single player game with procedurally generated dungeons but the hope has always been to make it multiplayer.

I have a working PoC now that takes block hashes from the Kusama network to populate the dungeon, but the hash are pulled passively rather than actively (this has known problems, [see here](https://medium.com/@edward.thomson/subrogue-a-simple-game-with-tough-problems-87748fe2839c)).

*Tweet: first public images of SubRogue*

# Current Algorithm

The current generation algorithm is iterative starting from the first room, which prevents easily starting anywhere and forces a lot of computation.

I haven’t written a blog yet about what I’ve coded so far because I hit a tricky problem that I didn’t know how to solve in Python. I want players to send a transaction that commits them to a given hash. I understand that there should be a way, by wrapping the current Substrate JS code in Python.

Here is an outline of the current generation algorithm

1.  Place the first room at a random **x** and **y** within the bounds of the map. The randomness comes from a block\_hash.
2.  Assign the room a random height and width.
3.  Select another random x and y which are for the second room. Assign a random height and width.
4.  Check that the new room doesn’t overlap with a previously generated room. Otherwise re-do step three.
5.  Stop once the algorithm hits the maximum number of allows rooms.

![](/images/1*WU9Lm7neh-P0cnmJyHN2AA.png)

*This the current algorithm with a max of 10 rooms and grid of 160 x 100.*

## Current algorithm doesn’t scale

In **step 1** I note that the map is bounded. This is because of the algorithm needs range within which a random number is generated. That was the first thing I struggled with. This algorithm also populates the dungeon in an iterative manner. That won’t scale well for areas far from the starting point.

# What do I want to do?

I want to create a game where the dungeon can be generated dynamically and so new content can always be found even for new players. The feeling of exploration in an entirely new MMO is one of excitement, but that feeling is lost once the game has been around for a while. I’m not sure if an psuedo-infinite dungeon will solve that problem, but it has been an interesting problem to think about and having a scalable algorithm is useful.

Here is a rough outline of the desired design:

-   **Unbounded size** — there is always more content to find in a psuedo-infinite dungeon. Naturally, the dungeon by what’s computationally feasible so not infinite in practice.
-   **Dynamic and unseen rooms** — dynamic content provides both feeling of exploration but it also provides an anti-bot mechanism. It should be risky to enter a new area.
-   **Players can start anywhere** — after some time players will have discovered all content near the starting area (I’m assuming some persistence should exist). This reduces the feeling of discovery for new players. Dynamic content is part of the solution, but if such content is only on the extremities then it will be slow to get to which will decrease fun.
-   **Irregular grid** — perhaps the hardest part is the desire not to force the dungeon just to be a regular grid of square rooms.

Finding a solution is reasonably easy if you ignore at least one of the other design requirements. Creating an “infinite” and dynamic dungeon is easy if all players start from the exact same room.

**For example**: generating the dungeon from the genesis hash forces all players to calculate their copy of the dungeon from first room. This doesn’t scale well and won’t provide some properties which are necessary to make the game fun.

Finding an algorithm for a scalable dungeon that allows all design ideas is tough.

# A solution

I was stuck figuring out how to scale up the current generation algorithm that I couldn’t find a good solution. Fortunately some discussion helped. Daniel Kraft (from Xaya) made a suggestion that broke my creative block. His solution is different from what I propose here, but I outline his idea at the end.

## A regular grid

First, we have to accept some regularity and adopt a grid structure at a particular scale. The map will be divided into regular sized regions (e.g. 100 x 100), but each region can have dynamic room generation such that the layout will not be known ahead of time.

![](/images/1*fw8vTvx0qSb04lTxRHtROw.png)

*An illustration of a regular grid. Each square is a region of dungeon.*

## Dynamic regions

Dynamically generation of each region can be done by following the current algorithm (see previous section). The boundaries are known and finite (e.g. 100 x 100).

## Get Edward A Thomson’s stories in your inbox

Once explored, a region is recorded on-chain as “*discovered*” and is associated with a given block hash. This provides a notion of persistence. New NPCs can always be populated in old regions to provide new risks for new players, but the layout will be known ahead of time.

Each region (square) would look similar to what the current algorithm generates, as shown in previous section.

![](/images/1*sd_EaTtu5lmE0uGz8_CXMg.png)

*Dynamic regions within a regular grid*

## Simply connected

Regularity at the region level is acceptable trade-off. The tunnels that cross the boundaries of each region will be positioned deterministically based on the genesis hash. Although that hash needs to be mixed for each specific line, e.g. something like:

Each region must connect to its four neighbours, this means no region is cut-off from the global dungeon and that players can’t become stuck.

Topologically, the map is ‘simply connected’ at the region scale.

![](/images/1*9FRKCfKYQQh54o8uKR9TnA.png)

*Each region is connected to all other regions*

## Start anywhere

Having determinism at the region level allows players to start in any region. There is no fear of them becoming stuck as all regions are connected. Players have complete safety that they are joining the global dungeon: i.e. they can find their friends and group up.

In addition, determinism at the region level means there is no requirement to iteratively compute all rooms starting from the first room. Removing this level of determinism while also avoiding iterative computation (without isolated regions) was the biggest problem to figure out.

Using a regular grid allows for the calculation of connecting tunnels when needed. It isn’t necessary to store positions ahead of time. Now the game state grows as players discover new regions of the dungeon.

![](/images/1*a5tpTzpcf1zZdFxiZke1dQ.png)

*Each of the light coloured spots represents a unique starting spot*

## Feeling of exploration

New players can start out in an entirely new and unexplored region. A new block hash can be pulled to generate that region. Also, not allowing the computation of the whole dungeon ahead of time prevents bots gaining an easy edge over human players.

# Alternative Solution

One promising variation that removes grid regularity has players create their own region of the dungeon. It isn’t initially connected to the global dungeon but rather there is a random chance of joining one player’s dungeon to another. Potentially simplify that to just having a random chance of a player’s dungeon joining the global dungeon.

When the new area is added the player’s local coordinates are transformed to global coordinates. Removing the regularity provided by the grid is great and this method ensures that all players are eventually connected to the global dungeon.

My fear is that this algorithm is messier as it has many coordinate transforms. Entirely new regions can still be added by allowing players to iterate outwards away from the regions already discovered.

# Wrap Up

Implicit in all this is that any user can fairly check the actions of any other user (via distributed and replicated state machines). Out-of-protocol cheating is prevented: i.e. everyone agrees upon the game state and game rules, at all times, in a decentralised manner.

Procedural generation in this manner is not limited to dungeon crawling games, but can be used across a multitude of genres.

If I ever launch this game I probably won’t have an unbounded dungeon, but creating a scalable algorithm is important. Perhaps an “unbounded dungeon” can be a mode of play for those who want it. The natural alternative is periodic boundary conditions (dungeon wraps around on itself), but those are easy to add!

# Acknowledgements

I’d like to give thanks to the following people from feedback on my previous blog or for engaging in discussion about random number generation.

Andy and Daniel (from [Xaya](http://xaya.io/)), and [Ronan](https://twitter.com/wighawag) who is building [Ethernal World](http://ethernal.world/) which is also going to be a Roguelike with an “infinite” dungeon. Check it out. It is currently in (pre-)alpha at the moment.