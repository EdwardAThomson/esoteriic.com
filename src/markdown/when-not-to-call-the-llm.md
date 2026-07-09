---
title: "When Not to Call the LLM: Instant Narration for DungeonGPT"
date: "2026-07-09"
category: "artificial-intelligence"
description: "How DungeonGPT learned to narrate routine movement locally and reserve the LLM for the moments that actually deserve it, without making the world feel flat."
---

# When Not to Call the LLM: Instant Narration for DungeonGPT

[DungeonGPT](https://github.com/EdwardAThomson/DungeonGPT-JS) is an AI dungeon master in the browser: you build a party, drop into a procedurally generated overworld, and an LLM narrates your adventure as you go. It is an amazing feeling when it works, but it is a much less amazing feeling when you notice that crossing your third identical grassland tile just cost you an API call, half a second (minimum) of an "AI is thinking…" spinner, and a paragraph of prose nobody asked for.

That was the itch behind the past couple of weeks of work. The world underneath the game had been getting a lot richer (SVG biome tilesets, explorable cave and ruin sub-maps, towns with shops and equipment and side quests), and the more there was to move around in, the more obvious the narration problem became. Every step was being treated as a headline event. So I built what I have been calling **tiered narration**: narrate routine movement locally and instantly, and spend the LLM only on the beats that earn it.

This is the story of that design, including the part where the plan I wrote turned out to be more complicated than the thing I actually shipped.

## The problem: every move was a headline

Here is the shape of the old code. Moving on the world map went through `composeMovementNarrativePrompt` in `promptComposer.js`, which assembled a prompt and fired it at `/api/ai`. Every tile. Every time.

There are three things wrong with that, and they get worse as the game scales:

- **Cost.** Each move is a Workers-AI call. On a long trek across the map that adds up fast, and none of those grassland-to-grassland paragraphs are worth paying for.
- **Latency.** A spinner and a round-trip for a non-event makes exploration feel gluey.
- **Guests got nothing.** The AI narration path is gated behind sign-in. So logged-out players, the ones I most want to hook, moved around a beautifully rendered map in total silence.

The thing that nagged at me most was that low-value narration is not just wasteful, it's actively *bad*. When the LLM describes a boring tile as though it were an event, the writing has nowhere to go on the tile that *is* an event. If everything is a headline, nothing is.

I already had proof the opposite approach works. Combat in DungeonGPT is narrated entirely locally: templated, deterministic, zero LLM. Nobody complains that the fights read as canned, because the templates are decent enough and combat has its own built-in drama. If templated prose was good enough for a sword fight, it was surely good enough for "you walk across some grass." The plan was to generalise that combat-narration pattern to movement.

## First slice: a local narrator for guests

I deliberately picked the smallest, lowest-risk version of the idea to build first: give **guests** local movement prose instead of silence. No routing logic, no settings, just a new pure module and one hook into the guest movement path. If the templated prose was good, it would justify the bigger step. If it wasn't, I'd find out cheaply. In DungeonGPT, **guests** are the type of account that isn't logged in and so not registered with the game. They exist as a means for people to test the game without fully committing. Naturally, I don't want to offer them free AI usage and hence this solution.

The new module is `src/game/localNarrator.js`, and its single most important property is that it is **deterministic**. This matters more than it sounds. The narration gets appended to a scrolling adventure log that lives in your save. If I selected template fragments with `Math.random()`, reloading a save would silently rewrite your history: the log would say something different every time you came back. That's unacceptable. So every choice is seeded from the world seed plus the tile's coordinates:

```javascript
const hashSeed = (parts) => {
  const str = parts.map((p) => String(p)).join('|');
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
```

An `xfnv1a` hash of `(worldSeed, x, y)` feeds a `mulberry32` generator. Same tile, same world, same words, forever. Different tiles draw from different points in the sequence, so you get variety *between* tiles without variety *within* a single tile across reloads. No `Math.random()`, no `Date.now()`, anywhere in the module.

The prose itself is assembled from per-terrain template pools. Each terrain (plains, desert, snow, water, beach, woodland, swamp, mountain, hills, ruins, cave, town) has a pool of *arrival* lines (for the first time you see that biome), terser *revisit* lines, and *ambient* sensory details:

```javascript
plains: {
  arrival: [
    'The party crests a low rise into open grassland that rolls away in every direction.',
    'Wide fields of windblown grass stretch out before the party, broken only by the odd lonely tree.',
    // ...
  ],
  revisit: [
    'Familiar grassland spreads around the party again, the wind never quite still.',
    // ...
  ],
  ambient: [
    'A hawk wheels somewhere high overhead.',
    'Insects drone in the warm, swaying grass.',
    // ...
  ]
}
```

The pools are intentionally several lines deep, precisely so a session doesn't read "You enter the forest. You enter the forest." A tile's biome and any point-of-interest collapse to a single template key, so a `mountain` POI reads as mountains even though it sits on top of a `plains` biome underneath.

Then two touches to make the local prose feel like it knows where it is, rather than reciting stock scenery. The first mirrors what the AI path already did with surrounding-terrain context, but as prose: it peeks at the four neighbouring tiles and, if one is notable, adds a line like "Mountains rise to the east" or names a town you can see from here:

```javascript
if (tile.poi === 'town' && tile.townName) return `the rooftops of **${tile.townName}** rise to the ${name}`;
if (tile.poi === 'mountain') return `mountains rise to the ${name}`;
if (tile.poi === 'ruins') return `broken ruins lie to the ${name}`;
```

The second reads the party's HP bands, so a battered party's prose reflects it ("Fresh wounds slow the party's pace") instead of always reading as though everyone is fresh. Both selections are seeded too, so they're stable across reloads like everything else.

One small discipline that saved me a bug: the log renderer only supports `*italics*` and `**bold**`, never `_underscores_`. The existing guest intro composer already followed that convention, and the tests assert no stray markers leak into the output. Copying a working precedent's conventions is underrated.

The whole slice was a new module, a helper in `Game.js` that pushes the text straight into the conversation log, and a test file asserting determinism, biome-awareness, first-visit-versus-revisit, party state, and clean markdown. The signed-in AI path was untouched. Guests went from silence to on-tone prose, for free, with zero risk to the paying experience.

## The plan I didn't build

With the local narrator proven, the original plan was to add **Smart mode** for signed-in players: a routing scorer, `shouldUseAiNarration(tile, context)`, that would weigh signals (is this a new biome? a first-visited town? near an active quest milestone? has the party just been wounded?), score them, compare to a threshold, and decide *for you* whether this particular move deserved an LLM call. On top of that, a three-way setting: **Full AI / Smart / Local only**, replacing the old boolean toggle, with a migration for existing saves.

I wrote all of that down. It's a reasonable design. And then, sitting down to build it, I had the realisation that killed it:

**I didn't actually need to decide whether a move was worth an AI call. I could just let the player decide, by pulling for it.**

The whole scorer exists to guess when you want richer narration. But guessing is exactly the kind of thing that's hard to tune and easy to get wrong: too strict and the world goes mute, too loose and you've saved nothing. Meanwhile the player already knows when they want a deeper look at where they are. So instead of scoring the moment, give them a button.

## What actually shipped: Smart-by-pull

The model that shipped has no scorer, no three-way setting, and no per-move decision at all. It's the same behaviour for everyone, guest or signed-in:

**Movement is always a local templated line.** Every world-map move appends one deterministic `composeLocalMovementNarrative` line, the exact guest path from the first slice, now used for signed-in players too. Moving no longer calls `/api/ai` at all. This is true for both the immediate move and the deferred post-encounter narration.

**Full AI narration is on demand, via a "🔍 Look around" button.** When you want the LLM to describe where you actually are, you ask for it. For signed-in players, Look-around runs the full AI location-narration path: the same `composeMovementNarrativePrompt` to `generateMovementNarrative` pipeline, complete with RAG recall of past events. For guests (or if the master toggle is off), it produces a richer *local* ambient line and never touches the API:

```javascript
const handleLookAround = async () => {
  if (!hasAdventureStarted || interactionHook.isLoading) return;

  const { x, y } = mapHook.playerPosition;
  const tile = getTile(mapHook.worldMap, x, y);
  if (!tile) return;

  // No-AI path (guests, or master toggle off): local ambient line.
  if (!aiAvailable || !aiNarrativeEnabled) {
    appendLocalAmbientNarrative({ tile, coords: { x, y } });
    return;
  }
  // ...signed-in: full AI description of the current tile, with RAG recall
};
```

The Look-around composer reuses the same seeded terrain pools but frames them as the party *deliberately* taking stock, and stacks two sensory details for a fuller beat than a passing movement line. It also takes a click nonce, bumped on each press, so repeatedly looking at the same tile gives you *varied* descriptions rather than the identical line, a small concession to the fact that a pull is an explicit request, where a move is not.

The nicest part of collapsing to this model is what it does to encounter handling. Encounters, RAG sync, summarisation, autosave, milestone checks: all untouched. When a move triggers a narrative-tier encounter, I don't throw the context away; I *park* it (`pendingLookEncounter`) and weave it into the next Look-around's AI prompt. So the moment isn't lost, it's just deferred to when you ask about it, which is exactly when the richer narration is worth paying for.

Typed free-text actions are unchanged, too: those still go straight to the AI DM for signed-in players. If you *do* something, that's a real turn and deserves a real response. It's only passive movement that got demoted to local prose.

I also kept the old `aiNarrativeEnabled` boolean as a master on/off, rather than replacing it with the three-way mode. There is, deliberately, no narration setting yet. Smart-by-pull is simply the behaviour. A setting can come back later if players turn out to want always-on AI movement narration, but I'd rather add that in response to real demand than ship a settings screen on a hunch.

## Why the simpler design is the better one

It would be easy to frame this as "I over-engineered the plan and then cut it back," but I think something more useful happened. The scorer and the setting were both attempts to *automate a judgement*: to have the system infer, on your behalf, when a moment is worth spending on. The pull model realises the judgement doesn't need automating, because the person best placed to make it is sitting right there.

That's the whole trade. The scorer would have needed telemetry to tune, weights to balance, and an ongoing argument about defaults for existing users. Smart-by-pull needs a button. It cuts routine movement API calls essentially to zero (you only pay when you explicitly ask) while making the AI *feel* more impactful, because now it only shows up when you wanted it. The world isn't flat, because the local prose is genuinely varied and place-aware; it's just quiet until you lean in.

There's a broader lesson I keep relearning building with LLMs: the interesting question is rarely "how do we make the model do more," it's "where does the model actually earn its cost, and what can we do locally instead?" Combat taught me templates were enough for the routine. Movement confirmed it. And the moment I stopped trying to predict when you'd want the model and just let you summon it, most of the complexity evaporated.

The local narrator is the piece I expected to be throwaway scaffolding, the guest-only quality gate before the "real" feature. It turned out to be the feature. The plan was the scaffolding.
