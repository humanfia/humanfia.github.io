<script setup lang="ts">
// Reproduce it, or use it: the experiment code on one side, the method as a flow on the other,
// and that flow playing under them in the site's own flow player.
import FlowPlayer from '../../flow/FlowPlayer.vue'
import { vReveal } from '../../../home/motion'
</script>

<template>
  <section id="reproduce-it-or-use-it" class="hma-section hma-band" aria-labelledby="reproduce-h">
    <div class="hma-wrap">
      <div class="hma-section-head" v-reveal>
        <p class="hma-kicker"><span class="hma-num">04</span> Use it</p>
        <h2 id="reproduce-h" class="hma-h2">Rerun the paper's experiments, or run HMA as a Humanize flow</h2>
      </div>

      <div class="hma-two">
        <a class="hma-plate" href="https://github.com/humanfia/hma" target="_blank" rel="noreferrer" v-reveal>
          <p class="hma-mini">Reproduce · humanfia/hma ↗</p>
          <h3>The paper's experiment code</h3>
          <p>Baselines, HMA, ablations and external comparisons, with scripts for the tables and figures.</p>
        </a>
        <a class="hma-plate ink" href="/flows/fixed-interrupt-flame-chase" v-reveal="100">
          <p class="hma-mini">Use · a Humanize flow</p>
          <h3><code>flame_chasoid:fixed_interrupt</code></h3>
          <p>The same method as a <span class="u">Humanize</span> flow. It plays below.</p>
        </a>
      </div>
      <p class="hma-fine">
        Reruns still use the public answer keys, not the paper's corrected ones; the
        <a href="https://github.com/humanfia/hma/blob/main/docs/verification.md" target="_blank" rel="noreferrer">validation record</a>
        lists what has been checked. More on <a href="/humanize/">Humanize</a>.
      </p>

      <div class="hma-player" v-reveal>
        <FlowPlayer flow="fixed_interrupt_flame_chase" />
      </div>
    </div>
  </section>
</template>
