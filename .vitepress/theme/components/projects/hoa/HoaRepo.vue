<script setup lang="ts">
// Where the code is: humanfia/hoa drawn as the tree `tree -L 1` would print, every
// directory a link into the repository, and beside it the three other places a reader goes to
// check a result -- the flows, the datasets, and the runtime the runs are flows on.
import { vReveal } from '../../../home/motion'

defineProps<{ dirs: { dir: string; text: string }[] }>()

const REPO = 'https://github.com/humanfia/hoa'
</script>

<template>
  <div class="hr">
    <nav v-reveal class="hr-tree hoa-sheet" aria-label="humanfia/hoa, by directory">
      <a class="hr-root" :href="REPO" target="_blank" rel="noreferrer">
        <span class="hr-glyph" aria-hidden="true">▣</span> humanfia/hoa <span aria-hidden="true">↗</span>
      </a>
      <ul>
        <li v-for="(d, i) in dirs" :key="d.dir" :style="{ '--i': i }">
          <a :href="`${REPO}/tree/main/${d.dir}`" target="_blank" rel="noreferrer">
            <span class="hr-branch" aria-hidden="true">{{ i === dirs.length - 1 ? '└──' : '├──' }}</span>
            <span class="hr-dir">{{ d.dir }}/</span>
            <span class="hr-text">{{ d.text }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="hr-side">
      <div v-reveal="80" class="hr-card">
        <p class="hoa-kicker">The flows</p>
        <p>
          In <a href="https://github.com/humanfia/flowverse" target="_blank" rel="noreferrer">humanfia/flowverse</a>.
          Start with the <a href="/flows/recursive-lean-prover">recursive Lean prover</a>.
        </p>
      </div>
      <div v-reveal="140" class="hr-card">
        <p class="hoa-kicker">The proofs, as datasets</p>
        <p>
          On <a href="https://huggingface.co/humanfia-lab" target="_blank" rel="noreferrer">Hugging Face</a>,
          such as <a href="https://huggingface.co/datasets/humanfia-lab/IPHO2026" target="_blank" rel="noreferrer">IPhO 2026</a>.
          For PutnamBench only a
          <a href="https://huggingface.co/datasets/humanfia-lab/putnambench-solution-preview" target="_blank" rel="noreferrer">preview</a>
          is public, at the authors' request.
        </p>
      </div>
      <div v-reveal="200" class="hr-card hr-runs">
        <p class="hoa-kicker">Runs on Humanize</p>
        <p>
          All runs are flows on <a href="/humanize/">Humanize</a>. PutnamBench is a Ralph
          loop with Codex as worker and reviewer. Lean-Eval uses HOA's agents with the
          <a href="/flows/humanize1">RLCR Flow</a>. These runs shaped
          <a href="/flows/rlar">RLAR</a> and the other
          <a href="/flows/">flows</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hr {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: clamp(16px, 2.4vw, 28px);
  align-items: start;
}

.hr-tree {
  padding: 16px 0 12px;
  font-family: var(--vp-font-family-mono);
}
.hr-root {
  display: block;
  padding: 0 20px 12px;
  font-size: 15px;
  font-weight: 750;
  color: var(--k-ink) !important;
  text-decoration: none !important;
}
.hr-glyph {
  color: var(--k-mark-text, var(--hf-cyan-deep));
}
.hr-tree ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.hr-tree li {
  margin: 0;
}
.hr-tree li a {
  display: grid;
  grid-template-columns: 3.4ch 15ch minmax(0, 1fr);
  gap: 0 10px;
  align-items: baseline;
  padding: 7px 20px;
  border-left: 3px solid transparent;
  color: inherit !important;
  text-decoration: none !important;
  transition: background-color 0.2s, border-color 0.2s;
}
.hr-tree li a:hover,
.hr-tree li a:focus-visible {
  background: var(--k-bg-alt);
  border-left-color: var(--k-mark);
}
.hr-branch {
  color: var(--k-ink-3);
}
.hr-dir {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--k-ink);
}
.hr-tree li a:hover .hr-dir {
  color: var(--k-accent);
}
.hr-text {
  font-family: var(--vp-font-family-base);
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--k-ink-2);
}

.hf-motion .hr-tree.rv li {
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.5s var(--k-ease), transform 0.5s var(--k-ease);
  transition-delay: calc(0.2s + var(--i) * 60ms);
}
.hf-motion .hr-tree.rv-in li {
  opacity: 1;
  transform: none;
}

.hr-side {
  display: grid;
  gap: 20px;
}
.hr-card {
  padding-top: 14px;
  border-top: 2px solid var(--k-ink);
}
.hr-card .hoa-kicker {
  font-size: 11px;
}
.hr-card p:not(.hoa-kicker) {
  margin: 8px 0 0;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--k-ink-2);
}
.hr-runs {
  padding: 14px 16px 16px;
  border-top-color: var(--k-mark);
  background: var(--k-bg-alt);
}

@media (max-width: 960px) {
  .hr {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 600px) {
  .hr-tree li a {
    grid-template-columns: 3.4ch minmax(0, 1fr);
    padding: 7px 14px;
  }
  .hr-text {
    grid-column: 2;
    font-size: 12.5px;
  }
  .hr-root {
    padding: 0 14px 12px;
  }
}
</style>
