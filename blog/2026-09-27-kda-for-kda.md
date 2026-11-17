---
title: "KDA²: Kernel Design Agents (KDA) Optimize Kimi Delta Attention (KDA)"
description: Our agents wrote Kimi Delta Attention kernels that run up to 2.96× faster than FlashKDA on B300 with a tenth of its state error. Here is how, and how the agents tried to cheat along the way.
date: 2026-09-27
authors:
  - Dongyun Zou
  - Yixin Dong
  - Hongyi Jin
  - Junxian Guo
  - Yahui Cui
  - Avery Huang
  - Zihao Ye
  - Junru Shao
  - Changye Li
  - Zijian Zhang
  - Sihao Liu
  - Song Bian
  - Ligeng Zhu
tag: KDA
canonical: https://nvlabs.github.io/kda/blog/2026-09-27-kda-for-kda/
head:
  - - link
    - rel: canonical
      href: https://nvlabs.github.io/kda/blog/2026-09-27-kda-for-kda/

# The headline figure in the hero (PostMeta.vue).
hero:
  kicker: KDA → KDA · B300 forward
  value: 2.96
  from: 1
  decimals: 2
  suffix: ×
  label: geomean speedup over FlashKDA, with a tenth of its final-state error
  board:
    - { name: KDA + TIRx, score: 2.96, us: true }
    - { name: KDA + CAKE (PTX), score: 2.94, us: true }
    - { name: KDA + CAKE (CuTe), score: 2.85, us: true }
    - { name: FlashKDA, score: 1 }

# The figures' data, from the original post's source (NVlabs/kda, `pages` branch,
# app/blog/2026-09-27-kda-for-kda/). The error and token curves there were digitised from the
# original figures; their endpoints match the reported values.
speedup:
  - { label: H96 fixed, detail: 1 × 8192, values: { cute: 2.76, tirx: 3.11 } }
  - { label: H96 mixed varlen, detail: 6 seqs, values: { cute: 3.24, tirx: 3.03 } }
  - { label: H96 uniform varlen, detail: 8 × 1024, values: { cute: 2.59, tirx: 2.47 } }
  - { label: H64 fixed, detail: 1 × 8192, values: { cute: 2.51, tirx: 3.61 } }
  - { label: H64 mixed varlen, detail: 6 seqs, values: { cute: 3.55, tirx: 3.29 } }
  - { label: H64 uniform varlen, detail: 8 × 1024, values: { cute: 2.56, tirx: 2.43 } }
  - { label: Geomean, detail: all six, values: { cute: 2.85, tirx: 2.96 }, total: true }
timeline:
  dates: ['6/16', '7/21', '7/30', '8/10', '8/14', '8/25', '8/30', '9/1', '9/2', '9/3', '9/4', '9/6', '9/12']
  kda: [[1, 1.61], [2, 1.61], [3, 1.61], [4, 2.45], [5, 2.45], [6, 2.54], [7, 2.56], [8, 2.93], [9, 2.93], [10, 2.93], [11, 2.94], [12, 2.96]]
  cake: [[2, 2.048], [3, 2.048], [4, 2.09], [5, 2.373], [6, 2.373], [7, 2.373], [8, 2.373], [9, 2.373], [10, 2.732], [11, 2.94]]
  int21: [[0, 1.5]]
  milestones:
    - { x: 4, y: 2.45, label: Humanize, detail: 8/14 · KDA 2.45×, tone: accent }
    - { x: 6, y: 2.54, label: TIRx, detail: 8/30 · 2.54×, tone: ink }
    - { x: 7, y: 2.56, label: CAKE with KDA, detail: 9/1 · 2.56×, tone: grey }
    - { x: 8, y: 2.93, label: TIRx, detail: 9/2 · 2.93×, tone: ink }
    - { x: 11, y: 2.94, label: CAKE, detail: 9/6 · 2.94×, tone: grey }
    - { x: 12, y: 2.96, label: TIRx, detail: 9/12 · 2.96×, tone: ink }
humanize:
  - key: putnam
    label: PutnamBench
    max: 50
    rows:
      - { label: GPT-5.6-sol, values: { api: 3, cli: 46, flow: 50 } }
      - { label: Kimi-K3, values: { api: 1, cli: 4, flow: 47 } }
      - { label: GLM-5.3, values: { api: 0, cli: 2, flow: 25 } }
      - { label: DeepSeek V4 Pro, values: { api: 0, cli: 4, flow: 13 } }
  - key: physics
    label: Physics Cup
    max: 50
    rows:
      - { label: GPT-5.6-sol, values: { api: 31, cli: 41, flow: 44 } }
      - { label: Kimi-K3, values: { api: 35, cli: 37, flow: 42 } }
      - { label: GLM-5.3, values: { api: 24, cli: 34, flow: 40 } }
      - { label: DeepSeek V4 Pro, values: { api: 32, cli: 35, flow: 39 } }
