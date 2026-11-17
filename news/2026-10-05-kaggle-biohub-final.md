---
title: "Biohub final: #188 of 3,947, top 5%"
description: "In August an agent workflow sat 8th on the Biohub cell-tracking public leaderboard. The final private rank is 188th of 3,947, the top 4.76%: lower, but an official finish. Plus the Kaggle tally when only final ranks count."
date: 2026-09-30
authors:
  - Changye Li
tag: HMA
achievement:
  topic: Kaggle
  value: 16
  suffix: /39
  of: 39
  viz: dots
  label: "Kaggle top 5%"
  body: "The best tracked result in each of 39 completed competitions; three are final private ranks."

hero:
  kicker: Biohub – Cell Tracking · final private board
  value: 188
  from: 8
  prefix: '#'
  label: of 3,947 teams, the top 4.76%. On 15 August the public board had it 8th of 2,378.

# Before: the AgentKaggle Team Radar snapshot of 2026-08-15 16:12 UTC (public boards, as exported
# to agentkaggle/kaggle-results-audit, ongoing/visualizations/latest_results.csv). After: the
# Team Radar page snapshot of 2026-10-05 09:18 UTC (final private boards). Top % = rank / field.
closed:
  - { label: Biohub – Cell Tracking, detail: "8 / 2,378 → 188 / 3,947", values: { aug: 0.34, final: 4.76 } }
  - { label: PTCG AI Battle, detail: "955 / 6,829 → 654 / 6,807", values: { aug: 13.98, final: 9.61 } }
  - { label: CUHK-X Small Model, detail: "31 / 199 → 56 / 326", values: { aug: 15.58, final: 17.18 } }
  - { label: Hyperspectral Detection, detail: "10 / 40 → 77 / 309", values: { aug: 25.0, final: 24.92 } }
# The best tracked result in each completed competition that is in the top 5%, Team Radar,
# 2026-10-05 09:18 UTC.
tally:
  - { competition: "Predicting Student Health Risk", rank: 67, field: 3355, top: 2.00, kind: "Final, private", highlight: true }
  - { competition: "ROGII - Wellbore Geology Prediction", rank: 137, field: 6125, top: 2.24, kind: "Final, private", highlight: true }
  - { competition: "Biohub - Cell Tracking During Development", rank: 188, field: 3947, top: 4.76, kind: "Final, private", highlight: true }
  - { competition: "Predicting Smartphone Addiction", rank: 2, field: 3531, top: 0.06, kind: "Public, at snapshot" }
  - { competition: "NeurIPS 2025 - Google Code Golf Championship", rank: 1, field: 1142, top: 0.09, kind: "Late estimate" }
  - { competition: "Critical temperature of superconductors", rank: 1, field: 494, top: 0.20, kind: "Late estimate" }
  - { competition: "Helios Corn Futures Climate Challenge", rank: 1, field: 153, top: 0.65, kind: "Late estimate" }
  - { competition: "Electricity consumption", rank: 1, field: 150, top: 0.67, kind: "Late estimate" }
  - { competition: "CMI - Detect Behavior with Sensor Data", rank: 19, field: 2657, top: 0.72, kind: "Late estimate" }
  - { competition: "Hash Code Archive - Photo Slideshow Optimization", rank: 1, field: 89, top: 1.12, kind: "Late estimate" }
  - { competition: "Salary Prediction for Job Postings", rank: 1, field: 83, top: 1.20, kind: "Late estimate" }
  - { competition: "Hash Code Archive - Drone Delivery", rank: 2, field: 130, top: 1.54, kind: "Late estimate" }
  - { competition: "Hotel booking demand", rank: 7, field: 406, top: 1.72, kind: "Late estimate" }
  - { competition: "Information Retrieval Agent 2025", rank: 8, field: 222, top: 3.60, kind: "Late estimate" }
  - { competition: "Scintillation Detector Signal Types", rank: 4, field: 98, top: 4.08, kind: "Late estimate" }
  - { competition: "March Machine Learning Mania 2025", rank: 84, field: 1727, top: 4.86, kind: "Late estimate" }
---

[On 15 August](/news/2026-08-15-kaggle-nineteen-competitions), one of our agent workflows on
Kaggle was **8th of 2,378** on the public leaderboard of
[Biohub – Cell Tracking During Development](https://www.kaggle.com/competitions/biohub-cell-tracking-during-development).
That was the top 0.34%. It was among the ongoing results we reported then, under a note that
the numbers were still moving.

The competition has closed. The authenticated final private rank is **188th of 3,947**, the
**top 4.76%**. That is a genuine top-5% finish on a closed board. It is also 188th, not 8th.

<RangeMeter
  kicker="Biohub · where the result sits, in top %"
  label="Biohub on a top-percent scale: 0.34% on the public board on 15 August, 4.76% on the final private board. The top 5% ends at 5. Move the handle to compare."
  status="This position"
  unit="%"
  :decimals="2"
  :max="10"
  :value="4.76"
  :markers="[
    { value: 0.34, label: '0.34%', note: '8th of 2,378 · public board, 15 August' },
    { value: 4.76, label: '4.76%', note: '188th of 3,947 · final private board' },
  ]"
  :zones="[
    { from: 0, to: 5, label: 'inside the top 5%' },
    { from: 5, to: 10, label: 'outside the top 5%' },
  ]"
