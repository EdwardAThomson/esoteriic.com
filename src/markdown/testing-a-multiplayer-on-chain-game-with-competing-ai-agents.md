---
title: "Testing a multiplayer on-chain game with competing AI agents"
date: "2026-07-22"
category: "artificial-intelligence"
description: "How I turned adversarial self-play into an integration test: N AI agents competing in one on-chain world, with a referee asserting the rules held."
---

# Testing a multiplayer on-chain game with competing AI agents

I have been building a roguelike whose entire world lives on-chain. The dungeons, the segments of the overworld, who owns what, every player's hit points: all of it is game state, maintained by a GSP (a game state processor) that folds moves in from the chain and lets clients read the result back out. That model is appealing for the usual on-chain reasons (no central server can quietly rewrite your character, the rules are the rules), but it makes one thing genuinely hard: testing the multiplayer.

Single-player bugs are easy to find. You play, something looks wrong, you fix it. The bugs I was actually afraid of were the ones that only appear when two players reach for the same thing at the same time. Two people walking into the same empty patch of the map on the same block. One player trying to wander into a dungeon another player just discovered but has not yet earned. Two concurrent dungeon runs whose rewards leak into each other. These are contention, access-control and isolation bugs, and the honest truth is you cannot reliably surface them by playing the game yourself. You are one pair of hands. You cannot click in two browsers on the same block.

So over a couple of days I built a harness that plays the game for me. Not one bot, but a small crowd of them, competing in one shared world, with a referee watching. This is the story of that harness and why adversarial self-play turned out to be the right shape for testing a real-time on-chain game.

## Starting with one honest player

The frontend already had a debug hook. When you open it in a browser with `?e2e=1` in the URL, the page exposes a `window.__rog` object: read-only state plus the same orchestration functions the UI itself calls. Crucially the hook is absent without that query flag, so it never ships in normal play or on the hosted demo. That hook was my way in.

The first thing I built on top of it was a single heuristic agent driven by Playwright. It drives the *real* frontend, in a real browser, exactly as a human would: it connects, registers a character, then loops. Each tick it reads state, and decides what to do next based on a small policy. Explore into unexplored territory when it can, fight adjacent monsters, pick up loot, equip anything better than what it is wearing, spend stat points, and when there is nothing new to discover, wander back through segments it already owns.

The navigation is the part I am fond of. Inside a dungeon the agent does a breadth-first search over the wall grid to find the first step toward its target, whether that target is an adjacent monster or the gate it is aiming for:

```js
/** BFS first step from (fx,fy) toward (tx,ty) over non-wall tiles. */
export function bfsStep(walls, fx, fy, tx, ty) {
  const H = walls.length, W = walls[0].length;
  const key = (x, y) => y * W + x;
  const q = [[fx, fy]];
  const parent = new Map([[key(fx, fy), -1]]);
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  while (q.length) {
    const [cx, cy] = q.shift();
    if (cx === tx && cy === ty) {
      let cur = key(tx, ty);
      while (parent.get(cur) !== key(fx, fy) && parent.get(cur) !== -1) cur = parent.get(cur);
      if (parent.get(cur) === -1) return [0, 0];
      return [(cur % W) - fx, Math.floor(cur / W) - fy];
    }
    for (const [dx, dy] of dirs) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
      if (walls[ny][nx]) continue;
      const k = key(nx, ny);
      if (parent.has(k)) continue;
      parent.set(k, key(cx, cy));
      q.push([nx, ny]);
    }
  }
  return null;
}
```

The point of this agent was to be a soak tester: leave it running, let it grind through the world for hundreds of ticks, and have it scream if it ever saw a page error, got silently stuck in a dungeon, or hit a modal it did not expect. On a fresh chain it discovered and confirmed several segments, re-entered them many times, came back to the hub, and reported zero anomalies. Good. But a soak tester playing solo cannot, by construction, find a contention bug. There is nothing to contend with.

## The traversal problem I had to fix first

Before I could put agents in competition, I had to fix a design flaw the single agent kept tripping over, and it is worth a paragraph because it shaped everything after.

