---
title: 6.5× faster MSA prefill indexer
description: "On B300, KDA found the hardware the MSA prefill and decode indexers were leaving idle: a 6.5× geometric mean on prefill, up to 14× on chunk tails, up to 3.3× on decode, and bitwise-identical output throughout. Humanfia-reported."
date: 2026-08-14
authors:
  - Jiaming Tang
tag: KDA
achievement:
  topic: MSA indexer
  value: 6.5
  from: 1
  decimals: 1
  suffix: ×
  label: "MSA indexer, in production"
  body: "Prefill on B300, bitwise-identical output. Humanfia-reported."
hero:
  kicker: MSA prefill indexer · B300 · production serving
  value: 6.5
  from: 1
  decimals: 1
  suffix: ×
  label: geometric-mean speedup across the prefill workloads, with bitwise-identical output (Humanfia-reported)
---

This one is not a contest. It is a kernel in a serving path that somebody is paying for by the
hour, which is a harder test in one specific way: there is no track to win, only a regression to
avoid.<Sidenote>The kernels are in a production serving stack that is not public, so every
number here is Humanfia-reported.</Sidenote>

<BarChart
  kicker="MSA indexers · B300 · speedup over the previous kernel"
  label="Speedups over the previous MSA indexer kernels on B300: prefill 6.5× geometric mean and up to 14× on end-of-prefill chunk tails; decode 2.9× at the TP4 promotion shape and up to 3.3× on longer contexts."
  caption="Humanfia-reported. No workload in the set regressed, and the output is bitwise identical in every one."
  :series="[{ key: 's', label: 'KDA', tone: 'accent' }]"
  :rows="[
    { label: 'Prefill', detail: 'geometric mean, all workloads', values: { s: 6.5 } },
    { label: 'Prefill', detail: 'end-of-prefill chunk tails, best', values: { s: 14 } },
    { label: 'Decode', detail: 'TP4 promotion shape', values: { s: 2.9 } },
    { label: 'Decode', detail: 'longer contexts, best', values: { s: 3.3 } },
  ]"
  :reference="{ value: 1, label: 'Previous kernel 1.00×' }"
  suffix="×"
  :decimals="1"
  :max="15"
  invert
/>

## Prefill

The MSA prefill indexer was badly underusing the hardware during long-context serving on B300.
[KDA](/kda/) found it and rewrote around it: **6.5×** as a geometric mean across the
workloads tested, **up to 14×** on the end-of-prefill chunk tails, where the underuse was
worst and the shape least convenient, and **no regression** anywhere in the set.

The tails are the interesting part. A profile averaged over a run hides them, and a human
optimising by eye tends to spend the week on the shape in the middle of the histogram. An agent
reading `ncu` output as evidence has no such preference.

## Decode

The MSA decode indexer, used in speculative verification, went **2.9× faster at the TP4
promotion shape**, and **up to 3.3×** on longer contexts. The first number is past the 2.78×
that a bandwidth-bound kernel could reach at that shape, so the win is not bandwidth alone.

<RangeMeter
  kicker="Decode at the TP4 promotion shape"
  label="Decode speedup at the TP4 promotion shape is 2.9×, beyond the 2.78× theoretical bandwidth band; longer contexts reach 3.3×."
  status="A speedup of this size is"
  unit="×"
  :min="1"
  :max="3.5"
  :value="2.9"
  :decimals="2"
  :markers="[
    { value: 2.78, label: '2.78×', note: 'the theoretical bandwidth band' },
    { value: 2.9, label: '2.9×', note: 'KDA at the TP4 promotion shape' },
    { value: 3.3, label: '3.3×', note: 'KDA on longer contexts' },
  ]"
  :zones="[
    { from: 1, to: 2.78, label: 'explainable by moving bytes faster' },
    { from: 2.78, to: 3.5, label: 'beyond the bandwidth band: more than bandwidth alone', tone: 'accent' },
  ]"
/>

## The gate

Accuracy was **bitwise identical** across every tested workload. That is the gate, not a
footnote: a kernel that is faster because it has quietly become incorrect will report a speedup
just as happily as one that is faster because it is better.

<AnimatedDiagram
  view-box="0 0 640 200"
  :min-width="320"
  :max-width="760"
  kicker="Fast, and bitwise identical, or not at all"
  label="Candidate kernels run into two gates: no regression on any workload, and bitwise-identical output. Candidates that fail either are refused; the one that passes both ships."
  :steps="[
    'Two gates: no workload slower, and every output bit the same.',
    'A faster candidate that changes a bit is refused.',
    'One that passes both ships.',
  ]"
>
  <path id="msa-lane" class="line dash" d="M20 100 H520" data-step="1" data-draw />
  <g data-step="1">
    <rect class="ink" x="196" y="55" width="8" height="90" />
    <rect class="ink" x="376" y="55" width="8" height="90" />
    <text class="ink" x="200" y="40" text-anchor="middle">no regression</text>
    <text class="ink" x="380" y="40" text-anchor="middle">bitwise identical</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="520" y="72" width="110" height="56" />
    <text class="on-accent t-lg" x="575" y="106" text-anchor="middle">ship</text>
  </g>
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#msa-lane" data-stop="0.7" data-loop />
  <rect class="accent" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#msa-lane" data-loop />
  <text class="grey" x="20" y="190" data-step="2">■ faster, one bit off</text>
  <text class="accent" x="320" y="190" data-step="3">■ faster, identical</text>
</AnimatedDiagram>

[KDA](/kda/) · [NVlabs/kda](https://github.com/NVlabs/kda)
