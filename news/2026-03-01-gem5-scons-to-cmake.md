---
title: A 567-file CMake port of gem5
description: "One engineer and the RLCR Flow loop took gem5 off SCons: CMake + Ninja as the build, Bazel alongside it, across 567 files, 133 commits and 42,967 changed lines. It is upstream as a request for comments."
date: 2026-03-01
authors:
  - Sihao Liu
tag: RLCR Flow
achievement:
  topic: gem5
  value: 567
  label: "Files changed to port gem5's build from SCons to CMake"
  body: "One engineer and a set of agents, running for weeks."

# The headline figure in the hero (PostMeta.vue).
hero:
  kicker: gem5/gem5#2969 · files changed
  value: 567
  from: 0
  label: files changed to take gem5 off SCons, by the four kinds of file they are
  board:
    - { name: SCons files removed, score: 193 }
    - { name: CMake files, score: 147, us: true }
    - { name: "Docs, CI, configs, scripts", score: 117 }
    - { name: Bazel files, score: 110 }

# Counted from the pull request's own file list (GitHub API, gem5/gem5#2969, 133 commits),
# by path: SConstruct, SConscript, SConsopts and site_scons/ are SCons; CMakeLists.txt,
# cmake/ and CMakePresets.json are CMake; bazel/ is Bazel; everything else is the rest.
# The totals match the pull request: 567 files, +26,491 / -16,476 lines.
files:
  - { label: SCons removed, detail: "SConstruct, SConscript, site_scons", values: { n: 193 } }
  - { label: CMake added, detail: "CMakeLists.txt, cmake/, presets", values: { n: 145 } }
  - { label: Others modified, detail: "docs, CI, configs, scripts", values: { n: 111 } }
  - { label: Bazel added, detail: "all under bazel/", values: { n: 110 } }
  - { label: Others added, detail: "build tools, a test config, an audit script, a CI job", values: { n: 6 } }
  - { label: CMake modified, detail: "two vendored CMakeLists", values: { n: 2 } }
lines:
  - { label: SCons removed, values: { n: 15794 } }
  - { label: Bazel added, values: { n: 14244 } }
  - { label: CMake added, values: { n: 10003 } }
  - { label: Others added, values: { n: 2244 } }
  - { label: Others removed, values: { n: 651 } }
  - { label: CMake removed, values: { n: 31 } }
---

gem5's build system was ported from SCons to CMake in full by one engineer directing agents
for weeks. The result is [gem5/gem5#2969](https://github.com/gem5/gem5/pull/2969): **567 files
changed** across **133 commits**. CMake + Ninja becomes the build, and a Bazel build runs
alongside it without touching a single source file.

<StatGrid
  lead
  :items="[
    { value: 567, kicker: 'Files changed', text: 'All of SCons out, CMake and Bazel in, and every doc, CI job and script that named the old build.' },
    { value: 133, kicker: 'Commits', text: 'One engineer, with agents doing the typing, over several weeks.' },
    { value: 26.5, decimals: 1, prefix: '+', suffix: 'k', kicker: 'Lines added · 16.5k removed', text: 'Mostly the new builds: 10,003 lines of CMake and 14,244 of Bazel. 15,794 of the removed lines were SCons.' },
  ]"
/>

This is the oldest result on this page and, for what we were trying to learn, one of the most
useful. A build-system migration is the least glamorous long-horizon task there is, and it has
almost none of the properties that make a benchmark flattering.

## The scale

Most of the change is a swap: 193 SCons files out, 147 CMake files in. Then there is the long
tail of everything that named the old build, such as a binary path in a config, a command in a
Dockerfile or a step in a CI job. None of it is hard, and all of it has to be found.

<BarChart
  kicker="gem5/gem5#2969 · where the change went"
  label="The 567 files by kind: 193 SCons files removed, 145 CMake files added, 111 other files modified, 110 Bazel files added, 6 other files added, 2 vendored CMake files modified. In lines: 15,794 SCons lines removed, 14,244 Bazel added, 10,003 CMake added, 2,244 other added, 651 other removed, 31 CMake removed."
  caption="Counted from the pull request's file list. Switch to lines for the size of each part."
  :series="[{ key: 'n', label: 'Count', tone: 'accent' }]"
  :datasets="[
    { key: 'files', label: 'Files', rows: $frontmatter.files },
    { key: 'lines', label: 'Lines', rows: $frontmatter.lines },
  ]"
/>

## Two builds, one source tree

The port had one hard constraint, which is that the source tree does not move. gem5 generates
a large part of its own C++ (the ISA parser, the SLICC protocol compiler, the SimObject
wrappers, the embedded Python), and every one of those pipelines had to come across unchanged
and keep running on the same Python tools.

