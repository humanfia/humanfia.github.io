---
title: 71 first places on SOL-ExecBench
description: "KDA-generated kernels on the Databricks entry hold 71 of SOL-ExecBench's 235 per-kernel first places, more than any other entrant. It started in June with one 8×B200 node running unattended for a week."
date: 2026-06-22
authors:
  - Lesheng Jin
  - Yuchen Jin
tag: KDA
achievement:
  topic: SOL-ExecBench
  value: 71
  viz: grid
  label: "First places on SOL-ExecBench"
  body: "71 of 235 per-kernel leaderboards, the most of any entrant, on 5 October."
hero:
  kicker: SOL-ExecBench · B200 · board v1.1
  value: 71
  from: 0
  label: per-kernel first places, of 235, the most of any entrant (5 October)
  board:
    - { name: Databricks · KDA, score: 71, us: true }
    - { name: SF Tensor, score: 47 }
    - { name: Infinigence AI, score: 39 }
    - { name: Geometric, score: 24 }

# NVIDIA's public board (research.nvidia.com/benchmarks/sol-execbench), read through its API on
# 5 October 2026: the rank-1 entry of each of the 235 per-kernel leaderboards on the v1.1
# evaluation stack, and the four collection leaderboards. The board moves daily.
firsts:
  - { label: L1 · single operations, detail: 94 kernels, values: { us: 22, sf: 9, inf: 39, geo: 7 } }
  - { label: L2 · fused operations, detail: 82 kernels, values: { us: 36, sf: 18, inf: 0, geo: 4 } }
  - { label: Quantization, detail: 33 kernels, values: { us: 7, sf: 10, inf: 0, geo: 10 } }
  - { label: FlashInfer-Bench, detail: 26 kernels, values: { us: 6, sf: 10, inf: 0, geo: 3 } }
  - { label: All four, detail: 235 kernels, values: { us: 71, sf: 47, inf: 39, geo: 24 }, total: true }
standings:
  - { track: L1 · single operations, rank: 3, score: 0.7963, leader: Infinigence AI, best: 0.8032 }
  - { track: L2 · fused operations, rank: 2, score: 0.7921, leader: SF Tensor, best: 0.7923 }
  - { track: Quantization, rank: 3, score: 0.8861, leader: SF Tensor, best: 0.8916 }
  - { track: FlashInfer-Bench, rank: 3, score: 0.7962, leader: SF Tensor, best: 0.7992 }
---

On a **single 8×B200 node**, over about a week in June, [KDA](/kda/) generated kernels
that took **53 first places** on [SOL-ExecBench](https://research.nvidia.com/benchmarks/sol-execbench),
NVIDIA's leaderboard that scores each kernel against its speed-of-light bound.<Sidenote>The
June count of 53 is Humanfia-reported; the board does not keep history. The counts below are
read from the live board on 5 October.</Sidenote> The run never really stopped. On the board
today, the entry it submits under, Databricks, holds more per-kernel first places than anyone.

<Leaderboard
  kicker="Per-kernel first places · v1.1 · 5 October 2026"
  label="Per-kernel first places on SOL-ExecBench v1.1: Databricks with KDA 71, SF Tensor 47, Infinigence AI 39, Geometric 24, RIAC 18."
  caption="Of 235 kernel leaderboards. Each kernel has one first place."
  :entries="[
    { name: 'Databricks · KDA', score: 71, us: true },
    { name: 'SF Tensor', score: 47 },
    { name: 'Infinigence AI', score: 39 },
    { name: 'Geometric', score: 24 },
    { name: 'RIAC', score: 18 },
  ]"
/>

The firsts are not spread evenly. KDA is strongest on fused operations, where it holds 36 of
82, and weakest on the quantization and FlashInfer kernels, where specialists lead. Switch the
baseline to set our count against any rival's.

