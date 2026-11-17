---
title: 6 KDA PRs merged into SGLang
description: "Since August, SGLang has merged six pull requests carrying kernels our agents wrote, the best adding 8.7% end-to-end throughput. The MLSys contest kernels are public with a benchmark anyone can rerun. One merge elsewhere, Flash-KMeans, was reverted the next day."
date: 2026-10-01
authors:
  - Xiaoyu Zhang
  - Dongyun Zou
  - Ligeng Zhu
tag: KDA
achievement:
  topic: SGLang
  value: 8.7
  prefix: "+"
  decimals: 1
  suffix: "%"
  label: "Throughput from one KDA kernel in SGLang"
  body: "Qwen3.5-4B at concurrency 1, from one of six KDA pull requests SGLang merged since August."
hero:
  kicker: sgl-project/sglang · 30 August – 1 October
  value: 6
  from: 0
  label: pull requests carrying KDA-written kernels, merged into SGLang
  boardDecimals: 2
  board:
    - { name: '#41459 LTX-2.3 QK norm + RoPE', score: 2.59, us: true }
    - { name: '#41305 SANA-Video residual gate', score: 2.54, us: true }
    - { name: '#36845 QSA decode (GB10)', score: 2.07, us: true }
    - { name: '#36865 NVFP4 GEMM (SM120)', score: 1.32, us: true }

# Every figure is from the pull request it cites, re-read 5 October 2026; merge dates are
# GitHub's. The hero board is each pull request's kernel speedup (geometric mean).
timeline:
  dates: ['8/27', '8/28', '8/30', '9/1', '9/2', '9/5', '9/27', '10/1']
  sglang: [[0, 0], [1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6]]
  kmeans: [[0, 1], [1, 0], [7, 0]]
  prs:
    - { x: 0, y: 1, label: 'flash-kmeans#23', detail: 'CuTe backend merged · 7.31×', tone: grey }
    - { x: 1, y: 0, label: 'flash-kmeans#24', detail: 'reverted the next day', tone: grey }
    - { x: 2, y: 1, label: '#36845', detail: 'QSA decode on GB10 · a correctness fix', tone: accent }
    - { x: 3, y: 2, label: '#37385', detail: 'KernelBackend.KDA provenance', tone: ink }
    - { x: 4, y: 3, label: '#36865', detail: 'NVFP4 GEMM · +8.73% end to end', tone: accent }
    - { x: 5, y: 4, label: '#38082', detail: 'FP8 skinny GEMM · up to +4.06%', tone: ink }
    - { x: 6, y: 5, label: '#41305', detail: 'SANA-Video residual gate · 2.54×', tone: accent }
    - { x: 7, y: 6, label: '#41459', detail: 'LTX-2.3 QK norm + RoPE · 2.59×', tone: accent }
kernelVsModel:
  - { label: '#41305', detail: SANA-Video · H200, values: { kernel: 2.54, model: 1.017 } }
  - { label: '#41459', detail: LTX-2.3 · H200, values: { kernel: 2.59, model: 1.011 } }
  - { label: '#36865', detail: Qwen3.5-4B · SM120, values: { kernel: 1.319, model: 1.087 } }
sweep:
  q4b: [[0, 8.73], [1, 6.84], [2, 7.12], [3, 6.52]]
  q9b: [[0, 3.18], [1, 2.78], [2, 2.82], [3, 2.70]]
fp8:
  - { label: Qwen3-14B-FP8, values: { m1: 3.128, m2: 3.292, m4: 3.750, m8: 4.060 } }
  - { label: Qwen3.8-27B, detail: mixed ModelOpt, values: { m1: 1.396, m2: 0.257, m4: 0.200, m8: 3.401 } }
  - { label: Qwen3-8B-FP8, values: { m1: 0.995, m2: 0.743, m4: 0.999, m8: 1.577 } }
  - { label: Nemotron-3-Super, detail: 120B-A12B, values: { m1: 1.083, m2: 1.192, m4: 1.891, m8: 0.557 } }
  - { label: Llama-3.1-8B-FP8, values: { m1: 0.751, m2: 1.075, m4: 0.967, m8: 0.921 } }