My world is a graph of real segments (dungeons) joined by directional gates. The overworld "Map" is only a meta-view, not a place you actually travel on. You move by walking to a gate and stepping through, and you always arrive on the other side of that gate. The one thing that should gate traversal is the *frontier*: stepping into unexplored territory creates a *provisional* segment that you must confirm by completing a genuine run (survive to a gate). Bail out early and it is forfeit and pruned. That is the anti-grief rule that stops someone spamming coordinate claims.

The bug was that leaving *any* segment required a settled, replay-verified run, even when you were just re-entering a segment that was already confirmed and yours. Walking home through territory you already owned got rejected. So I added a transit-only gate-walk: a free, no-settlement pass, allowed only when the segment you are leaving is confirmed.

```js
// Leaving a CONFIRMED segment is a free transit (no settlement, no
// rewards, no penalty): the GSP just moves you to the other side of the
// gate. Leaving a PROVISIONAL segment still requires a settled run to
// confirm it (anti-grief).
const curConfirmed = !!ctx.segments.get(ctx.player.current_segment)?.confirmed;
```

On the GSP side, a transit move ends the active visit with no settlement (no rewards, no penalty, no prune) and then does the ordinary transit. Provisional segments still demand a real completed run to confirm-and-leave. I locked this down with backend unit tests (transit accepted from a confirmed segment, rejected from a provisional one) and an end-to-end check: a fresh player walks into the confirmed segment and transit-walks straight back out, and I assert it lands at the hub, leaves the channel, and takes no death penalty.

This is the "confirmed-segment free-transit" model, and it matters for the testing story because it is exactly the kind of rule that has two sides: a legitimate free pass *and* an anti-grief gate. The only way to trust it is to have something adversarial lean on both.

## Putting agents in competition

Once the single agent worked, I did the refactor that made everything else possible: I pulled the entire agent policy out into a shared `agentcore.mjs` exporting `playAgent(page, cfg)`, driving one player in one Playwright page. The single-agent runner became a thin wrapper. The interesting new consumer was `multi.mjs`: N players, in N separate browser contexts, against one devnet stack, all competing in the same world.

Spinning them up staggered by a beat each, then racing them:

```js
const summaries = await Promise.all(agents.map((a, i) =>
  sleep(i * 800).then(() => playAgent(a.page, {
    name: a.name, findings,
    outbound: Number(process.env.ROG_OUTBOUND || 3),
    maxTicks: Number(process.env.ROG_TICKS || 500),
  })).catch(e => { findings.push(`[${a.name}] ERROR: ${e.message}`); return null; })
));
```

Now they are stepping on each other. Three agents share a world, all trying to discover new segments, and inevitably two of them will aim at the same empty coordinate. That is exactly the contention I could never produce by hand.

But a crowd of players is only half of it. If they all just play and nothing crashes, I have learned very little, because "nothing crashed" is not the same as "the rules held". So I added a **referee**.

## The referee: hard invariants on global state

The referee is a loop that runs alongside the agents. It polls the GSP's global state directly (not any single player's view) and asserts cross-player invariants against each snapshot:

