---
title: "#1 on Lean-Eval: 172 proofs"
description: "Three weeks after second place, a fully agentic GPT-5.6 run is first on the Lean-Eval leaderboard, with 172 research-level problems solved. Every accepted proof is sorry-free and independently re-verified."
date: 2026-08-18
authors:
  - Zhengyang Zhang
  - Hongzhou Lin
tag: HOA
achievement:
  topic: Lean-Eval
  value: 1
  from: 12
  prefix: "#"
  label: "Lean-Eval leaderboard"
  body: "172 research-level mathematics problems, every accepted proof sorry-free and independently re-verified."

hero:
  kicker: Lean-Eval · 18 August 2026
  value: 172
  from: 130
  label: research-level problems with an accepted proof, first on the board
  board:
    - { name: Humanfia, score: 172, us: true, from: 2 }
    - { name: Seed Prover, score: 156, from: 1 }
    - { name: Aristotle, score: 142, from: 3 }

# Counted from Lean-Eval's own published data (lean-lang.org/eval/site-data/v2/groups/
# formalization-evaluation.json, generated 2026-10-05): distinct problems with an accepted proof
# per entry, by acceptance date. Day 0 is 28 July 2026, the day of our first accepted proof.
race:
  dates: ['7/28', '7/29', '7/30', '7/31', '8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14', '8/15', '8/16', '8/17', '8/18', '8/19', '8/20']
  ours: [[0, 130], [5, 135], [6, 144], [7, 149], [19, 167], [21, 174], [22, 181], [23, 183]]
  seed: [[0, 144], [3, 147], [5, 149], [6, 151], [7, 154], [16, 156], [23, 156]]
  aristotle: [[0, 124], [10, 125], [11, 126], [12, 136], [13, 139], [14, 141], [19, 142], [21, 151], [22, 156], [23, 162]]
  notes:
    - { x: 0, y: 130, label: '#2', detail: '7/28 · first 130 accepted', tone: ink }
    - { x: 19, y: 167, label: '#1', detail: '8/16 · past Seed Prover’s 156', tone: accent }
    - { x: 21, y: 174, label: '174', detail: '8/18 · the 172nd at 13:28 UTC', tone: accent }
# The board at 13:28 UTC on 18 August, when our 172nd proof was accepted; `from` is each
# entry's rank on 29 July.
board:
  - { name: Humanfia, score: 172, us: true, from: 2, detail: 'GPT-5.6, fully agentic' }
  - { name: Seed Prover (ByteDance), score: 156, from: 1 }
  - { name: Aristotle (Harmonic), score: 142, from: 3 }
  - { name: GPT-5.6, score: 112, from: 4 }
  - { name: Tau (caj.al), score: 104, from: 5 }
---

Three weeks ago this flow was [second on Lean-Eval](/news/2026-07-29-lean-eval-second), behind
a specialist prover. It is now first, with **172 research-level problems** solved and
machine-checked in Lean 4, using GPT-5.6 and a fully agentic workflow.

<Leaderboard
  kicker="Lean-Eval · 18 August 2026, 13:28 UTC"
  label="Lean-Eval when our 172nd proof was accepted: Humanfia 172, up from second; Seed Prover 156, down from first; Aristotle 142; GPT-5.6 112; Tau 104."
  :entries="$frontmatter.board"
  caption="Accepted proofs per entry, counted from the board's own published data. The board opens in the order of 29 July and re-sorts into today's."
/>

The model is one anybody can rent. What changed is the arrangement around it.

## Three weeks, day by day

The board's published log dates every accepted proof. Read day by day, our first 130 proofs were
accepted on 28 July, a second batch took us to 149 on 4 August, and a third to 167 on 16 August,
past Seed Prover's 156 for the first time.

<LineChart
  kicker="Lean-Eval · accepted proofs per entry · 28 July to 20 August"
  title="From #2 to #1"
  label="Accepted Lean-Eval proofs by day from 28 July to 20 August 2026. Humanfia rises from 130 to 149 on 4 August and 167 on 16 August, passing Seed Prover, which ends at 156; Humanfia reaches 174 on 18 August and 183 on 20 August. Aristotle climbs from 124 to 162."
  :series="[
    { key: 'ours', label: 'Humanfia', tone: 'accent', data: $frontmatter.race.ours, step: true, dots: true },
    { key: 'seed', label: 'Seed Prover', tone: 'ink', data: $frontmatter.race.seed, step: true, dashed: true },
    { key: 'aristotle', label: 'Aristotle', tone: 'grey', data: $frontmatter.race.aristotle, step: true },
  ]"
  :x="{ categories: $frontmatter.race.dates, ticks: [0, 4, 11, 18, 23], label: 'Accepted' }"
  :y="{ min: 120, max: 190, ticks: [120, 140, 160, 180], label: 'Problems' }"
  :annotations="$frontmatter.race.notes"
  :min-width="520"
  :height="300"
