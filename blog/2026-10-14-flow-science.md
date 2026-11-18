---
title: "Flow Science: A New Dimension of Scaling Agents"
description: "Models scale with parameters and data, and agents scale with tools; the next dimension is the flow. Why one flow cannot solve every problem, flow-level ablations on four benchmarks with the models held fixed, four findings we did not expect, and whether a flow is engineering or a science."
date: 2026-10-14
authors:
  - Zijian Zhang
tag: Flow Science
---

<script setup>
import DeckFigure from '../.vitepress/theme/components/flowscience/DeckFigure.vue'
import NoFreeLunch from '../.vitepress/theme/components/flowscience/NoFreeLunch.vue'
import FlowLadder from '../.vitepress/theme/components/flowscience/FlowLadder.vue'
import AblationAxes from '../.vitepress/theme/components/flowscience/AblationAxes.vue'
</script>

Flow is the new dimension of scaling agents. Models scale with parameters and data, and agents
scale with tools. The next dimension is the flow: which agent goes next, what it is asked, what
it remembers, and when it stops. Change only the flow and the same models land somewhere else.

This post is what we have measured so far. It makes the case first: a single session is not
enough on long, hard tasks, and no one flow can serve every task. Then it runs flows against
each other on four benchmarks with the models held fixed. Last come four things those runs
showed that we did not expect, and why we think flows are a science rather than one more kind
of engineering.

Every figure is rebuilt from the charts in our October 2026 "Humanize Intro" talk. Hover over a
figure, tap it or use the arrow keys to read values, pick a tab where there is one, and click a
legend entry to hide that series. These are our own runs, **Humanfia-reported, 2026-10-05**,
unless a figure links to something published.

## From session to flow

A coding agent's own `/goal` is one session pursuing one objective until it says it is done.
That works for small tasks. On long, hard ones it is not enough. On Anthropic's original
performance take-home, `/goal` with GPT-5.6 Sol spends 2.6 million output tokens to reach about
1,080 clock cycles. A Ralph loop on the same model gets below 1,100 within half a million. A
Flame Chase alternating Claude Fable 5 and GPT-5.6 Sol keeps improving and finishes near 1,010.

<DeckFigure of="SESSION_TO_FLOW" :n="1" title="A simple /goal is not enough for complex tasks" source="slide 2" />

Against `/goal`, that is **about 70 cycles better** (1,010 against 1,079) for Flame Chase, and
**about three-quarters fewer tokens** for the Ralph loop to get below 1,100 (0.33 million
against 1.36 million).
*Humanfia-reported, 2026-10-05.*

## No free lunch: one flow cannot solve every problem

Our first flow, **RLCR Flow** (Ralph loop with Codex review), is good at building a project
from scratch. Coding of that kind is a **constraint satisfaction problem**. Every requested
feature must be implemented, the tests must pass and the lints must be clean. We do not care
about the exact shape of the code. One feasible solution is enough.

A CUDA kernel is a different problem. A kernel that merely runs is not the goal: we want the
fastest one that is still correct. That makes it an **optimization problem**, and real runs
already guarantee that a candidate is feasible. For this we built the **Flame-Chase loop**: two
fresh agents take turns on one shared repository. In our runs, Claude Code with Claude Fable 5
tends toward large refactors, which sometimes make things slower. Codex with GPT-5.6 Sol tends
to fine-tune, and gets stuck in a local optimum. Alternating the two lets the run jump from one
local optimum to a better one.

<NoFreeLunch />

| Problem class | What "done" means | Flow family |
| --- | --- | --- |
| Constraint satisfaction | any solution that passes every check | [RLCR](/flows/humanize1), the [Ralph loop](/flows/ralph-loop) |
| Optimization | the best solution found | [Flame Chase](/flows/flame-chase), [Parallel Flame Chase](/flows/parallel-flame-chase) |
| Decision | a yes or no, with a certificate | open |
| Prediction | a calibrated estimate | open |
| Game-theoretic | a strategy that holds against others | open |
| Counting | an exact number | open |

Theorem proving, hyperparameter tuning and many other tasks need flows of their own. That is
why [Humanize](/humanize/) is a framework for writing flows, not a single loop.

## Four benchmarks, one set of models

