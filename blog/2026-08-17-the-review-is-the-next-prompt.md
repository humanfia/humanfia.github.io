---
title: "RLAR: The Review Is the Next Prompt"
description: "Two small decisions inside RLAR changed how long-horizon runs behave: the reviewer's words go to the actor verbatim, and \"done\" is read off a field rather than a sentence."
date: 2026-08-17
authors:
  - Humanfia
tag: Method
---

[RLAR](/flows/rlar) is a loop of about fifty lines. Two decisions in it are the reason it works,
and both sound like details until you watch a hundred hours of runs without them.

<AnimatedDiagram
  view-box="0 0 600 330"
  :min-width="420"
  :max-width="760"
  kicker="RLAR · one round"
  label="One round of RLAR. The actor works in one session that remembers. A fresh reviewer reads the repository, not the actor's summary, and answers in a shape: done and notes. If done is false, the notes go back to the actor word for word as its next prompt. If done is true, the run ends on the notes."
  :steps="[
    'The actor works in one session that remembers every round.',
    'A fresh reviewer, with no memory of earlier rounds, reads the repository rather than the actor’s summary.',
    'It answers in a shape with two fields: done, and notes.',
    'done is false: the notes go to the actor word for word, as the whole of its next prompt.',
    'done is true: the run ends, on the notes.',
  ]"
>
  <path id="rr-work" class="line dash" d="M105 115 C 105 210, 150 285, 220 285" data-step="1" data-draw />
  <path id="rr-read" class="line dash" d="M380 285 C 450 285, 475 210, 475 115" data-step="2" data-draw />
  <path id="rr-notes" class="line accent" d="M400 60 C 340 10, 260 10, 200 60" data-step="4" data-draw />
  <path id="rr-done" class="line dash" d="M560 115 V170" data-step="5" data-draw />
  <g data-step="1" data-pop>
    <rect class="accent" x="20" y="45" width="180" height="70" />
    <text class="on-accent t-lg" x="110" y="78" text-anchor="middle">actor</text>
    <text class="on-accent" x="110" y="100" text-anchor="middle">one session</text>
  </g>
  <g data-step="1">
    <rect class="frame" x="220" y="255" width="160" height="60" />
    <text class="ink" x="300" y="290" text-anchor="middle">repository</text>
  </g>
  <g data-step="2" data-pop>
    <rect class="ink" x="400" y="45" width="180" height="70" />
    <text class="on-ink t-lg" x="490" y="78" text-anchor="middle">reviewer</text>
    <text class="on-ink" x="490" y="100" text-anchor="middle">new each round</text>
  </g>
  <g data-step="3">
    <rect class="frame" x="215" y="135" width="170" height="64" />
    <text class="ink" x="300" y="162" text-anchor="middle">done: bool</text>
    <text class="ink" x="300" y="185" text-anchor="middle">notes: str</text>
  </g>
  <text class="accent" x="300" y="22" text-anchor="middle" data-step="4">notes, verbatim</text>
  <g data-step="5" data-pop>
    <rect class="accent" x="500" y="170" width="90" height="44" />
    <text class="on-accent" x="545" y="197" text-anchor="middle">end</text>
  </g>
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="1" data-travel="#rr-work" data-loop />
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="2" data-travel="#rr-read" data-loop />
  <rect class="accent" x="-7" y="-7" width="14" height="14" data-step="4" data-travel="#rr-notes" data-loop />
</AnimatedDiagram>

## One: the review is the next prompt, verbatim

The obvious way to build an actor-and-reviewer loop goes like this. The reviewer writes an
assessment, the loop reads it, and something (a template, a summariser, the flow itself) turns
it into instructions for the actor.

Every layer in that chain is somewhere findings go to die. The reviewer notices that a test was
narrowed. The summariser renders it as "some test changes were noted". The actor reads that as
permission.

