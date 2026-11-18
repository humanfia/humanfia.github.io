---
title: "HOA: Humanfia Olympiad Agents"
description: Competition, olympiad and research mathematics solved by agents and machine-checked in Lean 4, plus physics, chemistry, biology, programming and quantum information. A proof counts only if the Lean kernel accepts it.
tag: HOA
# The whole page is one component (.vitepress/theme/components/projects/hoa/): its sections are
# figures, not prose, so it is drawn full width with no sidebar, no outline and no .vp-doc. The
# data its figures draw is below, but the words around the figures quote some of the same numbers
# (Lean-Eval's readouts above all), so a new result means changing both. The headline strip under
# the hero is read from the news (`achievement:` blocks, achievements.data.mts) and moves by itself.
layout: page
sidebar: false
aside: false
outline: false
markdownStyles: false
pageClass: hoa-page

links:
  - { text: humanfia/hoa, href: https://github.com/humanfia/hoa }
  - { text: The flows, href: /flows/recursive-lean-prover }
  - { text: Datasets, href: https://huggingface.co/humanfia-lab }

# The record, one tile per exam. `lean: true` is what the filter on the board reads: the result
# was accepted by the Lean kernel, rather than graded by somebody. `cells` is what the tile's
# grid counts, `filled` how many of them are done, and `accent` how many of those are drawn in the accent.
results:
  - id: putnam
    name: PutnamBench
    score: '672 / 672'
    unit: formal statements proved
    grader: Lean kernel
    lean: true
    cells: 672
    filled: 672
    note: Joint first on the official leaderboard, at $44.50 a problem. 670 in June.
    posts: [{ text: Aug 27, href: /news/2026-10-05-putnambench-672 }, { text: Jun 26, href: /news/2026-06-26-putnambench }]
  - id: leaneval
    name: Lean-Eval
    score: '30'
    unit: first solves on LeanEval v1, the most
    grader: Lean · Comparator
    lean: true
    cells: 128
    filled: 89
    accent: 30
    legend: 89 of 128 solved · 30 of them first
    note: Third by total, 89 to the leader's 92. 170 of 171 on the archive; 259 distinct problems across both, two behind Axiom Prover.
    posts: [{ text: Oct 4, href: /news/2026-10-05-lean-eval-v1 }, { text: Aug 18, href: /news/2026-08-18-lean-eval-first }, { text: Jul 29, href: /news/2026-07-29-lean-eval-second }]
  - id: imo
    name: IMO 2026
    score: '6 / 6'
    unit: problems, on two backends
    grader: Lean kernel
    lean: true
    cells: 6
    filled: 6
    note: GPT-5.6 used 3.0× less API time than AxiomProver's reported run. Statements, solutions and scripts are public, pinned to Lean 4.31.0.
    posts: [{ text: Jul 18, href: /news/2026-07-22-imo-2026 }]
  - id: ipho
    name: IPhO 2026 · theory
    score: '30 / 30'
    unit: theory points
    grader: Our grading
    lean: false
    cells: 23
    filled: 23
    legend: 23 of 23 subparts
    note: Graded by us against the official marking scheme, unseen by the workers. All 41 formal-release parts are formalized in Lean.
    posts: [{ text: Sep 14, href: /news/2026-10-05-olympiads }, { text: Jul 29, href: /news/2026-07-29-physics-and-quantum }]
  - id: icho
    name: IChO 2026 · theory
    score: '68 / 68'
    unit: subquestions formalized in Lean
    grader: Lean + review
    lean: true
    cells: 68
    filled: 68
    note: Formalization coverage, not answer accuracy. 32 without the review loop. Two of GPT's targets are conditional.
    posts: [{ text: Sep 14, href: /news/2026-10-05-olympiads }]
  - id: ioi
    name: IOI 2026
    score: '6 / 6'
    unit: problems at 100%
    grader: Codeforces
    lean: false
    cells: 6
    filled: 6
    note: Judged on Codeforces' hidden tests; the verdicts are not public. The repository replays every released example.
    posts: [{ text: Sep 14, href: /news/2026-10-05-olympiads }]
  - id: ibo
    name: IBO 2024 · theory
    score: '100 / 100'
    unit: tasks; 400 of 400 verdicts match
    grader: Official key
    lean: false
    cells: 100
    filled: 100
    note: Agreement with the answer key, not an official points total. Practical exams excluded; the 2024 paper may be in training data.
    posts: [{ text: Sep 14, href: /news/2026-10-05-olympiads }]
  - id: qit
    name: QIT · QAlg
    score: '40 / 40'
    unit: QIT tasks proved end to end; QAlg 36 of 36, blind
    grader: Lean · auto review
    lean: true
    cells: 40
    filled: 40
    note: Proved with no sorry. Semantic review is automated, not a human audit. 37 in July.
    posts: [{ text: Sep 14, href: /news/2026-10-05-olympiads }, { text: Jul 29, href: /news/2026-07-29-physics-and-quantum }]

# PutnamBench: the official leaderboard data (trishullab/PutnamBench, docs/results.json), Lean
# column with answers given, each team's latest entry; and the cost each of the four at 672
# reports, in its own words.
putnam:
  - { name: Humanfia · GPT-5.6 xhigh, score: 672, us: true, added: '2026-08-27', cost: 44.5, basis: average }
  - { name: Aleph Prover, score: 672, added: '2026-08-26', cost: 74, basis: 'average · maximum $1,468' }
  - { name: NEAR AI · DeepSeek V4, score: 672, added: '2026-09-04', cost: 0.17, basis: 'mean · median $0.04' }
  - { name: Forall · Claude Opus 5, score: 672, added: '2026-09-24', cost: 3.52, basis: 'mean, actor side only' }
  - { name: Mistral Prover, score: 658, added: '2026-09-04' }
  - { name: Goedel-Architect, score: 642, added: '2026-07-02' }
  - { name: Leanstral 1.5, score: 588, added: '2026-07-19' }
  - { name: Seed-Prover 1.5 (ByteDance), score: 581, added: '2025-12-27' }

# Lean-Eval: the board's published data (lean-lang.org/eval/site-data/v2), LeanEval v1 scope,
# generated 2026-10-23.
leanEval:
  - { name: Humanfia · GPT-5.6, us: true, total: 89, first: 30, unique: 0 }
  - { name: max gp · GPT-6, total: 92, first: 4, unique: 2 }
  - { name: Axiom Prover, total: 90, first: 23, unique: 0 }
  - { name: NEAR AI · DeepSeek V4, total: 88, first: 12, unique: 0 }

# IMO 2026: API minutes per problem, from the write-up (humanfia/hoa imo2026/README.md);
# AxiomProver's as it reported them. Kimi-K3's are its worker and Codex reviewer combined.
imo:
  - { label: Q1, gpt: 38.1, kimi: 87.1, axiom: 24 }
  - { label: Q2, gpt: 100.4, kimi: 224.3, axiom: 360 }
  - { label: Q3, gpt: 187.1, kimi: 343.7, axiom: 869 }
  - { label: Q4, gpt: 58.7, kimi: 75.6, axiom: 39 }
  - { label: Q5, gpt: 46.5, kimi: 91.9, axiom: 65 }
  - { label: Q6, gpt: 66.9, kimi: 212.4, axiom: 139 }

# The same model, three levels of scaffolding, 50 problems each: the Humanize ablation in the
# KDA² post (2026-09-27), the latest measurement of it.
ablation:
  putnam:
    - { label: GPT-5.6-sol, api: 3, cli: 46, flow: 50 }
    - { label: Kimi-K3, api: 1, cli: 4, flow: 47 }
    - { label: GLM-5.3, api: 0, cli: 2, flow: 25 }
    - { label: DeepSeek V4 Pro, api: 0, cli: 4, flow: 13 }
  physics:
    - { label: GPT-5.6-sol, api: 31, cli: 41, flow: 44 }
    - { label: Kimi-K3, api: 35, cli: 37, flow: 42 }
    - { label: GLM-5.3, api: 24, cli: 34, flow: 40 }
    - { label: DeepSeek V4 Pro, api: 32, cli: 35, flow: 39 }

# IChO 2026: theory subquestions accepted, of 68, without and with the review loop.
icho:
  - { label: GPT-5.6 Sol, goal: 32, flow: 68 }
  - { label: Kimi-K3, goal: 31, flow: 68 }

# humanfia/hoa, one directory per competition or library.
repo:
  - { dir: putnambench, text: 'Solver, pinned statements and re-run scripts' }
  - { dir: imo2026, text: 'Formal statements, Lean solutions and scripts' }
  - { dir: ioi2026, text: 'Problem packages, submissions and annotated solutions' }
  - { dir: ipho2026, text: 'Solutions, grading reports and Lean formalizations' }
  - { dir: icho2026, text: 'Lean formalizations, /goal baselines and grading reports' }
  - { dir: ibo2024, text: 'Worked theory solutions and grading evidence' }
  - { dir: chemlib, text: 'A Lean 4 library for mathematical chemistry' }
  - { dir: lean-qit-qlg, text: 'QAlg and QIT: Lean formalizations and proofs' }

# Each card's `note` replaces the post's standfirst on this page, so the cards stay one line long.
timeline:
  - { url: /news/2026-06-26-putnambench, metric: '670 / 672', note: 'The leaderboard best that day was 668.' }
  - { url: /blog/2026-07-08-model-tool-flow, metric: '50 / 50', note: 'One model through the raw API, its CLI, and the CLI inside a flow.' }
  - { url: /news/2026-07-22-imo-2026, metric: '6 / 6', note: 'The faster of two workers used 3.0× less API time than AxiomProver.' }
  - { url: /news/2026-07-29-lean-eval-second, metric: '#2 · 149', note: "149 problems to Seed Prover's 155, by our count." }
  - { url: /news/2026-07-29-physics-and-quantum, metric: '23 / 23', note: 'Every theory subproblem formalized and proved, sorry-free.' }
  - { url: /news/2026-08-18-lean-eval-first, metric: '#1 · 172', note: 'Every proof sorry-free and re-verified.' }
  - { url: /news/2026-10-05-putnambench-672, metric: '672 / 672', note: '$44.50 a problem, in a four-way tie at the top.' }
  - { url: /news/2026-10-05-lean-eval-v1, metric: '30 first solves', note: 'One behind the leader on total; 170 of 171 on the archive.' }
  - { url: /news/2026-10-05-olympiads, metric: '5 × full marks', note: 'Who graded each score, and what it does not show.' }
---

<script setup>
import HoaPage from '../.vitepress/theme/components/projects/hoa/HoaPage.vue'
</script>

<HoaPage />