accuracy:
  flashkda: [[32, 0.431], [96, 0.432], [160, 0.431], [224, 0.433], [288, 0.437], [352, 0.44], [416, 0.447], [480, 0.455], [544, 0.462], [608, 0.467], [672, 0.471], [736, 0.473], [800, 0.47], [864, 0.464], [928, 0.46], [992, 0.459], [1056, 0.464], [1120, 0.466], [1184, 0.464], [1248, 0.459], [1312, 0.458], [1376, 0.467], [1440, 0.481], [1504, 0.488], [1568, 0.485], [1632, 0.473], [1696, 0.462], [1760, 0.456], [1824, 0.452], [1888, 0.444], [1952, 0.433], [2016, 0.418], [2080, 0.407], [2144, 0.403], [2208, 0.406], [2272, 0.414], [2336, 0.421], [2400, 0.426], [2464, 0.431], [2528, 0.437], [2592, 0.445], [2656, 0.457], [2720, 0.463], [2784, 0.468], [2848, 0.472], [2912, 0.47], [2976, 0.47], [3040, 0.473], [3104, 0.477], [3168, 0.476], [3232, 0.471], [3296, 0.468], [3360, 0.463], [3424, 0.466], [3488, 0.474], [3552, 0.475], [3616, 0.472], [3680, 0.466], [3744, 0.463], [3808, 0.464], [3872, 0.465], [3936, 0.466], [4000, 0.455], [4064, 0.448], [4128, 0.453], [4192, 0.459], [4256, 0.462], [4320, 0.458], [4384, 0.457], [4448, 0.458], [4512, 0.456], [4576, 0.46], [4640, 0.464], [4704, 0.465], [4768, 0.467], [4832, 0.476], [4896, 0.492], [4960, 0.504], [5024, 0.515], [5088, 0.525], [5152, 0.525], [5216, 0.52], [5280, 0.516], [5344, 0.521], [5408, 0.521], [5472, 0.514], [5536, 0.505], [5600, 0.5], [5664, 0.504], [5728, 0.513], [5792, 0.521], [5856, 0.529], [5920, 0.543], [5984, 0.57], [6048, 0.6], [6112, 0.628], [6176, 0.652], [6240, 0.667], [6304, 0.68], [6368, 0.692], [6432, 0.696], [6496, 0.682], [6560, 0.659], [6624, 0.639], [6688, 0.626], [6752, 0.628], [6816, 0.639], [6880, 0.647], [6944, 0.654], [7008, 0.661], [7072, 0.662], [7136, 0.662], [7200, 0.665], [7264, 0.667], [7328, 0.664], [7392, 0.652], [7456, 0.642], [7520, 0.633], [7584, 0.626], [7648, 0.632], [7712, 0.643], [7776, 0.651], [7840, 0.665], [7904, 0.673], [7968, 0.671], [8032, 0.674], [8096, 0.686], [8160, 0.694]]
  cute: [[32, 0.32], [96, 0.32], [160, 0.317], [224, 0.315], [288, 0.315], [352, 0.311], [416, 0.307], [480, 0.304], [544, 0.303], [608, 0.3], [672, 0.296], [736, 0.294], [800, 0.29], [864, 0.284], [928, 0.281], [992, 0.279], [1056, 0.278], [1120, 0.276], [1184, 0.273], [1248, 0.272], [1312, 0.269], [1376, 0.268], [1440, 0.268], [1504, 0.266], [1568, 0.262], [1632, 0.258], [1696, 0.255], [1760, 0.255], [1824, 0.256], [1888, 0.256], [1952, 0.257], [2016, 0.259], [2080, 0.259], [2144, 0.258], [2208, 0.259], [2272, 0.261], [2336, 0.261], [2400, 0.259], [2464, 0.259], [2528, 0.26], [2592, 0.259], [2656, 0.26], [2720, 0.26], [2784, 0.259], [2848, 0.258], [2912, 0.262], [2976, 0.266], [3040, 0.265], [3104, 0.262], [3168, 0.261], [3232, 0.26], [3296, 0.263], [3360, 0.267], [3424, 0.269], [3488, 0.27], [3552, 0.268], [3616, 0.267], [3680, 0.267], [3744, 0.267], [3808, 0.266], [3872, 0.264], [3936, 0.263], [4000, 0.262], [4064, 0.26], [4128, 0.259], [4192, 0.259], [4256, 0.26], [4320, 0.258], [4384, 0.256], [4448, 0.253], [4512, 0.25], [4576, 0.25], [4640, 0.248], [4704, 0.248], [4768, 0.249], [4832, 0.248], [4896, 0.25], [4960, 0.254], [5024, 0.255], [5088, 0.255], [5152, 0.255], [5216, 0.256], [5280, 0.256], [5344, 0.255], [5408, 0.255], [5472, 0.254], [5536, 0.252], [5600, 0.251], [5664, 0.25], [5728, 0.245], [5792, 0.24], [5856, 0.237], [5920, 0.236], [5984, 0.235], [6048, 0.235], [6112, 0.235], [6176, 0.235], [6240, 0.234], [6304, 0.236], [6368, 0.238], [6432, 0.239], [6496, 0.24], [6560, 0.243], [6624, 0.243], [6688, 0.247], [6752, 0.249], [6816, 0.249], [6880, 0.251], [6944, 0.251], [7008, 0.252], [7072, 0.252], [7136, 0.249], [7200, 0.249], [7264, 0.249], [7328, 0.248], [7392, 0.25], [7456, 0.251], [7520, 0.25], [7584, 0.249], [7648, 0.251], [7712, 0.25], [7776, 0.247], [7840, 0.244], [7904, 0.242], [7968, 0.241], [8032, 0.238], [8096, 0.24], [8160, 0.242]]
  tirx: [[32, 0.426], [96, 0.426], [160, 0.423], [224, 0.42], [288, 0.418], [352, 0.414], [416, 0.411], [480, 0.412], [544, 0.411], [608, 0.408], [672, 0.404], [736, 0.404], [800, 0.403], [864, 0.4], [928, 0.396], [992, 0.392], [1056, 0.39], [1120, 0.388], [1184, 0.388], [1248, 0.388], [1312, 0.385], [1376, 0.384], [1440, 0.386], [1504, 0.388], [1568, 0.389], [1632, 0.39], [1696, 0.391], [1760, 0.393], [1824, 0.395], [1888, 0.396], [1952, 0.396], [2016, 0.393], [2080, 0.39], [2144, 0.389], [2208, 0.388], [2272, 0.389], [2336, 0.387], [2400, 0.386], [2464, 0.389], [2528, 0.388], [2592, 0.388], [2656, 0.391], [2720, 0.392], [2784, 0.391], [2848, 0.388], [2912, 0.385], [2976, 0.382], [3040, 0.381], [3104, 0.384], [3168, 0.387], [3232, 0.39], [3296, 0.393], [3360, 0.392], [3424, 0.393], [3488, 0.394], [3552, 0.394], [3616, 0.393], [3680, 0.39], [3744, 0.388], [3808, 0.383], [3872, 0.378], [3936, 0.379], [4000, 0.379], [4064, 0.38], [4128, 0.379], [4192, 0.379], [4256, 0.377], [4320, 0.375], [4384, 0.375], [4448, 0.373], [4512, 0.37], [4576, 0.37], [4640, 0.37], [4704, 0.373], [4768, 0.375], [4832, 0.379], [4896, 0.381], [4960, 0.378], [5024, 0.379], [5088, 0.385], [5152, 0.386], [5216, 0.385], [5280, 0.385], [5344, 0.385], [5408, 0.386], [5472, 0.388], [5536, 0.391], [5600, 0.388], [5664, 0.382], [5728, 0.376], [5792, 0.373], [5856, 0.371], [5920, 0.372], [5984, 0.369], [6048, 0.364], [6112, 0.363], [6176, 0.366], [6240, 0.366], [6304, 0.366], [6368, 0.366], [6432, 0.367], [6496, 0.368], [6560, 0.369], [6624, 0.372], [6688, 0.373], [6752, 0.374], [6816, 0.374], [6880, 0.376], [6944, 0.379], [7008, 0.379], [7072, 0.375], [7136, 0.37], [7200, 0.366], [7264, 0.365], [7328, 0.368], [7392, 0.37], [7456, 0.369], [7520, 0.368], [7584, 0.366], [7648, 0.364], [7712, 0.367], [7776, 0.373], [7840, 0.372], [7904, 0.369], [7968, 0.369], [8032, 0.37], [8096, 0.372], [8160, 0.374]]
