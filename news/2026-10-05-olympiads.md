---
title: "30/30 IPhO, 6/6 IOI, 100/100 IBO"
description: "IPhO 2026 theory 30 of 30, IOI 2026 six of six, IBO 2024 theory 100 of 100, IChO 2026 formalized 68 of 68, and quantum information theory 40 of 40. What each score is, who graded it, and what it does not show."
date: 2026-09-14
authors:
  - Jing Xiong
  - Zhengyang Zhang
  - Ligeng Zhu
tag: HOA
achievement:
  topic: Science olympiads
  value: 5
  suffix: /5
  viz: checks
  label: "Science exams at full marks"
  body: "IPhO, IChO, IOI, IBO and quantum information theory — none graded by an official jury."

hero:
  kicker: IPhO · IOI · IBO · IChO · QIT
  value: 5
  suffix: /5
  label: exams finished at the top of their own scale. None is an official jury score.

# Every number is from the release it links to: humanfia/ipho2026, humanfia/icho2026,
# humanfia/ioi2026, humanfia/ibo2024 and humanfia/lean-qit-qlg (READMEs and grading reports,
# read 2026-10-05).
exams:
  - { exam: IPhO 2026 · theory, result: '30.00 / 30.00, both models', score: 100, grader: our audit against the official marking scheme }
  - { exam: IOI 2026, result: 6 / 6 problems at 100%, score: 100, grader: Codeforces }
  - { exam: IBO 2024 · theory, result: '100 / 100 tasks; 400 / 400 verdicts', score: 100, grader: the official answer key }
  - { exam: IChO 2026 · theory, result: '68 / 68 subquestions formalized, both models', score: 100, grader: 'Lean, plus our own review gates' }
  - { exam: QIT, result: 40 / 40 tasks proved in Lean, score: 100, grader: 'Lean, plus automated semantic review' }
ipho:
  - { label: Natural-language answers, detail: of 30 points, values: { gpt: 100, kimi: 100 } }
  - { label: Lean formalizations, detail: of 50 points, values: { gpt: 94.9, kimi: 59.8 } }
icho:
  - { label: GPT-5.6 Sol, detail: of 68, values: { goal: 32, loop: 68 } }
  - { label: Kimi-K3, detail: of 68, values: { goal: 31, loop: 68 } }
ioi:
  - { day: 1, task: Ball Machine, result: 100 }
  - { day: 1, task: Monuments, result: 100 }
  - { day: 1, task: Tiling Game, result: 100 }
  - { day: 2, task: Classroom Game, result: 100 }
  - { day: 2, task: Magic City, result: 100 }
  - { day: 2, task: Partition, result: 100 }
---

Since July, the same open harness has finished IPhO and the quantum run
[we reported then](/news/2026-07-29-physics-and-quantum), and has been pointed at three more
olympiads. Each one reached the top of its own scale. **None of these scores came from an
official jury,** and the scales are different, so each comes with a note on what was graded and
by whom. The notes matter as much as the numbers.

<ResultsTable
  caption="Five exams · what was scored, and who scored it"
  :columns="[
    { key: 'exam', label: 'Exam' },
    { key: 'result', label: 'Result' },
    { key: 'score', label: 'Of its scale', suffix: '%', bar: true },
    { key: 'grader', label: 'Graded by' },
  ]"
  :rows="$frontmatter.exams"
/>

## How a run stays blind

Every run here starts the same way: the workers get the problem and nothing else. A builder
writes, a reviewer objects, round after round. The official solutions, marking schemes and
answer keys come in only after the run is over, for grading.

<AnimatedDiagram
  view-box="0 0 520 250"
  :min-width="300"
  :max-width="720"
  kicker="Answer-blind · then graded"
  label="An answer-blind run: the workers get only the problem; a builder and a reviewer loop until the solution is done; the official solutions stay behind a wall until the run ends; only then is the solution graded, by Lean, Codeforces, an answer key or our audit."
  :steps="[
    'The workers get the problem, and nothing else.',
    'A builder writes, a reviewer objects, round after round.',
    'The official solutions and marking schemes stay behind the wall.',
    'Only after the run do they meet the solution, for grading.',
  ]"