<BarChart
  kicker="First places by collection · v1.1 · 5 October 2026"
  label="First places by collection. L1: Databricks 22, SF Tensor 9, Infinigence 39, Geometric 7. L2: 36, 18, 0, 4. Quantization: 7, 10, 0, 10. FlashInfer-Bench: 6, 10, 0, 3. In all: 71, 47, 39, 24."
  :series="[
    { key: 'us', label: 'Databricks · KDA', tone: 'accent' },
    { key: 'sf', label: 'SF Tensor', tone: 'ink' },
    { key: 'inf', label: 'Infinigence AI', tone: 'grey' },
    { key: 'geo', label: 'Geometric', tone: 'pale', hatched: true },
  ]"
  :rows="$frontmatter.firsts"
  :baselines="['sf', 'geo']"
  compare="delta"
/>

A collection is ranked by one SOL score over all of its kernels, so the most
first places do not make the top spot. On those boards, the same entry is second or third
everywhere, within 0.007 of the leader:

<ResultsTable
  caption="Collection leaderboards · SOL score (1 = speed of light, 0.5 = the scoring baseline) · 5 October 2026"
  :columns="[
    { key: 'track', label: 'Collection' },
    { key: 'rank', label: 'Our rank', prefix: '#', lowerIsBetter: true },
    { key: 'score', label: 'Our score', decimals: 4, bar: true },
    { key: 'leader', label: 'Leader' },
    { key: 'best', label: 'Leader’s score', decimals: 4 },
  ]"
  :rows="$frontmatter.standings"
/>

## One node, a week, nobody watching

The number to notice is not the count, it is the cost. Kernel optimisation has historically
priced in a scarce human: someone who knows the architecture, reads the profiler and has the
patience for the twentieth variant. This run cost a machine that was already there, and nobody
watching it.

<AnimatedDiagram
  view-box="0 0 660 240"
  :min-width="340"
  :max-width="780"
  kicker="An unattended queue"
  label="A queue of kernel tasks feeds eight B200 GPUs. Each kernel the agent writes is scored by the board; first places come back as results, and the queue moves on."
  :steps="[
    'A queue of kernels to beat.',
    'Eight B200s, each running the agent loop on one kernel.',
    'Every candidate goes to the board; the queue moves on.',
  ]"
>
  <g data-step="1">
    <rect class="frame" x="10" y="40" width="110" height="34" />
    <rect class="frame" x="10" y="84" width="110" height="34" />
    <rect class="frame" x="10" y="128" width="110" height="34" />
    <rect class="frame" x="10" y="172" width="110" height="34" />
    <text class="ink" x="65" y="26" text-anchor="middle">queue</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="200" y="40" width="60" height="70" />
    <rect class="ink" x="270" y="40" width="60" height="70" />
    <rect class="ink" x="340" y="40" width="60" height="70" />
    <rect class="ink" x="410" y="40" width="60" height="70" />
    <rect class="ink" x="200" y="130" width="60" height="70" />
    <rect class="ink" x="270" y="130" width="60" height="70" />
    <rect class="ink" x="340" y="130" width="60" height="70" />
    <rect class="ink" x="410" y="130" width="60" height="70" />
    <text class="ink" x="335" y="26" text-anchor="middle">8 × B200</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="540" y="80" width="110" height="80" />
    <text class="on-accent t-lg" x="595" y="126" text-anchor="middle">board</text>
  </g>
  <path id="sol-in" class="line dash" d="M120 120 H200" data-step="2" data-draw />
  <path id="sol-out" class="line dash" d="M470 120 H540" data-step="3" data-draw />
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="2" data-travel="#sol-in" data-loop />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#sol-out" data-loop />
</AnimatedDiagram>

That changes which problems are worth attacking. A kernel that would take an engineer three
days and probably yield nothing is not worth an engineer's three days. It is trivially worth a
slot in a queue.

[KDA](/kda/) · [the board](https://research.nvidia.com/benchmarks/sol-execbench) ·
[#1 on L1 in July](/news/2026-07-02-solexec-l1)