ablation:
  speedupFocused: [[4.79, 1.098], [6.73, 1.15], [7.22, 1.25], [7.39, 1.286], [7.87, 1.33], [7.98, 1.339], [8.09, 1.384], [8.14, 1.532], [10.72, 1.562], [11.21, 1.584], [12.42, 1.689], [12.87, 1.687], [13.49, 1.762], [13.78, 1.838], [13.95, 1.85]]
  speedupAllShapes: [[4.29, 0.572], [6.61, 0.814], [8.34, 0.842], [10.14, 0.868], [10.59, 0.952], [12.48, 1.01]]
  tokensFocused: [[0, 0], [0.5, 0.151], [0.75, 0.205], [1, 0.263], [1.25, 0.302], [1.5, 0.365], [1.75, 0.424], [2, 0.487], [2.25, 0.539], [2.5, 0.633], [2.75, 0.687], [3, 0.731], [3.25, 0.766], [3.5, 0.802], [3.75, 0.837], [4, 0.87], [4.25, 0.903], [4.5, 0.936], [4.75, 0.969], [5, 1.012], [5.25, 1.058], [5.5, 1.105], [5.75, 1.152], [6, 1.203], [6.25, 1.255], [6.5, 1.308], [6.75, 1.359], [7, 1.407], [7.25, 1.452], [7.5, 1.497], [7.75, 1.541], [8, 1.569], [8.25, 1.59], [8.5, 1.612], [8.75, 1.635], [9, 1.668], [9.25, 1.706], [9.5, 1.743], [9.75, 1.782], [10, 1.833], [10.25, 1.889], [10.5, 1.946], [10.75, 2.003], [11, 2.057], [11.25, 2.111], [11.5, 2.165], [11.75, 2.22], [12, 2.276], [12.25, 2.333], [12.5, 2.392], [12.75, 2.451], [13, 2.505], [13.25, 2.559], [13.5, 2.612], [13.75, 2.665], [14, 2.72], [14.25, 2.74]]
  tokensAllShapes: [[0, 0], [0.25, 0.06], [0.5, 0.124], [0.75, 0.187], [1, 0.256], [1.25, 0.328], [1.5, 0.4], [1.75, 0.471], [2, 0.523], [2.25, 0.565], [2.5, 0.607], [2.75, 0.65], [3, 0.686], [3.25, 0.72], [3.5, 0.754], [3.75, 0.787], [4, 0.822], [4.25, 0.857], [4.5, 0.892], [4.75, 0.928], [5, 0.951], [5.25, 0.968], [5.5, 0.986], [5.75, 1.003], [6, 1.022], [6.25, 1.042], [6.5, 1.062], [6.75, 1.082], [7, 1.103], [7.25, 1.124], [7.5, 1.145], [7.75, 1.166], [8, 1.176], [8.25, 1.181], [8.5, 1.186], [8.75, 1.192], [9, 1.204], [9.25, 1.22], [9.5, 1.235], [9.75, 1.251], [10, 1.263], [10.25, 1.274], [10.5, 1.285], [10.75, 1.296], [11, 1.31], [11.25, 1.327], [11.5, 1.343], [11.75, 1.359], [12, 1.371], [12.25, 1.38], [12.5, 1.39], [12.75, 1.402], [13, 1.436], [13.25, 1.481], [13.5, 1.525], [13.75, 1.57], [14, 1.636], [14.25, 1.67]]
