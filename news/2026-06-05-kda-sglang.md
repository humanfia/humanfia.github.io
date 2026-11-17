---
title: 40+ agent-tuned operators in SGLang
description: "More than forty agent-optimised operators are upstream in SGLang. Six of them, with their own pull requests' numbers: +71% throughput, −41% time to first token, 1.52× KDA prefill, up to 2.78× denoising and a 1.41× VAE decode."
date: 2026-06-19
authors:
  - Xiaoyu Zhang
tag: KDA
achievement:
  topic: SGLang
  value: 40
  suffix: "+"
  label: "Agent-tuned operators merged into SGLang"
  body: "One of them lifts Qwen3-Next throughput by 71%."
hero:
  kicker: SGLang · merged upstream
  value: 40
  from: 0
  suffix: "+"
  label: agent-optimised operators merged into SGLang, with twenty more running for GLM5.2 (Humanfia-reported)

# Every figure below is from the pull request it cites (sgl-project/sglang), re-read
# 5 October 2026. Merge dates are GitHub's.
timeline:
  dates: ['4/18', '6/6', '6/8', '6/9', '6/10', '6/19']
  merged: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  prs:
    - { x: 0, y: 1, label: '#22664', detail: 'Qwen3-Next allreduce fusion · +71.4% throughput', tone: accent }
    - { x: 1, y: 2, label: '#27401', detail: 'Cohere2Moe NVFP4 fused MoE · +26% chat', tone: ink }
    - { x: 2, y: 3, label: '#27524', detail: 'Spectral progressive diffusion · up to 2.78×', tone: ink }
    - { x: 3, y: 4, label: '#27431', detail: 'LTX-2 VAE decode · 1.41×', tone: ink }
    - { x: 4, y: 5, label: '#27488', detail: 'KDA CuteDSL prefill · up to 1.52×', tone: accent }
    - { x: 5, y: 6, label: '#28744', detail: 'Router tokenises once · −41% TTFT', tone: ink }
prefill:
  - { label: 2,048 tokens, detail: 0.525 → 0.346 ms, values: { cute: 1.52 } }
  - { label: 4,096 tokens, detail: 0.768 → 0.628 ms, values: { cute: 1.22 } }
  - { label: 8,192 tokens, detail: 1.277 → 1.182 ms, values: { cute: 1.08 } }
cohere:
  - { label: Chat, detail: 1000 in / 1000 out, values: { base: 2.80, vllm: 3.40, pr: 3.54 } }
  - { label: Summarisation, detail: 8000 in / 1000 out, values: { base: 1.68, vllm: 1.90, pr: 2.03 } }
spectral:
  flux1: [[0, 1], [0.01, 1.32], [0.05, 1.63]]
  flux2: [[0, 1], [0.05, 1.77], [0.1, 1.93]]
  zimage: [[0, 1], [0.01, 1.53], [0.05, 2.07], [0.1, 2.33]]
  wan: [[0, 1], [0.01, 1.65], [0.02, 1.86], [0.05, 2.32], [0.1, 2.78]]
  qwen: [[0, 1], [0.05, 1.29], [0.1, 1.27], [0.2, 1.69]]
---