qsa:
  geomean: [[1, 2.72], [2, 2.31], [3, 2.02], [4, 1.93], [5, 1.82], [6, 1.67], [7, 1.77], [8, 1.72], [9, 1.73], [10, 1.67], [11, 1.64], [12, 1.61], [13, 1.79], [14, 1.77], [15, 1.82], [16, 1.83], [17, 1.86]]
  min: [[1, 1.71], [2, 1.76], [3, 1.79], [4, 1.63], [5, 1.56], [6, 1.41], [7, 1.68], [8, 1.57], [9, 1.61], [10, 1.54], [11, 1.48], [12, 1.48], [13, 1.52], [14, 1.51], [15, 1.55], [16, 1.58], [17, 1.58]]
kmeans:
  - { label: B200, detail: cold · 10 iterations · 30.33 → 4.15 ms, values: { s: 7.31 } }
  - { label: B200, detail: warm · 2 iterations · 6.43 → 0.92 ms, values: { s: 7.01 } }
  - { label: RTX PRO 6000, detail: cold · 26.93 → 7.59 ms, values: { s: 3.55 } }
  - { label: RTX PRO 6000, detail: warm · 6.41 → 1.60 ms, values: { s: 4.00 } }
contest:
  - { label: GDN prefill, values: { s: 1.688 } }
  - { label: DSA attention, values: { s: 1.408 } }
  - { label: MoE FP8, values: { s: 1.173 } }
---

A kernel that wins a benchmark is a claim. A kernel a maintainer merges into the engine people
serve models with is something else, and that is the bar this post is about. Since August, six
pull requests carrying [KDA](/kda/)-written kernels have been merged into
[SGLang](https://github.com/sgl-project/sglang), all from Xiaoyu Zhang. We also count one
merge elsewhere that did not stay.

<LineChart
  kicker="Merged upstream · 2026"
  title="Six in, one out"
  label="KDA pull requests merged into SGLang: #36845 on August 30, #37385 on September 1, #36865 on September 2, #38082 on September 5, #41305 on September 27 and #41459 on October 1. Flash-KMeans #23 was merged on August 27 and reverted on August 28."
  :series="[
    { key: 'sglang', label: 'SGLang, merged', tone: 'accent', data: $frontmatter.timeline.sglang, step: true, dots: true },
    { key: 'kmeans', label: 'Flash-KMeans', tone: 'grey', data: $frontmatter.timeline.kmeans, step: true, dashed: true },
  ]"
  :x="{ categories: $frontmatter.timeline.dates, label: 'Merged' }"
  :y="{ min: 0, max: 6, ticks: [0, 2, 4, 6], decimals: 0, label: 'Pull requests' }"
  :annotations="$frontmatter.timeline.prs"
  :min-width="520"
  :height="280"
/>

## Into SGLang