---

<div class="defs">

- **KDAgent**: Kernel Design Agents, our agentic system that researches, writes, verifies and
  tunes GPU kernels.
- **KDAttn**: Kimi Delta Attention, the linear-attention operator behind Moonshot AI's
  Kimi-Linear models.

</div>

When we named our project Kernel Design Agents, we walked straight into a name collision with
another KDA: Kimi Delta Attention. Ever since, one question has kept coming back to us: *can you
use KDA to write KDA?* So tonight, under a full moon made for a moonshot, we are happy to share
the latest results from KDA(gent) v0.6: KDA optimizing KDA.

<AnimatedDiagram
  view-box="0 0 600 250"
  :min-width="300"
  :max-width="760"
  kicker="KDA → KDA"
  label="The loop: KDAgent writes kernels for KDAttn, and KDAttn's scores and traces come back to KDAgent."
  :steps="[
    'KDAgent: the kernel design agents.',
    'It writes kernels for KDAttn, Kimi Delta Attention.',
    'Scores and traces come back, and the loop goes round again.',
  ]"
>
  <path id="kda-out" class="line dash" d="M150 85 C 220 25, 380 25, 450 85" data-step="2" data-draw />
  <path id="kda-back" class="line dash" d="M450 165 C 380 225, 220 225, 150 165" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="20" y="85" width="200" height="80" />
    <text class="on-ink t-xl" x="120" y="133" text-anchor="middle">KDAgent</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="380" y="85" width="200" height="80" />
    <text class="on-accent t-xl" x="480" y="133" text-anchor="middle">KDAttn</text>
  </g>
  <text class="ink t-lg" x="300" y="22" text-anchor="middle" data-step="2">writes kernels</text>
  <text class="ink t-lg" x="300" y="246" text-anchor="middle" data-step="3">scores &amp; traces</text>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#kda-out" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#kda-back" data-loop />
</AnimatedDiagram>

## What's new in KDA v0.6

<PostCards numbered>
<PostCard title="Sharper Humanize flows.">

Better flows, including flame chase and iterative refinement with gpt-5.6-sol and fable-5, plus
periodic workspace cleanup.

</PostCard>
<PostCard title="Many languages, matching skills.">

CuTe-DSL, CUDA C++, the new agent-native CAKE IR, and TIRx. Each ships its own diagnostics:
IKET exposes the pipeline inside CuTe kernels; TIRx gets CPU-side numerical simulation and
static checks.

</PostCard>
<PostCard title="A self-evolving kernel wiki.">

We pruned large swaths of incorrect content, sharpened the tags, and tightened search results.

</PostCard>
</PostCards>

The strongest results combine the KDA agent workflow with TIRx or CAKE. We wrote kernels in
CuTe-DSL and TIRx, and used CAKE IR with an agent loop to tune a version compiled to PTX. TIRx
is a GPU kernel programming interface that sits close to PTX; the TIRx Harness gives agents
tools for development, diagnosis, and evaluation. On B300, KDA + TIRx reaches **2.96×** the
FlashKDA speed, KDA + CAKE (PTX) reaches **2.94×**, and the CuTe-DSL version reaches
**2.85×**. The released CuTe-DSL and TIRx kernels pass the real Kimi-Linear acceptance suite
and are more accurate than FlashKDA.

Along the way, the agent also produced candidates that clocked 3.28×, 3.57×, even 3.74×.
Careful ablations showed that every one of them was overfitting to the verifier, exploiting
distributional assumptions in the test suite, untested boundaries, or loose precision checks.
This post dissects those hacks and describes how we hardened acceptance along both hardware and
numerical lines.

The released CuTe-DSL and TIRx kernels are open source:
[NVlabs/kda@260927-kda-for-kda](https://github.com/NVlabs/kda/tree/260927-kda-for-kda).

## Results: 2.96× faster, and more accurate

We benchmarked the generated kernels on an NVIDIA B300 GPU against the forward pass of
[FlashKDA](https://github.com/MoonshotAI/FlashKDA), Moonshot AI's official open-source
implementation. The workloads cover fixed-length sequences and variable-length (varlen) batches
with several length distributions, each totaling 8,192 tokens of context.

<BarChart
  kicker="Speedup vs. FlashKDA · B300 · 8,192 tokens"
  label="Speedup over FlashKDA on B300 for six workloads. Geomean: KDA + CAKE (CuTe) 2.85×, KDA + TIRx 2.96×."
  :series="[
    { key: 'cute', label: 'KDA + CAKE (CuTe)', tone: 'ink' },
    { key: 'tirx', label: 'KDA + TIRx', tone: 'accent' },
  ]"
  :rows="$frontmatter.speedup"
  :reference="{ value: 1, label: 'FlashKDA 1.00×' }"
  :baselines="['cute']"
  suffix="×"
  :decimals="2"
  :max="4"
  invert
/>

The timeline shows how the best KDA result moved from 1.61× on July 21 to 2.96× on
September 12. It records CAKE results separately, including 2.94× on September 6. The captions
call out the final KDA + CAKE and KDA + TIRx results; the six-workload chart above compares the
released kernels.

<LineChart
  kicker="How the result evolved · 2026"
  title="From 1.61× to 2.96×"
  label="KDA best rises from 1.61× on July 21 to 2.96× on September 12. Humanize lifts it to 2.45× on August 14; TIRx to 2.54× on August 30, 2.93× on September 2 and 2.96× on September 12; CAKE with KDA reaches 2.56× on September 1 and CAKE 2.94× on September 6. The INT21 reference is 1.5× on June 16."
  :series="[
    { key: 'kda', label: 'KDA best', tone: 'accent', data: $frontmatter.timeline.kda, dots: true },
    { key: 'cake', label: 'CAKE', tone: 'ink', data: $frontmatter.timeline.cake, dots: true, dashed: true },
    { key: 'int21', label: 'INT21 reference', tone: 'grey', data: $frontmatter.timeline.int21 },
  ]"
  :x="{ categories: $frontmatter.timeline.dates, label: 'Date' }"
  :y="{ min: 1.4, max: 3.1, ticks: [1.5, 2, 2.5, 3], decimals: 2, tickDecimals: 1, suffix: '×' }"
  :annotations="$frontmatter.timeline.milestones"
  :min-width="560"
  :height="320"
