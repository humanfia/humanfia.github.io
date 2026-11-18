---
title: "FlowBench: A benchmark that holds the model fixed and scores the flow"
description: Our benchmark for long-horizon agent work. It holds the model fixed and makes the flow the variable, on tasks that take hours and are scored by checks that already existed. It is not released yet.
layout: page
pageClass: fb-page
sidebar: false
aside: false
outline: false
---

<script setup>
import { FbArena, FbHero, FbLog, FbReplays, FbRule, FbSection, FbVariable } from '../.vitepress/theme/components/projects/flowbench'
</script>

<FbHero />

<FbSection n="01" kicker="The gap">

## Benchmarks compare models, but rarely the flow around them

<FbVariable />

On tasks that take hours, the loop around the model can matter more than the model. FlowBench
measures that effect.

</FbSection>

<FbSection n="02" kicker="Methodology" band>

## Everything is held fixed except the flow

Each task runs under every flow, and the same existing check scores every run.

<FbArena />

<div class="fb-rules">

<FbRule n="1" title="Tasks take hours of agent time">

Single-turn tasks do not test the flow around the model.

</FbRule>
<FbRule n="2" title="Scores come from checks, never from a language model">

Every task uses a check that already existed: the code runs faster, compiles or passes its tests.

</FbRule>
<FbRule n="3" title="Model, tools and budget never change between runs" />
<FbRule n="4" title="Flows are scored exactly as users run them">

Flows run unchanged in [Humanize](/humanize/), the runtime users install.

</FbRule>

</div>

</FbSection>

<FbSection n="03" kicker="Evidence so far">

## Three earlier results where the loop moved the score

Each comes from one of our other projects, with the model unchanged. These are **not FlowBench
results**.

<FbReplays />

</FbSection>

<FbSection n="04" kicker="What it changes" band>

## Only flows that win on FlowBench stay on this site

A flow that loses is removed from the [flowverse](/flows/).

<div class="fb-tiles">

- [**Where it sits** Benchmark winners become the default flows in Humanize.](/flows/)
- [**What it scores** Our flows and widely used ones such as the Ralph loop.](https://github.com/humanfia/flowverse)
- [**When it opens up** The first cross-flow numbers will be posted in the news.](/news/)

</div>

</FbSection>

<FbSection n="05" kicker="Status">

## Posts about FlowBench so far

The release will be announced [in the news](/news/) and at
[github.com/humanfia](https://github.com/humanfia).

<FbLog
  :entries="[
    { url: '/blog/2026-07-08-model-tool-flow', metric: 'API · CLI · flow' },
    { url: '/blog/2026-08-17-four-layers-and-a-referee', metric: 'Architecture' },
    { url: '/blog/2026-09-27-kda-for-kda', metric: '4 → 47' },
    { title: 'FlowBench release and first cross-flow numbers', metric: 'Not yet', note: 'The first numbers will cover the flows on this site, including any where ours lose.' },
  ]"
/>

</FbSection>
