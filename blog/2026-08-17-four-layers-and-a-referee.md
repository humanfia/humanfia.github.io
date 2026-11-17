---
title: "Humanfia: From a Review Loop to Four Layers and a Referee"
description: "How Humanfia went from a July launch, an agent workflow for serious L3–L4 development, to a four-layer system of agents, a runtime, flows and applications, plus FlowBench, whose best flow becomes the default."
date: 2026-08-17
authors:
  - Humanfia
tag: Architecture
---

Software agents are becoming capable enough to do more than complete isolated coding tasks.
The next challenge is not simply stronger models. It is building a workflow that can carry an
idea through architecture, implementation, independent review and refinement without losing
human intent.

In July we introduced **Humanfia**, an open-source effort focused on agent workflows for
serious L3–L4 software development. It connected careful human-agent alignment, a
workflow-native terminal agent, and a disciplined build-review loop. A month later the shape of
the work had changed enough to be worth redrawing. This post tells both halves: the idea as it
launched, and the four layers and a referee it became.

<PullQuote>Build with agents, in a humanized way.</PullQuote>

## Why workflows matter

A capable model can write a function. A capable development *system* must do much more. It has
to understand a repository, preserve constraints, use the right tools, validate its work,
incorporate external review, and continue until the actual acceptance criteria are met.

That system should not remove the human from the process. The human remains the architect,
defining intent, evaluating tradeoffs, and deciding what "done" means. Agents provide execution
leverage inside that contract.

## From first idea to final implementation

The workflow we launched with had four stages, and the last two go round until the work is done.

<AnimatedDiagram
  view-box="0 0 600 300"
  :min-width="420"
  :max-width="760"
  kicker="Idea → realization · four stages"
  label="The workflow. The human shapes the idea into a plan with acceptance criteria. Agents execute it with tools. A second model reviews the work independently. Its findings are refined back into the implementation, round after round, until the plan's contract is satisfied."
  :steps="[
    'Shape the idea: a rough direction becomes an explicit plan, with constraints and acceptance criteria. The human owns it.',
    'Execute with tools: search, edit, run, debug and browse in a workflow-native terminal.',
    'Review independently: a second model judges correctness, quality and design. The builder does not grade itself.',
    'Refine to done: findings go back into the implementation, round after round, until the plan’s contract is met.',
  ]"
>
  <path id="lx-plan" class="line dash" d="M150 70 H300 V100" data-step="2" data-draw />
  <path id="lx-out" class="line dash" d="M330 100 C 380 60, 420 60, 450 100" data-step="3" data-draw />
  <path id="lx-back" class="line accent" d="M450 200 C 410 260, 340 260, 300 200" data-step="4" data-draw />
  <g data-step="1" data-pop>
    <rect class="frame" x="10" y="40" width="140" height="60" />
    <text class="ink t-lg" x="80" y="68" text-anchor="middle">Shape</text>
    <text x="80" y="90" text-anchor="middle">the plan</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="225" y="100" width="150" height="100" />
    <text class="on-ink t-lg" x="300" y="146" text-anchor="middle">Execute</text>
    <text class="on-ink" x="300" y="170" text-anchor="middle">builder</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="430" y="100" width="150" height="100" />
    <text class="on-accent t-lg" x="505" y="146" text-anchor="middle">Review</text>
    <text class="on-accent" x="505" y="170" text-anchor="middle">second model</text>
  </g>
  <text class="accent t-lg" x="375" y="288" text-anchor="middle" data-step="4">Refine to done</text>
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#lx-out" data-loop />
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="4" data-travel="#lx-back" data-loop />
</AnimatedDiagram>

## Two open-source foundations

As launched, the workflow rested on two pieces.

<PostCards>
<PostCard kicker="Execution" title="oh-my-humanize">

