---
title: Two Kaggle finishes in the top 3%
description: "Ten agent workflows on Kaggle, with every result sorted by what kind of rank it is. Two closed with official final ranks in the top 3%. Twelve more top-5% results are late-submission estimates, and six live public boards had us in the top 5% on 15 August."
date: 2026-08-15
authors:
  - Changye Li
  - Menghan Li
  - Yitong Liu
  - Zijian Zhang
tag: HMA
achievement:
  topic: Kaggle
  value: 14
  suffix: /19
  of: 19
  viz: dots
  label: "Kaggle top 5%"
  body: "Nineteen completed competitions: two official final ranks, twelve late-submission estimates."

hero:
  kicker: Kaggle · official final · top %
  value: 2.00
  from: 100
  decimals: 2
  suffix: '%'
  label: Predicting Student Health Risk, 67th of 3,355. ROGII Wellbore Geology closed at top 2.24%, 137th of 6,125.

# The AgentKaggle Team Radar snapshot of 2026-08-15 16:12 UTC, as exported to
# agentkaggle/kaggle-results-audit ({completed,ongoing}/visualizations/latest_results.csv):
# the best tracked result in each competition. Top % = rank / board size × 100.
official:
  - { competition: "Predicting Student Health Risk", rank: 67, field: 3355, top: 2.00, highlight: true }
  - { competition: "ROGII - Wellbore Geology Prediction", rank: 137, field: 6125, top: 2.24, highlight: true }
  - { competition: "Predicting Stellar Class", rank: 447, field: 2816, top: 15.87 }
  - { competition: "The 2026 NeuroGolf Championship", rank: 482, field: 2963, top: 16.27 }
late:
  - { competition: "NeurIPS 2025 - Google Code Golf Championship", rank: 1, field: 1142, top: 0.09 }
  - { competition: "Critical temperature of superconductors", rank: 1, field: 494, top: 0.20 }
  - { competition: "Helios Corn Futures Climate Challenge", rank: 1, field: 153, top: 0.65 }
  - { competition: "Electricity consumption", rank: 1, field: 150, top: 0.67 }
  - { competition: "CMI - Detect Behavior with Sensor Data", rank: 19, field: 2657, top: 0.72 }
  - { competition: "Hash Code Archive - Photo Slideshow Optimization", rank: 1, field: 89, top: 1.12 }
  - { competition: "Salary Prediction for Job Postings", rank: 1, field: 83, top: 1.20 }
  - { competition: "Hash Code Archive - Drone Delivery", rank: 2, field: 130, top: 1.54 }
  - { competition: "Hotel booking demand", rank: 7, field: 406, top: 1.72 }
  - { competition: "Information Retrieval Agent 2025", rank: 8, field: 222, top: 3.60 }
  - { competition: "Scintillation Detector Signal Types", rank: 4, field: 98, top: 4.08 }
  - { competition: "March Machine Learning Mania 2025", rank: 84, field: 1727, top: 4.86 }
  - { competition: "March Machine Learning Mania 2022 - Men’s", rank: 47, field: 930, top: 5.05 }
  - { competition: "Santa Gift Matching Challenge", rank: 40, field: 428, top: 9.35 }
  - { competition: "Predicting F1 Pit Stops", rank: 394, field: 3022, top: 13.04 }
live:
  - { competition: "Biohub - Cell Tracking During Development", rank: 8, field: 2378, top: 0.34 }
  - { competition: "Predicting Smartphone Addiction", rank: 11, field: 1903, top: 0.58 }
  - { competition: "Solar Filament Segmentation Challenge 2026", rank: 7, field: 296, top: 2.36 }
  - { competition: "Titanic - Machine Learning from Disaster", rank: 262, field: 10711, top: 2.45 }
  - { competition: "Predicting Soil Grain Size Distributions from Images", rank: 3, field: 83, top: 3.61 }
  - { competition: "LLM Classification Finetuning", rank: 9, field: 216, top: 4.17 }
  - { competition: "Kaggriculture", rank: 308, field: 4581, top: 6.72 }
  - { competition: "Spaceship Titanic", rank: 159, field: 1635, top: 9.72 }
  - { competition: "UMUD Challenge: Muscle Architecture in Ultrasound Data", rank: 15, field: 149, top: 10.07 }
  - { competition: "The Pokémon Company - PTCG AI Battle Challenge Simulation", rank: 955, field: 6829, top: 13.98 }
  - { competition: "CUHK-X Competition Small Model Track", rank: 31, field: 199, top: 15.58 }
  - { competition: "RSNA Knee Abnormality Detection", rank: 300, field: 1591, top: 18.86 }
  - { competition: "Hyperspectral Object Detection Challenge 2026", rank: 10, field: 40, top: 25.00 }
  - { competition: "ARC Prize 2026 - ARC-AGI-2", rank: 375, field: 1494, top: 25.10 }
---

::: info Still running
Fourteen of these competitions were open on 15 August. Public ranks move, and the private board
is the only one that counts. Everything below is a snapshot with a date on it, and
[the follow-up](/news/2026-10-05-kaggle-biohub-final) says how the open boards closed.
:::

Kaggle is the setting we keep coming back to, because it is one of the few places an agent
loop can be wrong in public. Thousands of humans work on the same problem, the deadline does not
negotiate, and the private leaderboard arrives after every decision has already been made.

## What was run

Built on [Humanize](/humanize/), we designed roughly **ten distinct agent workflows**
and pointed all of them at live competitions. They differ in the things we think actually
matter on a long run:

- how context is managed across hours of work,
- how several skills are orchestrated inside one run,
- how much of an end-to-end machine-learning engineering pipeline the agents own,
- whether a second agent reviews the first one's work, and
- whether attempts run in parallel or in sequence.

## Three kinds of rank

A Kaggle result can be one of three different claims, and we count them apart.

<PostCards>
<PostCard kicker="Official final" metric="2" metric-label="in the top 5%, both in the top 3%" title="An exact place on a closed board." invert>

The private leaderboard, after the deadline. This is a finish.

</PostCard>
<PostCard kicker="Late estimate" metric="12" metric-label="in the top 5%, five in the top 1%" title="A real score, placed afterwards.">

Submitted after the competition closed and placed against the frozen final board. It is real as a
score. It is not a rank, a medal, or evidence of having competed.

</PostCard>
<PostCard kicker="Live public" metric="6" metric-label="in the top 5%, four in the top 3%" title="A position that can still move.">

The public leaderboard of a competition still open. It is official, and it is a weather report.

</PostCard>
</PostCards>

<BarChart
  kicker="Best result per competition · Team Radar · 15 August 2026"
  label="Competitions with a best result in the top 5%: of 19 completed, 2 by official final rank and 12 by late estimate; of 14 ongoing, 6 on the live public board. In the top 1%: of the completed, 5 by late estimate and none by final rank; of the ongoing, 2 on the live public board."
  caption="Each competition counts once, by its best tracked result. Switch to see the top 1%."
  :series="[
    { key: 'final', label: 'Official final', tone: 'accent' },
    { key: 'live', label: 'Live public', tone: 'ink' },
    { key: 'late', label: 'Late estimate', tone: 'grey', hatched: true },
  ]"
  :datasets="[
    { key: 't5', label: 'Top 5%', max: 14, rows: [
      { label: 'Completed', detail: '19 competitions', values: { final: 2, live: 0, late: 12 } },
      { label: 'Ongoing', detail: '14 competitions', values: { final: 0, live: 6, late: 0 } },
    ] },
    { key: 't1', label: 'Top 1%', max: 14, rows: [
      { label: 'Completed', detail: '19 competitions', values: { final: 0, live: 0, late: 5 } },
      { label: 'Ongoing', detail: '14 competitions', values: { final: 0, live: 2, late: 0 } },
    ] },
  ]"
/>

So the honest headline is two finishes, not fourteen: **Predicting Student Health Risk** closed
at 67th of 3,355 (top 2.00%) and **ROGII Wellbore Geology** at 137th of 6,125 (top 2.24%). All
five top-1% results among the completed competitions are late estimates.

## Every result, by kind

Each table is sortable. Click a row to pin it.

<ResultsTable
  caption="Completed · official ranks (final, or public where no private rank was recorded)"
  :columns="[
    { key: 'competition', label: 'Competition' },
    { key: 'rank', label: 'Rank', lowerIsBetter: true },
    { key: 'field', label: 'Of' },
    { key: 'top', label: 'Top', suffix: '%', decimals: 2, lowerIsBetter: true },
  ]"
  :rows="$frontmatter.official"
/>

The two below the top 5% are public-board ranks for competitions that had closed, where no
private rank was recorded.

<ResultsTable
  caption="Completed · late-submission estimates (not ranks)"
  :columns="[
    { key: 'competition', label: 'Competition' },
    { key: 'rank', label: 'Est. rank', lowerIsBetter: true },
    { key: 'field', label: 'Of' },
    { key: 'top', label: 'Top', suffix: '%', decimals: 2, lowerIsBetter: true },
  ]"
  :rows="$frontmatter.late"
/>

<ResultsTable
  caption="Ongoing · live public board, 15 August"
  :columns="[
    { key: 'competition', label: 'Competition' },
    { key: 'rank', label: 'Rank', lowerIsBetter: true },
    { key: 'field', label: 'Of' },
    { key: 'top', label: 'Top', suffix: '%', decimals: 2, lowerIsBetter: true },
  ]"
  :rows="$frontmatter.live"
/>

Two of the live top-3% positions need a footnote. Titanic is a getting-started practice
competition. And Biohub, eighth of 2,378 that day, has since closed at 188th of 3,947: still a
top-5% finish, and [a smaller one](/news/2026-10-05-kaggle-biohub-final).<Sidenote>The Team Radar export behind
these tables leaves out a fixed list of 12 competitions, so the counts are over the 19 completed
and 14 ongoing that remain. The follow-up post counts every competition.</Sidenote>

For comparison, Codex on GPT-5.5 at `xhigh` reasoning effort generally peaked at around the
top-5% level across most of the same competitions. Same models, a different arrangement, and the
arrangement is worth the tail of the distribution.

## What we think is doing the work

Our preliminary read is that the gains come primarily from the **diversity of reasoning
strategies** that multi-agent collaboration makes available. A single strong agent narrows
early and commits. Several agents arranged to disagree keep more than one line of attack alive
long enough to be tested against a validation split that has not been quietly bent to fit.

> That is a hypothesis with a number attached, not a conclusion.

Further analysis is ongoing. The most controlled version of it so far is
[HMA on MLE-bench](/news/2026-10-05-hma-mle-bench): two agents taking turns, against each of them
alone.

[The audit](https://github.com/agentkaggle/kaggle-results-audit) ·
[the live leaderboard](https://agentkaggle.github.io/leaderboard/) ·
[HMA](/hma/)
