---
title: "KDA: Kernel Design Agents"
description: An agent workflow that writes and tunes GPU kernels on real hardware, and checks that each speedup keeps the output correct. Built with MIT HAN Lab.
layout: page
sidebar: false
aside: false
outline: false
pageClass: kda-page
tag: KDA

# The page is drawn by its own components (.vitepress/theme/components/projects/kda/), from the
# data below. Every figure is from the write-up each section links to.
project:
  status: Open research prototype · built with MIT HAN Lab
  links:
    - { text: NVlabs/kda, href: https://github.com/NVlabs/kda }
    - { text: The project site, href: https://nvlabs.github.io/kda/ }
    - { text: KDA-Pilot, href: https://github.com/BBuf/KDA-Pilot }
    - { text: The wishlist, href: https://github.com/NVlabs/kda/tree/wishlist }

# The hero's race: KDA² on B300, from the KDA² post.
race:
  headline: KDA² · Kimi Delta Attention · B300
  kicker: Forward pass · B300 · 8,192 tokens
  label: geomean speedup over FlashKDA, Moonshot AI's kernel, with a tenth of its final-state error.
  lanes:
    - { name: FlashKDA, score: 1 }
    - { name: KDA + CAKE (CuTe), score: 2.85 }
    - { name: KDA + CAKE (PTX), score: 2.94 }
    - { name: KDA + TIRx, score: 2.96, best: true }
  devices: [B200, B300, H200, RTX PRO 6000, GB10, MI350X]

# What it has done: one tile each, in the order they are laid out.
records:
  - kicker: KDA² · v0.6 · B300
    value: 2.96×
    text: Kimi Delta Attention over FlashKDA at 8,192 tokens, up from 1.61× in eight weeks.
    href: /blog/2026-09-27-kda-for-kda
    size: wide
    viz: climb
    points: [[1, 1.61], [4, 2.45], [6, 2.54], [7, 2.56], [8, 2.93], [11, 2.94], [12, 2.96]]
    ends: [Jul 21 · 1.61×, Sep 12 · 2.96×]
  - kicker: SOL-ExecBench · board v1.1 · 5 October
    value: '71'
    unit: / 235
    text: Per-kernel first places on 5 October, then the most of any entrant (53 in June, Humanfia-reported). Newer entries have taken most of them since.
    href: /news/2026-06-22-sol-bench-batch
    size: wide
    viz: cells
    groups:
      - { label: L1, of: 94, won: 22 }
      - { label: L2, of: 82, won: 36 }
      - { label: Quant, of: 33, won: 7 }
      - { label: FIB, of: 26, won: 6 }
  - kicker: MLSys 2026 · FlashInfer
    value: '#1 #2 #3'
    text: On MoE, DSA and GDN in the Full-Agent tracks. Public KDA 0.5 kernels later passed the best human entry on all three.
    href: /news/2026-08-02-kda-15-past-human-sota
    viz: bars
    max: 2
    bars:
      - { label: GDN prefill, value: 1.69 }
      - { label: DSA, value: 1.41 }
      - { label: MoE FP8, value: 1.17 }
  - kicker: SGLang · upstream
    value: 40+
    text: Agent-optimised operators merged by June; six more pull requests since August, the best adding 8.73% end to end.
    href: /news/2026-10-05-kda-upstream
    viz: blocks
    blocks:
      - { count: 40, label: 40+ operators by June 19 }
      - { count: 6, label: 6 pull requests since August, accent: true }
  - kicker: MSA indexer · B300 · in production
    value: 6.5×
    text: Geomean on prefill; up to 3.3× on long-context decode. Bitwise-identical output (Humanfia-reported).
    href: /news/2026-08-14-msa-indexer
    viz: meter
    max: 15
    bars:
      - { label: Prefill, value: 6.5, detail: 6.5× geo }
      - { label: Chunk tails, value: 14, detail: up to 14× }
      - { label: Decode, value: 3.3, detail: up to 3.3× }
  - kicker: SOL-ExecBench L1 · board v1.0
    value: '0.7639'
    text: First on 94 single-operation kernels, by 0.00006. Third on the newer v1.1 board on 5 October.
    href: /news/2026-07-02-solexec-l1
    viz: board
    bars:
      - { label: Databricks · KDA, value: 0.763936, detail: '0.76394', us: true }
      - { label: ac4k, value: 0.763872, detail: '0.76387' }
      - { label: doubleAI, value: 0.758731, detail: '0.75873' }
  - kicker: SGLang-Diffusion · quality tier
    value: 34.7
    unit: dB
    text: Lowest PSNR of the first six fast paths shipped under --quality high. The bar is 25 dB.
    href: /blog/2026-08-06-sglang-diffusion-quality-tiers
    viz: meter
    max: 60
    floor: { value: 25, label: 25 dB, the bar }
    bars:
      - { label: Worst path, value: 34.68, detail: 34.7 dB }
      - { label: Best path, value: 59.11, detail: 59.1 dB }
  - kicker: AMD MI350X · ROCm/FlyDSL
    value: '2'
    unit: PRs
    text: Merged in AMD's FlyDSL, which has few published kernels to learn from.
    href: /news/2026-06-15-kda-generalizes
    viz: prs
    prs:
      - { label: '#685', href: https://github.com/ROCm/FlyDSL/pull/685, text: 'Batch-aware routing, up to 8% on GQA attention' }
      - { label: '#711', href: https://github.com/ROCm/FlyDSL/pull/711, text: A correct fp8 attention forward path }

# The problem: what KDA² candidates claimed on the synthetic tests, and what each was worth on
# real Kimi-Linear inputs (the KDA² post, "Reward hacking").
hacks:
  - { key: A, name: Input-distribution overfitting, claimed: 3.74, realText: failed completely, note: 'Replaced the L2 normalisation of Q and K with a constant tuned to the test inputs. With the shortcut removed, 2.48×.' }
  - { key: C, name: Illegal history truncation, claimed: 5.16, realText: the speedup vanished, note: Dropped state older than 32 tokens. Measured on one H64 sequence. }
  - { key: D, name: Overflow under extreme gate ranges, claimed: 3.57, realText: NaN on every real case, note: Decay past 126 bits underflowed to zero. The tests never went past about 52. }
  - { key: '✓', name: 'KDA + TIRx, released', claimed: 2.96, real: 2.96, realText: passes all six gates, note: Passes the real Kimi-Linear acceptance suite., released: true }
gates:
  - Fresh seeds and hidden distribution holdouts
  - A strict specification of every legal input
  - CUDA Graph replay with new inputs
  - Stress probes for underflow and overflow
  - Element-wise error bounds, no percentages
  - Real end-to-end Kimi-Linear traces

# How the loop works.
loop:
  - stage: research
    title: Read the code, the profiler and prior art first.
    text: The plan starts from `ncu` reports, a kernel wiki of known techniques, and the repository.
  - stage: contract
    title: Write down the objective and the bar to clear.
    text: The objective, constraints, validation command and promotion bar are fixed before any code is written.
  - stage: ring
    title: Validate and benchmark each iteration.
    text: Incorrect candidates stop at validation. Only a candidate that clears the bar is promoted.
  - stage: record
    title: Log every candidate, result and decision.
    text: Benchmarks, profiles and decisions are logged so another engineer can check the run.

# MLSys 2026 FlashInfer contest: the public release's own table
# (mit-han-lab/mlsys2026-flashinfer-contest-solution, README "Results"): geomean over the
# official workloads on B200, CUPTI kernel spans, speedup over the FlashInfer baseline. `margin`
# is the release's geomean of per-workload ratios over the best human entry.
mlsys:
  - { track: GDN prefill, detail: GDN track, place: '#3', max: 12, kda01: 1.42, human: 6.06, kda05: 10.36, margin: 1.688 }
  - { track: MoE FP8, detail: MoE track, place: '#1', max: 2, kda01: 0.67, human: 1.33, kda05: 1.57, margin: 1.173 }
  - { track: DSA attention, detail: DSA track, place: '#2', max: 40, kda01: 3.51, human: 27.55, kda05: 38.33, margin: 1.408 }

# KDA²: the best result over time, from the KDA² post.
timeline:
  dates: ['6/16', '7/21', '7/30', '8/10', '8/14', '8/25', '8/30', '9/1', '9/2', '9/3', '9/4', '9/6', '9/12']
  kda: [[1, 1.61], [2, 1.61], [3, 1.61], [4, 2.45], [5, 2.45], [6, 2.54], [7, 2.56], [8, 2.93], [9, 2.93], [10, 2.93], [11, 2.94], [12, 2.96]]
  cake: [[2, 2.048], [3, 2.048], [4, 2.09], [5, 2.373], [6, 2.373], [7, 2.373], [8, 2.373], [9, 2.373], [10, 2.732], [11, 2.94]]
  reference: { x: 0, y: 1.5, label: INT21 reference }
  milestones:
    - { x: 4, label: Humanize, tone: accent }
    - { x: 6, label: TIRx }
    - { x: 7, label: CAKE with KDA }
    - { x: 8, label: TIRx }
    - { x: 11, label: CAKE }
    - { x: 12, label: TIRx, tone: accent }
  refused: [3.28, 3.57, 3.74]

# SGLang pull requests since August, from the upstream write-up. Merge dates are GitHub's.
upstream:
  from: '2026-08-25'
  to: '2026-10-03'
  start: '#36865'
  before: { value: 40+, text: operators by June 19, href: /news/2026-06-05-kda-sglang }
  reverted:
    pr: flash-kmeans#23
    date: '2026-08-27'
    revertedOn: '2026-08-28'
    href: https://github.com/svg-project/flash-kmeans/pull/23
    text: A KDA backend for Flash-KMeans (7.31× on LongCat-Video) was merged in August and reverted the next day. It is not counted here.
  prs:
    - { pr: '#36845', date: '2026-08-30', change: QSA decode, hw: SM121 (GB10), result: 'Fixes silent corruption in long-context decode. 2.07× the old correct kernel.' }
    - { pr: '#37385', date: '2026-09-01', change: KernelBackend.KDA, hw: any, result: 'SGLang records which of its kernels an agent wrote.' }
    - { pr: '#36865', date: '2026-09-02', change: NVFP4 GEMM for Qwen3.x, hw: SM120, kernel: 1.319, kernelText: 1.319×, model: 1.087, modelLabel: Output throughput, result: 'Kernel geomean over 16 production shapes; Qwen3.5-4B output throughput +8.73% at concurrency 1.' }
    - { pr: '#38082', date: '2026-09-05', change: FP8 skinny GEMM, hw: SM120, result: 'End to end, +0.2% to +4.06% across five models.' }
    - { pr: '#41305', date: '2026-09-27', change: SANA-Video residual-gate add, hw: H200, kernel: 2.54, model: 1.017, result: 'On the two real SANA-Video layouts; −1.7% end-to-end time.' }
    - { pr: '#41459', date: '2026-10-01', change: LTX-2.3 QK norm + split RoPE, hw: H200, kernel: 2.59, kernelText: 2.58–2.61×, model: 1.011, result: 'Kernel geomean; −1.0% to −1.2% end-to-end time.' }
---

<script setup>
import KdaHero from '../.vitepress/theme/components/projects/kda/KdaHero.vue'
import KdaSection from '../.vitepress/theme/components/projects/kda/KdaSection.vue'
import KdaBoard from '../.vitepress/theme/components/projects/kda/KdaBoard.vue'
import KdaHacks from '../.vitepress/theme/components/projects/kda/KdaHacks.vue'
import KdaLoop from '../.vitepress/theme/components/projects/kda/KdaLoop.vue'
import KdaContest from '../.vitepress/theme/components/projects/kda/KdaContest.vue'
import KdaClimb from '../.vitepress/theme/components/projects/kda/KdaClimb.vue'
import KdaMerges from '../.vitepress/theme/components/projects/kda/KdaMerges.vue'
import KdaCoda from '../.vitepress/theme/components/projects/kda/KdaCoda.vue'
</script>

<KdaHero />

<KdaSection id="what-it-has-done" n="01" kicker="What it has done" title="Every result here was measured by an outside contest, leaderboard or maintainer." lede="Each tile links to its write-up.">
<template #figure>
<KdaBoard :records="$frontmatter.records" />
</template>
</KdaSection>

<KdaSection id="the-problem" n="02" kicker="The problem" title="An incorrect kernel can still report a speedup." tone="alt" split>

Speed is easy to measure; correctness is easy to break without noticing. KDA's own agents
produced kernels like this on the way to KDA². Six gates now stop them before release.

<template #figure>
<KdaHacks :hacks="$frontmatter.hacks" :gates="$frontmatter.gates" href="/blog/2026-09-27-kda-for-kda" />
</template>
</KdaSection>

<KdaSection id="how-the-loop-works" n="03" kicker="How the loop works" title="Research, a contract, then small verified steps.">
<template #figure>
<KdaLoop :steps="$frontmatter.loop" />
</template>
</KdaSection>

<KdaSection id="speedups-past-the-best-human-kernels" n="04" kicker="Speedups" title="Ahead of the best human entries on all three MLSys 2026 tracks." tone="ink" lede="In May, two of KDA's five contest kernels were still slower than the baseline. With CuteDSL, a profiling skill and a better flow, the same model passed the best human entries on all three tracks.">
<template #figure>
<KdaContest :tracks="$frontmatter.mlsys" />

<p class="kd-caption">B200, speedup over the FlashInfer baseline; each track has its own scale. From <a class="kd-link" href="https://github.com/mit-han-lab/mlsys2026-flashinfer-contest-solution#results" target="_blank" rel="noreferrer">the public release's table</a>: geomean over the official workloads, timed as CUPTI kernel spans, not as the contest scored. Margins are geomeans of per-workload ratios over the best human entry.</p>
</template>
</KdaSection>

<KdaSection id="kda-squared" n="05" kicker="KDA²" title="Kimi Delta Attention: from 1.61× to 2.96× over FlashKDA." lede="Eight weeks of results on B300. Scroll to play the chart, or point at any date.">
<template #figure>
<KdaClimb v-bind="$frontmatter.timeline" />

<p class="kd-caption">Geomean over six 8,192-token workloads. Candidates at 3.28×, 3.57× and 3.74× overfitted the tests and were refused; see <a class="kd-link" href="/blog/2026-09-27-kda-for-kda">the KDA² post</a>.</p>
</template>
</KdaSection>

<KdaSection id="upstream-kernels-a-maintainer-merged" n="06" kicker="Upstream" title="Kernels merged into SGLang by its maintainers." tone="alt" lede="Each pull request reports the kernel speedup and the end-to-end effect on the model.">
<template #figure>
<KdaMerges v-bind="$frontmatter.upstream" />
</template>
</KdaSection>

<KdaSection id="results-as-they-came-in" n="07" kicker="Results, as they came in" title="Results by date, May to October 2026.">
<template #figure>
<ProjectTimeline
  kicker="KDA · every write-up"
  label="KDA results from May to October 2026: first, second and third on the MLSys tracks, forty operators in SGLang, speedups on AMD hardware, 71 first places on SOL-ExecBench, lossless SGLang-Omni numerics, first on SOL-ExecBench L1, KDA 0.5 past the human entries, quality tiers for diffusion, the MSA indexer, KDA², and six more SGLang pull requests."
  :entries="[
    { url: '/news/2026-05-15-mlsys-flashinfer-top3', metric: '#1 · #2 · #3', note: '' },
    { url: '/news/2026-06-05-kda-sglang', metric: '40+ ops', note: '' },
    { url: '/news/2026-06-15-kda-generalizes', metric: 'ASM · HIP · ROCm', note: '' },
    { url: '/news/2026-06-22-sol-bench-batch', metric: '71 × #1', note: '' },
    { url: '/blog/2026-07-02-sglang-omni-numerics', metric: '+20%', note: 'Three PRs cut about a fifth off LTX-2.3 time on B200.' },
    { url: '/news/2026-07-02-solexec-l1', metric: '#1 · 0.7639', note: '' },
    { url: '/news/2026-08-02-kda-15-past-human-sota', metric: 'Past human entries', note: '' },
    { url: '/blog/2026-08-06-sglang-diffusion-quality-tiers', metric: 'Quality tiers', note: 'A quality setting that lets faster diffusion kernels ship.' },
    { url: '/news/2026-08-14-msa-indexer', metric: '6.5×', note: '' },
    { url: '/blog/2026-09-27-kda-for-kda', metric: '2.96×', note: '' },
    { url: '/news/2026-10-05-kda-upstream', metric: '6 PRs', note: '' },
  ]"
/>
</template>
</KdaSection>

<KdaCoda command="git clone --recurse-submodules https://github.com/NVlabs/kda.git">
<template #why>

KDA runs on our flows: its first runs used RLCR Flow, now the [`humanize1`](/flows/humanize1)
flow, and KDA² runs on [Humanize](/humanize/) flows. Results come from outside
benchmarks and from pull requests that upstream maintainers merged.

</template>
<template #try>

Each task brings its own evaluator, data and profiling tools. [The repository](https://github.com/NVlabs/kda)
has the agent flow, prompts and skills. Kernels people want next are in the
[KDA wishlist](https://github.com/NVlabs/kda/tree/wishlist): request one as a pull request to
its `wishlist` branch.

</template>
</KdaCoda>
