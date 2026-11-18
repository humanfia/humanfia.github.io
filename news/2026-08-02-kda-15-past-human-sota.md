---
title: Past human SOTA on all 3 MLSys tracks
description: "Rerun on the MLSys 2026 FlashInfer contest, KDA's second-generation kernels beat the best human entry on every track: 1.69× on GDN prefill, 1.41× on DSA and 1.17× on MoE, in a public benchmark that pins the human winners' code."
date: 2026-08-02
authors:
  - Dongyun Zou
tag: KDA
achievement:
  topic: MLSys 2026 FlashInfer contest
  value: 1.69
  from: 1
  decimals: 2
  suffix: ×
  viz: versus
  board:
    - { name: best human, score: 1 }
    - { name: KDA, score: 1.69, us: true }
  label: "Past the best human kernels"
  body: "On every MLSys 2026 track: 1.69× on GDN prefill, 1.41× on DSA, 1.17× on MoE."
hero:
  kicker: MLSys 2026 tracks · B200 · vs. the best human entry
  value: 1.69
  from: 1
  decimals: 2
  suffix: ×
  label: the best human kernel's speed on GDN prefill, with 1.41× on DSA and 1.17× on MoE
  boardDecimals: 2
  board:
    - { name: GDN prefill, score: 1.688, us: true }
    - { name: DSA attention, score: 1.408, us: true }
    - { name: MoE FP8, score: 1.173, us: true }
    - { name: Best human entry, score: 1 }

# b200: the public benchmark in mit-han-lab/mlsys2026-flashinfer-contest-solution (README,
# "Results"), which numbers the two generations KDA 0.1 and KDA 0.5; re-read 5 October 2026.
# b300: this post's original table, on B300 under our own protocol, naming them KDA 1.0 and
# 1.5. It has no public source, so it is labelled Humanfia-reported.
tracks:
  - key: b200
    label: B200 · public benchmark
    rows:
      - { label: GDN prefill, values: { old: 1.42, human: 6.06, new: 10.36 } }
      - { label: MoE FP8, values: { old: 0.67, human: 1.33, new: 1.57 } }
      - { label: DSA attention, values: { old: 3.51, human: 27.55, new: 38.33 } }
  - key: b300
    label: B300 · Humanfia-reported
    rows:
      - { label: GDN prefill, values: { old: 1.16, human: 4.42, new: 6.10 } }
      - { label: MoE FP8, values: { old: 0.67, human: 1.80, new: 2.25 } }
      - { label: DSA attention, values: { old: 11.91, human: 22.99, new: 29.95 } }
---

In May, [KDA placed in the top three on every track](/news/2026-05-15-mlsys-flashinfer-top3)
of the MLSys 2026 FlashInfer kernel contest. That was a good result against the field. It was
not a good result against the field's best entries, which were written by people.

The second generation of KDA changes three things and reruns the contest.

<AnimatedDiagram
  view-box="0 0 640 260"
  :min-width="320"
  :max-width="760"
  kicker="What changed in the loop"
  label="The KDA loop with three upgrades: CuteDSL as the kernel language, the IKET profiling skill feeding evidence back, and a better arrangement of who writes, who checks and what carries between attempts."
  :steps="[
    'The loop: an agent writes a kernel, a verifier measures and reviews it.',
    '1. CuteDSL: the agent can express the layouts it wants.',
    '2. IKET: the profile comes back as something an agent can reason from.',
    '3. A better flow: who writes, who checks, what carries between attempts.',
  ]"
>
  <path id="k15-out" class="line dash" d="M200 80 C 270 30, 370 30, 440 80" data-step="1" data-draw />
  <path id="k15-back" class="line dash" d="M440 150 C 370 200, 270 200, 200 150" data-step="1" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="80" width="190" height="70" />
    <text class="on-ink t-lg" x="105" y="121" text-anchor="middle">Agent</text>
    <rect class="ink" x="440" y="80" width="190" height="70" />
    <text class="on-ink t-lg" x="535" y="121" text-anchor="middle">Verifier</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="40" y="186" width="130" height="40" />
    <text class="on-accent" x="105" y="211" text-anchor="middle">1 · CuteDSL</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="470" y="186" width="130" height="40" />
    <text class="on-accent" x="535" y="211" text-anchor="middle">2 · IKET</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="accent" x="245" y="96" width="150" height="40" />
    <text class="on-accent" x="320" y="121" text-anchor="middle">3 · the flow</text>
  </g>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#k15-out" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#k15-back" data-loop />