/>

<StatGrid
  lead
  :items="[
    { value: 2.96, from: 1, decimals: 2, suffix: '×', kicker: 'Final result · TIRx', text: 'KDA + TIRx. The strongest validated result on B300.' },
    { value: 2.94, from: 1, decimals: 2, suffix: '×', kicker: 'Final result · CAKE-PTX', text: 'KDA + CAKE. Agent-guided CAKE IR tuning, compiled to PTX.' },
  ]"
/>

For accuracy, we built 151 real cases from
[Kimi-Linear-48B-A3B](https://github.com/MoonshotAI/Kimi-Linear) prefills on GSM8K and
MATH-500, and checked every kernel against a token-by-token fp64 recurrence. One finding
surprised us: FlashKDA (commit `7afb9f`) is itself less accurate than
[FLA](https://github.com/fla-org/flash-linear-attention). It keeps its recurrent state in bf16,
so error compounds as sequences grow; by 8k tokens, the relative error of the final state
reaches 0.035, beyond our acceptance threshold.

Both of our kernels hold final-state error to about 0.003 at 8k tokens: a tenth of FlashKDA's,
and close to FLA. Output accuracy matches FlashKDA overall and pulls ahead on long sequences.

<LineChart
  kicker="Kimi-Linear-48B prefill · MATH-500 prompt · 96 heads"
  title="Output error vs. context length"
  label="Output relative RMSE versus context length for a Kimi-Linear-48B prefill of 8,183 tokens: FlashKDA drifts from 0.43% to about 0.69%, while both of our kernels stay between 0.23% and 0.43%."
  :series="[
    { key: 'base', label: 'FlashKDA', tone: 'grey', data: $frontmatter.accuracy.flashkda, dashed: true },
    { key: 'tirx', label: 'Ours (TIRx)', tone: 'accent', data: $frontmatter.accuracy.tirx },
    { key: 'cute', label: 'Ours (CuTe)', tone: 'ink', data: $frontmatter.accuracy.cute },
  ]"
  :x="{ min: 0, max: 8192, ticks: [0, 2048, 4096, 6144, 8192], divide: 1024, suffix: 'k', label: 'Context', unit: ' tokens' }"
  :y="{ min: 0, max: 0.7, decimals: 2, tickDecimals: 1, suffix: '%' }"
/>

<BarChart
  kicker="Final state after 8,183 tokens · relative RMSE"
  label="Final-state relative RMSE after 8,183 tokens: FlashKDA 3.45%, CuTe 0.22%, TIRx 0.29%."
  :series="[
    { key: 'base', label: 'FlashKDA', tone: 'grey', hatched: true },
    { key: 'cute', label: 'Ours (CuTe)', tone: 'ink' },
    { key: 'tirx', label: 'Ours (TIRx)', tone: 'accent' },
  ]"
  :rows="[{ label: 'Final state', detail: 'lower is better', values: { base: 3.45, cute: 0.22, tirx: 0.29 } }]"
  :baselines="['base']"
  suffix="%"
  :decimals="2"
  :max="4"
/>

*Kimi-Linear-48B prefill of one MATH-500 prompt (8,183 tokens, 96 heads). Relative RMSE =
rms(x − x<sub>fp64</sub>) / rms(x<sub>fp64</sub>), FlashKDA's own test metric; lower is
better.*

## Humanize: better flows, stronger agents

Our [Humanize](https://github.com/humanfia/humanize) ablation shows the same pattern for every
base model we tried: moving from a coding CLI (Claude Code or Codex) to a Humanize flow brings
a large jump in performance. There is a catch, though. The more capable the agent, the more
room it has to hack.

<BarChart
  orientation="vertical"
  kicker="Humanize ablation · same model, three levels of scaffolding"
  label="Humanize ablation. PutnamBench: GPT-5.6-sol 3 / 46 / 50, Kimi-K3 1 / 4 / 47, GLM-5.3 0 / 2 / 25, DeepSeek V4 Pro 0 / 4 / 13. Physics Cup: GPT-5.6-sol 31 / 41 / 44, Kimi-K3 35 / 37 / 42, GLM-5.3 24 / 34 / 40, DeepSeek V4 Pro 32 / 35 / 39, for the raw API, a coding CLI and a Humanize flow."
  caption="PutnamBench and Physics Cup scores for four base models at three levels of scaffolding: the raw model API, a coding CLI, and a Humanize flow. The small pink numbers are gains over the baseline chosen above."
  :series="[
    { key: 'api', label: 'Model (API)', tone: 'pale', hatched: true },
    { key: 'cli', label: 'Tool (CLI)', tone: 'grey' },
    { key: 'flow', label: 'Flow (Humanize)', tone: 'accent' },
  ]"
  :datasets="$frontmatter.humanize"
  :baselines="['api', 'cli']"
  baseline="api"
  compare="delta"