So in RLAR there is no chain. What the reviewer writes is passed to the actor word for word, as
its entire next prompt, and it is everything the actor will hear about that round.<Sidenote>RLAR
now ships inside humanize as a built-in flow,
[`flows/builtin/rlar`](https://github.com/humanfia/humanize/tree/main/src/hmz/flows/builtin/rlar).
The quotes on this page are from that source.</Sidenote>

The second-order effect is the interesting one. Once the reviewer knows its output *is* the
instruction, it stops writing assessments and starts writing instructions. Its skill file says
so outright:

<PullQuote cite="RLAR's review-notes skill">
The review is not a report for a person. It is the next prompt of the agent that did the work,
word for word, and it is everything that agent will hear about this round.
</PullQuote>

Reviews written under that rule cite files, lines and commands. Vagueness is no longer somebody
else's problem to resolve. It is a wasted round.

## Two: "done" is a field, not a sentence

The other decision is how the loop ends.

The common pattern is a marker: the reviewer is told to write `DONE` on its own line, and the
loop searches for it. This fails in both directions, quietly. A reviewer writing "this is not
done until the migration is added" contains the word. A reviewer that has decided the work is
finished, but wrote a graceful paragraph, does not.

<SwipeCompare kicker="The same two reviews, read two ways" before-label="A marker" after-label="A field" label="Two reviews read by a marker search and by a structured field. The marker ends the run on a review that says the work is not done, and misses a review that decided it is. The field reads both correctly.">
<template #before>
<table class="sw-table"><thead><tr><th>Review</th><th>What a marker search does</th></tr></thead><tbody>
<tr><th>1</th><td>"This is not done until the migration is added." The word is there, so the run ends.</td></tr>
<tr><th>2</th><td>A paragraph deciding the work is finished. No marker, so another round runs.</td></tr>
</tbody></table>
</template>
<template #after>
<table class="sw-table"><thead><tr><th>Review</th><th>What the field does</th></tr></thead><tbody>
<tr><th>1</th><td>"This is not done until the migration is added." <code>done: false</code>, so the actor gets the notes.</td></tr>
<tr><th>2</th><td>A paragraph deciding the work is finished. <code>done: true</code>, so the run ends on it.</td></tr>
</tbody></table>
</template>
</SwipeCompare>

In RLAR the reviewer answers into a shape with two fields, a `done` boolean and a `notes`
string, and the loop reads the boolean. A review that *says* the work is done and a review that
*decides* the work is done are then not the same thing. That is as it should be: one is prose
and the other is a decision.

The field's description carries the whole standard, because the description is what the backend
is given as the shape to answer in:

> True only if the task is completely and correctly done: everything asked for is implemented,
> it works, nothing was faked, stubbed or special-cased to pass, and there is no next step worth
> taking. False if there is anything at all left to do or to fix.

That is a deliberately hostile bar, and it is the one that ends the run. The only other ways out
are the budget running out and three failed rounds in a row.

## Why both of these are about reward hacking

On a long unattended run, work does not usually fail by being incompetent. It fails by looking
finished: a test narrowed until it passes, a branch special-cased on the exact input the test
uses, a stub with a confident summary written on top of it.

<PostCards numbered>
<PostCard title="No memory." kicker="The reviewer">

It arrives fresh every round, so it cannot be told a story about what happened. It has to look
at the repository.

</PostCard>
<PostCard title="A structured verdict." kicker="The ending">

The run ends on a boolean, so no sentence can end it by accident.

</PostCard>
<PostCard title="Unedited words." kicker="The handoff" invert>

The one agent whose job is scepticism is the one whose language the actor hears.

</PostCard>
</PostCards>

None of this is expensive: one loop and one skill file. We are writing it down because the cheap
decisions are the ones people skip.

[Read the flow](/flows/rlar) ·
[Read the source](https://github.com/humanfia/humanize/tree/main/src/hmz/flows/builtin/rlar) ·
[Run it](/humanize/)