>
  <path id="ol-loop" class="line dash" d="M65 128 C 65 50, 255 50, 255 128 C 255 206, 65 206, 65 128 Z" data-step="2" data-draw />
  <path id="ol-out" class="line dash" d="M310 128 H370" data-step="4" data-draw />
  <g data-step="1" data-pop>
    <rect class="frame" x="10" y="8" width="120" height="36" />
    <text class="ink" x="70" y="31" text-anchor="middle">Problem</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="10" y="100" width="110" height="56" />
    <text class="on-ink" x="65" y="133" text-anchor="middle">Builder</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="accent" x="200" y="100" width="110" height="56" />
    <text class="on-accent" x="255" y="133" text-anchor="middle">Reviewer</text>
  </g>
  <path class="line ink" d="M340 4 V 246" data-step="3" data-draw />
  <g data-step="3" data-pop>
    <rect class="frame" x="360" y="8" width="150" height="36" />
    <text class="ink" x="435" y="31" text-anchor="middle">Official key</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="ink" x="370" y="100" width="130" height="56" />
    <text class="on-ink" x="435" y="133" text-anchor="middle">Grader</text>
  </g>
  <text x="435" y="184" text-anchor="middle" data-step="4">after the run</text>
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="2" data-travel="#ol-loop" data-loop />
  <rect class="ink" x="-7" y="-7" width="14" height="14" data-step="4" data-travel="#ol-out" />
</AnimatedDiagram>

## IPhO 2026: 30 of 30 on theory

