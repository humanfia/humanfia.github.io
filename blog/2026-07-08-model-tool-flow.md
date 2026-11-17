---
title: "Model, Tool, Flow: 2, 18, 50 of 50"
description: The same model, measured three ways (raw API, the vendor's CLI, and that CLI inside a flow) on PutnamBench, Physics Cup, SuperChem and an HLE subset. Putting the CLI inside a flow adds more than the CLI's own tools do.
date: 2026-07-08
authors:
  - Zhengyang Zhang
  - Changye Li
tag: Humanize

hero:
  kicker: PutnamBench · one GPT model, three ways
  value: 50
  from: 2
  suffix: /50
  label: inside a Humanize flow. The same model scores 18 with its own CLI, and 2 through the raw API.
  board:
    - { name: Flow · the CLI in Humanize, score: 50, us: true }
    - { name: Tool · the vendor's CLI, score: 18 }
    - { name: Model · the raw API, score: 2 }

# Humanfia-reported: from our own runs, not published elsewhere.
levels:
  - key: putnam
    label: PutnamBench
    max: 50
    suffix: ''
    decimals: 0
    rows:
      - { label: PutnamBench, detail: solved of 50, values: { api: 2, cli: 18, flow: 50 } }
  - key: physics
    label: Physics Cup
    max: 50
    suffix: ''
    decimals: 0
    rows:
      - { label: Physics Cup, detail: solved of 50, values: { api: 22, cli: 33, flow: 40 } }
  - key: superchem
    label: SuperChem
    max: 100
    suffix: '%'
    decimals: 1
    rows:
      - { label: SuperChem, detail: accuracy, values: { api: 47.0, cli: 56.8, flow: 62.4 } }
  - key: hle
    label: HLE subset
    max: 100
    suffix: '%'
    decimals: 0
    rows:
      - { label: HLE subset, detail: accuracy, values: { api: 29, cli: 42, flow: 63 } }
# The same numbers as a share of each benchmark: PutnamBench and Physics Cup out of 50.
ladder:
  putnam: [[0, 4], [1, 36], [2, 100]]
  physics: [[0, 44], [1, 66], [2, 80]]
  superchem: [[0, 47.0], [1, 56.8], [2, 62.4]]
  hle: [[0, 29], [1, 42], [2, 63]]
---

There is a claim we keep making on this site: the loop around the agent is worth a large
multiple on hard work. It is easy to assert and annoying to measure. This is the cleanest
version of the measurement we have.

One model. Three ways of running it. Four benchmarks.<Sidenote>These are Humanfia-reported
numbers from our own runs. The [KDA² post](/blog/2026-09-27-kda-for-kda) later repeated the
ablation with four newer models, and found the same pattern for every one of them.</Sidenote>

<AnimatedDiagram
  view-box="0 0 600 300"
  :min-width="300"
  :max-width="720"
  kicker="Three levels · one model"
  label="Three levels of running the same model on PutnamBench: the raw API solves 2 of 50; the same model in its vendor's CLI, with a shell, files and a compiler, solves 18; the same CLI inside a Humanize flow solves 50."
  :steps="[
    'Model level: the API, called directly. 2 of 50.',
    'Tool level: the vendor’s CLI around it, with a shell, files and a compiler. 18 of 50.',
    'Flow level: the same CLI inside a Humanize flow, which decides who is asked what, in what order, and when to stop. 50 of 50.',
  ]"
>
  <g data-step="3" data-pop>
    <rect class="accent" x="10" y="10" width="580" height="280" />
    <text class="on-accent t-lg" x="30" y="42">Flow</text>
    <text class="on-accent t-xl" x="570" y="46" text-anchor="end">50</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="60" y="70" width="480" height="200" />
    <text class="on-ink t-lg" x="80" y="102">Tool</text>
    <text class="on-ink t-xl" x="520" y="106" text-anchor="end">18</text>
  </g>
  <g data-step="1" data-pop>
    <rect class="frame" x="150" y="140" width="300" height="100" />
    <text class="ink t-lg" x="170" y="172">Model</text>
    <text class="ink t-xl" x="430" y="176" text-anchor="end">2</text>
    <text x="300" y="220" text-anchor="middle">solved of 50</text>
  </g>
</AnimatedDiagram>

<BarChart
  orientation="vertical"
  kicker="One GPT model · three levels of scaffolding"
  label="Model, tool and flow level for one GPT model. PutnamBench 2, 18 and 50 of 50. Physics Cup 22, 33 and 40 of 50. SuperChem 47.0%, 56.8% and 62.4%. HLE subset 29%, 42% and 63%."
  caption="Switch benchmarks, and choose a baseline to read the gain over it. Tool level on PutnamBench was measured without the comparator gate."
  :series="[
    { key: 'api', label: 'Model (API)', tone: 'pale', hatched: true },
    { key: 'cli', label: 'Tool (CLI)', tone: 'grey' },
    { key: 'flow', label: 'Flow (Humanize)', tone: 'accent' },
  ]"
  :datasets="$frontmatter.levels"
  :baselines="['api', 'cli']"
  baseline="cli"
  compare="delta"
/>

## Reading the table

**Tools are worth a lot.** Giving the model a shell, a file system and a compiler multiplies it
on the formal benchmarks: 2 to 18 on PutnamBench. Nobody disputes this, and it is why coding
CLIs exist.

**The flow is worth more.** From 18 to 50 on PutnamBench, and from 42% to 63% on the HLE
subset, is not a refinement of the tool-level result. It is a different regime. It comes from
holding the model and the tools fixed and changing only who is asked what, in what order, and
when the run is allowed to stop.

> The flow does not make the model smarter. It stops the run from wasting what the model
> already has.

**The saturation is informative too.** Put every benchmark on one scale and the ladders differ.
PutnamBench climbs from 4% to 100%. Physics Cup goes 22 → 33 → 40 of 50, a real gain that is
visibly running into something the loop cannot fix.

<LineChart
  kicker="Share of each benchmark solved, by level"
  title="Not every benchmark is loop-limited"
  label="Share solved at the model, tool and flow level. PutnamBench 4, 36, 100 percent. Physics Cup 44, 66, 80 percent. SuperChem 47.0, 56.8, 62.4 percent. HLE subset 29, 42, 63 percent."
  :series="[
    { key: 'putnam', label: 'PutnamBench', tone: 'accent', data: $frontmatter.ladder.putnam, dots: true },
    { key: 'hle', label: 'HLE subset', tone: 'ink', data: $frontmatter.ladder.hle, dots: true },
    { key: 'physics', label: 'Physics Cup', tone: 'grey', data: $frontmatter.ladder.physics, dots: true, dashed: true },
    { key: 'superchem', label: 'SuperChem', tone: 'pale', data: $frontmatter.ladder.superchem, dots: true, dashed: true },
  ]"
  :x="{ categories: ['Model', 'Tool', 'Flow'], label: 'Level' }"
  :y="{ min: 0, max: 100, ticks: [0, 25, 50, 75, 100], decimals: 1, tickDecimals: 0, suffix: '%' }"
  :height="300"
/>

Not every benchmark is loop-limited. A method that claimed to help everywhere equally would be
describing something other than what it does.

That is what Humanize is, in the least glamorous sense available: a model-ability booster, worth
the most where the model has ability the run was wasting.

[The flows](/flows/) · [the runtime](/humanize/) ·
[the same ablation, four models later](/blog/2026-09-27-kda-for-kda#humanize-better-flows-stronger-agents)
