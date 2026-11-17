---
title: Top 3 on every MLSys 2026 track
description: "KDA placed #1 on MoE, #2 on DSA and #3 on GDN in the Full-Agent tracks of the MLSys 2026 FlashInfer contest. Its best kernel ran 19.1× faster than the FlashInfer baseline, and on two of the five it was still slower."
date: 2026-05-15
authors:
  - Dongyun Zou
  - Zhekai Zhang
  - Shang Yang
  - Hao Kang
tag: KDA
achievement:
  topic: MLSys 2026 FlashInfer contest
  value: 3
  suffix: " / 3"
  label: "Top three on every MLSys 2026 track"
  body: "#1 on MoE, #2 on DSA and #3 on GDN in the Full-Agent tracks."
hero:
  kicker: MLSys 2026 · FlashInfer contest · Full-Agent
  value: 3
  from: 0
  suffix: " / 3"
  label: "tracks on the podium: #1 MoE, #2 DSA, #3 GDN"

# Sources, re-checked 5 October 2026:
# - placements: the organisers' results page, mlsys26.flashinfer.ai (Full-Agent tracks);
# - speedups: the team's technical report, Table 1 (submitted entries) and Tables 2 and 3
#   (a post-contest rerun under a 48-hour budget), in mit-han-lab/mlsys2026-flashinfer-contest.
submitted:
  - { label: DSA indexer, detail: DSA track, values: { kda: 19.08 } }
  - { label: DSA attention, detail: DSA track, values: { kda: 4.54 } }
  - { label: GDN prefill, detail: GDN track, values: { kda: 1.92 } }
  - { label: GDN decode, detail: GDN track, values: { kda: 0.80 } }
  - { label: MoE FP8, detail: MoE track, values: { kda: 0.65 } }
rerun:
  - { label: DSA, values: { ksearch: 3.76, kda: 11.9 } }
  - { label: GDN, values: { ksearch: 1.04, kda: 1.16 } }
  - { label: MoE FP8, values: { ksearch: 0.27, kda: 0.72 } }
ablation:
  - { label: K-Search, detail: no Humanize, values: { s: 1.37 } }
  - { label: Humanize, detail: + the loop, values: { s: 3.71 } }
  - { label: + KernelWiki, detail: + knowledge, values: { s: 6.14 } }
  - { label: + ncu-report-skill, detail: + profiler, values: { s: 8.58 } }
---

Kernels designed with [KDA](/kda/) took a podium place on **every track** of the
MLSys 2026 FlashInfer kernel contest, in the Full-Agent division, where no human writes kernel
code: **first on MoE, second on DSA, third on GDN**. The team entered as HAN Lab Kernel Mafia.

<AnimatedDiagram
  view-box="0 0 600 270"
  :min-width="520"
  :max-width="760"
  kicker="Full-Agent results · mlsys26.flashinfer.ai"
  label="The podium on the three Full-Agent tracks. MoE: KDA first, GEMM People second, Insider third. DSA: Dogacel first, KDA second, UW SyFI third. GDN: UW SyFI first, LLM-CUDA second, KDA third."
  :steps="[
    'Three tracks, each scored on the organisers’ machines.',
    'The other teams on each podium.',
    'KDA: first on MoE, second on DSA, third on GDN.',
  ]"