Both the GPT-5.6 Sol and the Kimi K3 Max runs answered all 23 theory subparts and scored
**30.00 / 30.00** ([GPT](https://github.com/humanfia/ipho2026/blob/main/NaturalLanguage/GRADING_REPORT.md),
[Kimi](https://github.com/humanfia/ipho2026/blob/main/Kimi/NaturalLanguage/GRADING_REPORT.md)).
The workers never saw the official solutions or marking schemes. Those came in only after the
runs had finished, for grading.

The caveat is the grader. These are
[our own estimates](https://github.com/humanfia/ipho2026#results) against the official
solutions and itemized marking schemes, not a jury's adjudication.

The Lean side went further than in July. The formal release splits the paper more finely, into
**41 parts**, and every one of them now has a Lean formalization. Formalizing is harder than
answering, and the two models separate here: the GPT-5.6 Sol formalizations are estimated at
[47.45 / 50](https://github.com/humanfia/ipho2026/blob/main/GRADING_REPORT.md), Kimi's at
[29.90 / 50](https://github.com/humanfia/ipho2026/blob/main/Kimi/GRADING_REPORT.md). Every proof
elaborates without `sorry`, `admit` or custom axioms.

<BarChart
  kicker="IPhO 2026 · share of the points, our audit"
  label="IPhO 2026 scores as a share of the points. Natural-language answers: GPT-5.6 Sol 100%, Kimi K3 Max 100%. Lean formalizations: GPT-5.6 Sol 94.9% (47.45 of 50), Kimi K3 Max 59.8% (29.90 of 50)."
  :series="[
    { key: 'kimi', label: 'Kimi K3 Max', tone: 'ink' },
    { key: 'gpt', label: 'GPT-5.6 Sol', tone: 'accent' },
  ]"
  :rows="$frontmatter.ipho"
  suffix="%"
  :decimals="1"
  :max="100"
/>

## IChO 2026: 68 of 68 formalized

All **68** numbered theory subquestions across the nine problems now have Lean formalizations
that passed both formalization review and proof review, for
[GPT-5.6 Sol](https://github.com/humanfia/icho2026/tree/main/gpt-5.6-sol-full68-formalization)
and for Kimi-K3 ([32 answer-blind](https://github.com/humanfia/icho2026/tree/main/kimi-k3-answer-blind)
plus [36 more](https://github.com/humanfia/icho2026/tree/main/kimi-k3-nl-36-formalization)).
The comparison that matters is the same models without the review loop. Run as a plain Codex
`/goal` on the same 68 targets, they had
[32 / 68](https://github.com/humanfia/icho2026/tree/main/gpt-5.6-sol-native-goal68) and
[31 / 68](https://github.com/humanfia/icho2026/tree/main/kimi-k3-native-goal68) accepted.

<BarChart
  orientation="vertical"
  kicker="IChO 2026 · formalizations accepted, of 68"
  label="IChO 2026 formalizations accepted, of 68: GPT-5.6 Sol 32 with a plain Codex goal and 68 with the Humanize loop; Kimi-K3 31 and 68."
  caption="The same models on the same 68 targets, with and without the review loop. The small pink numbers are the loop's gain."
  :series="[
    { key: 'goal', label: 'Plain Codex /goal', tone: 'grey', hatched: true },
    { key: 'loop', label: 'Humanize loop', tone: 'accent' },
  ]"
  :rows="$frontmatter.icho"
  :baselines="['goal']"
  baseline="goal"
  compare="delta"
/>

The fine print:

- **68 / 68 is formalization coverage, not answer accuracy.** Lean checks deductions from the
  encoded inputs. It does not certify that the encoding matches the official chemistry.
- **Not every target came from the original inputs alone.** GPT has 66 targets from the original
  inputs and 2 conditional ones. One of the conditional targets, T8-A8, uses two disclosed
  contest-model axioms that we authorized.
- **Kimi's 68 is two campaigns.** One is 32 answer-blind targets; the other formalizes 36
  natural-language answers Kimi had already written. Three of those 36 are conditional and two
  carry authorized answer corrections.
- **The answer scores are generous and unofficial.** Graded against the official key with credit
  for equivalent forms and reasonable rounding, GPT scores
  [424.5 / 437](https://github.com/humanfia/icho2026/blob/main/gpt-5.6-sol-full68-formalization/grading/GRADING.md)
  and Kimi [417.5 / 437](https://github.com/humanfia/icho2026/blob/main/kimi-k3-max/GRADING.md),
  against [415](https://github.com/humanfia/icho2026/blob/main/gpt-5.6-sol-native-goal68/grading/GRADING.md)
  and [340.2](https://github.com/humanfia/icho2026/blob/main/kimi-k3-native-goal68/grading/GRADING.md)
  for the plain `/goal` runs.

## IOI 2026: six of six

All six problems over both days [passed at 100%](https://github.com/humanfia/ioi2026#results)
when the final submissions were judged on [Codeforces](https://codeforces.com/).

<ResultsTable
  caption="IOI 2026 · final submissions, judged on Codeforces"
  :columns="[
    { key: 'day', label: 'Day' },
    { key: 'task', label: 'Task' },
    { key: 'result', label: 'Tests passed', suffix: '%', bar: true },
  ]"
  :rows="$frontmatter.ioi"
/>

The [annotated solutions](https://github.com/humanfia/ioi2026/blob/main/solutions/README.md)
state the guarantee each one meets. What you can check yourself is narrower: the repository's
`verify.sh` compiles all six and replays every released Day 1 example. Codeforces' hidden tests remain
the external check, and the verdicts are not linked publicly.

## IBO 2024: 100 of 100 theory tasks

<StatGrid
  lead
  :items="[
    { value: 100, suffix: '/100', kicker: 'Theory tasks', text: '50 in Theory A and 50 in Theory B.' },
    { value: 400, suffix: '/400', kicker: 'True/false verdicts', text: 'Every one matches the official answer key.' },
    { value: 0, kicker: 'Extraction errors', text: 'No answer lost in formatting.' },
  ]"
/>

All 100 Theory A and B tasks were solved, and all **400** true/false verdicts
[match the official answer key](https://github.com/humanfia/ibo2024/blob/main/GRADING.md). Two
limits apply. The practical exams are excluded entirely, and this is agreement with an answer
key, not an official points total. It is also the 2024 paper, because IBO withholds each paper
for two years.<Sidenote>A paper that has been public that long may appear in a model's training
data.</Sidenote>

## Quantum information theory: 40 of 40

In July, the blind QIT run stood at 37 of 40 end to end. After repair it is
[**40 / 40**](https://huggingface.co/datasets/humanfia-lab/QIT), alongside 36 / 36 on quantum
algorithms ([QAlg](https://huggingface.co/datasets/humanfia-lab/QAlg)).

<StatGrid
  :items="[
    { value: 40, from: 37, suffix: '/40', kicker: 'QIT · end to end', text: 'Up from 37 of 40 in July.' },
    { value: 36, suffix: '/36', kicker: 'QAlg', text: 'Unchanged since July: every task.' },
  ]"
/>

Every task compiles, has a complete proof with no `sorry` or `admit`, and passes a full
`lake build`. The caveat is the one we drew in July: the semantic review, which judges whether a
formal statement says what the problem says, is automated, not an independent human audit.
[Both sets rebuild with one script](https://github.com/humanfia/lean-qit-qlg).

[IPhO 2026](https://github.com/humanfia/ipho2026) · [IChO 2026](https://github.com/humanfia/icho2026) ·
[IOI 2026](https://github.com/humanfia/ioi2026) · [IBO 2024](https://github.com/humanfia/ibo2024) ·
[HOA](/hoa/)