| Pull request | What it does | Measured |
| --- | --- | --- |
| [#36865](https://github.com/sgl-project/sglang/pull/36865) | NVFP4 GEMM for Qwen3.x on SM120 | 1.319× kernel geomean over 16 production shapes; Qwen3.5-4B output throughput **+8.73%** at concurrency 1 |
| [#38082](https://github.com/sgl-project/sglang/pull/38082) | FP8 skinny GEMM on SM120 | end to end +0.2% to **+4.06%** across five models |
| [#41305](https://github.com/sgl-project/sglang/pull/41305) | SANA-Video residual-gate add on H200 | **2.54×** on the two real SANA-Video layouts; −1.7% end-to-end time |
| [#41459](https://github.com/sgl-project/sglang/pull/41459) | LTX-2.3 QK norm + split RoPE on H200 | **2.58×** to 2.61× kernel geomean; −1.0% to −1.2% end-to-end time |
| [#36845](https://github.com/sgl-project/sglang/pull/36845) | QSA decode on SM121 (GB10) | a correctness fix: the old path silently corrupted long-context decode; the new kernel is 2.07× the old correct one |
| [#37385](https://github.com/sgl-project/sglang/pull/37385) | registers the merged diffusion agent kernels under `KernelBackend.KDA` | provenance, so the engine records which kernels an agent wrote |

Two things in that table are worth reading slowly.

**A kernel speedup is not a model speedup.** The two diffusion kernels are about 2.5× faster on
their own and save one to two percent of a whole video generation, because they are a small
part of it. Both pull requests report both numbers. Switch the chart's baseline to see each
as a fraction of the other.

<BarChart
  kicker="The same change, measured twice"
  label="Kernel speedup against whole-model speedup. #41305: kernel 2.54×, end to end 1.017×. #41459: kernel 2.59×, end to end 1.011×. #36865: kernel 1.319×, end-to-end output throughput 1.087×."
  caption="Kernel: geometric mean over the pull request's workloads (#41459 is the median of its three runs). Model: SANA-Video and LTX-2.3 saved-request time; Qwen3.5-4B output throughput at concurrency 1."
  :series="[
    { key: 'kernel', label: 'The kernel alone', tone: 'ink' },
    { key: 'model', label: 'The whole model', tone: 'accent' },
  ]"
  :rows="$frontmatter.kernelVsModel"
  :reference="{ value: 1, label: 'Before 1.00×' }"
  :baselines="['kernel']"
  suffix="×"
  :decimals="3"
  :max="3"
/>

#36865's gain is a decode gain, so it shows most when one request has the GPU to itself:

<LineChart
  kicker="#36865 · NVFP4 GEMM · RTX PRO 6000 (SM120)"
  title="Output throughput gain by concurrency"
  label="Output throughput gain from the KDA NVFP4 GEMM. Qwen3.5-4B: 8.73% at concurrency 1, 6.84% at 2, 7.12% at 4, 6.52% at 8. Qwen3.5-9B: 3.18%, 2.78%, 2.82% and 2.70%."
  :series="[
    { key: 'q4b', label: 'Qwen3.5-4B', tone: 'accent', data: $frontmatter.sweep.q4b, dots: true },
    { key: 'q9b', label: 'Qwen3.5-9B', tone: 'ink', data: $frontmatter.sweep.q9b, dots: true, dashed: true },
  ]"
  :x="{ categories: ['1', '2', '4', '8'], label: 'Concurrent requests' }"
  :y="{ min: 0, max: 10, ticks: [0, 2.5, 5, 7.5, 10], decimals: 2, tickDecimals: 1, suffix: '%' }"
  :height="240"
/>

[#38082](https://github.com/sgl-project/sglang/pull/38082) is the same idea for FP8 at small
batch sizes, measured across five models. The gains are small and real, and they vary by model
and batch size more than by anything else:

<BarChart
  kicker="#38082 · FP8 skinny GEMM · end-to-end gain by batch size M"
  label="End-to-end gain from the FP8 skinny GEMM. Qwen3-14B-FP8: 3.13%, 3.29%, 3.75%, 4.06% at M 1, 2, 4, 8. Qwen3.8-27B: 1.40%, 0.26%, 0.20%, 3.40%. Qwen3-8B-FP8: 1.00%, 0.74%, 1.00%, 1.58%. Nemotron-3-Super: 1.08%, 1.19%, 1.89%, 0.56%. Llama-3.1-8B-FP8: 0.75%, 1.08%, 0.97%, 0.92%."
  caption="Against the FlashInfer/cuBLAS fallback, with the existing GEMV path disabled for the measurement, on 2 × RTX PRO 6000."
  :series="[
    { key: 'm1', label: 'M = 1', tone: 'pale' },
    { key: 'm2', label: 'M = 2', tone: 'grey' },
    { key: 'm4', label: 'M = 4', tone: 'ink' },
    { key: 'm8', label: 'M = 8', tone: 'accent' },
  ]"
  :rows="$frontmatter.fp8"
  suffix="%"
  :decimals="2"
  :max="5"
/>

**A correctness fix can also be a speedup.** On GB10 (SM121), the old QSA decode path returned
token 0 for every long-context request while reporting success.
[#36845](https://github.com/sgl-project/sglang/pull/36845) replaces it with one kernel KDA
wrote, which groups the twelve query heads that share a KV head into one block. Against the
original correct Triton kernel, across batch sizes:

<LineChart
  kicker="#36845 · QSA decode · GB10 · both tensor-parallel layouts"
  title="Decode speedup over the correct Triton kernel"
  label="QSA decode speedup over the original correct Triton kernel by batch size: geometric mean 2.72× at batch 1, falling to 1.61× at batch 12 and 1.86× at batch 17; the minimum never drops below 1.41×."
  caption="64 of 64 sweep cases pass, with a maximum relative L2 error of 0.0024."
  :series="[
    { key: 'g', label: 'Geometric mean', tone: 'accent', data: $frontmatter.qsa.geomean, dots: true },
    { key: 'm', label: 'Slowest case', tone: 'ink', data: $frontmatter.qsa.min, dashed: true },
  ]"
  :x="{ min: 1, max: 17, ticks: [1, 4, 8, 12, 16], decimals: 0, tickDecimals: 0, label: 'Batch size', unit: ' requests' }"
  :y="{ min: 1, max: 3, ticks: [1, 1.5, 2, 2.5, 3], decimals: 2, tickDecimals: 1, suffix: '×' }"
  :reference="{ y: 1, label: 'Triton = 1.0×' }"
  :height="260"
/>

**A pull request can get smaller under review.** #41305 began with 40 kernel families. It
merged with one, after every family that showed a measured regression, or had no established
end-to-end benefit, was taken out. The rule: keep a family only if end-to-end time improved by
at least 1.5% in both of two measurement groups. The other 39 are listed in its
[selection record](https://github.com/BBuf/sglang/blob/42d1d19e5f876e7b5977fb55d90073230bce1655/diffusion-prs/kda-residual-gate-h200-20260927/selection.json).

<AnimatedDiagram
  view-box="0 0 600 220"
  :min-width="320"
  :max-width="720"
  kicker="#41305 · 40 kernel families in, 1 out"
  label="Forty candidate kernel families from the agent; thirty-nine are removed for a measured regression or no end-to-end benefit; the residual-gate add is the one merged."
  :steps="[
    'KDA, running with Codex and Kimi K3, proposed 40 kernel families.',
    '39 are taken out: a measured regression, or no end-to-end benefit.',
    'One survives both measurement groups and is merged.',
  ]"
>
  <g data-step="1">
    <rect class="ink" x="20" y="40" width="20" height="20" />
    <rect class="ink" x="48" y="40" width="20" height="20" />
    <rect class="ink" x="76" y="40" width="20" height="20" />
    <rect class="ink" x="104" y="40" width="20" height="20" />
    <rect class="ink" x="132" y="40" width="20" height="20" />
    <rect class="ink" x="160" y="40" width="20" height="20" />
    <rect class="ink" x="188" y="40" width="20" height="20" />
    <rect class="ink" x="216" y="40" width="20" height="20" />
    <rect class="ink" x="20" y="68" width="20" height="20" />
    <rect class="ink" x="48" y="68" width="20" height="20" />
    <rect class="ink" x="76" y="68" width="20" height="20" />
    <rect class="ink" x="104" y="68" width="20" height="20" />
    <rect class="ink" x="132" y="68" width="20" height="20" />
    <rect class="ink" x="160" y="68" width="20" height="20" />
    <rect class="ink" x="188" y="68" width="20" height="20" />
    <rect class="ink" x="216" y="68" width="20" height="20" />
    <rect class="ink" x="20" y="96" width="20" height="20" />
    <rect class="ink" x="48" y="96" width="20" height="20" />
    <rect class="ink" x="76" y="96" width="20" height="20" />
    <rect class="ink" x="104" y="96" width="20" height="20" />
    <rect class="ink" x="132" y="96" width="20" height="20" />
    <rect class="ink" x="160" y="96" width="20" height="20" />
    <rect class="ink" x="188" y="96" width="20" height="20" />
    <rect class="ink" x="216" y="96" width="20" height="20" />
    <rect class="ink" x="20" y="124" width="20" height="20" />
    <rect class="ink" x="48" y="124" width="20" height="20" />
    <rect class="ink" x="76" y="124" width="20" height="20" />
    <rect class="ink" x="104" y="124" width="20" height="20" />
    <rect class="ink" x="132" y="124" width="20" height="20" />
    <rect class="ink" x="160" y="124" width="20" height="20" />
    <rect class="ink" x="188" y="124" width="20" height="20" />
    <rect class="ink" x="216" y="124" width="20" height="20" />
    <rect class="ink" x="20" y="152" width="20" height="20" />
    <rect class="ink" x="48" y="152" width="20" height="20" />
    <rect class="ink" x="76" y="152" width="20" height="20" />
    <rect class="ink" x="104" y="152" width="20" height="20" />
    <rect class="ink" x="132" y="152" width="20" height="20" />
    <rect class="ink" x="160" y="152" width="20" height="20" />
    <rect class="ink" x="188" y="152" width="20" height="20" />
    <rect class="ink" x="216" y="152" width="20" height="20" />
  </g>
  <g data-step="2">
    <rect class="grey" x="20" y="40" width="20" height="20" />
    <rect class="grey" x="48" y="40" width="20" height="20" />
    <rect class="grey" x="76" y="40" width="20" height="20" />
    <rect class="grey" x="104" y="40" width="20" height="20" />
    <rect class="grey" x="132" y="40" width="20" height="20" />
    <rect class="grey" x="160" y="40" width="20" height="20" />
    <rect class="grey" x="188" y="40" width="20" height="20" />
    <rect class="grey" x="216" y="40" width="20" height="20" />
    <rect class="grey" x="20" y="68" width="20" height="20" />
    <rect class="grey" x="48" y="68" width="20" height="20" />
    <rect class="grey" x="76" y="68" width="20" height="20" />
    <rect class="grey" x="104" y="68" width="20" height="20" />
    <rect class="grey" x="132" y="68" width="20" height="20" />
    <rect class="grey" x="160" y="68" width="20" height="20" />
    <rect class="grey" x="188" y="68" width="20" height="20" />
    <rect class="grey" x="216" y="68" width="20" height="20" />
    <rect class="grey" x="20" y="96" width="20" height="20" />
    <rect class="grey" x="48" y="96" width="20" height="20" />
    <rect class="grey" x="76" y="96" width="20" height="20" />
    <rect class="grey" x="132" y="96" width="20" height="20" />
    <rect class="grey" x="160" y="96" width="20" height="20" />
    <rect class="grey" x="188" y="96" width="20" height="20" />
    <rect class="grey" x="216" y="96" width="20" height="20" />
    <rect class="grey" x="20" y="124" width="20" height="20" />
    <rect class="grey" x="48" y="124" width="20" height="20" />
    <rect class="grey" x="76" y="124" width="20" height="20" />
    <rect class="grey" x="104" y="124" width="20" height="20" />
    <rect class="grey" x="132" y="124" width="20" height="20" />
    <rect class="grey" x="160" y="124" width="20" height="20" />
    <rect class="grey" x="188" y="124" width="20" height="20" />
    <rect class="grey" x="216" y="124" width="20" height="20" />
    <rect class="grey" x="20" y="152" width="20" height="20" />
    <rect class="grey" x="48" y="152" width="20" height="20" />
    <rect class="grey" x="76" y="152" width="20" height="20" />
    <rect class="grey" x="104" y="152" width="20" height="20" />
    <rect class="grey" x="132" y="152" width="20" height="20" />
    <rect class="grey" x="160" y="152" width="20" height="20" />
    <rect class="grey" x="188" y="152" width="20" height="20" />
    <rect class="grey" x="216" y="152" width="20" height="20" />
  </g>
  <path id="up-keep" class="line dash" d="M114 116 C 114 196, 340 196, 440 125" data-step="3" data-draw />
  <g data-step="3" data-pop>
    <rect class="accent" x="104" y="96" width="20" height="20" />
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="440" y="85" width="150" height="70" />
    <text class="on-accent t-lg" x="515" y="126" text-anchor="middle">merged</text>
  </g>
  <text class="ink" x="20" y="24" data-step="1">40 families</text>
  <text class="grey" x="20" y="205" data-step="2">■ removed · 39</text>
  <text class="accent" x="250" y="205" data-step="3">■ kept · 1</text>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#up-keep" data-loop />
</AnimatedDiagram>

Three of the six (#36845, #41305 and #41459) credit the kernel to KDA running with Codex and
**Kimi K3**.

## The contest kernels, public

The MLSys 2026 FlashInfer contest kernels are now
[public](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest-solution) (Dongyun Zou),
as release **KDA 0.5**, with a benchmark that pins the human winners' own repositories and
refuses to run if they are modified. On B200, as the geometric mean over the official
workloads:

<BarChart
  kicker="KDA 0.5 vs. the best human entry · B200"
  label="KDA 0.5 against the best human entry on B200: GDN prefill 1.688×, DSA attention 1.408×, MoE FP8 1.173×. Over the FlashInfer baseline: 10.36×, 38.33× and 1.57×."
  :series="[{ key: 's', label: 'KDA 0.5', tone: 'accent' }]"
  :rows="$frontmatter.contest"
  :reference="{ value: 1, label: 'Best human entry 1.00×' }"
  suffix="×"
  :decimals="3"
  :max="2"
/>

The repository [states its own caveats](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest-solution#results),
and they apply here:

- The timing is CUPTI kernel spans. The contest was scored by the organisers' wall-clock
  harness, so these are not contest scores.
- The kernels are tuned to the official shapes, so do not expect the same speedups elsewhere.
- The pinned human repositories are a few commits past the contest deadline.
- The repository numbers its releases from 0.1, the original contest entry. Our
  [August post](/news/2026-08-02-kda-15-past-human-sota) first called the same two generations
  KDA 1.0 and 1.5, and reported B300 numbers under a different protocol; it now leads with
  these.

## One merge that did not stay

On 27 August, [svg-project/flash-kmeans#23](https://github.com/svg-project/flash-kmeans/pull/23)
merged a KDA-generated CuTe backend for Flash-KMeans, by Dongyun Zou and Ligeng Zhu, on a real
LongCat-Video workload:

<BarChart
  kicker="Flash-KMeans · CuTe backend vs. Triton · LongCat-Video [64, 37440, 128], K = 293"
  label="Flash-KMeans CuTe backend against Triton: B200 7.31× cold and 7.01× warm; RTX PRO 6000 3.55× cold and 4.00× warm."
  caption="Both backends must agree on inertia (relative difference 2e-5) before any time is reported. The backend was reverted the next day."
  :series="[{ key: 's', label: 'CuTe backend (reverted)', tone: 'grey', hatched: true }]"
  :rows="$frontmatter.kmeans"
  :reference="{ value: 1, label: 'Triton 1.00×' }"
  suffix="×"
  :decimals="2"
  :max="8"
/>

The next day the maintainer [reverted it](https://github.com/svg-project/flash-kmeans/pull/24)
to keep the repository simple and asked for it to go to FlashLib instead. That has not happened
yet. So, for now, it is not upstream, and we do not count it.

## And the long version

How our agents wrote Kimi Delta Attention kernels up to 2.96× faster than FlashKDA on B300, and
how they tried to cheat along the way, is in
[KDA²: KDA optimizes KDA](/blog/2026-09-27-kda-for-kda).

[KDA](/kda/) · [kernel-design-agents](https://github.com/mit-han-lab/kernel-design-agents)