If the flow matters this much, the best flow should change from one task to the next, and that
should show even when the models are held fixed. So we held them fixed and ran flows against
each other on four benchmarks. The best flow differs from one benchmark to the next.

<DeckFigure of="ABLATIONS" :n="2" title="Flow-level ablations on four benchmarks" source="slides 8 and 22" tabs-label="Benchmark" />

- **MLE-bench.** Flame Chase leads from about the first hour and ties Claude Opus 5's `/goal`
  at 52 of 75 tasks after six hours. The published [HMA](/news/2026-10-05-hma-mle-bench) result
  uses the same alternation and scores each task's best submission: 78.2% any-medal.
- **HLE.** `/goal` is fastest at first. Flame Chase catches up by about an hour and ends highest.
  The Ralph loop and RLCR are slow until a late jump.
- **ProgramBench.** Flame Chase ends highest (90.2), ahead of Opus 5 `/goal` (87.8), RLAR
  (86.4) and GPT-5.6 Sol `/goal` (79.8).
- **Anthropic's performance take-home.** Every single-model flow stops between about 1,045 and
  1,080 cycles. Only the two-model Flame Chase keeps going.

## What the ablations say

No two of those benchmarks have the same shape. On one benchmark `/goal` is fastest at first, on
another it ties at the end, and on the take-home every single-model flow stops while the
two-model Flame Chase keeps going. The flow is a choice to make per task.

Running these ablations also surfaced four things we did not expect: about diversity, about
collaboration, about how the goal is posed, and about how models change over a long run.

## Higher diversity, higher score

Two different models taking turns beat either model working alone, whether you measure tokens,
dollars or hours. The Flame Chase of Claude Fable 5 and GPT-5.6 Sol goes below either model's
own Ralph loop, and keeps going after both have stopped.

<DeckFigure of="DIVERSITY" :n="3" title="Two models alternating against each model alone" source="slide 23" tabs-label="X axis" />

## Better collaboration, better performance

Parallelism helps only as much as the lanes can work together. Three Flame Chase lanes that
share reports beat one chase. The same three lanes with a coordinator merging their work
through Git pull requests beat both, on wall-clock time and on the tokens along the critical
path.

<DeckFigure of="COLLABORATION" :n="4" title="Flame Chase, Parallel Flame Chase and its Git/PR variant, 12 hours" source="slide 24" tabs-label="X axis" />

## A progressive goal keeps agents on track

In a Ralph loop, every round starts from a fresh session with the same goal. Agents lose their
way: a round redoes work, or polishes the wrong thing. If the goal advances as milestones are
met, the same model on the same task gets below 1,000 cycles. With a fixed goal it levels off
near 1,060.

<DeckFigure of="PROGRESSIVE" :n="5" title="Ralph loop, one fixed goal against a progressive goal" source="slide 25" tabs-label="X axis" />

## Claude degrades across turns, GPT does not, and Flame Chase helps

Measured by output tokens per response over a 24-hour run, GPT-5.6 Sol works at the same
length from the first hour to the last, in every flow. Claude Fable 5 starts with very long
responses. In the flows that keep one session going (Always continue, Always prompt, ARAR), it
falls to under a hundred tokens per response within five to ten hours. At that point it is
barely working. In the Flame Chase, where a fresh Fable session alternates with GPT, it stays
near a thousand. On the take-home, that is also where the cycles keep falling.

<DeckFigure of="DEGRADATION" :n="6" title="Output tokens per response over a 24-hour run" source="slides 26 and 27" tabs-label="Model" />

The talk also showed this measurement for a Ralph loop at every effort level on ten models,
five from each vendor. The GPT models stay flat. Some of the Claude models decay over the run,
most clearly Fable 5 at both effort levels and Opus 4.8 at `xhigh`.

## Engineering, or a science?

Is a flow just one more kind of prompt, context, skill or loop engineering? We think it can be
more than that.

<FlowLadder />

A flow family can be studied the way a model architecture is: hold everything else fixed, vary
one thing and measure the result. These are the axes along which we are ablating the Flame
Chase:

<AblationAxes />

The work needs a runtime that can express any of these variations as a short piece of Python,
run it for a day on real hardware and record every turn on one clock. That is what
[Humanize](/humanize/) is. How it works underneath is in
[its documentation](/humanize/features/).
