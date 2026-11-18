---
title: 0% + 0.5% → 3.5% on ProgramBench
description: "Alone, Opus-4.8 fully resolves 0% of ProgramBench and GPT-5.5 resolves 0.5%. As a builder and a reviewer in one loop they resolve 3.5%, close to the best official entry's 4.5%, and the curve was still rising when the four-hour budget ran out. A Humanfia-reported checkpoint."
date: 2026-08-11
authors:
  - Zheng Du
tag: Humanize
achievement:
  topic: ProgramBench
  value: 3.5
  decimals: 1
  suffix: "%"
  viz: bars
  board:
    - { name: Opus, score: 0 }
    - { name: GPT, score: 0.5 }
    - { name: loop, score: 3.5, us: true }
  label: "ProgramBench"
  body: "Two models that solve 0% and 0.5% alone, as a builder and a reviewer in a loop."

hero:
  kicker: ProgramBench · 200 tasks · fully resolved
  value: 3.5
  decimals: 1
  suffix: '%'
  label: Opus-4.8 building and GPT-5.5 reviewing, in one loop. Alone they resolve 0% and 0.5%.
  board:
    - { name: Opus 5 alone (best official), score: 4.5 }
    - { name: Opus-4.8 ⇄ GPT-5.5 loop, score: 3.5, us: true }
    - { name: GPT-5.5 alone, score: 0.5 }
    - { name: Opus-4.8 alone, score: 0 }
---

::: info Ongoing
Runs are still going. The loop's numbers below are a checkpoint, not a final result, and they
are Humanfia-reported: they are not on the ProgramBench leaderboard.
:::

[ProgramBench](https://programbench.com/) hands an agent a compiled program and its
documentation and asks it to rebuild the program from scratch, with no source, no decompiler
and no internet. A task counts as resolved only when the rebuild passes every hidden behavioral
test.<Sidenote>The leaderboard also reports "almost resolved", at least 95% of the tests
passed. Every number on this page is the strict figure, fully resolved.</Sidenote> Across its
200 tasks, single-shot numbers sit close to the floor. That makes it an unusually clean
instrument for measuring a loop.

<StatGrid
  lead
  :items="[
    { value: 7, kicker: 'Together · 3.5%', text: 'Tasks of 200 resolved by Opus-4.8 building and GPT-5.5 reviewing.' },
    { value: 1, kicker: 'GPT-5.5 alone · 0.5%', text: 'Alone, as on its official leaderboard entry at xhigh effort.' },
    { value: 0, kicker: 'Opus-4.8 alone · 0%', text: 'Alone, as on its official leaderboard entry at xhigh effort.' },
  ]"
/>

Two models that solve almost nothing separately solve seven times the better one's share when
they work as a builder and an independent reviewer, round after round. Across tasks, the loop
averages a **14.2% improvement** over the single-shot baseline.

## The loop

The arrangement is a [Ralph loop](/flows/ralph-loop) with a reviewer in it, the shape RLCR
Flow was built around: one agent builds, a second model reads what it built, and the review goes
back as the next round's work. Neither model is changed. Only who is asked what, and in what
order, is.

<AnimatedDiagram
  view-box="0 0 600 260"
  :min-width="360"
  :max-width="760"
  kicker="Builder ⇄ reviewer · one round"
  label="The loop: Opus-4.8 builds the program, GPT-5.5 reviews it, and the review becomes the next round's work, until the four-hour budget runs out."
  :steps="[
    'Opus-4.8 builds: a program, from a binary and its documentation.',
    'GPT-5.5 reviews what was built, independently.',
    'The review goes back as the next round of work, until four hours are up.',
  ]"
>
  <path id="pb-out" class="line dash" d="M150 95 C 220 35, 380 35, 450 95" data-step="2" data-draw />
  <path id="pb-back" class="line dash" d="M450 175 C 380 235, 220 235, 150 175" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="accent" x="20" y="95" width="200" height="80" />
    <text class="on-accent t-lg" x="120" y="130" text-anchor="middle">Opus-4.8</text>
    <text class="on-accent" x="120" y="154" text-anchor="middle">builds</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="380" y="95" width="200" height="80" />
    <text class="on-ink t-lg" x="480" y="130" text-anchor="middle">GPT-5.5</text>
    <text class="on-ink" x="480" y="154" text-anchor="middle">reviews</text>
  </g>
  <text class="ink t-lg" x="300" y="30" text-anchor="middle" data-step="2">the rebuild</text>
  <text class="ink t-lg" x="300" y="254" text-anchor="middle" data-step="3">the review</text>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#pb-out" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#pb-back" data-loop />
</AnimatedDiagram>

## Where 3.5% would sit

The official leaderboard runs every model alone, in the same scaffold, mini-SWE-agent. Our loop
is a different setup and is not on it. Set beside the board for scale, 3.5% falls between the
top entry and everything else.

<Leaderboard
  kicker="ProgramBench · fully resolved · official board, 28 September 2026, plus our loop"
  label="ProgramBench fully resolved rates: Claude Opus 5 (xhigh) 4.5%, our Opus-4.8 and GPT-5.5 loop 3.5% (Humanfia-reported, not on the board), Muse Spark 1.3 (max) 2.5%, GPT-5.6 Sol (xhigh) 1.0%, Muse Spark 1.3 (xhigh) 1.0%, GPT 5.5 (xhigh) 0.5%, Claude Opus 4.8 (xhigh) 0%."
  caption="Every entry but ours is from programbench.com, run alone in mini-SWE-agent. Ours is a checkpoint at four hours."
  :decimals="1"
  suffix="%"
  :entries="[
    { name: 'Claude Opus 5 (xhigh)', score: 4.5 },
    { name: 'Opus-4.8 ⇄ GPT-5.5 loop', score: 3.5, us: true, detail: 'Humanfia-reported' },
    { name: 'Muse Spark 1.3 (max)', score: 2.5 },
    { name: 'GPT-5.6 Sol (xhigh)', score: 1.0 },
    { name: 'Muse Spark 1.3 (xhigh)', score: 1.0 },
    { name: 'GPT 5.5 (xhigh)', score: 0.5, detail: 'the reviewer, alone' },
    { name: 'Claude Opus 4.8 (xhigh)', score: 0, detail: 'the builder, alone' },
  ]"
/>

## The part that bothers us

In the later rounds, performance was still rising at roughly **1.2% per round** when the runs
were cut off.

That is not a result. It is a missing one. The runs stop at a four-hour time budget, not at
convergence, so what we have measured is partly the budget rather than the method. The honest
statement is this: the number at four hours is 3.5%, the slope at four hours is positive, and
we do not yet know where it goes.

Finding that out, rather than guessing, is what [FlowBench](/flowbench/) is for.

[ProgramBench](https://programbench.com/) · [The flows](/flows/) ·
[FlowBench](/flowbench/)
