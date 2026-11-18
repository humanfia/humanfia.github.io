---
title: "23/23 at IPhO 2026, in Lean"
description: "All 23 IPhO 2026 theory subproblems formalized and proved in Lean 4, sorry-free. Alongside: 36 of 36 on a blind quantum-algorithms benchmark, and 92.5% end to end on quantum information theory."
date: 2026-07-29
authors:
  - Jing Xiong
  - Zhengyang Zhang
tag: HOA
achievement:
  topic: Science olympiads
  value: 23
  suffix: /23
  label: "IPhO 2026 theory subproblems, proved in Lean"
  body: "And 36 of 36 on a blind quantum-algorithms benchmark."

hero:
  kicker: IPhO 2026 · theory · Lean 4
  value: 23
  suffix: /23
  label: theory subproblems formalized, reviewed and proved, with no sorry

# The share of tasks that passed each gate, as of this post. IPhO 2026: the lean_verified
# configuration of humanfia-lab/IPHO2026 (23 rows). QAlg and QIT: the blind runs, from this
# post's own report; both have since reached 100% (see humanfia-lab/QIT and humanfia-lab/QAlg).
gates:
  - { label: IPhO 2026 theory, detail: 23 targets, values: { semantic: 100, proof: 100 } }
  - { label: QAlg, detail: 36 tasks, values: { semantic: 100, proof: 100 } }
  - { label: QIT, detail: 40 tasks, values: { semantic: 95, proof: 92.5 } }
---

::: tip This has since moved
QIT is now **40 of 40**, and both IPhO 2026 theory runs score **30 of 30** against the official
marking scheme. [The October update](/news/2026-10-05-olympiads) has the details.
:::

::: info Ongoing
The Kimi-K3 run below is still going. Everything else here is complete.
:::

Formal mathematics is where an agent loop can be checked without argument. Physics and quantum
information are the interesting extension of that, because the statements have to be
*formalized* before they can be proved, and the formalization is where a run can go wrong in a
way that a compiler will happily accept.

<StatGrid
  lead
  :items="[
    { value: 23, suffix: '/23', kicker: 'IPhO 2026 · theory', text: 'Every subproblem of T1–T3, sorry-free, and the full lake build passes.' },
    { value: 36, suffix: '/36', kicker: 'QAlg · blind', text: 'Every quantum-algorithm task, from public statements alone.' },
    { value: 92.5, decimals: 1, suffix: '%', kicker: 'QIT · end to end', text: '37 of 40 quantum-information tasks through both gates.' },
  ]"
/>

## Two gates, not one

`sorry` is Lean's placeholder for a step nobody has proved. A sorry-free result means every
theorem has an actual proof term checked by the Lean kernel. It does **not** by itself guarantee
that the theorem says what the original problem says. So every target passes two gates, and they
are counted separately: a **semantic review** of the formal statement against the problem, and a
**proof review** of the Lean that proves it.

<AnimatedDiagram
  view-box="0 0 680 230"
  :min-width="300"
  :max-width="800"
  kicker="Meaning first · then proof"
  label="Two gates. A formal statement that compiles but says the wrong thing is refused at the first gate, semantic review; a proof with a gap is refused at the second, proof review; only a faithful statement with a complete proof is accepted."
  :steps="[
    'Each target meets two gates: what the statement means, and whether it is proved.',
    'A statement that compiles but says the wrong thing is stopped at the first.',
    'A faithful statement with a gap in its proof is stopped at the second.',
    'A faithful statement with a complete, sorry-free proof is accepted.',
  ]"
>
  <path id="pq-lane" class="line dash" d="M10 120 H560" data-step="1" data-draw />
  <g data-step="1">
    <rect class="ink" x="196" y="72" width="10" height="96" />
    <rect class="ink" x="396" y="72" width="10" height="96" />
    <text class="ink" x="201" y="56" text-anchor="middle">1 · meaning</text>
    <text class="ink" x="401" y="56" text-anchor="middle">2 · proof</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="accent" x="544" y="94" width="136" height="52" transform="rotate(-14 612 120)" />
    <text class="on-accent" x="612" y="125" text-anchor="middle" transform="rotate(-14 612 120)">ACCEPTED</text>
  </g>
  <rect class="grey" x="-9" y="-9" width="18" height="18" data-step="2" data-travel="#pq-lane" data-stop="0.33" data-loop />
  <rect class="ink" x="-9" y="-9" width="18" height="18" data-step="3" data-travel="#pq-lane" data-stop="0.69" data-loop />
  <rect class="accent" x="-9" y="-9" width="18" height="18" data-step="4" data-travel="#pq-lane" data-loop />
  <text class="grey" x="10" y="214" data-step="2">■ wrong claim</text>
  <text class="ink" x="250" y="214" data-step="3">■ gap in proof</text>
  <text class="accent" x="490" y="214" data-step="4">■ accepted</text>
</AnimatedDiagram>

> A perfectly checked proof of the wrong statement is the exact failure this pair of gates
> exists to catch.

<BarChart
  kicker="Share of tasks through each gate · 29 July 2026"
  label="Share of tasks passing each gate. IPhO 2026 theory: semantic review 100%, proof review 100%. QAlg: 100% and 100%. QIT: 95% and 92.5%."
  :series="[
    { key: 'semantic', label: 'Semantic review', tone: 'ink' },
    { key: 'proof', label: 'Proof review, end to end', tone: 'accent' },
  ]"
  :rows="$frontmatter.gates"
  suffix="%"
  :decimals="1"
  :max="100"
/>

## IPhO 2026: 23 of 23

All **23 theory subproblems** (T1–T3) of the 2026 International Physics Olympiad were
completed: 23/23 passed both semantic review and proof review, every Lean 4 file is
**sorry-free**, and the full `lake build` passed.

The change that produced it was a new **proof-to-formalization routing**. On the same 22-target
comparison, it took the run from 20/22 to **22/22** while cutting summed wall time by
**62.1%**.<Sidenote>The routing comparison is from our run logs and is not published; read it as
Humanfia-reported. The 23 verified records are in the
[dataset](https://huggingface.co/datasets/humanfia-lab/IPHO2026), as its `lean_verified`
configuration.</Sidenote> One additional theory target brought the final run to 23 of 23.

<StatGrid
  :items="[
    { value: 22, from: 20, suffix: '/22', kicker: 'Same targets, new routing', text: 'Up from 20 of 22.' },
    { value: 62.1, decimals: 1, prefix: '−', suffix: '%', kicker: 'Summed wall time', text: 'For the same 22 targets.' },
  ]"
/>

A separate 28-target run with a **Kimi-K3** worker has solved 23 targets through proof review,
with 24 of 28 passing formalization review. The remaining five are in retry or redraft, or have
not yet reached proof dispatch.

[The dataset](https://huggingface.co/datasets/humanfia-lab/IPHO2026)

## QAlg: 36 of 36

A **blind** run, given only the public TeX statements and the benchmark's base library and with
no access to reference solutions, produced compiling, semantically accepted, Lean-kernel-checked,
sorry-free proofs for **all 36 quantum-algorithm tasks**. The full `lake build` passed.

## QIT: 92.5% end to end

On the 40-task blind Quantum Information Theory benchmark: **38 of 40** semantic review passes
and **37 of 40** end-to-end proof review passes, for 92.5%. Conditional on semantic acceptance,
the proof rate is **97.4%**. Once the statement is right, the proof almost always follows. The
full `lake build` passed.

[HOA](/hoa/)
