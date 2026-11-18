---
title: "#2 on Lean-Eval, behind Seed Prover"
description: "A general model in a general agent loop is second on Lean-Eval, behind ByteDance's Seed Prover, a system built for formal mathematics. By our count it is 149 problems to 155."
date: 2026-07-29
authors:
  - Zhengyang Zhang
tag: HOA
achievement:
  topic: Lean-Eval
  value: 2
  prefix: "#"
  label: "Lean-Eval leaderboard"
  body: "Behind ByteDance's Seed Prover, with a general model in a general agent loop."

hero:
  kicker: Lean-Eval · 29 July 2026
  value: 2
  prefix: '#'
  label: on the Lean-Eval board, behind ByteDance's Seed Prover, a purpose-built prover

# The board as of the end of 29 July 2026 (UTC), counted from Lean-Eval's own published data
# (lean-lang.org/eval/site-data/v2/groups/formalization-evaluation.json, generated
# 2026-10-05): distinct problems with an accepted proof per entry, by acceptance date.
board:
  - { name: Seed Prover (ByteDance), score: 144 }
  - { name: Humanfia, score: 130, us: true, detail: 'GPT-5.6 sol, max effort' }
  - { name: Aristotle (Harmonic), score: 124 }
  - { name: GPT-5.6, score: 112 }
  - { name: Tau (caj.al), score: 104 }
---

::: tip This has since moved
Three weeks later the same loop [took first place with 172 problems](/news/2026-08-18-lean-eval-first).
:::

Running on `gpt-5.6-sol` at max effort, [Humanize](/humanize/) is second on the
[Lean-Eval](https://lean-lang.org/eval/) leaderboard. By our count today it has solved
**149 of 219** problems. First is ByteDance's Seed Prover, at 155.<Sidenote>Those two counts are
ours, from the day. The board's published log dates every proof by when it was accepted, and by
that log the standings at the end of 29 July were 144 for Seed Prover and 130 for us; it
records our 149th on 4 August. The order is the same either way.</Sidenote>

<Leaderboard
  kicker="Lean-Eval · end of 29 July 2026 · accepted proofs"
  label="Lean-Eval at the end of 29 July 2026, from the board's published acceptance log: Seed Prover 144, Humanfia 130, Aristotle 124, GPT-5.6 112, Tau 104."
  :entries="$frontmatter.board"
  caption="Counted from the board's own published data (generated 5 October 2026), by acceptance date."
/>

## A specialist and a generalist

Six problems by our count, fourteen by the board's log: either way it is not a rout, and the gap
is worth naming precisely because of what is on each side of it. Seed Prover is a system built for this: a prover, trained and tuned
for formal mathematics. What is second is a general-purpose model driving a general-purpose agent
loop, with no component anywhere in it that knows Lean specifically.

<AnimatedDiagram
  view-box="0 0 640 260"
  :min-width="300"
  :max-width="780"
  kicker="One prover · one loop"
  label="Seed Prover is built for Lean proofs alone. The Humanize loop is general: the same loop that writes Lean proofs also writes GPU kernels and enters Kaggle competitions."
  :steps="[
    'Seed Prover is a prover: built, trained and tuned for Lean.',
    'Ours is a general model in a general loop, with nothing in it that knows Lean.',
    'The same loop writes GPU kernels and enters Kaggle competitions.',
  ]"
>
  <path id="le2-seed" class="line" d="M200 48 H440" data-step="1" data-draw />
  <path id="le2-lean" class="line dash" d="M200 185 C 320 185, 320 48, 440 48" data-step="2" data-draw />
  <path id="le2-kda" class="line dash" d="M200 185 C 320 185, 320 130, 440 130" data-step="3" data-draw />
  <path id="le2-hma" class="line dash" d="M200 185 C 320 185, 320 212, 440 212" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="frame" x="20" y="20" width="180" height="56" />
    <text class="ink" x="110" y="53" text-anchor="middle">Seed Prover</text>
  </g>
  <g data-step="1" data-pop>
    <rect class="ink" x="440" y="20" width="180" height="56" />
    <text class="on-ink" x="530" y="53" text-anchor="middle">Lean proofs</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="20" y="157" width="180" height="56" />
    <text class="on-accent t-lg" x="110" y="191" text-anchor="middle">Humanize</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="ink" x="440" y="102" width="180" height="56" />
    <text class="on-ink" x="530" y="135" text-anchor="middle">GPU kernels</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="ink" x="440" y="184" width="180" height="56" />
    <text class="on-ink" x="530" y="217" text-anchor="middle">Kaggle</text>
  </g>
  <rect class="grey" x="-6" y="-6" width="12" height="12" data-step="1" data-travel="#le2-seed" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="2" data-travel="#le2-lean" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#le2-kda" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#le2-hma" data-loop />
</AnimatedDiagram>

The loop is the same one that runs [kernel work](/kda/) and
[Kaggle competitions](/hma/).

> A specialist should beat a generalist on the specialist's benchmark. That it does so by so
> little is the interesting number.

That is why we thought the gap was closable.

[HOA](/hoa/) · [the flows](https://github.com/humanfia/flowverse)