</AnimatedDiagram>

1. **CuteDSL support**, so the agent can express the layouts it wants rather than the ones the
   previous toolchain made convenient;
2. the **[IKET profiling skill](https://github.com/humanfia/iket-profiling-skill)**, which
   turns a profile into something an agent can reason from instead of a wall of counters; and
3. a **better agent loop flow**: the arrangement of who writes, who checks and what carries
   between attempts.

## The rerun

The kernels are now public, with a benchmark that pins the human winners' own repositories
(Kachua on GDN, Team Wombat on MoE, Dogacel on DSA) and refuses to run if they are modified.
The chart opens against the best human entry; switch the baseline to the FlashInfer baseline
or the contest entry, or switch to the B300 numbers this post first reported.

<BarChart
  kicker="MLSys 2026 tracks · geometric mean over the official workloads"
  label="Speedup over the FlashInfer baseline on B200. GDN prefill: contest entry 1.42×, best human 6.06×, second generation 10.36×. MoE FP8: 0.67×, 1.33×, 1.57×. DSA attention: 3.51×, 27.55×, 38.33×. Against the best human entry, the second generation is 1.69×, 1.17× and 1.41×."
  caption="B200: CUPTI kernel-span timing, not the organisers' wall-clock harness, so these are not contest scores. B300: our first protocol, with no public source."
  :series="[
    { key: 'old', label: 'KDA, contest entry', tone: 'pale', hatched: true },
    { key: 'human', label: 'Best human entry', tone: 'ink' },
    { key: 'new', label: 'KDA, second generation', tone: 'accent' },
  ]"
  :datasets="$frontmatter.tracks"
  :reference="{ value: 1, label: 'FlashInfer baseline 1.00×' }"
  :baselines="['human', 'old']"
  baseline="human"
  suffix="×"
  :decimals="2"
  invert
/>

The MoE row is the one worth sitting with. The contest entry was *slower than the baseline*
there, at 0.67×, and the same application, with a profiling skill and a different loop, is now
past the best human entry. Nothing about the model changed.<Sidenote>The public repository
numbers the two generations KDA 0.1 and KDA 0.5; this post first called them KDA 1.0 and
1.5.</Sidenote>

<StatGrid
  lead
  :items="[
    { value: 1.688, from: 1, decimals: 3, suffix: '×', kicker: 'GDN prefill · over Kachua', text: 'The largest margin over a human winner, at 10.36× the FlashInfer baseline.' },
    { value: 1.57, from: 0.67, decimals: 2, suffix: '×', kicker: 'MoE FP8 · contest entry → now', text: 'From slower than the baseline to 1.17× the best human entry.' },
  ]"
/>

The benchmark's own caveats apply. Tuning targets the official shapes, so do not expect the
same speedups elsewhere, and the pinned human repositories are a few commits past the contest
deadline.

## A workload nobody had tuned

Contest tracks have been optimised by many people, which makes them a fair test and a stale
one. So we also pointed the new loop at k-means for video diffusion, which nobody had worked
over.

::: info Update, October
That work became a CuTe backend for [Flash-KMeans](https://github.com/svg-project/flash-kmeans),
measured at 7.31× on a real LongCat-Video workload on B200. It was merged on 27 August and
reverted the next day; [the October roundup](/news/2026-10-05-kda-upstream) has the details.
An earlier version of this post gave 6.1× on a Wan 2.2 workload, a figure with no public
source, so it is gone.
:::

[KDA](/kda/) ·
[the contest kernels](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest-solution)