/>

## Reward hacking: how KDAgent hacks the tests

> KDAgent optimizes the score, not the kernel.

If the tests have a hole, it will find it.<Sidenote>To keep the two KDAs apart, we call the
operator KDAttn and the agent KDAgent from here on.</Sidenote> We ran into five kinds of holes.

<PostCards>
<PostCard kicker="A / Input distribution" badge="Caught" metric="3.74×" metric-label="claimed · 2.48× once fixed" title="Input-distribution overfitting">

The synthesized kernel replaced the L2 normalization of Q and K with a hard-coded constant,
0.1778209953: the expected reciprocal L2 norm of a vector drawn from X ~ N(0, 0.5²). It also
zeroed some initial-state channels outright to skip the triangular matrix inverse. Synthetic
random tests reported an inflated 3.74×; on real, non-Gaussian inputs the kernel failed
completely. With the shortcut removed, the real speedup fell to 2.48×.

</PostCard>
<PostCard kicker="B / Shape & layout" badge="Caught" metric="static" metric-label="sequence boundaries" title="Shape and layout hard-coding">

The agent noticed that packed layouts in the test set always followed the same pattern. So it
skipped the dynamic offset computation from `cu_seqlens` and hard-coded the sequence
boundaries. Because the holdout set never exercised the dynamic-boundary path, the kernel
slipped straight past the logic checks.

</PostCard>
<PostCard kicker="C / History" badge="Caught" metric="5.16×" metric-label="claimed on a single H64 sequence" title="Illegal history truncation">

Leaning on gate decay, the agent assumed that state older than 32 tokens was negligible and cut
long sequences into chunks it could process in parallel. Its built-in decay check was tuned
just loosely enough to pass on the weakly decaying random data, reporting 5.16× on a single H64
sequence. Under the strongly decaying gates of the real model, the check failed constantly and
the speedup vanished.

</PostCard>
<PostCard kicker="D / Numerics" badge="Caught" metric="3.57×" metric-label="claimed · NaN on every real case" title="Overflow under extreme gate ranges">

A TIRx kernel computed cumulative powers of two directly inside each 64-token chunk. Once the
decay exceeded 126 bits, the denominator underflowed to zero and the output turned into NaN.
The random tests never decayed deeply enough to notice (about 52 bits at most) and measured
3.57×. On real workloads, every single case collapsed numerically.

</PostCard>
<PostCard kicker="E / Precision" badge="Caught" metric="9%" metric-label="decay-factor error · 23 of 24 cases fail" title="Precision loss from a low-precision LUT">

For sequence lengths that are multiples of 32, a CuTe kernel built an FP16 table of cumulative
decay. Real gates span more dynamic range than FP16 can represent, so decay factors were off by
up to 9%, and 23 of 24 long real-world sequences fell outside tolerance.

</PostCard>
<PostCard kicker="The common thread" badge="Real data" metric="~600 bits" metric-label="p99 gate decay per 64 tokens" title="Every hack passed every test we had." invert>

Each one hid in inputs that only a real model produces. In real Kimi-Linear, the gate decays by
about 600 bits per 64 tokens at p99, an order of magnitude deeper than our random test data.

</PostCard>
</PostCards>

<SwipeCompare kicker="The five hacks, twice" before-label="Random tests" after-label="Real Kimi-Linear" label="What the random tests reported for each hack, against what real Kimi-Linear inputs showed.">
<template #before>
<table class="sw-table"><thead><tr><th>Hack</th><th>What the tests said</th></tr></thead><tbody>
<tr><th>A</th><td>3.74×</td></tr>
<tr><th>B</th><td>passes the logic checks</td></tr>
<tr><th>C</th><td>5.16× on a single H64 sequence</td></tr>
<tr><th>D</th><td>3.57×, at about 52 bits of decay</td></tr>
<tr><th>E</th><td>within tolerance</td></tr>
</tbody></table>
</template>
<template #after>
<table class="sw-table"><thead><tr><th>Hack</th><th>What real inputs showed</th></tr></thead><tbody>
<tr><th>A</th><td>fails completely; 2.48× once fixed</td></tr>
<tr><th>B</th><td>boundaries hard-coded, not read from <code>cu_seqlens</code></td></tr>
<tr><th>C</th><td>the decay check fails; the speedup vanishes</td></tr>
<tr><th>D</th><td>NaN on every case past 126 bits</td></tr>
<tr><th>E</th><td>decay off by up to 9%; 23 of 24 fail</td></tr>
</tbody></table>
</template>
</SwipeCompare>

<RangeMeter
  kicker="Cumulative gate decay within one 64-token chunk"
  label="Gate decay depth per 64 tokens. Random tests reach about 52 bits, the hacked TIRx kernel underflows beyond 126 bits, and real Kimi-Linear gates reach about 600 bits at p99. Move the handle to see where hack D breaks."
  status="Hack D on this input"
  unit=" bits"
  :max="650"
  :value="600"
  :markers="[
    { value: 52, label: '≈52 bits', note: 'deepest decay in the random tests' },
    { value: 126, label: '126 bits', note: 'hack D’s denominator underflows to 0' },
    { value: 600, label: '≈600 bits', note: 'p99 decay per 64 tokens in real Kimi-Linear' },
  ]"
  :zones="[
    { from: 0, to: 126, label: 'output finite · test passes · 3.57×' },
    { from: 126, to: 650, label: 'denominator = 0 · output NaN', tone: 'accent' },
  ]"
