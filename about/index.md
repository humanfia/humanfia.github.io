---
description: Who Humanfia is — the people behind each project, with their GitHub accounts — and, below them, what we believe, how we work, and how to reach us.
aside: false
pageClass: page-wide about-page
---

<!--
  The team and the about page are one page now, and the team comes first. Humanfia is a group of
  people more than it is a mission statement, so the faces are what About opens on; what we
  believe is short enough to sit underneath them. /team/ redirects here (public/team/index.html)
  and keeps its hash, so /team/#hoa lands on #hoa.

  `#how-we-work` is linked from projects/hma.md and a blog post. Rename that heading and both
  of them drop the reader at the top of the page -- `pnpm check:anchors` will say so.
-->

# About

> Humanize is part of NVIDIA RSI effort

<p class="lede">We build the flow around the agents: the flows, the runtime that runs them, the
benchmark that compares them, and the projects that test them on hard problems. These are the
people who do it.</p>

<TeamRoster />

<div class="about-rest">

## We think the method around the agent outlasts the model

A better model writes a better function; it does not, on its own, work for eleven hours, hold
on to a constraint from round one, and stop when the job is done. That is the loop around the
agent, and we think the loop is what lasts. Models are replaced every few months; a method can
be written down, measured and improved, and it gets better with each new model. So we
open-source our flows, benchmark them against other flows, and drop ours when they lose.

## How we work

<ol class="principles">
  <li><b>The person decides what done means.</b> People own the intent, the tradeoffs and the
  definition of done. Agents do the work within those decisions.</li>
  <li><b>A separate agent reviews the work.</b> Every serious flow has a second agent that arrives
  with no memory of the work and reads the repository instead.</li>
  <li><b>Reward hacking is the normal failure.</b> Long runs fail by <em>looking</em> finished —
  a narrowed test, a special case, a stub under a confident summary. Our reviewers hunt for
  exactly that.</li>
  <li><b>We only claim what we have measured.</b> <a href="/flowbench/">FlowBench</a>
  tests our flows against others, and we remove the ones that lose.</li>
  <li><b>Open source.</b> The runtime, the flows and the reproduction code are open source.
  Every published number comes with what is needed to check it.</li>
</ol>

## Credit

Each result is credited at the top of the post that reports it, not folded into a team byline.
Everything has been built with many more people than are named above — [NVIDIA
Research](https://www.nvidia.com/en-us/research/), [MIT HAN Lab](https://hanlab.mit.edu),
[UCLA PolyArch](https://polyarch.cs.ucla.edu/), Tsinghua, [Nunchux](https://nunchux.ai), and a long
tail of community contributors. The full list is in each repository's contributor graph:
[Humanize](https://github.com/humanfia/humanize/graphs/contributors) ·
[the flowverse](https://github.com/humanfia/flowverse/graphs/contributors) ·
[this site](https://github.com/humanfia/humanfia.github.io/graphs/contributors).

## Get in touch

<div class="contact">
  <a href="https://github.com/humanfia">
    <b>Questions, bugs and better flows</b>
    <span>Open an issue or a pull request on the repository it belongs to — Humanize, the
    flowverse, or this site.</span>
  </a>
  <a href="https://github.com/humanfia/humanize/issues">
    <b>Working on long-horizon agent systems</b>
    <span>We would like to compare notes. Open an issue on Humanize and say hello.</span>
  </a>
  <a href="/news/">
    <b>Following along</b>
    <span>The news for results and the blog for essays — each has its own RSS feed, linked at
    the foot of every page. Everything we ship is Apache-2.0.</span>
  </a>
</div>

</div>

<style>
/* Everything under the roster is prose, and prose is read, not scanned: the page is wide for
   the wall of faces, and this pulls the text back to a line length you can track across. */
.about-page .about-rest {
  max-width: 760px;
  margin-top: 56px;
}

.about-page .vp-doc blockquote {
  display: inline-block;
  margin: 4px 0 0;
  padding: 4px 14px;
  border-left: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 0 6px 6px 0;
}

.about-page .vp-doc blockquote > p {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.about-page .lede {
  max-width: 760px;
}

/* The principles, numbered in the margin in the mono face the roster uses for its labels, so
   the two halves of the page are visibly one design rather than a team page with an essay
   stapled under it. */
.about-page .principles {
  counter-reset: principle;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.about-page .principles li {
  counter-increment: principle;
  position: relative;
  margin: 0;
  padding: 14px 0 14px 44px;
  border-top: 1px solid var(--vp-c-divider);
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.about-page .principles li::before {
  content: counter(principle, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
}

.about-page .principles b {
  color: var(--vp-c-text-1);
}

/* Three ways in, as cards: each is one link with one sentence, and the whole card is the
   target rather than a word inside it. */
.about-page .contact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 20px 0 0;
}

.about-page .vp-doc .contact a {
  display: block;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.25s;
}

.about-page .vp-doc .contact a:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.about-page .contact b {
  display: block;
  font-size: 14.5px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.about-page .contact span {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
</style>