[A workflow-native terminal coding agent](https://github.com/humanfia/oh-my-humanize) with code
intelligence, debugging, subagents, browser control, review, memory and broad model support.

</PostCard>
<PostCard kicker="Feedback loop" title="RLCR Flow">

[The disciplined loop](/flows/humanize1). Claude implements, Codex independently reviews, and
review findings cycle back into implementation. The human stays responsible for the plan and the
final decision.

</PostCard>
</PostCards>

::: tip Model peer-review
The model that built the code should not be the only model judging the change. In RLCR Flow,
we recommended Claude as builder and Codex as reviewer.
:::

## Beyond general software: Kernel Design Agents

The same workflow architecture can be specialised for high-value domains.
[KDA](/kda/), Kernel Design Agents, applies iterative generation, benchmarking, review
and refinement to produce optimised kernels at scale.

This is where agent workflows become more than coding assistance. They become repeatable
production systems, able to explore many candidate implementations while preserving
measurement, correctness checks and human oversight.

## Then and now

The launch promised to keep improving the workflow primitives, to strengthen model peer-review,
and to publish what we learned from long-running development tasks. Much of that has since been
built and measured. Drag the divider to see what became of each piece.<Sidenote>This
comparison was added in October 2026.</Sidenote>

<SwipeCompare kicker="Humanfia, July → October 2026" before-label="July: promised" after-label="October: built" label="What the launch post promised in July 2026, against what was built by October 2026.">
<template #before>
<table class="sw-table"><thead><tr><th>#</th><th>In July</th></tr></thead><tbody>
<tr><th>1</th><td><strong>Execution:</strong> oh-my-humanize, our own agent</td></tr>
<tr><th>2</th><td><strong>The loop:</strong> RLCR Flow, Claude builds, Codex reviews</td></tr>
<tr><th>3</th><td><strong>Review:</strong> a second model, recommended</td></tr>
<tr><th>4</th><td><strong>Domains:</strong> KDA</td></tr>
<tr><th>5</th><td><strong>Measurement:</strong> "publishing what we learn"</td></tr>
</tbody></table>
</template>
<template #after>
<table class="sw-table"><thead><tr><th>#</th><th>By October</th></tr></thead><tbody>
<tr><th>1</th><td><strong>Execution:</strong> <a href="/humanize/">Humanize</a>, driving your CLIs</td></tr>
<tr><th>2</th><td><strong>The loop:</strong> <a href="/flows/humanize1">humanize1</a>, <a href="/flows/rlar">RLAR</a> and more <a href="/flows/">flows</a></td></tr>
<tr><th>3</th><td><strong>Review:</strong> any CLI, fresh every round</td></tr>
<tr><th>4</th><td><strong>Domains:</strong> KDA, HOA and HMA</td></tr>
<tr><th>5</th><td><strong>Measurement:</strong> <a href="/flowbench/">FlowBench</a>, ranking flows</td></tr>
</tbody></table>
</template>
</SwipeCompare>

## What changed

The July version of Humanfia was a coding agent with a good workflow inside it. Building it
taught us something inconvenient: the workflow was the valuable part, and putting it inside a
binary was the worst possible place to keep it. You cannot read it, you cannot fork it, you
cannot publish yours, and, the one that actually hurt, you cannot measure it against somebody
else's.

So we retired the terminal agent and took the workflow apart along that seam, keeping it
outside any one agent.

The loop became a **flow**: a directory of Python that says what each agent is asked, in what
order, and when to stop. The thing that runs it became a **runtime** that drives whichever
coding-agent CLI you already log into, rather than replacing it. And because flows are now
comparable objects, we could finally do the thing we wanted all along: find out which ones are
actually better.

## The layers

Here is the whole of it in one picture.

<AnimatedDiagram
  view-box="0 0 640 440"
  :min-width="440"
  :max-width="820"
  kicker="Humanfia · four layers and a referee"
  label="The architecture. At the bottom, the agents: twelve coding-agent CLIs, any ACP agent and a person. Above them is Humanize, in two halves: coganchor drives each CLI on its account and machine, and the runtime runs a flow, its environments and its trace, reached through hmz, the TUI, the daemon and the SDK; flows say what each agent is asked; applications HOA, KDA and HMA are where a flow is found out. FlowBench, alongside, scores the flows and sends the winner back in as the default."
  :steps="[
    'The agents: twelve coding-agent CLIs, any ACP agent, and a person, each on a login you already have.',
    'Humanize, its lower half: coganchor drives them, choosing the CLI, the account and the machine a turn lands on.',
    'Humanize, its upper half: the runtime runs a flow, with its sessions, turns, environments and trace. hmz, the TUI, the daemon and the SDK all reach the same runtime.',
    'Flows are the method, as code: chat and six loops built in, and the flowverse for the rest. A turn goes down; a trace comes back.',
    'Applications are where a flow is found out: HOA, KDA and HMA.',
    'FlowBench scores the flows against each other, and the winner goes back in as the default.',
  ]"
