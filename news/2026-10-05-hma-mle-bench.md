---
title: 78.2% MLE-bench medal rate in 6 hours
description: "Two coding agents taking turns over one workspace, each starting fresh, beat both of them working alone on 75 MLE-bench tasks: 78.2% any-medal against 72.4% and 68.0%, in the same six hours. Self-reported, and not on the official leaderboard."
date: 2026-10-03
authors:
  - Changye Li
tag: HMA
achievement:
  topic: MLE-bench
  value: 78.2
  decimals: 1
  suffix: "%"
  viz: versus
  board:
    - { name: Opus 5, score: 72.4 }
    - { name: GPT-5.6-sol, score: 68.0 }
    - { name: HMA, score: 78.2, us: true }
  label: "MLE-bench medal rate"
  body: "Two agents taking turns on 75 tasks in six hours. Self-reported."

hero:
  kicker: MLE-bench · 75 tasks · 6 hours · any medal
  value: 78.2
  from: 50
  decimals: 1
  suffix: '%'
  label: Claude Opus 5 and GPT-5.6-sol taking turns. Self-reported, from the HMA repository.
  board:
    - { name: HMA · Opus 5 ⇄ GPT-5.6-sol, score: 78.2, us: true }
    - { name: Claude Opus 5 alone, score: 72.4 }
    - { name: GPT-5.6-sol alone, score: 68.0 }

# humanfia/hma, README "Main results" (all values are percentages; budgets in hours).
results:
  - { workflow: "HMA: Opus 5 ⇄ GPT-5.6-sol", hours: 6, medal: 78.2, gold: 53.8, median: 90.7, percentile: 89.0, highlight: true }
  - { workflow: "HMA: GPT-5.6-sol ⇄ Opus 5", hours: 6, medal: 73.3, gold: 50.7, median: 85.3, percentile: 85.4 }
  - { workflow: "Claude Opus 5, native /goal", hours: 6, medal: 72.4, gold: 50.7, median: 85.3, percentile: 84.8 }
  - { workflow: "HMA: GPT-5.6-sol ⇄ DeepSeek V4.1 Flash", hours: 6, medal: 72.0, gold: 50.7, median: 85.3, percentile: 84.4 }
  - { workflow: "HMA: GPT-5.6-sol ⇄ Kimi K3", hours: 6, medal: 70.7, gold: 50.7, median: 85.3, percentile: 83.9 }
  - { workflow: "ScienceFlow", hours: 24, medal: 70.2 }
  - { workflow: "GPT-5.6-sol, native /goal", hours: 6, medal: 68.0, gold: 47.6, median: 81.3, percentile: 81.3 }
  - { workflow: "MLEvolve", hours: 12, medal: 65.3, gold: 34.7, median: 76.0 }
---

