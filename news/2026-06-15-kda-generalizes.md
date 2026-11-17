---
title: 2 KDA PRs merged in AMD's FlyDSL
description: "On AMD MI350X, with thin documentation and few published kernels to copy, KDA landed two pull requests in FlyDSL: a batch-aware routing fix worth up to 8% on GQA attention, and a correct fp8 attention forward path."
date: 2026-06-26
authors:
  - Jin Pan
tag: KDA
hero:
  kicker: ROCm/FlyDSL · MI350X (gfx950)
  value: 2
  from: 0
  label: pull requests merged into AMD's FlyDSL, both driven by rocm-KDA-pilot

# From the two pull requests (ROCm/FlyDSL#685 and #711), re-read 5 October 2026.
routing:
  - { label: GQA bf16, detail: causal · B 8 · S 192, values: { generic: 35.1, swp: 32.3 } }
  - { label: GQA fp16, detail: causal · B 8 · S 192, values: { generic: 35.1, swp: 32.5 } }
  - { label: GQA bf16, detail: non-causal · B 8 · S 192, values: { generic: 34.6, swp: 32.8 } }
  - { label: GQA fp16, detail: non-causal · B 8 · S 192, values: { generic: 35.1, swp: 33.0 } }
fp8:
  - { label: aiter asm fp8, detail: the target · 1,300–1,351, values: { tf: 1300 } }
  - { label: FlyDSL bf16, detail: reference, values: { tf: 1113 } }
  - { label: FlyDSL fp8, detail: default · high-precision P, values: { tf: 969 } }
  - { label: FlyDSL fp8, detail: native · opt-in, values: { tf: 721 } }
  - { label: FlyDSL fp8, detail: packed P · opt-in, values: { tf: 643 } }
---

Everything published about [KDA](/kda/) so far had been on NVIDIA hardware, with
excellent documentation, a mature profiler and a large public corpus of prior kernels. That is a
reasonable place to start and a bad place to stop, because it leaves the obvious objection
open: perhaps the agent is retrieving, not reasoning.

So we pointed it at hardware with much less to retrieve: AMD's MI350X (gfx950), through
[FlyDSL](https://github.com/ROCm/FlyDSL), AMD's Python kernel language, driven by
[rocm-KDA-pilot](https://github.com/jhinpan/rocm-KDA-pilot). Two of its pull requests are
merged.

<LineChart
  kicker="ROCm/FlyDSL · June 2026"
  title="Opened to merged"
  label="#685 was opened on June 16 and merged on June 18. #711 was opened on June 20 and merged on June 26."
  :series="[
    { key: 'p685', label: '#685 routing', tone: 'ink', data: [[0, 1], [2, 1]], dots: true },
    { key: 'p711', label: '#711 fp8 forward', tone: 'accent', data: [[4, 2], [10, 2]], dots: true },
  ]"
  :x="{ min: 0, max: 10, ticks: [0, 2, 4, 6, 8, 10], decimals: 0, tickDecimals: 0, label: 'Days after June 16', unit: ' days' }"
  :y="{ min: 0, max: 3, ticks: [1, 2], decimals: 0, label: 'Pull request' }"
  :annotations="[
    { x: 2, y: 1, label: '#685 merged', detail: 'June 18', tone: 'ink' },
    { x: 10, y: 2, label: '#711 merged', detail: 'June 26', tone: 'accent' },
  ]"
  :end-labels="false"
  :height="200"
/>

## #685: send each shape to the faster kernel

FlyDSL has two attention forward kernels on gfx950: a software-pipelined one that wins on long
sequences, and a generic one that wins on very short ones. The old rule picked between them by
sequence length alone. [#685](https://github.com/ROCm/FlyDSL/pull/685) makes the rule
batch-aware, because the pipeline's fixed cost is paid back over batch × sequence length. The
shapes it re-routes get faster:

<BarChart
  kicker="Re-routed shapes · forward time · MI350X"
  label="Forward time at batch 8 and sequence length 192 for GQA: the generic kernel 34.6 to 35.1 microseconds, the pipelined kernel 32.3 to 33.0 microseconds, 5% to 8% faster."
  caption="Switch the baseline to read each as a fraction of the old time. MHA at the same shape is within ±2%, and every other shape keeps its old routing; 160 of 160 correctness runs pass."
  :series="[
    { key: 'generic', label: 'Generic (old rule)', tone: 'grey', hatched: true },
    { key: 'swp', label: 'Pipelined (#685)', tone: 'accent' },
  ]"
  :rows="$frontmatter.routing"
  :baselines="['generic']"
  suffix=" µs"
  :decimals="1"
  :max="40"
/>

## #711: a correct fp8 attention forward

[#711](https://github.com/ROCm/FlyDSL/pull/711) adds an fp8 (e4m3fn) forward to the pipelined
kernel, with three operand-precision modes. All three pass the fp8 accuracy gate, and the
existing bf16 and fp16 paths are byte-identical.

It does not reach the hand-written assembly. The pull request says so: a further 19 rounds of
profile-driven tuning did not beat the default path, which is held back by register-limited
occupancy, not by compute.

<BarChart
  kicker="Attention forward · B 1 · S 2048 · H 64 · D 128 · non-causal"
  label="Attention forward throughput on MI350X: aiter assembly fp8 about 1,300 to 1,351 TFLOPS, FlyDSL bf16 1,113, FlyDSL fp8 default 969, native 721, packed 643."
  caption="The assembly kernel is drawn at the low end of its 1,300–1,351 TFLOPS range. The default fp8 path reaches about 72–75% of it."
  :series="[{ key: 'tf', label: 'TFLOPS', tone: 'accent' }]"
  :rows="$frontmatter.fp8"
  suffix=" TF"
  :max="1400"
/>

<AnimatedDiagram
  view-box="0 0 640 230"
  :min-width="320"
  :max-width="760"
  kicker="The same loop, less to read"
  label="On ROCm the loop is the same, but the agent has less to retrieve: it writes a kernel, measures it on the MI350X, reads the profile, and goes round again."
  :steps="[
    'The agent writes a FlyDSL kernel with little prior code to copy.',
    'It measures on the MI350X and checks correctness against a reference.',
    'The profile comes back as evidence, and the loop goes round again.',
  ]"
>
  <path id="amd-out" class="line dash" d="M200 80 C 270 30, 370 30, 440 80" data-step="2" data-draw />
  <path id="amd-back" class="line dash" d="M440 150 C 370 200, 270 200, 200 150" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="80" width="190" height="70" />
    <text class="on-ink t-lg" x="105" y="121" text-anchor="middle">KDA agent</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="440" y="80" width="190" height="70" />
    <text class="on-accent t-lg" x="535" y="121" text-anchor="middle">MI350X</text>
  </g>
  <text class="ink" x="320" y="26" text-anchor="middle" data-step="2">kernel + reference check</text>
  <text class="ink" x="320" y="222" text-anchor="middle" data-step="3">timings &amp; profile</text>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#amd-out" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#amd-back" data-loop />
</AnimatedDiagram>

This is the property that decides whether any of this lasts. New accelerators arrive with no
corpus at all. A loop that works only where the answers already exist on the internet is a
search engine with extra steps. A loop that works on thin documentation, and says plainly where
it stopped, is a method.

[KDA](/kda/) · [rocm-KDA-pilot](https://github.com/jhinpan/rocm-KDA-pilot) ·
[NVlabs/kda](https://github.com/NVlabs/kda)