```js
/** Cross-player invariants checked against one snapshot of global state. */
function check(gs) {
  if (!gs) return;
  const coords = new Map();
  for (const s of gs.segments || []) {
    const k = `${s.world_x},${s.world_y}`;
    if (s.world_x === 0 && s.world_y === 0)
      violations.push(`segment ${s.id} occupies hub coord (0,0)`);
    if (coords.has(k))
      violations.push(`two segments share coord (${k}): #${coords.get(k)} & #${s.id}`);
    else coords.set(k, s.id);
  }
  const ids = new Set((gs.segments || []).map(s => s.id));
  for (const p of gs.players || []) {
    if (p.hp < 0 || p.hp > p.max_hp)
      violations.push(`${p.name} hp out of range: ${p.hp}/${p.max_hp}`);
    if (p.current_segment !== 0 && !ids.has(p.current_segment))
      violations.push(`${p.name} is on nonexistent segment ${p.current_segment}`);
  }
}
```

Coordinate uniqueness. Nothing ever sitting on the hub coordinate. No player standing on a segment that does not exist. Every player's HP inside its valid range. These are the things that *must* be true no matter how the race resolves, and the referee checks them roughly every couple of seconds while the world churns, plus one final consistency snapshot after everyone stops. Three concurrent agents discovered four segments with zero referee violations, and the world stayed consistent. That was the first result that made me trust the multiplayer at all.

A subtle but important design decision lives inside `handleModal`: the agents have to know the difference between a bug and *expected* feedback. In a competitive world, "coordinate already claimed" or "that segment is provisional, you cannot enter" or a cooldown message are not anomalies. They are the rules working. So the harness treats those as normal and only records genuinely unexpected modals as findings. Getting this line right was most of the battle. Too strict and every legitimate race registers as a failure; too loose and you miss the real bug.

## From passive soak to scripted assertions

The multi-agent soak is great at surface area but bad at precision. If the coordinate race only happens when two agents *happen* to collide, I cannot count on it firing. So the last piece was `compete.mjs`: instead of passively soaking, it scripts the exact contested cases and asserts that the GSP resolves them correctly.

Three scenarios, each with hard pass/fail assertions:

1. **Coordinate race.** Two players fire a gate-walk east at the same instant, both aiming at the empty coordinate `(1,0)`. Afterward I assert *exactly one* segment exists there and *exactly one* player entered it. Not zero, not two. One winner, one loser, one segment.

2. **Provisional access and unlock.** Player A discovers a segment and enters it. Player B tries to walk into A's still-provisional segment and I assert B is *rejected* and bounced back to the hub. Then A confirms the segment by completing a real run out through a gate, and now I assert B *can* enter. The access rule flips exactly when it should.

3. **Reward and ownership isolation.** A and B each discover and confirm their own segment concurrently, in different directions. I assert they end up with two distinct segments, each owned by its own discoverer with no cross-credit, and that both players' stats advanced independently and stayed in range.

Here is the coordinate race, which is my favourite because it is so blunt:

```js
await Promise.allSettled([act(A, "gateWalk", "east"), act(B, "gateWalk", "east")]);
await sleep(2500);
const segs = await segmentsAt(1, 0);
segs.length === 1
  ? pass("exactly one segment created at (1,0)")
  : fail(`${segs.length} segments at (1,0) — double claim!`);
```

To make scenario 2 and 3 work I had to teach the agent core a new trick: `navigateOut()`, which walks to a gate and leaves, fighting through whatever is in the way, so a test can confirm a segment on demand rather than waiting for the soak policy to get around to it. All three scenarios passed on a fresh chain.

The difference in confidence between `multi.mjs` and `compete.mjs` is the difference between "I watched three bots play and nothing looked broken" and "I proved that when two players reach for the same coordinate, exactly one wins". Both are useful. Only the second one is a test.

## Packaging it as a public sandbox

There is a companion thread to all this that is worth mentioning because it is what made a shared world real in the first place. Alongside the harness I made the whole stack hostable as a single public sandbox origin: one TLS domain, no wallet, pick a name and play a shared world. The trick is that only the move proxy is public. It submits moves and relays an allowlist of read-only GSP methods, refusing anything else (notably `stop`), while anvil, xayax and the GSP RPC stay bound to localhost and unreachable from the internet. The proxy became threaded so one slow long-poll does not block other players, with a light per-IP rate limit on the public deploy.

That rate limit produced a small but telling detail in the harness: it is *off* for the local devnet by default (so automated play is never throttled) and *on* only in the hosted deploy. My agents want to hammer the stack as fast as they can; real players on the public origin should not be able to. Same code, two postures.

## What adversarial self-play taught me

The thing I keep coming back to is that a soak agent and a referee are two halves of one idea, and you need both. The agents generate the chaos: the concurrent moves, the coordinate collisions, the access attempts I would never reliably reproduce by hand. The referee, and the scripted assertions, decide whether that chaos was resolved *correctly*. An agent that only checks "did anything crash?" will happily run for a thousand ticks through a world that is quietly double-claiming coordinates.

Two smaller lessons stuck with me. First, the hardest engineering in the whole harness was not the BFS or the browser orchestration; it was drawing the line between a genuine anomaly and legitimate competitive feedback. In a multiplayer world, rejection *is* the feature, and your test harness has to know that in its bones. Second, competition is the cheapest fuzzing you can buy for a multiplayer system. I did not have to design adversarial inputs. I just put three self-interested players in one world and let their goals collide, and the collisions were the test.

For a real-time on-chain game, where the whole promise is that the rules are enforced impartially for everyone, that feels like exactly the right way to check the rules actually are.