<AnimatedDiagram
  view-box="0 0 600 300"
  :min-width="420"
  :max-width="760"
  kicker="SCons → CMake + Ninja, with Bazel alongside"
  label="The source tree stays put. SCons and its 193 files are removed; CMake with Ninja builds the tree from 147 files; Bazel overlays it from 110 files under bazel/ without touching a source file; both binaries are checked against each other."
  :steps="[
    'One source tree, built by SCons: 193 SConstruct, SConscript and site_scons files.',
    'SCons is removed, all of it.',
    'CMake + Ninja builds the same tree from 147 files. It is the build.',
    'Bazel overlays the tree from bazel/, the way LLVM does, and changes no source file.',
    'Both binaries carry the same 1,098 SimObjects, and both run hello-world on x86 and Arm.',
  ]"
>
  <path id="g5-left" class="line dash" d="M150 150 H222" data-step="3" data-draw />
  <path id="g5-right" class="line dash" d="M450 150 H378" data-step="4" data-draw />
  <g data-step="1">
    <rect class="frame" x="222" y="95" width="156" height="110" />
    <text class="ink t-lg" x="300" y="145" text-anchor="middle">gem5 src/</text>
    <text x="300" y="170" text-anchor="middle">unchanged</text>
  </g>
  <g data-step="1" data-pop>
    <rect class="grey" x="222" y="15" width="156" height="56" />
    <text class="on-ink" x="300" y="39" text-anchor="middle">SCons</text>
    <text class="on-ink" x="300" y="59" text-anchor="middle">193 files</text>
  </g>
  <g data-step="2" data-pop>
    <path class="line accent" d="M226 19 L374 67 M374 19 L226 67" style="stroke-width: 4" />
  </g>
  <g data-step="3" data-pop>
    <rect class="accent" x="10" y="115" width="140" height="70" />
    <text class="on-accent t-lg" x="80" y="146" text-anchor="middle">CMake</text>
    <text class="on-accent" x="80" y="168" text-anchor="middle">147 files</text>
  </g>
  <g data-step="4" data-pop>
    <rect class="ink" x="450" y="115" width="140" height="70" />
    <text class="on-ink t-lg" x="520" y="146" text-anchor="middle">Bazel</text>
    <text class="on-ink" x="520" y="168" text-anchor="middle">110 files</text>
  </g>
  <rect class="accent" x="-6" y="-6" width="12" height="12" data-step="3" data-travel="#g5-left" data-loop />
  <rect class="ink" x="-6" y="-6" width="12" height="12" data-step="4" data-travel="#g5-right" data-loop />
  <g data-step="5">
    <rect class="frame" x="150" y="232" width="300" height="56" />
    <text class="accent t-lg" x="300" y="258" text-anchor="middle">1,098 / 1,098</text>
    <text x="300" y="279" text-anchor="middle">SimObjects match</text>
  </g>
</AnimatedDiagram>

<PostCards>
<PostCard kicker="Parity" metric="1,098 / 1,098" metric-label="SimObjects, Bazel against CMake" title="The same simulator, twice." invert>

The binary from each build was checked against the other's, object by object.

</PostCard>
<PostCard kicker="Tests" metric="64 / 64" metric-label="Bazel unit tests" title="Green under both.">

`testlib-quick` passes under CMake, and every Bazel unit test passes. Both binaries run a
hello-world SE simulation on x86 and on Arm.

</PostCard>
<PostCard kicker="Tail" metric="117" metric-label="files that only named the old build" title="Everything that said scons.">

CI workflows, Dockerfiles, example configs and utility scripts, down to binary paths such as
`build/X86/gem5.opt` becoming `build/ALL/gem5`.

</PostCard>
</PostCards>

## Why this task taught us the most

There is no clever insight to have, and no moment where a good idea collapses the search. There
is a very large number of mechanical changes, each of them easy. The build either works or does
not, and there is a long stretch in the middle where it does not work for a reason that has
nothing to do with the change you just made.

> A session that starts fresh every turn falls apart on work of this shape, and a run that
> keeps everything in context drowns in it.

An agent left unsupervised will eventually declare victory on a build that compiles only part of
the tree. What held this one together was the loop around the agents: a plan agreed up front,
then rounds of building under an independent review. That loop was RLCR Flow, then a
Claude Code plugin. It now lives on as the [humanize1 flow](/flows/humanize1), the same
plan-then-review loop run by Humanize. This task is why we started caring about the loop rather than the model, and it is
the kind of task [FlowBench](/flowbench/) is being assembled from.

The pull request is open upstream as a request for comments, and the gem5 maintainers decide
what happens to it next.<Sidenote>The pull request's description, written when it was opened,
says 563 files and about 24k insertions. The counts on this page are from its file list as it
stands today, which is a little larger.</Sidenote>

[The pull request, gem5/gem5#2969](https://github.com/gem5/gem5/pull/2969) ·
[The humanize1 flow](/flows/humanize1) · [FlowBench](/flowbench/)
