---
title: "Private VRF Loot Revisited: Hardening the Idea Nobody Else Built"
date: "2026-07-28"
category: "blockchain-and-cryptocurrency"
description: "Two years after proposing player-held VRFs for private game loot, I audited my own proof of concept, found it was novel but leaky, and rebuilt it on RFC 9381 with a proper sealed-reveal lifecycle."
---

# Private VRF Loot Revisited: Hardening the Idea Nobody Else Built

Back in September 2024 I wrote about [building private loot systems with VRFs](/building-private-loot-systems-with-fair-and-verifiable-randomness-using-vrfs): the idea that a player could generate loot on their own machine using a Verifiable Random Function keyed with their own secret key, keep the results private, and still prove to anyone, later, that the loot was generated fairly. The blockchain anchors the randomness; the player holds the secrets. I built a small proof of concept and moved on to other projects.

Recently I came back to it, because I want to use this mechanism in a real game. Before building on the foundation, I decided to audit it properly. Two things came out of that. The first was a surprise about the idea itself. The second was a list of cracks in the implementation that needed fixing before anything could stand on it.

## Apparently nobody else does this

While auditing the code, I also went looking for prior art. Who else generates loot with a VRF where the *player* holds the key?

As far as I can tell: nobody. Chainlink VRF is everywhere in blockchain gaming (Axie Infinity, loot boxes, NFT trait generation), but that is an oracle-held key with a public output. Everyone can see what you rolled. Nine Chronicles derives outcomes from blockhashes, which is fair and cheap, but again fully public. The zero-knowledge games like Dark Forest hide player-chosen state behind commitments and SNARKs, which is a different (and much heavier) trick: zk by itself does not stop you re-rolling randomness you control.

The pattern I proposed, private-until-reveal loot from a player-held VRF key, does not seem to ship in any game. The closest relative is not a game at all: it is Algorand's cryptographic sortition, where every participant privately evaluates a VRF over the round seed with their own key and only reveals the proof when they claim their role. My loot scheme is essentially sortition applied to a loot table. That is a comforting pedigree, and also a slightly vertiginous discovery: the only public description of the pattern for games was my own blog post.

It is worth pausing on why the VRF is the right primitive and not something simpler. A deterministic ECDSA signature looks like it would do the same job, but ECDSA signatures are not unique: many valid signatures exist for one message, and a verifier cannot tell whether you derived your nonce honestly. A player could grind signatures until the "random" output paid out a Legendary. BLS signatures are unique, which is exactly why drand and DFINITY use them as beacon VRFs, but at that point you have just built a VRF with extra steps. Plain commit-reveal fails too: if the player picks the secret, the player grinds the secret. The VRF's combination of privacy, uniqueness and public verifiability is precisely the property set this problem needs.

## The audit: right idea, loose bolts

The concept survived scrutiny. The implementation did not, in three instructive ways.

**The verifier never bound the proof to the output.** The item verification function checked that a VRF proof was valid for the message, and separately checked that the claimed output bytes mapped to the claimed item properties. It never checked that the proof and the output had anything to do with each other. A forged item carrying someone's real proof next to unrelated output bytes would verify. This is the classic cryptographic failure mode: every component is correct, and the glue between them is missing.

**The per-item messages were ambiguous.** Items were derived from the string `` `${blockhash}-${index}` ``. Blockhash `"abc-1"` with index 2 and blockhash `"abc"` with index... you can see where this goes. Two different (hash, index) pairs could collide on the same VRF input. The fix is the boring, correct one: `blockhash_bytes || uint32_be(index)`, fixed width, no delimiters.

**The crypto tests had never run.** The test suite contained perfectly sensible rejection tests: tampered proofs, wrong public keys. None of them had ever executed. A stray un-polyfilled `setupTests.js` was shadowing the real `setupTests.ts`, so the crypto libraries crashed during setup in the test environment, and a typo in the Jest config (`moduleNameMapping` for `moduleNameMapper`) meant the standalone runner ran zero tests. Tests that fail at setup provide the feeling of coverage without any of the substance.

## Rebuilding on RFC 9381

The original VRF was a port of the construction in Google's Key Transparency repository: sound math, but a pre-standard design with an ad hoc wire format. Since then the IETF has published [RFC 9381](https://www.rfc-editor.org/rfc/rfc9381), which standardises ECVRF. I replaced the whole thing with ECVRF-EDWARDS25519-SHA512-TAI, implemented over noble-curves, since I could not find a maintained JavaScript library implementing the final RFC (plenty implement older drafts, which differ in ways that matter).

The non-negotiable part was validating against the RFC's official test vectors: all three Appendix B.3 examples, byte-exact, proof and output, plus rejection of every vector with single bits flipped. Keys are now 32 bytes, proofs are 80 bytes (`Gamma || c || s`), and the output is a uniform 64-byte value derived from the proof. That last clause carries a subtlety that shaped the next piece of work: because the output is derived from the proof, *revealing the proof reveals the output*. You cannot publish one and withhold the other.

## Sealed loot: the missing half of the idea

The 2024 post described loot that stays private until revealed. The 2024 code did no such thing: it generated items and displayed them immediately, proofs attached. The privacy story was an architecture diagram, not a feature.

The rebuilt version makes it real. Generating sealed loot produces a public *manifest*: one commitment per item, where each commitment is a hash over a domain-separated, versioned structure binding the blockhash, the item index, the player's public key, and a hash of the VRF output. The manifest is safe to publish at generation time. It leaks no outputs, no proofs, and no item properties. The outputs and proofs sit in private records on the player's machine. Revealing an item means handing over one `(output, proof, index)` package; the verifier recomputes the commitment, checks it against the manifest, verifies the proof against the reconstructed message, and re-derives the item properties from the output.

One design decision is worth recording. An earlier sketch had a single VRF call per dungeon with per-item values derived via HKDF from the master output. It is cheaper, but revealing *any* item then requires revealing the master output, which unseals the entire dungeon. Per-item VRF calls cost more compute and keep reveals selective, which is the entire point when the reveal is "I want to trade you this one sword."

To close the loop, the demo now includes the other half of the original architecture: a dungeon generator. The layout seed is `SHA-256(tx_hash)`, expanded through a seeded PRNG into rooms, corridors and item spots, and the item count is derived from the seed's final byte. Layout public, loot private, both hanging off the same transaction hash. The same input that lets anyone reconstruct the map lets only the key holder know what is in the chests.

## Reflections

The satisfying part of this project was not the new cryptography, which is mostly careful bookkeeping around a well-specified standard. It was watching a two-year-old idea survive an honest attempt to kill it. The primitive was right; the pitfalls turned out to live at the edges (binding checks, message encoding, key registration ordering, the economics of who pays to roll the dice) rather than in the core.

The unsatisfying part is the flip side of the novelty finding. If nobody else builds player-held-VRF loot, there is nobody else's mistakes to learn from. The next step is wiring this into my on-chain roguelike, where the interesting new problem is choosing a seed the player cannot grind before broadcasting their own transaction. That one deserves a post of its own.

The code, tests and a headless verification harness are in the [same repo as before](https://github.com/EdwardAThomson/vrf-loot-generator).

# Acknowledgements

- Claude did the heavy lifting on the audit and implementation work described here; the design decisions and mistakes are mine.