>
  <g data-step="1">
    <text class="ink t-lg" x="0" y="52">MoE</text>
    <text class="ink t-lg" x="0" y="137">DSA</text>
    <text class="ink t-lg" x="0" y="222">GDN</text>
    <path class="line" d="M0 74 H600 M0 159 H600 M0 244 H600" />
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="270" y="20" width="150" height="46" />
    <text class="ink" x="345" y="48" text-anchor="middle">#2 GEMM People</text>
    <rect class="frame" x="440" y="20" width="150" height="46" />
    <text class="ink" x="515" y="48" text-anchor="middle">#3 Insider</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="100" y="105" width="150" height="46" />
    <text class="ink" x="175" y="133" text-anchor="middle">#1 Dogacel</text>
    <rect class="frame" x="440" y="105" width="150" height="46" />
    <text class="ink" x="515" y="133" text-anchor="middle">#3 UW SyFI</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="100" y="190" width="150" height="46" />
    <text class="ink" x="175" y="218" text-anchor="middle">#1 UW SyFI</text>
    <rect class="frame" x="270" y="190" width="150" height="46" />
    <text class="ink" x="345" y="218" text-anchor="middle">#2 LLM-CUDA</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="100" y="20" width="150" height="46" />
    <text class="on-accent" x="175" y="48" text-anchor="middle">#1 KDA</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="270" y="105" width="150" height="46" />
    <text class="on-accent" x="345" y="133" text-anchor="middle">#2 KDA</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="440" y="190" width="150" height="46" />
    <text class="on-accent" x="515" y="218" text-anchor="middle">#3 KDA</text>
  </g>
</AnimatedDiagram>

A kernel contest is the closest thing to an ideal test for an agent loop. The score is a
measurement, the machine belongs to the organisers, the reference implementation is theirs,
and correctness is a gate rather than a matter of interpretation. A kernel that is faster
because it has quietly become incorrect does not place. It fails.

## The loop that wrote them

The agent is the [Humanize](https://github.com/humanfia/humanize) coder–verifier loop: one
agent plans and writes a kernel change, and an independent verifier checks it for correctness
and speed before anything is kept. Two skills sit beside it. **KernelWiki** is a searchable
store of production kernels, past submissions and documentation, and
**ncu-report-skill** turns an Nsight Compute report into evidence an agent can act on.

<AnimatedDiagram
  view-box="0 0 640 280"
  :min-width="320"
  :max-width="760"
  kicker="The kernel agent loop"
  label="The KDA loop: a coder agent writes a kernel, a verifier agent checks correctness and speed and sends a review back. KernelWiki feeds the coder knowledge, and ncu-report-skill turns profiles into evidence for the review."
  :steps="[
    'A coder agent plans and writes the next kernel change.',
    'An independent verifier checks correctness and speed, and sends its review back.',
    'KernelWiki feeds the coder; the profiler skill turns each profile into evidence.',
  ]"
>
  <path id="mlsys-out" class="line dash" d="M200 80 C 270 30, 370 30, 440 80" data-step="1" data-draw />
  <path id="mlsys-back" class="line dash" d="M440 150 C 370 200, 270 200, 200 150" data-step="2" data-draw />
  <path id="mlsys-wiki" class="line dash" d="M100 232 V150" data-step="3" data-draw />
  <path id="mlsys-ncu" class="line dash" d="M545 232 V150" data-step="3" data-draw />
  <g data-step="1" data-pop>
    <rect class="ink" x="10" y="80" width="190" height="70" />
    <text class="on-ink t-lg" x="105" y="121" text-anchor="middle">Coder</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="440" y="80" width="190" height="70" />
    <text class="on-accent t-lg" x="535" y="121" text-anchor="middle">Verifier</text>
  </g>
  <text class="ink" x="320" y="28" text-anchor="middle" data-step="1">a kernel change</text>
  <text class="ink" x="320" y="214" text-anchor="middle" data-step="2">correct? faster? review</text>
  <g data-step="3">
    <rect class="frame" x="20" y="232" width="160" height="40" />
    <text class="ink" x="100" y="257" text-anchor="middle">KernelWiki</text>
    <rect class="frame" x="460" y="232" width="170" height="40" />
    <text class="ink" x="545" y="257" text-anchor="middle">ncu-report-skill</text>
  </g>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="1" data-travel="#mlsys-out" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#mlsys-back" data-loop />
</AnimatedDiagram>

## The speedups, as submitted