/>

## What the loop does

<AnimatedDiagram
  view-box="0 0 560 270"
  :min-width="300"
  :max-width="760"
  kicker="Argue → formalize → two gates"
  label="The Lean-Eval loop: a natural-language plan comes first, then Lean, refined against compiler errors round after round; hard problems are seeded with closed proofs of related problems; the worker's Comparator check and the reviewer's AXLE check must both pass before a proof is accepted."
  :steps="[
    'Argue first: a natural-language strategy, before any Lean.',
    'Formalize it, and feed every compiler error back, round after round.',
    'For the hard ones, seed the run with proofs of related problems that already closed.',
    'Gate one: the worker runs a Comparator check on its own output.',
    'Gate two: a reviewer re-verifies through AXLE, blind to how the proof was made. Only then does it count.',
  ]"
>
  <path class="line" d="M120 170 H150" data-step="2" data-draw />
  <path id="le1-lane" class="line dash" d="M260 170 H555" data-step="4" data-draw />
  <path id="le1-err" class="line dash" d="M180 140 C 180 80, 230 80, 230 140" data-step="2" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="140" width="110" height="60" />
    <text class="on-ink t-lg" x="65" y="176" text-anchor="middle">Plan</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="150" y="140" width="110" height="60" />
    <text class="on-ink t-lg" x="205" y="176" text-anchor="middle">Lean</text>
  </g>
  <text class="ink" x="170" y="100" text-anchor="end" data-step="2">errors</text>
  <g data-step="3" data-pop>
    <rect class="frame" x="10" y="20" width="175" height="40" />
    <text class="ink" x="97" y="45" text-anchor="middle">closed proofs</text>
  </g>
  <path class="line" d="M65 60 V 140" data-step="3" data-draw />
  <g data-step="4" data-pop>
    <rect class="ink" x="330" y="130" width="10" height="80" />
    <text class="ink t-lg" x="335" y="118" text-anchor="middle">1</text>
    <text x="335" y="236" text-anchor="middle">Comparator</text>
  </g>
  <g data-step="5" data-pop>
    <rect class="ink" x="450" y="130" width="10" height="80" />
    <text class="ink t-lg" x="455" y="118" text-anchor="middle">2</text>
    <text x="455" y="236" text-anchor="middle">AXLE</text>
  </g>
  <g data-step="5" data-pop>
    <rect class="accent" x="400" y="26" width="136" height="36" transform="rotate(-10 468 44)" />
    <text class="on-accent" x="468" y="49" text-anchor="middle" transform="rotate(-10 468 44)">ACCEPTED</text>
  </g>
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="2" data-travel="#le1-err" data-loop />
  <rect class="grey" x="-8" y="-8" width="16" height="16" data-step="4" data-travel="#le1-lane" data-stop="0.2" data-loop />
  <rect class="accent" x="-8" y="-8" width="16" height="16" data-step="5" data-travel="#le1-lane" data-loop />
</AnimatedDiagram>

<PostCards numbered>
<PostCard title="Argue first, formalize second.">

The flow writes a natural-language proof strategy before it writes any Lean, then turns that
strategy into Lean statements. A formalization that starts from a plan fails in ways that are
legible; one that starts from a blank file fails in ways that are not.

</PostCard>
<PostCard title="The compiler is the reviewer that never gets tired.">

Lean's error output is fed back into the run and the code is refined against it, round after
round, by [HOA](/hoa/) and RLCR Flow agents. Nothing about this is clever. Almost nobody
does it for hundreds of rounds without a human losing patience.

</PostCard>
<PostCard title="Seed the hard ones with the easy ones.">

For the problems that resist, the argument is first turned into a precise, stepwise informal
plan, and the run is seeded with reusable Lean proofs from related problems that already closed.
The agent spends its budget on the ideas that are actually missing.

</PostCard>
</PostCards>

## What counts as solved

Two independent gates, run by two different agents, before anything is accepted:

- the **worker** runs a comparator check on its own output; and
- the **reviewer** re-verifies through the AXLE API, which has no access to how the proof was
  arrived at.

Nothing is accepted with a `sorry` placeholder or an unproved assumption standing in for a step.

> A proof either has a term the Lean kernel accepts, or it does not exist.

That bar is the whole reason a leaderboard position in formal mathematics means anything at all.

[HOA](/hoa/) · [the flows](https://github.com/humanfia/flowverse) ·
[the runtime](/humanize/)