More than **40 operators** optimised by agents have been merged into
[SGLang](https://github.com/sgl-project/sglang), with another batch of twenty running for
GLM5.2.<Sidenote>The count, and which operators it covers, is Humanfia-reported. The numbers
for the six below are each pull request's own.</Sidenote> Six of them have numbers worth
showing.

<LineChart
  kicker="Six merged pull requests · sgl-project/sglang · 2026"
  title="When each one landed"
  label="Merge dates of the six pull requests: #22664 on April 18, #27401 on June 6, #27524 on June 8, #27431 on June 9, #27488 on June 10 and #28744 on June 19."
  :series="[{ key: 'merged', label: 'Merged', tone: 'accent', data: $frontmatter.timeline.merged, step: true, dots: true }]"
  :x="{ categories: $frontmatter.timeline.dates, label: 'Merged' }"
  :y="{ min: 0, max: 6, ticks: [0, 2, 4, 6], decimals: 0, label: 'Pull requests' }"
  :annotations="$frontmatter.timeline.prs"
  :end-labels="false"
  :min-width="480"
  :height="260"
/>

## Prefill: Kimi Delta Attention on Blackwell

[#27488](https://github.com/sgl-project/sglang/pull/27488) fixed the CuteDSL prefill kernel
for Kimi-Linear, whose real gates overflowed `exp()` in fp32 and turned the output into NaN,
and then made it faster than the Triton path it replaces, by reusing its scratch memory
between calls. On B200, with real Kimi-Linear gates:

<BarChart
  kicker="KDA prefill · CuteDSL vs. Triton · B200 · H = 32"
  label="Kimi Delta Attention prefill on B200: CuteDSL is 1.52× faster than Triton at 2,048 tokens, 1.22× at 4,096 and 1.08× at 8,192."
  caption="Single sequence, K = V = 128, bf16. GSM8K on Kimi-Linear-48B: 0.915 with Triton, 0.920 with this prefill."
  :series="[{ key: 'cute', label: 'CuteDSL prefill', tone: 'accent' }]"
  :rows="$frontmatter.prefill"
  :reference="{ value: 1, label: 'Triton 1.00×' }"
  suffix="×"
  :decimals="2"
  :max="2"
/>

## Serving: throughput and time to first token

[#22664](https://github.com/sgl-project/sglang/pull/22664) turns on FlashInfer's allreduce
fusion for Qwen3-Next, where unfused cross-device reduces dominated prefill.

<StatGrid
  lead
  :items="[
    { value: 71.4, from: 0, decimals: 1, prefix: '+', suffix: '%', kicker: 'Request throughput · #22664', text: 'Qwen3-Coder-Next on 4 × H100: 5.49 → 9.41 requests a second.' },
    { value: 63.3, from: 0, decimals: 1, prefix: '−', suffix: '%', kicker: 'Mean time to first token', text: '456.24 → 167.54 ms. Time per output token fell 49.4%.' },
  ]"
/>

[#27401](https://github.com/sgl-project/sglang/pull/27401) unblocks the TensorRT-LLM NVFP4
fused-MoE kernels for Command-A-Plus on B300. Switch the baseline to compare against vLLM.

<BarChart
  kicker="Command-A-Plus NVFP4 · 1 × B300 · requests a second"
  label="Command-A-Plus NVFP4 on one B300, requests a second. Chat: SGLang before 2.80, vLLM 3.40, SGLang with the PR 3.54. Summarisation: 1.68, 1.90 and 2.03."
  :series="[
    { key: 'base', label: 'SGLang before', tone: 'grey', hatched: true },
    { key: 'vllm', label: 'vLLM 0.22.1', tone: 'ink' },
    { key: 'pr', label: 'SGLang + #27401', tone: 'accent' },
  ]"
  :rows="$frontmatter.cohere"
  :baselines="['base', 'vllm']"
  :decimals="2"
/>

[#28744](https://github.com/sgl-project/sglang/pull/28744) has the router tokenise a prompt
once and hand the token ids to the engine, rather than both tokenising it.

<BarChart
  kicker="Router tokenises once · DeepSeek-V4-Flash · 7 engines"
  label="Time to first token, reduction: 29% idle at 60k tokens, 41% idle at 125k tokens, and 34% to 49% under load at 60k tokens."
  :series="[{ key: 'cut', label: 'Lower TTFT', tone: 'accent' }]"
  :rows="[
    { label: 'Idle', detail: '60k-token prompt', values: { cut: 29 } },
    { label: 'Idle', detail: '125k-token prompt', values: { cut: 41 } },
    { label: 'Under load, least', detail: '60k · 10–30 QPS', values: { cut: 34 } },
    { label: 'Under load, most', detail: '60k · 10–30 QPS', values: { cut: 49 } },
  ]"
  suffix="%"
  :max="50"
/>

## Diffusion: denoising and decode

[#27524](https://github.com/sgl-project/sglang/pull/27524) denoises the early, low-frequency
steps at half resolution. The tolerance δ sets how many steps run coarse, so speed rises with
it. Drag across the plot to read each model.

<LineChart
  kicker="Spectral progressive diffusion · RTX A6000 · denoising loop only"
  title="Speedup against the tolerance δ"
  label="Denoising speedup against the tolerance delta. At delta 0.05: FLUX.1 1.63×, FLUX.2-klein 1.77×, Z-Image 2.07×, Wan 2.1 2.32×, Qwen-Image 1.29×. Wan 2.1 reaches 2.78× at delta 0.10; Qwen-Image 1.69× at 0.20."
  caption="δ = 0 is the full-resolution run. The pull request's summary gives Qwen-Image 1.6× at δ = 0.05; its own table measures 1.29× there and 1.69× at δ = 0.20, which is what is drawn."
  :series="[
    { key: 'wan', label: 'Wan 2.1', tone: 'accent', data: $frontmatter.spectral.wan, dots: true },
    { key: 'zimage', label: 'Z-Image', tone: 'ink', data: $frontmatter.spectral.zimage, dots: true },
    { key: 'flux2', label: 'FLUX.2-klein', tone: 'grey', data: $frontmatter.spectral.flux2, dots: true },
    { key: 'flux1', label: 'FLUX.1', tone: 'pale', data: $frontmatter.spectral.flux1, dots: true },
    { key: 'qwen', label: 'Qwen-Image', tone: 'grey', data: $frontmatter.spectral.qwen, dots: true, dashed: true },
  ]"
  :x="{ min: 0, max: 0.2, ticks: [0, 0.05, 0.1, 0.15, 0.2], decimals: 2, tickDecimals: 2, label: 'δ' }"
  :y="{ min: 0.8, max: 3, ticks: [1, 1.5, 2, 2.5, 3], decimals: 2, tickDecimals: 1, suffix: '×' }"
  :reference="{ y: 1, label: 'Full resolution = 1.0×' }"
  :min-width="420"
  :height="300"
/>

[#27431](https://github.com/sgl-project/sglang/pull/27431) runs the LTX-2 video VAE decode in
the channels-last-3d layout, where `Conv3d` is several times faster on Hopper.

<StatGrid
  :items="[
    { value: 1.41, from: 1, decimals: 2, suffix: '×', kicker: 'VAE decode stage · #27431', text: '5.41 → 3.84 s per video; denoising unchanged.' },
    { value: 9.7, from: 0, decimals: 1, prefix: '−', suffix: ' GiB', kicker: 'Peak reserved memory', text: '71.81 → 62.12 GiB, from fewer transposed copies.' },
  ]"
/>

## Why an upstream pull request is the test we like most

A contest track is scored by a harness we can read. A production serving framework is scored by
maintainers who did not ask for the change, do not care that an agent wrote it, and will reject
it if it is slower on a shape we did not think about, harder to maintain, or wrong. Every
number above survived that.

<AnimatedDiagram
  view-box="0 0 640 200"
  :min-width="320"
  :max-width="760"
  kicker="Two gates between a candidate and main"
  label="Agent candidates pass our own benchmark and correctness gate, then maintainer review. Some are stopped at each gate; the ones that pass both are merged."
  :steps="[
    'The agent produces candidate operators.',
    'Our harness refuses the ones that are wrong or not faster.',
    'Maintainers refuse more. What is left is merged.',
  ]"
>
  <path id="sg-lane" class="line dash" d="M20 100 H520" data-step="1" data-draw />
  <g data-step="1">
    <rect class="ink" x="196" y="55" width="8" height="90" />
    <rect class="ink" x="376" y="55" width="8" height="90" />
    <text class="ink" x="200" y="40" text-anchor="middle">our harness</text>
    <text class="ink" x="380" y="40" text-anchor="middle">maintainers</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="520" y="72" width="110" height="56" />
    <text class="on-accent t-lg" x="575" y="106" text-anchor="middle">main</text>
  </g>
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#sg-lane" data-stop="0.34" data-loop />
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#sg-lane" data-stop="0.7" data-loop />
  <rect class="accent" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#sg-lane" data-loop />
  <text class="grey" x="20" y="190" data-step="2">■ refused</text>
  <text class="accent" x="200" y="190" data-step="3">■ merged</text>
</AnimatedDiagram>

[KDA](/kda/) · [KDA-Pilot](https://github.com/BBuf/KDA-Pilot)