>
  <g data-step="1">
    <rect class="ink" x="125" y="365" width="18" height="18" />
    <rect class="ink" x="149" y="365" width="18" height="18" />
    <rect class="ink" x="173" y="365" width="18" height="18" />
    <rect class="ink" x="197" y="365" width="18" height="18" />
    <rect class="ink" x="221" y="365" width="18" height="18" />
    <rect class="ink" x="245" y="365" width="18" height="18" />
    <rect class="ink" x="269" y="365" width="18" height="18" />
    <rect class="ink" x="293" y="365" width="18" height="18" />
    <rect class="ink" x="317" y="365" width="18" height="18" />
    <rect class="ink" x="341" y="365" width="18" height="18" />
    <rect class="ink" x="365" y="365" width="18" height="18" />
    <rect class="ink" x="389" y="365" width="18" height="18" />
    <rect class="grey" x="413" y="365" width="18" height="18" />
    <rect class="accent" x="437" y="365" width="18" height="18" />
    <text x="125" y="418">12 CLIs · ACP · a person</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="frame" x="110" y="275" width="360" height="60" />
    <text class="ink t-lg" x="125" y="301">coganchor</text>
    <text x="125" y="324">CLIs · accounts · anchor</text>
  </g>
  <g data-step="3" data-pop>
    <rect class="ink" x="110" y="190" width="360" height="60" />
    <text class="on-ink t-lg" x="125" y="216">Runtime</text>
    <text class="on-ink" x="125" y="239">engine · envs · trace</text>
  </g>
  <g data-step="3">
    <rect class="frame" x="5" y="160" width="90" height="120" />
    <text class="ink" x="50" y="186" text-anchor="middle">hmz</text>
    <text class="ink" x="50" y="212" text-anchor="middle">TUI</text>
    <text class="ink" x="50" y="238" text-anchor="middle">daemon</text>
    <text class="ink" x="50" y="264" text-anchor="middle">SDK</text>
  </g>
  <path class="line ink" d="M95 220 H110" data-step="3" data-draw />
  <g data-step="3">
    <rect class="accent" x="470" y="190" width="6" height="145" />
    <text class="accent" x="498" y="262" text-anchor="middle" transform="rotate(-90 498 262)">humanize</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="accent" x="110" y="105" width="360" height="60" />
    <text class="on-accent t-lg" x="125" y="131">Flows</text>
    <text class="on-accent" x="125" y="154">built in · flowverse</text>
  </g>
  <path id="arch-turn" class="line dash" d="M470 135 H508 V374 H458" data-step="4" data-draw />
  <g data-step="5" data-pop>
    <rect class="frame" x="110" y="20" width="360" height="60" />
    <text class="ink t-lg" x="125" y="46">Applications</text>
    <text x="125" y="69">HOA · KDA · HMA</text>
  </g>
  <g data-step="6" data-pop>
    <rect class="ink" x="520" y="190" width="110" height="200" />
    <text class="on-ink t-lg" x="575" y="290" text-anchor="middle" transform="rotate(-90 575 290)">FlowBench</text>
  </g>
  <path id="arch-back" class="line accent" d="M575 190 V92 H440 V105" data-step="6" data-draw />
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="4" data-travel="#arch-turn" data-loop />
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="6" data-travel="#arch-back" data-loop />
</AnimatedDiagram>

**The agents.** Twelve coding-agent CLIs, including Claude Code, Codex, Antigravity, Grok Build,
Kimi Code, Qwen Code, pi and opencode, plus any agent that speaks the Agent Client Protocol, and
a person at the keyboard, who can take a role like any agent. Each CLI is driven through the
interface it already serves, and runs on its own sign-in or on an
[account](/humanize/features/accounts) you add. The frontier moves every
few weeks, and the wrapper around one vendor is the least valuable thing in this picture.<Sidenote>This
section was updated in October 2026 to match humanize as it is today: more backends, the flows
that now ship built in, and the runtime's real layers.</Sidenote>