Take two strong coding agents. Give each the same machine-learning task and six hours, and
Claude Opus 5 wins a medal on **72.4%** of [MLE-bench](https://github.com/openai/mle-bench)'s
75 Kaggle tasks while GPT-5.6-sol wins one on **68.0%**. Now give them *one* six-hour budget
and make them take turns in the same workspace. Together they medal on **78.2%**.

That is [Humanize MLE Agents (HMA)](https://github.com/humanfia/hma), and the number comes from
its [results table](https://github.com/humanfia/hma#main-results).

<StatGrid
  lead
  :items="[
    { value: 8.0, decimals: 1, prefix: '+', suffix: ' pts', kicker: 'Best pairing', text: 'Opus 5 ⇄ GPT-5.6-sol, over the mean of the two alone (70.2%), in any-medal rate.' },
    { value: 6.4, decimals: 1, prefix: '+', suffix: ' pts', kicker: 'All six pairings', text: 'The average gain over each pairing’s own single-agent mean. The conservative figure.' },
    { value: 5.9, decimals: 1, prefix: '+', suffix: ' pts', kicker: 'Mean percentile', text: 'Where the best pairing lands on each task’s leaderboard, against the mean of its two agents alone.' },
  ]"
/>

## Taking turns, with a clean slate

The arrangement is simple, and almost all of it is about what is *not* carried over.

<AnimatedDiagram
  view-box="0 0 640 305"
  :min-width="420"
  :max-width="820"
  kicker="One task · one workspace · six hours"
  label="HMA's alternation. Opus 5 and GPT-5.6-sol take turns over a six-hour budget. Each turn is a fresh session that stops after at most five accepted submissions; the shared workspace keeps code, models and candidates across every handoff; the last 15 minutes pick one already accepted candidate."
  caption="Turn lengths vary by task, so the ones drawn here are illustrative. The cap and the 15 minutes are not."
  :steps="[
    'One shared workspace, and one six-hour budget for the task.',
    'Opus 5 works in its own harness. After at most five accepted submissions, it stops.',
    'GPT-5.6-sol starts a fresh session in the same workspace: the same code and candidates, none of the context.',
    'They alternate until the budget is nearly spent.',
    'The last 15 minutes pick one candidate that was already accepted. Private test scores are never shown.',
  ]"
>
  <text class="ink" x="20" y="26" data-step="1">0 h</text>
  <text class="ink" x="620" y="26" text-anchor="end" data-step="1">6 h</text>
  <rect class="frame" x="20" y="40" width="600" height="56" data-step="1" />
  <g data-step="1">
    <rect class="frame" x="20" y="200" width="600" height="70" />
    <text class="ink t-lg" x="320" y="230" text-anchor="middle">shared workspace</text>
    <text x="320" y="254" text-anchor="middle">code · models · candidates</text>
  </g>
  <path id="hma-d1" class="line dash" d="M80 96 V200" data-step="2" data-draw />
  <path id="hma-d2" class="line dash" d="M200 96 V200" data-step="3" data-draw />
  <path id="hma-d3" class="line dash" d="M320 96 V200" data-step="4" data-draw />
  <path id="hma-d4" class="line dash" d="M440 96 V200" data-step="4" data-draw />
  <path id="hma-d5" class="line dash" d="M547 96 V200" data-step="4" data-draw />
  <g data-step="2" data-pop>
    <rect class="accent" x="20" y="40" width="120" height="56" />
    <text class="on-accent" x="80" y="73" text-anchor="middle">Opus 5</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="ink" x="140" y="40" width="120" height="56" />
    <text class="on-ink" x="200" y="73" text-anchor="middle">GPT-5.6</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="accent" x="260" y="40" width="120" height="56" />
    <text class="on-accent" x="320" y="73" text-anchor="middle">Opus 5</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="ink" x="380" y="40" width="120" height="56" />
    <text class="on-ink" x="440" y="73" text-anchor="middle">GPT-5.6</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="accent" x="500" y="40" width="95" height="56" />
  </g>
  <g data-step="5" data-pop>
    <rect class="grey" x="595" y="40" width="25" height="56" />
  </g>
  <text class="accent" x="620" y="298" text-anchor="end" data-step="5">last 15 min: pick one</text>
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="2" data-travel="#hma-d1" data-loop />
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#hma-d2" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="4" data-travel="#hma-d3" data-loop />
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="4" data-travel="#hma-d4" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="4" data-travel="#hma-d5" data-loop />
</AnimatedDiagram>

1. One agent works the task in its own native harness and submits candidate solutions.
2. After at most **five accepted submissions**, or when it finishes on its own, it stops. The
   other agent starts a **fresh session** in the same workspace: the same code, models and
   candidates, but none of the first agent's context.
3. They alternate until the six hours are nearly up. The last **15 minutes** go to picking one
   of the candidates already accepted. Private test scores are never shown to either agent.

The repository credits [two effects at once](https://github.com/humanfia/hma#figure-1-hma-overview).
The first is **context renewal**: a long-running agent improves more and more slowly, and a
fresh session restarts that curve. The second is **complementary capabilities**: the second
model searches differently from the first. The handoff keeps everything the first agent built
and drops only its train of thought.

## Against each agent alone

<BarChart
  orientation="vertical"
  kicker="MLE-bench · 75 tasks · 6 hours each"
  label="Opus 5 alone, GPT-5.6-sol alone, and HMA with Opus 5 first. Any medal: 72.4, 68.0, 78.2. Gold: 50.7, 47.6, 53.8. Above the human median: 85.3, 81.3, 90.7. Mean leaderboard percentile: 84.8, 81.3, 89.0."
  caption="All values are percentages from the HMA repository. Choose a baseline to read the gain over it."
  :series="[
    { key: 'gpt', label: 'GPT-5.6-sol alone', tone: 'pale', hatched: true },
    { key: 'opus', label: 'Opus 5 alone', tone: 'grey' },
    { key: 'hma', label: 'HMA · Opus 5 ⇄ GPT-5.6-sol', tone: 'accent' },
  ]"
  :rows="[
    { label: 'Any medal', values: { gpt: 68.0, opus: 72.4, hma: 78.2 } },
    { label: 'Gold', values: { gpt: 47.6, opus: 50.7, hma: 53.8 } },
    { label: 'Above median', values: { gpt: 81.3, opus: 85.3, hma: 90.7 } },
    { label: 'Mean percentile', values: { gpt: 81.3, opus: 84.8, hma: 89.0 } },
  ]"
  :baselines="['opus', 'gpt']"
  baseline="opus"
  compare="delta"
  suffix="%"
  :decimals="1"
  :max="100"