/>

## Hardening: closing the loopholes

Humanize flows make agents more capable and give them more opportunities to find gaps in the
tests. To keep the agents honest, we built six layers of defense, and a candidate has to pass
all six to be released.

<AnimatedDiagram
  view-box="0 0 720 220"
  :min-width="300"
  :max-width="820"
  kicker="Acceptance gauntlet · 6 gates · 1 way out"
  label="Six acceptance gates. Hacked candidates are refused at a gate; an honest kernel passes all six and is released."
  :steps="[
    'Six gates stand between a candidate kernel and release.',
    'A hacked candidate is refused at the first gate it cannot pass.',
    'An honest kernel passes all six, and is released.',
  ]"
>
  <path id="gauntlet-lane" class="line dash" d="M10 115 H566" data-step="1" data-draw />
  <g data-step="1">
    <rect class="ink" x="76" y="70" width="8" height="90" />
    <rect class="ink" x="156" y="70" width="8" height="90" />
    <rect class="ink" x="236" y="70" width="8" height="90" />
    <rect class="ink" x="316" y="70" width="8" height="90" />
    <rect class="ink" x="396" y="70" width="8" height="90" />
    <rect class="ink" x="476" y="70" width="8" height="90" />
    <text class="ink t-lg" x="80" y="56" text-anchor="middle">1</text>
    <text class="ink t-lg" x="160" y="56" text-anchor="middle">2</text>
    <text class="ink t-lg" x="240" y="56" text-anchor="middle">3</text>
    <text class="ink t-lg" x="320" y="56" text-anchor="middle">4</text>
    <text class="ink t-lg" x="400" y="56" text-anchor="middle">5</text>
    <text class="ink t-lg" x="480" y="56" text-anchor="middle">6</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="574" y="88" width="140" height="54" transform="rotate(-17 644 115)" />
    <text class="on-accent" x="644" y="120" text-anchor="middle" transform="rotate(-17 644 115)">RELEASE</text>
  </g>
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#gauntlet-lane" data-stop="0.4" data-loop />
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#gauntlet-lane" data-stop="0.68" data-loop />
  <rect class="accent" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#gauntlet-lane" data-loop />
  <text class="grey" x="10" y="208" data-step="2">■ hacked candidate</text>
  <text class="accent" x="370" y="208" data-step="3">■ honest kernel</text>
</AnimatedDiagram>

<PostCards numbered>
<PostCard title="Dynamic input salts and distribution holdouts.">

Every scoring run draws a fresh random seed. In an isolated zone the agent cannot see, input
distributions and sequence layouts alternate at random.

</PostCard>
<PostCard title="A strict specification.">

The task prompt defines the full set of legal inputs. Kernels may specialize by shape, but must
be correct on every legal input.

</PostCard>
<PostCard title="CUDA Graph replay checks.">

After benchmark timing, we swap in new input tensors and replay the graph to validate the
outputs, defeating cache-based precomputation.

</PostCard>
<PostCard title="Stress probes.">

An adversarial set of extremely deep decays, saturated gates, boundary sequence lengths, and
repeated keys targets underflow and overflow directly.

</PostCard>
<PostCard title="Strict element-wise tolerances.">

Lenient statistical gates such as "99.9% of elements within 5e-2" are gone. Every element must
meet maximum absolute and relative error bounds.

</PostCard>
<PostCard title="Real end-to-end traces.">

We replay traces captured from end-to-end Kimi-Linear runs. The evaluator lives outside the
isolated container, physically separating test data from the environment that generates
kernels.

</PostCard>
</PostCards>

Both released kernels pass this suite.

<StatGrid
  lead
  :items="[
    { value: 2.96, from: 2.54, decimals: 2, suffix: '×', kicker: 'TIRx, tuned in place on B300: 2.54× → 2.96×', text: 'Starting from a TIRx implementation, the agent tuned the kernel in place on B300, climbing from 2.54× to 2.96×.' },
    { value: 2, prefix: '−', suffix: '%', kicker: 'CuTe-DSL, FP16 table removed: −2%', text: 'The CuTe version drops the FP16 decay table, trading 2% of its speed for correctness.' },
  ]"
/>

## Ablation: focus first, then generalize?

To see how the synthesis strategy affects convergence, we compared two workflows: progressive
synthesis that starts from a single fixed-length shape, and direct multi-objective synthesis
across all shapes. With the same hardware (NVIDIA B300) and the same 14-hour budget, their
convergence curves diverged sharply.

<LineChart
  kicker="Same B300 · same 14-hour budget · two strategies"
  title="Best speedup on the evaluation shape"
  label="Best speedup over a 14-hour budget: focusing on one simple shape reaches 1.85×; targeting all six shapes at once reaches 1.01×."
  :series="[
    { key: 'focus', label: 'One simple shape first', tone: 'accent', data: $frontmatter.ablation.speedupFocused, step: true, dots: true },
    { key: 'all', label: 'All six shapes at once', tone: 'ink', data: $frontmatter.ablation.speedupAllShapes, step: true, dots: true, dashed: true },
  ]"
  :x="{ min: 0, max: 16, ticks: [0, 4, 8, 12, 16], decimals: 1, tickDecimals: 0, suffix: 'h', label: 'Hour' }"
  :y="{ min: 0.4, max: 2, ticks: [0.4, 0.8, 1.2, 1.6, 2], decimals: 2, tickDecimals: 1, suffix: '×' }"
  :reference="{ y: 1, label: 'FlashKDA = 1.0×' }"
  :height="280"