**Humanize, the runtime.** [Humanize](/humanize/) is one layer in two halves. The lower
half, [coganchor](/humanize/features/anchor), is the only part that knows how to drive a CLI: which backend a role is, which
account it runs as, which machine its turns land on, where a turn goes when that place cannot
take it, and what its tokens cost. Nothing above it reaches past it to a driver.

The upper half opens and resumes sessions and takes turns in the order a flow asks for. It puts work in a container, on another machine over SSH, or across a
swarm when it should, and writes the whole run down as it happens, so it reads back as a
timeline. The command line, the terminal interface, the daemon that keeps runs alive after a
terminal closes, and the Python SDK are all ways into that one runtime, not copies of it. Its
documentation is at [humanfia.ai/humanize](/humanize/).

**Flows.** [The flows](/flows/): [RLAR](/flows/rlar), [Flame Chase](/flows/flame-chase),
[Ralph loop](/flows/ralph-loop) and the other loops built in, [humanize1](/flows/humanize1),
and every flow the [flowverse](https://github.com/humanfia/flowverse) lists. The loops everyone
already uses are kept alongside ours, so that a comparison is a flag rather than a
reimplementation.

**Applications.** [HOA](/hoa/) for olympiad mathematics, [KDA](/kda/) for GPU
kernels and [HMA](/hma/) for machine-learning engineering. Each was chosen because the
scoreboard belongs to somebody else.

## Why the benchmark is a layer and not a report

[FlowBench](/flowbench/) sits alongside the stack rather than on top of it, and the
arrow that matters is the one going back up.

There is a well-known trick where you start a fresh session every turn, so nothing carries over
and the agent cannot talk itself into a hole. Everybody has heard of it. Nobody has published
what it is worth. Ask how much better it is than holding one session, on a task that takes a
day, at a given model, and the honest answer is a shrug and an anecdote.

That is the state of the entire field of agent methodology, and it is unusual. Imagine
compilers with strongly held opinions about loop unrolling and no benchmark suite.

So the method becomes the variable and everything else is held fixed. The tasks are long enough
that the loop matters more than the model, and the scoring is done by something real rather
than by another language model asked to be a judge. The flow that wins becomes a default. The
flow that loses gets deleted, including ours.

> A benchmark that ranks things is a scoreboard. A benchmark whose winner becomes the next
> default is a flywheel.

That last clause is the whole design. It means our opinions have to survive contact with a
number, every time.

FlowBench is not released yet. When it is, the first thing published will be the numbers for
the flows on this site, whether or not they flatter us.

## The part that keeps us honest

The applications are not demos. They are the reason any of this is trustworthy.

Every layer below them can be evaluated with numbers we chose ourselves, and numbers you choose
yourself have a way of going up. A Lean 4 kernel does not care what we intended. A contest
deadline does not care. A public leaderboard does not care. So far that has produced
[all six IMO 2026 problems formally verified](/news/2026-07-22-imo-2026),
[all 672 of PutnamBench](/news/2026-10-05-putnambench-672), and
[top-three placements on every track](/news/2026-05-15-mlsys-flashinfer-top3) of the MLSys 2026
FlashInfer kernel contest with MIT HAN Lab.

They are also where the hard tasks come from. A benchmark assembled from a domain nobody works in
decays into a puzzle collection within a year. Ours is assembled from work we were doing anyway.

## What is next

<PostCards numbered>
<PostCard title="FlowBench, released.">

With the first cross-flow numbers.

</PostCard>
<PostCard title="More flows.">

Including several that only exist because a trace showed us where an eleven-hour run went
wrong.

</PostCard>
<PostCard title="More applications.">

On the same rule: somebody else keeps the scoreboard.

</PostCard>
</PostCards>

Everything is at [github.com/humanfia](https://github.com/humanfia). The projects are open
source, and we welcome builders who believe the future of software development should be both
more automated and more intentional. If you have a loop you think beats ours, we would genuinely
like to see it. That is the entire point of publishing the ones we have.

> The goal is not to hand software development over to agents. The goal is to give agents a
> better workflow, and give humans a better way to direct them.