/>

The same table lists two external systems with longer budgets: ScienceFlow reaches 70.2% in 24
hours, and MLEvolve 65.3% in 12. Every HMA pairing uses six.

<ScatterChart
  kicker="Any-medal rate against time budget"
  label="Any-medal rate against time budget. At 6 hours: HMA pairings 78.2, 73.3, 72.0 and 70.7; Opus 5 alone 72.4; GPT-5.6-sol alone 68.0. ScienceFlow 70.2 at 24 hours; MLEvolve 65.3 at 12 hours."
  :groups="[
    { key: 'hma', label: 'HMA pairings', tone: 'accent' },
    { key: 'solo', label: 'One agent alone', tone: 'ink' },
    { key: 'ext', label: 'External systems', tone: 'grey' },
  ]"
  :points="[
    { x: 6, y: 78.2, group: 'hma', label: 'Opus 5 ⇄ GPT-5.6-sol', highlight: true },
    { x: 6, y: 73.3, group: 'hma', label: 'GPT-5.6-sol ⇄ Opus 5' },
    { x: 6, y: 72.0, group: 'hma', label: 'GPT-5.6-sol ⇄ DeepSeek V4.1 Flash' },
    { x: 6, y: 70.7, group: 'hma', label: 'GPT-5.6-sol ⇄ Kimi K3' },
    { x: 6, y: 72.4, group: 'solo', label: 'Opus 5 alone' },
    { x: 6, y: 68.0, group: 'solo', label: 'GPT-5.6-sol alone' },
    { x: 24, y: 70.2, group: 'ext', label: 'ScienceFlow', highlight: true },
    { x: 12, y: 65.3, group: 'ext', label: 'MLEvolve', highlight: true },
  ]"
  :x="{ label: 'Time budget', suffix: ' h', min: 0, max: 26, decimals: 0 }"
  :y="{ label: 'Any medal', suffix: '%', min: 60, max: 82, decimals: 1 }"
/>

<ResultsTable
  caption="Every workflow in the HMA results table · all values %"
  :columns="[
    { key: 'workflow', label: 'Workflow' },
    { key: 'hours', label: 'Hours', lowerIsBetter: true },
    { key: 'medal', label: 'Any medal', decimals: 1, bar: true },
    { key: 'gold', label: 'Gold', decimals: 1 },
    { key: 'median', label: 'Med+', decimals: 1 },
    { key: 'percentile', label: 'Pctl', decimals: 1 },
  ]"
  :rows="$frontmatter.results"
  sort="medal"
/>

## What to be careful with

- **Order matters a lot.** The same two models score 78.2% with Opus going first and 73.3%
  with GPT-5.6-sol going first. Choosing the best order after the fact flatters the headline.
  The average over pairings, 6.4 points, is the more conservative figure.
- **This is self-reported, and it is not on the official leaderboard.** The
  [MLE-bench leaderboard](https://github.com/openai/mle-bench#leaderboard) has not reviewed
  these runs, and it has not taken new submissions since April. For scale only, its highest
  "All" entry today is 64.44%, with a 24-hour budget and an older model. Different models,
  budgets and repeat counts make that a different experiment, not a lower bar.
- **The paper is not out yet.** The arXiv link will be
  [added with the paper release](https://github.com/humanfia/hma#citation). Until then, the
  full ablations exist only in the repository's
  [experiment map](https://github.com/humanfia/hma/blob/main/docs/experiments.md).

The whole suite reruns from the repository: the baselines, HMA, and the cap and starting-order
ablations. To use the same alternation on your own work, run it as a flow:
[fixed-interrupt flame chase](/flows/fixed-interrupt-flame-chase).

[humanfia/hma](https://github.com/humanfia/hma) · [HMA](/hma/)
