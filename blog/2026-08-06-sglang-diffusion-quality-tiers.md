---
title: A Quality Tier for the Fast Kernels
description: Most profitable diffusion fusions change the output at the level of bf16 rounding order, enough to fail a bitwise CI and not enough for a person to see. So we gave the request a quality tier instead of arguing about the diff.
date: 2026-08-06
authors:
  - Xiaoyu Zhang
tag: KDA
hero:
  kicker: SGLang diffusion · --quality high
  value: 34.7
  from: 25
  decimals: 1
  suffix: " dB"
  label: the lowest PSNR against the lossless output across the first six fast paths shipped under the tier; the bar is 25 dB

# From the pull requests cited (sgl-project/sglang), re-read 5 October 2026. PSNR is each fast
# path's output against the lossless output for the same seed and prompt; "saved" is the
# end-to-end time saved by --quality high, from the same pull request.
timeline:
  dates: ['6/15', '6/19', '8/4', '8/6']
  default: [[0, 1], [1, 0], [3, 0]]
  high: [[2, 3], [3, 6]]
  prs:
    - { x: 0, y: 1, label: '#28166', detail: 'FLUX GELU fused on the default path', tone: grey }
    - { x: 1, y: 0, label: '#28708', detail: 'reverted: images moved', tone: grey }
    - { x: 2, y: 3, label: '#33453', detail: 'the tier · plus #33451, #33536, #33546', tone: accent }
    - { x: 3, y: 6, label: '#33818 #33819 #33822', detail: 'three more behind quality=high', tone: accent }
psnr:
  - { label: '#33451', detail: FLUX.2 VAE decode, values: { lo: 56.70, hi: 59.11 } }
  - { label: '#33818', detail: AutoencoderKL decode, values: { lo: 55.17, hi: 57.90 } }
  - { label: '#33822', detail: Ideogram 4 norm chains, values: { lo: 37.91, hi: 58.07 } }
  - { label: '#33536', detail: FFN GELU epilogue, values: { lo: 37.08, hi: 55.35 } }
  - { label: '#33546', detail: Wan VAE RMSNorm + SiLU, values: { lo: 37.67, hi: 39.73 } }
  - { label: '#33819', detail: FLUX.1 gates + GELU, values: { lo: 34.68, hi: 40.08 } }
  - { label: '#33453', detail: MiniMax-H3 Cache-DiT policy, values: { lo: 28.16, hi: 28.16 } }
tradeoff:
  - { x: 13.5, y: 56.70, group: fusion, label: '#33451 FLUX.2-klein 1024²' }
  - { x: 10.2, y: 57.85, group: fusion, label: '#33451 FLUX.2-klein 2048²' }
  - { x: 4.9, y: 57.51, group: fusion, label: '#33818 Z-Image-Turbo' }
  - { x: 7.2, y: 55.17, group: fusion, label: '#33818 FLUX.1-schnell' }
  - { x: 2.2, y: 37.08, group: fusion, label: '#33536 Qwen-Image' }
  - { x: 5.1, y: 37.67, group: fusion, label: '#33546 FastWan2.2' }
  - { x: 3.3, y: 34.68, group: fusion, label: '#33819 FLUX.1-dev', highlight: true }
  - { x: 2.9, y: 37.91, group: fusion, label: '#33822 Ideogram 4 FAST_20' }
  - { x: 3.4, y: 41.13, group: fusion, label: '#33822 Ideogram 4 INSTANT_8' }
  - { x: 28.6, y: 28.16, group: cache, label: '#33453 MiniMax-H3 Cache-DiT', highlight: true }
---

A large share of the profitable kernel fusions in a diffusion serving stack change the output
only at the level of **bf16 rounding order**. Folding the FFN tanh-GELU into the up-projection
GEMM as a cuBLASLt epilogue is the canonical example: mathematically the same computation, a
different order of operations, and therefore a different last bit.