A placement ranks teams against each other; it does not say how fast the kernel is. The team's
[technical report](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest/blob/main/docs/HAN_Lab_Kernel_Mafia_Technical_Report.pdf)
gives the speed of each submitted kernel against the official FlashInfer baseline, as the
arithmetic mean over the official workloads.

<BarChart
  kicker="Submitted entries · speedup vs. the FlashInfer baseline · B200"
  label="Submitted KDA kernels against the official FlashInfer baseline: DSA indexer 19.08×, DSA attention 4.54×, GDN prefill 1.92×, GDN decode 0.80×, MoE FP8 0.65×."
  caption="Technical report, Table 1. Below the 1.00× line, the submitted kernel was slower than the baseline."
  :series="[{ key: 'kda', label: 'KDA, as submitted', tone: 'accent' }]"
  :rows="$frontmatter.submitted"
  :reference="{ value: 1, label: 'FlashInfer baseline 1.00×' }"
  suffix="×"
  :decimals="2"
  :max="20"
  invert
/>

Two of the five kernels were slower than the baseline. One of them, MoE FP8 at 0.65×, still
won its track: the baseline there calls a closed-source TensorRT-LLM GEMM, and no Full-Agent
entry placed ahead of it.<Sidenote>An earlier version of this post gave 1.4× on MoE, 33.3× on
DSA and 17.6× on GDN. Those figures do not match the technical report, so they are gone.</Sidenote>

## After the contest: what each piece is worth

After the deadline, the team reran KDA and K-Search, another agentic kernel system, on the
same workloads under the same strict 48-hour budget. KDA came out ahead on all three tracks.
Switch the baseline to K-Search to read the margin directly.

<BarChart
  kicker="Post-contest rerun · 48-hour budget · speedup vs. FlashInfer"
  label="Post-contest rerun under a 48-hour budget, speedup over the FlashInfer baseline. DSA: K-Search 3.76×, KDA 11.9×. GDN: K-Search 1.04×, KDA 1.16×. MoE FP8: K-Search 0.27×, KDA 0.72×."
  caption="Technical report, Table 2."
  :series="[
    { key: 'ksearch', label: 'K-Search', tone: 'grey', hatched: true },
    { key: 'kda', label: 'KDA', tone: 'accent' },
  ]"
  :rows="$frontmatter.rerun"
  :reference="{ value: 1, label: 'FlashInfer baseline 1.00×' }"
  :baselines="['ksearch']"
  suffix="×"
  :decimals="2"
/>

On the DSA top-k indexer, the report adds the pieces one at a time. The loop matters most, and
each skill adds to it.

<BarChart
  orientation="vertical"
  kicker="DSA top-k indexer · adding one piece at a time"
  label="Ablation on the DSA top-k indexer under the 48-hour budget: K-Search 1.37×, Humanize 3.71×, plus KernelWiki 6.14×, plus ncu-report-skill 8.58×."
  caption="Technical report, Table 3. Speedup over the FlashInfer baseline."
  :series="[{ key: 's', label: 'Speedup', tone: 'accent' }]"
  :rows="$frontmatter.ablation"
  :reference="{ value: 1, label: 'FlashInfer 1.00×' }"
  suffix="×"
  :decimals="2"
/>

<StatGrid
  lead
  :items="[
    { value: 8.58, from: 1.37, decimals: 2, suffix: '×', kicker: 'DSA top-k indexer, full loop', text: 'Humanize, KernelWiki and the profiler skill together, from 1.37× without them.' },
    { value: 19.08, from: 1, decimals: 2, suffix: '×', kicker: 'Best submitted kernel', text: 'The DSA indexer as entered in the contest, against the FlashInfer baseline.' },
  ]"
/>

The kernels, the prompts and the report are published.

[The contest kernels](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest-solution) ·
[prompts and report](https://github.com/mit-han-lab/mlsys2026-flashinfer-contest) ·
[the results](https://mlsys26.flashinfer.ai/) · [KDA](/kda/)