/>

We do not know how much of the gap is the private board reshuffling and how much is everything
that happened after 15 August: 1,569 more teams entered, and the rest of the field kept
improving.<Sidenote>2,378 teams on 15 August, 3,947 at the close.</Sidenote> The point stands
either way.

> A public rank in the middle of a competition is a weather report.

We said so in August, and this is what it looks like.

## The other boards that closed

Four of the competitions that were open in August now have final private ranks. Drag the divider
to see each board then and now.

<SwipeCompare kicker="Four boards, twice" before-label="15 August · public" after-label="Final · private" label="The best tracked result in four competitions, on the public board on 15 August and on the final private board.">
<template #before>
<table class="sw-table"><thead><tr><th>#</th><th>Competition · place</th></tr></thead><tbody>
<tr><th>1</th><td>Biohub – Cell Tracking: 8 / 2,378 · top 0.34%</td></tr>
<tr><th>2</th><td>PTCG AI Battle: 955 / 6,829 · top 14.0%</td></tr>
<tr><th>3</th><td>CUHK-X Small Model: 31 / 199 · top 15.6%</td></tr>
<tr><th>4</th><td>Hyperspectral Detection: 10 / 40 · top 25%</td></tr>
</tbody></table>
</template>
<template #after>
<table class="sw-table"><thead><tr><th>#</th><th>Competition · place</th></tr></thead><tbody>
<tr><th>1</th><td>Biohub – Cell Tracking: 188 / 3,947 · top 4.76%</td></tr>
<tr><th>2</th><td>PTCG AI Battle: 654 / 6,807 · top 9.61%</td></tr>
<tr><th>3</th><td>CUHK-X Small Model: 56 / 326 · top 17.2%</td></tr>
<tr><th>4</th><td>Hyperspectral Detection: 77 / 309 · top 24.9%</td></tr>
</tbody></table>
</template>
</SwipeCompare>

<BarChart
  kicker="Top % of the field · lower is better"
  label="Top percent of the field, public board on 15 August against the final private board. Biohub 0.34 to 4.76. PTCG AI Battle 13.98 to 9.61. CUHK-X Small Model 15.58 to 17.18. Hyperspectral Detection 25.00 to 24.92."
  caption="A shorter bar is a better place."
  :series="[
    { key: 'aug', label: '15 August, public', tone: 'grey', hatched: true },
    { key: 'final', label: 'Final, private', tone: 'accent' },
  ]"
  :rows="$frontmatter.closed"
  suffix="%"
  :decimals="2"
  :max="30"
/>

Biohub fell the furthest. PTCG AI Battle rose, and Hyperspectral Detection held its place in a
field almost eight times larger. The boards still open moved
too: Solar Filament Segmentation went from 7th of 296 in August to 149th of 872 today.

One more closed with a striking number we cannot yet count.
[Predicting Smartphone Addiction](https://www.kaggle.com/competitions/playground-series-s6e8)
shows an account at **2nd of 3,531**, but on the *public* board as of the snapshot. That
account's final private rank has not been recorded. The best authenticated private rank we
have there is 564th. Until the private rank is in, rank 2 is not a finish, and we do not report
it as one.

## The tally, counting only final ranks

The [AgentKaggle Team Radar](https://agentkaggle.github.io/leaderboard/visualizations/)
(snapshot 2026-10-05 09:18 UTC) tracks **39** completed competitions. Taking the best tracked
result in each, **16** are in the top 5%. Most of those are not finishes.

<StatGrid
  lead
  :items="[
    { value: 3, kicker: 'Final private ranks', text: 'Student Health Risk (top 2.00%), ROGII Wellbore Geology (top 2.24%) and Biohub (top 4.76%).' },
    { value: 12, kicker: 'Late estimates', text: 'Real scores placed against a frozen final board. Not ranks, medals or evidence of having competed.' },
    { value: 1, kicker: 'Public rank at snapshot', text: 'The Smartphone Addiction result above, until its private rank is in.' },
  ]"
/>

<ResultsTable
  caption="The 16 completed competitions in the top 5%, by kind of rank"
  :columns="[
    { key: 'competition', label: 'Competition' },
    { key: 'kind', label: 'Kind' },
    { key: 'rank', label: 'Rank', lowerIsBetter: true },
    { key: 'field', label: 'Of' },
    { key: 'top', label: 'Top', suffix: '%', decimals: 2, lowerIsBetter: true },
  ]"
  :rows="$frontmatter.tally"
/>

The audit's
[charts](https://github.com/agentkaggle/kaggle-results-audit/tree/main/completed/visualizations)
are drawn with a fixed list of 12 competitions left out, so a chart rendered from today's data
shows 27, not 39. All 12 are outside the top 15%, so leaving them out flatters the picture. The
counts above use all 39. Of the **13** competitions still open, 3 sit in the top 5% of their
public boards today. One of those 3 is Spaceship Titanic, a getting-started practice
competition.

The set of tracked accounts has also changed since August, with some added and some
dropped. That is why we compare competitions one by one here, and do not compare August's
totals with today's.

[The audit](https://github.com/agentkaggle/kaggle-results-audit) ·
[Team Radar](https://agentkaggle.github.io/leaderboard/) · [HMA](/hma/)
