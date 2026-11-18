---
title: "670/672 on PutnamBench"
description: "One Ralph loop, with Codex as both worker and reviewer, closed 670 of PutnamBench's 672 formal statements, every problem of Putnam 2025 among them. The best on the leaderboard that day was 668."
date: 2026-06-26
authors:
  - Zhengyang Zhang
tag: HOA
achievement:
  topic: PutnamBench
  value: 670
  suffix: /672
  of: 672
  viz: ring
  label: "PutnamBench"
  body: "99.7% of the benchmark, and every problem of Putnam 2025."

hero:
  kicker: PutnamBench · Lean · 26 June 2026
  value: 670
  label: of 672 formal statements closed by one Ralph loop, 99.7%
  board:
    - { name: Humanfia, score: 670, us: true }
    - { name: Aleph Prover, score: 668 }
    - { name: Goedel-Architect, score: 597 }
    - { name: Seed-Prover 1.5, score: 581 }

# The other entries are the leaderboard's own (trishullab/PutnamBench docs/results.json, Lean
# column with answers), as they stood on 26 June 2026: the best entry per system added by then.
# The 670 is Humanfia's report; it was never a board entry. The board later listed us at 672.
june:
  - { name: Humanfia, score: 670, us: true, detail: 'our report · 99.7%' }
  - { name: Aleph Prover (Logical Intelligence), score: 668, detail: 'added Jan 2026 · 99.4%' }
  - { name: Goedel-Architect, score: 597, detail: 'added Jun 2026 · 88.8%' }
  - { name: Seed-Prover 1.5 (ByteDance), score: 581, detail: 'added Dec 2025 · 86.5%' }
  - { name: Hilbert, score: 462, detail: 'added Oct 2025 · 68.8%' }
  - { name: AxProverBase (Axiomatic AI), score: 365, detail: 'added Apr 2026 · 54.3%' }
---

::: tip This has since moved
The solver later closed the last two: [**672 of 672**](/news/2026-10-05-putnambench-672), joint
first on the [official leaderboard](https://trishullab.github.io/PutnamBench/leaderboard.html),
every proof through Lean 4, Comparator and AXLE.
:::

PutnamBench is 672 formal statements from the Putnam competition, 1962 to 2025. A Ralph loop
running Codex as **both worker and reviewer** closed **670** of them, 99.7%, including every
problem in Putnam 2025.

<Leaderboard
  kicker="PutnamBench · Lean, with answers · 26 June 2026"
  label="PutnamBench on 26 June 2026: Humanfia 670 (our report), Aleph Prover 668, Goedel-Architect 597, Seed-Prover 1.5 581, Hilbert 462, AxProverBase 365."
  :entries="$frontmatter.june"
  caption="Every entry but ours is from the leaderboard's own data, as it stood on 26 June. Our 670 is our own report and was never a board entry; the board later listed us at 672."
/>

The two that are not closed are not closed. They are drawn as such everywhere we show this.

<StatGrid
  lead
  :items="[
    { value: 670, from: 0, suffix: '/672', kicker: 'Closed', text: 'One loop, one model family, every proof checked by Lean.' },
    { value: 99.7, decimals: 1, suffix: '%', kicker: 'Of the benchmark', text: 'Against 99.4% for Aleph Prover, the best on the board that day.' },
    { value: 2, kicker: 'Still open', text: 'Not closed, and not counted.' },
  ]"
/>

## The loop

A Ralph loop is the plainest loop there is: give an agent the same goal again and again, with
the last attempt's feedback, until the goal is met or the budget runs out. Here the goal is one
PutnamBench statement in its own workspace, the feedback is Lean's, and a second Codex process
judges what compiles.

<AnimatedDiagram
  view-box="0 0 480 300"
  :min-width="300"
  :max-width="640"
  kicker="One problem · one Ralph loop"
  label="The Ralph loop: a Codex worker writes a proof, Lean compiles it, a Codex reviewer judges it, and the feedback goes back to the worker; turns repeat up to a cap, and a later campaign retries only the problems still open."
  :steps="[
    'One problem, one workspace: a Codex worker writes a Lean proof.',
    'Lean compiles it, and every objection goes straight back to the worker.',
    'A Codex reviewer, in its own process, judges what compiles.',
    'Round it goes, turn after turn, until the proof is accepted or the turns run out.',
    'A later campaign retries only the problems still open.',
  ]"
>
  <path id="ralph-ring" class="line dash" d="M85 150 C 85 40, 395 40, 395 150 C 395 260, 85 260, 85 150 Z" data-step="2" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="115" width="150" height="70" />
    <text class="on-ink t-lg" x="85" y="156" text-anchor="middle">Worker</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="185" y="46" width="110" height="44" />
    <text class="ink t-lg" x="240" y="74" text-anchor="middle">Lean</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="320" y="115" width="150" height="70" />
    <text class="on-accent t-lg" x="395" y="156" text-anchor="middle">Reviewer</text>
  </g>
  <text class="ink" x="240" y="288" text-anchor="middle" data-step="4">turn after turn</text>
  <g data-step="5" data-pop>
    <rect class="ink" x="330" y="10" width="140" height="34" transform="rotate(-8 400 27)" />
    <text class="on-ink" x="400" y="32" text-anchor="middle" transform="rotate(-8 400 27)">campaign 2</text>
  </g>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="4" data-travel="#ralph-ring" data-loop />
</AnimatedDiagram>

## Where the turns go

More than **90% of problems are solved within ten turns**.<Sidenote>The turn counts are from
our run logs and are not published; read them as Humanfia-reported. The solver's
[README](https://github.com/humanfia/hoa-qed/tree/main/putnambench) gives the configuration:
GPT-5.5 at `xhigh` reasoning, a 50-turn cap per problem in each campaign, and later campaigns
that retry only what is still open.</Sidenote> For most of the benchmark the loop is not doing
anything exotic: it writes a proof, the compiler objects, it fixes it, and it is done well inside
the budget.

<RangeMeter
  kicker="Turns per problem · one campaign"
  label="A turn budget of 50 per problem per campaign. Over 90% of problems are solved within ten turns; the remaining turns are where the hard tail is closed. Move the handle along the budget."
  status="At this turn"
  unit=" turns"
  :max="50"
  :value="10"
  :markers="[
    { value: 10, label: '10 turns', note: 'over 90% of problems solved by here' },
    { value: 50, label: '50 turns', note: 'the cap per problem, per campaign' },
  ]"
  :zones="[
    { from: 0, to: 10, label: 'most of the benchmark is closed' },
    { from: 10, to: 50, label: 'the hard tail: more turns, more proofs', tone: 'accent' },
  ]"
/>

The tail is where the argument is. For the harder problems, extra turns raise the solve rate
measurably: the same worker, given more rounds against the same feedback, closes problems it did
not close in ten.

> The model was capable of the proof the whole time. What was missing was the arrangement that
> let it keep going without wandering.

That is the thesis of this site, stated as an experiment.

## Checking it

The [official leaderboard](https://trishullab.github.io/PutnamBench/leaderboard.html) is
maintained by the PutnamBench team. A
[preview set](https://huggingface.co/datasets/humanfia-lab/putnambench-solution-preview) of the
proof files is open for review, and the full solving pipeline is public.

[humanfia/hoa-qed/putnambench](https://github.com/humanfia/hoa-qed/tree/main/putnambench) ·
[HOA](/hoa/)
