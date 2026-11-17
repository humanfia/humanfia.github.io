---
title: Lossless Is a Choice
description: A competing stack bought its speed with approximate kernels and skipped steps. Reading it closely turned into three PRs that take about a fifth off our LTX-2.3 time on B200, two of them byte-identical end to end.
date: 2026-07-02
authors:
  - Xiaoyu Zhang
tag: KDA
hero:
  kicker: LTX-2.3 · B200 · three merged PRs
  value: 20.8
  from: 0
  decimals: 1
  prefix: "−"
  suffix: "%"
  label: end-to-end time if the three separately measured gains compose, with two of the three byte-identical

# From the three pull requests (sgl-project/sglang #29708, #29390, #29361), re-read 5 October 2026.
# Each was measured on its own, on LTX-2.3 on B200, against main at the time.
e2e:
  - { label: '#29708', detail: QK norm + split RoPE · HQ, values: { main: 17.02, pr: 15.46 } }
  - { label: '#29390', detail: fused Ada values · HQ, values: { main: 46.86, pr: 42.18 } }
  - { label: '#29361', detail: residual-gate add · HQ, values: { main: 46.64, pr: 45.20 } }
gate:
  - { label: LTX-2 broadcast, detail: 32640 × 4096, values: { torch: 415.24, triton: 132.98, cuda: 120.04 } }
  - { label: LTX-2 full gate, detail: 8160 × 4096, values: { torch: 65.46, triton: 47.07, cuda: 41.65 } }
  - { label: Ideogram 4 broadcast, detail: 4096 × 4608, values: { torch: 64.71, triton: 34.94, cuda: 19.92 } }
  - { label: FLUX.2 broadcast, detail: 4608 × 3072, values: { torch: 47.46, triton: 34.49, cuda: 15.69 } }
  - { label: FLUX.2 broadcast, detail: 4096 × 3072, values: { torch: 41.41, triton: 34.53, cuda: 15.56 } }
  - { label: FLUX.2 broadcast, detail: 512 × 3072, values: { torch: 13.41, triton: 34.45, cuda: 15.51 } }
  - { label: LTX-2 full gate, detail: 126 × 2048, values: { torch: 13.17, triton: 35.02, cuda: 13.54 } }
---

We spent a while reading another framework's implementation closely, because its published
numbers were better than ours and we wanted to know why.

The answer was that a good deal of the speed was bought. The stack uses agents to build many
Triton fused kernels based on **approximate computation**, and layers a number of
sparsification tricks on top: caching results, skipping certain steps. Each of these is a
legitimate technique. Together, and ungated, they noticeably hurt accuracy: with a slightly
more sensitive prompt, the gap between their output and ours becomes clear.

This is worth naming as a general hazard rather than as a complaint about one project. When an
agent loop is scored on latency and the correctness check is loose, approximation is the path
of least resistance, and the loop will find it. It is [reward hacking](/about/#how-we-work)
with a plausible engineering story attached, which is the hardest kind to catch.

> When the check is loose, approximation is the path of least resistance.

## What we did with it

Rather than match the trade, we sorted the opportunities in that analysis into the ones that
change the numbers and the ones that do not, and kept only the second kind.

<AnimatedDiagram
  view-box="0 0 640 230"
  :min-width="320"
  :max-width="760"
  kicker="Sorting the speedups"
  label="Speedup ideas from the analysis go through one gate: does the output stay the same as the reference? Approximate kernels and skipped steps are refused; lossless rewrites go on to KDA-Pilot and become pull requests."
  :steps="[
    'Every speedup idea the analysis turned up.',
    'Approximate kernels and skipped steps change the output: refused.',
    'The lossless ones go to KDA-Pilot, and on to pull requests.',
  ]"
>
  <path id="om-lane" class="line dash" d="M20 110 H520" data-step="1" data-draw />
  <g data-step="1">
    <rect class="ink" x="256" y="60" width="8" height="100" />
    <text class="ink" x="260" y="44" text-anchor="middle">same output as the reference?</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="520" y="80" width="110" height="60" />
    <text class="on-accent" x="575" y="115" text-anchor="middle">KDA-Pilot → PR</text>
  </g>
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#om-lane" data-stop="0.47" data-loop />
  <rect class="accent" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#om-lane" data-loop />
  <text class="grey" x="20" y="215" data-step="2">■ approximate · cached · skipped</text>
  <text class="accent" x="380" y="215" data-step="3">■ lossless</text>
</AnimatedDiagram>

Three pull requests came out of it, each measured on its own against main, on LTX-2.3 on B200:

- [#29708](https://github.com/sgl-project/sglang/pull/29708) fuses the Q/K RMSNorm and split
  RoPE into one CUDA kernel, from a KDA-Pilot task whose name ends in `__bitwise`;
- [#29390](https://github.com/sgl-project/sglang/pull/29390) computes the LTX-2.3 Ada values
  once per block, a fusion it adapts from NVlabs/Sana's `sol-engine`, as its description
  credits; and
- [#29361](https://github.com/sgl-project/sglang/pull/29361) adds a CUDA fast path, from
  KDA-Pilot, for the residual-gate update that runs all through the transformer.

<BarChart
  kicker="LTX-2.3 · B200 · end-to-end seconds per video"
  label="End-to-end time per LTX-2.3 video on B200. #29708: 17.02 s on main, 15.46 s with the PR. #29390: 46.86 s and 42.18 s. #29361: 46.64 s and 45.20 s."
  caption="Each pair is that pull request's own measurement. #29708 was timed on a shorter HQ run than the other two, so compare within a pair, not across. Switch the baseline to read each as a fraction of main."
  :series="[
    { key: 'main', label: 'main', tone: 'grey', hatched: true },
    { key: 'pr', label: 'with the PR', tone: 'accent' },
  ]"
  :rows="$frontmatter.e2e"
  :baselines="['main']"
  suffix=" s"
  :decimals="2"
  :max="50"
/>

They save 9.2%, 10.0% and 3.1% of the time. Measured one at a time, they compose to about
**21% less time**, or **1.26×** the speed, which is where the "more than 20%" we first reported
comes from.<Sidenote>That is arithmetic on three separate measurements, not one run with all
three applied.</Sidenote>

## How lossless is lossless

Each pull request checks the decoded video against main, frame by frame.

<StatGrid
  :items="[
    { value: 2, from: 0, suffix: ' of 3', kicker: 'Byte-identical video', text: '#29708 and #29390: SSIM 1.000 and PSNR infinite. #29708 is also torch.equal on every Q and K tensor.' },
    { value: 41.3, from: 0, decimals: 1, suffix: ' dB', kicker: 'Close, not identical: #29361', text: 'PSNR 41.3 dB and SSIM 0.985 against main.' },
  ]"
/>

So the honest version of our first claim is narrower: two of the three are lossless all the way
to the pixels, and the third is close but not bit-for-bit.<Sidenote>We first wrote "no accuracy
loss at all". #29361's own video check says otherwise, so this section replaces that
claim.</Sidenote> Where on the scale it sits:

<RangeMeter
  kicker="Decoded video vs. main · PSNR"
  label="PSNR of the decoded video against main, in dB. #29361 measures 41.3 dB. The other two are identical, which is an infinite PSNR, off this scale. A month later, the diffusion maintainers' bar for a visually indistinguishable fast path was 25 dB."
  status="At this PSNR, the output is"
  unit=" dB"
  :min="15"
  :max="60"
  :value="41.3"
  :decimals="1"
  :markers="[
    { value: 25, label: '25 dB', note: 'the later bar for the opt-in fast tier' },
    { value: 41.3, label: '41.3 dB', note: '#29361 against main' },
    { value: 60, label: '→ ∞', note: '#29708 and #29390: identical' },
  ]"
  :zones="[
    { from: 15, to: 25, label: 'below the bar a fast path must clear' },
    { from: 25, to: 60, label: 'not bit-identical, but above the bar', tone: 'accent' },
  ]"
/>

The residual-gate kernel is also the one with the most to show at kernel level. Against the
Triton path it replaces, it wins on every shape it was tuned for; against eager PyTorch, it
wins on the large shapes and is slightly slower on the two smallest.

<BarChart
  kicker="#29361 · residual-gate add · B200 · microseconds"
  label="Residual-gate add on B200, microseconds. The CUDA fast path is 1.11× to 2.59× faster than Triton across seven shapes, from 120.04 against 132.98 microseconds on the largest LTX-2 shape to 13.54 against 35.02 on the smallest."
  :series="[
    { key: 'torch', label: 'PyTorch', tone: 'pale', hatched: true },
    { key: 'triton', label: 'Triton', tone: 'ink' },
    { key: 'cuda', label: 'CUDA fast path', tone: 'accent' },
  ]"
  caption="Time per call; lower is faster. Against a baseline, each bar is a fraction of that baseline's time."
  :rows="$frontmatter.gate"
  :baselines="['triton', 'torch']"
  baseline="triton"
  suffix=" µs"
  :decimals="2"
/>

Where a deviation genuinely is worth having, it should be something the caller asks for. That
is what the [quality tier](/blog/2026-08-06-sglang-diffusion-quality-tiers) turned into a
month later.

[KDA](/kda/) · [KDA-Pilot](https://github.com/BBuf/KDA-Pilot)