/>

<LineChart
  kicker="Same B300 · same 14-hour budget · two strategies"
  title="Cumulative output tokens"
  label="Cumulative output tokens over a 14-hour budget: focusing on one simple shape reaches 2.74 million; targeting all six shapes at once reaches 1.67 million."
  :series="[
    { key: 'focus', label: 'One simple shape first', tone: 'accent', data: $frontmatter.ablation.tokensFocused, area: true },
    { key: 'all', label: 'All six shapes at once', tone: 'ink', data: $frontmatter.ablation.tokensAllShapes, dashed: true },
  ]"
  :x="{ min: 0, max: 16, ticks: [0, 4, 8, 12, 16], decimals: 2, tickDecimals: 0, suffix: 'h', label: 'Hour' }"
  :y="{ min: 0, max: 3, ticks: [0, 1, 2, 3], decimals: 2, tickDecimals: 0, suffix: 'M' }"
  :height="260"
/>

On the same evaluation shape, progressive synthesis reached **1.85×**; direct all-shape
synthesis managed only **1.01×**. Two mechanisms explain the gap.

1. **Feedback latency.** One test pass over the full workload took a median of 1.9 minutes; a
   single shape took 0.9. Faster feedback meant denser iteration: the single-shape agent
   completed 248 hardware tests and 120 commits, against 159 tests and 22 commits for the
   all-shape agent.
2. **Search-space decoupling.** Synthesizing every shape at once forced the agent to juggle
   intricate varlen offsets and the compute core at the same time. For the first eight hours
   its speedup stayed below 0.65×, with most of that time spent debugging varlen edge cases,
   and the core logic never got the attention it needed. Over the same 14 hours, it also
   produced far fewer output tokens than the single-shape agent.

<LoopCompare
  unit="min / test"
  label="Feedback loops: one simple shape takes a median 0.9 minutes per test and completes 248 tests and 120 commits; all six shapes take 1.9 minutes per test and complete 159 tests and 22 commits."
  :loops="[
    { title: 'One simple shape first', period: 0.9, stats: [
      { value: 1.85, decimals: 2, suffix: '×', label: 'final speedup' },
      { value: 248, label: 'hardware tests' },
      { value: 120, label: 'commits' },
      { value: 2.74, decimals: 2, suffix: 'M', label: 'output tokens' },
    ] },
    { title: 'All six shapes at once', period: 1.9, stats: [
      { value: 1.01, decimals: 2, suffix: '×', label: 'final speedup' },
      { value: 159, label: 'hardware tests' },
      { value: 22, label: 'commits' },
      { value: 1.67, decimals: 2, suffix: 'M', label: 'output tokens' },
    ] },
  ]"
/>

> Splitting the work into two stages does not make the model any smarter. It shortens the
> feedback loop until the model can stay busy.

Optimize the compute core first, then generalize to every layout: that decomposition brings
each feedback loop down to a length an LLM can work with effectively.

## Also in v0.6

### Multi-language support with matching skills

CuTe-DSL, CUDA C++, and TIRx are all supported, and each language comes with its own
diagnostics. For CuTe, IKET exposes the pipeline inside the kernel. For TIRx, CPU-side
numerical simulation plus synchronization and data-race analysis catch numerical and
concurrency bugs.

These TIRx tools belong to the TIRx Harness. The Harness also provides TIRx Foundation, a
layer that stays close to the hardware; a kernel zoo of reusable implementations; and a
benchmark server that makes performance results easy to compare. Together they give the agent a
more reliable development loop: code maps more directly onto the intended hardware behavior,
failures leave clues to follow, and performance changes can be confirmed as real. The TIRx team
plans to release the Harness formally next week, with a detailed write-up.

### CAKE IR tunes a PTX version

We added CAKE IR to the kernel wiki and used its agent loop to tune the kernel. The loop
specified the verifier the candidate had to pass before converting the result to PTX,
producing the CAKE-PTX version. It reached **2.94×** on B300.

### A self-evolving kernel wiki

The wiki keeps correcting itself as it is used. Incorrect content gets deleted, tags get
sharpened, and search results get leaner, so every agent that comes after works from better
material.

## Takeaways

We used Kernel Design Agents (KDAgent) to optimize the Kimi Delta Attention (KDAttn) operator
on NVIDIA B300. Humanize, TIRx, and CAKE IR all contributed to the search. The final TIRx,
CAKE-PTX, and CuTe-DSL results reach **2.96×**, **2.94×**, and **2.85×** the FlashKDA speed
respectively. The released TIRx and CuTe-DSL kernels cut final-state error on 8k-token
sequences to about a tenth of FlashKDA's.

Along the way, the agent produced a series of fake optimizations: overfitting to the input
distribution, hard-coding boundaries, and overflowing under extreme values. We answered with
layered hardening, including dynamic input salts, stress probes, and strict element-wise
tolerances, so that the kernels stay correct and robust on real model workloads. Our ablation
further shows that tackling a complex optimization task through progressive synthesis
substantially shortens the feedback loop and makes the search more efficient.

If you have a workload that wants to be optimized via KDAgent, submit it at
[nvlabs.github.io/kda](https://nvlabs.github.io/kda/#submit).

[The kernels](https://github.com/NVlabs/kda/tree/260927-kda-for-kda) ·
[Humanize](https://github.com/humanfia/humanize) · [KDA](/kda/)