SGLang's diffusion CI compares generated images **bitwise** against the reference. So none of
these fusions could ever land on the default path. This is not hypothetical. An ungated FLUX
GELU fusion was merged as [#28166](https://github.com/sgl-project/sglang/pull/28166), with
pixels a mean 2.56 out of 255 from main, and reverted four days later in
[#28708](https://github.com/sgl-project/sglang/pull/28708) because it "can move generated
images away from the original model behavior".

The usual next move is to argue about the tolerance in CI. That trade is bad in both directions:
loosen it and the guarantee everyone relies on is gone; keep it and a whole class of real
speedups is unshippable.

## The tier

[#33453](https://github.com/sgl-project/sglang/pull/33453) gives every request a
`quality` of `lossless` or `high`, and nothing else:

<AnimatedDiagram
  view-box="0 0 660 260"
  :min-width="340"
  :max-width="780"
  kicker="One request, two tiers"
  label="A request carries a quality. lossless, the default, takes the exact reference path, and the bitwise CI still holds. high takes validated fast paths, each of which must stay above 25 dB PSNR against the lossless output."
  :steps="[
    'Every request says which quality it wants.',
    'lossless, the default: the exact reference path, bit-identical, and the CI stays green.',
    'high: validated fast paths, not bit-exact, held above a 25 dB PSNR bar.',
  ]"
>
  <path id="qt-low" class="line dash" d="M170 130 C 250 130, 260 60, 360 60" data-step="2" data-draw />
  <path id="qt-high" class="line dash" d="M170 130 C 250 130, 260 200, 360 200" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="95" width="160" height="70" />
    <text class="on-ink t-lg" x="90" y="136" text-anchor="middle">request</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="360" y="30" width="290" height="60" />
    <text class="ink t-lg" x="505" y="58" text-anchor="middle">lossless · default</text>
    <text class="ink" x="505" y="80" text-anchor="middle">reference path · bitwise CI</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="360" y="170" width="290" height="60" />
    <text class="on-accent t-lg" x="505" y="198" text-anchor="middle">high · opt-in</text>
    <text class="on-accent" x="505" y="220" text-anchor="middle">fast paths · PSNR &gt; 25 dB</text>
  </g>
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#qt-low" data-loop />
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="3" data-travel="#qt-high" data-loop />
</AnimatedDiagram>

- **`lossless`**, the default, is the exact reference path. Its output stays byte-identical, the
  ground-truth CI stays green, and nobody's guarantee changed.
- **`high`** opts into validated fast paths whose deviation is bounded and visually
  indistinguishable.

Within two days, six fast paths had shipped behind it, including the GELU fusion that had been
reverted in June.

<LineChart
  kicker="Diffusion fast paths in SGLang · 2026"
  title="Reverted on the default path, shipped behind the tier"
  label="Fast paths that change the output: one on the default path from June 15, reverted on June 19. Behind quality=high: three on August 4 and six by August 6."
  :series="[
    { key: 'high', label: 'Behind quality=high', tone: 'accent', data: $frontmatter.timeline.high, step: true, dots: true },
    { key: 'default', label: 'On the default path', tone: 'grey', data: $frontmatter.timeline.default, step: true, dashed: true },
  ]"
  :x="{ categories: $frontmatter.timeline.dates, label: 'Merged' }"
  :y="{ min: 0, max: 6, ticks: [0, 2, 4, 6], decimals: 0, label: 'Fast paths' }"
  :annotations="$frontmatter.timeline.prs"
  :min-width="440"
  :height="240"
/>

## A claim with a gate

"Visually indistinguishable" is a claim, so it has a gate. #33453 sets the bar at a same-seed
**PSNR above 25 dB** against the lossless output, and leaves enforcing it to follow-up work;
every fast path that shipped under the tier reports it, with side-by-side samples. The six
kernel fast paths of the first two days measured **34.7 to 59.1 dB**. The one figure near the
bar belongs to the tier's first consumer, which is not a kernel at all: a caching policy for
MiniMax-H3, at 28.2 dB.<Sidenote>We first wrote that 34–58 dB was measured across every pull
request shipped under the tier. The kernel range is 34.7–59.1 dB, and the caching policy sits
lower, at 28.16 dB.</Sidenote>

<BarChart
  kicker="PSNR against the lossless output · lowest and highest sample"
  label="PSNR against the lossless output for each quality=high path, lowest and highest sample: #33451 56.70 to 59.11 dB, #33818 55.17 to 57.90, #33822 37.91 to 58.07, #33536 37.08 to 55.35, #33546 37.67 to 39.73, #33819 34.68 to 40.08, and the MiniMax-H3 caching policy in #33453 28.16 dB. The bar is 25 dB."
  caption="Each pull request's own quality table: several prompts, and for #33546 the mean over 81 video frames per prompt."
  :series="[
    { key: 'lo', label: 'Lowest sample', tone: 'accent' },
    { key: 'hi', label: 'Highest sample', tone: 'ink' },
  ]"
  :rows="$frontmatter.psnr"
  :reference="{ value: 25, label: 'Bar 25 dB' }"
  suffix=" dB"
  :decimals="2"
  :max="60"
/>

Set that against what each one buys, and the two kinds of deviation separate cleanly. Kernel
fusions save a few percent and stay far above the bar. Skipping work by caching saves far more,
and spends most of the margin.

<ScatterChart
  kicker="What quality=high buys, and what it costs"
  label="End-to-end time saved by quality=high against PSNR to the lossless output. Kernel fusions save 2.2% to 13.5% at 34.7 to 57.9 dB. The MiniMax-H3 caching policy saves 28.6% at 28.2 dB."
  caption="Time saved is each pull request's own end-to-end measurement (for #33453, its 1.40× speedup). Every point is above the 25 dB bar."
  :groups="[
    { key: 'fusion', label: 'Kernel fusions', tone: 'accent' },
    { key: 'cache', label: 'Caching policy', tone: 'grey' },
  ]"
  :points="$frontmatter.tradeoff"
  :x="{ label: 'End-to-end time saved', suffix: '%', decimals: 1, min: 0, max: 30 }"
  :y="{ label: 'PSNR vs. lossless', suffix: ' dB', decimals: 1, min: 20, max: 60 }"
/>

The general lesson is not about diffusion. When correctness is a spectrum and the CI has to be a
boolean, the fix is usually to make the request say which end of the spectrum it wants, rather
than to move the boolean.

> When correctness is a spectrum and the CI is a boolean, let the request choose.

[KDA](/kda/) · [the PR](https://github.com/sgl-project/sglang/pull/33453) ·
[Lossless Is a Choice](/blog/2026-07-02-sglang-omni-numerics)
