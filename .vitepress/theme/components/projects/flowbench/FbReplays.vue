<script setup lang="ts">
// Three replays from our other projects: the same model (or the same two), scored twice, with
// only the loop around it changed. Each pair of bars runs once when it comes on screen and again
// on "Replay". These are not FlowBench results; each links to where it was reported.
import { onMounted, ref } from 'vue'
import { onFirstSight, prefersReducedMotion } from '../../../home/motion'
import NumberTicker from '../../kit/NumberTicker.vue'

interface Side {
  label: string
  value: number
}
interface Replay {
  kicker: string
  same: string
  of: number
  unit: string
  decimals?: number
  before: Side
  after: Side
  delta: string
  href: string
  source: string
}

const REPLAYS: Replay[] = [
  {
    kicker: 'PutnamBench · 50 problems',
    same: 'Kimi-K3',
    of: 50,
    unit: 'solved',
    before: { label: 'Its own coding CLI', value: 4 },
    after: { label: 'Inside a Humanize flow', value: 47 },
    delta: '+43 solved',
    href: '/blog/2026-09-27-kda-for-kda',
    source: 'KDA² post',
  },
  {
    kicker: 'IChO 2026 · 68 subquestions',
    same: 'GPT-5.6 Sol',
    of: 68,
    unit: 'accepted',
    before: { label: 'A plain /goal', value: 32 },
    after: { label: 'With formalization and proof review', value: 68 },
    delta: '+36 accepted',
    href: '/news/2026-10-05-olympiads',
    source: 'HOA write-up',
  },
  {
    kicker: 'MLE-bench · any medal',
    same: 'Opus 5 and GPT-5.6-sol, taking turns',
    of: 100,
    unit: '%',
    decimals: 1,
    before: { label: 'GPT-5.6-sol goes first', value: 73.3 },
    after: { label: 'Opus 5 goes first', value: 78.2 },
    delta: '+4.9 points, from the order alone',
    href: '/hma/',
    source: 'HMA, self-reported',
  },
]

const root = ref<HTMLElement | null>(null)
/** Bumped to run every bar and number again; 0 is "drawn at rest", for the server. */
const run = ref(0)
const armed = ref(false)

onMounted(() => (armed.value = !prefersReducedMotion()))
onFirstSight(root, () => armed.value && run.value++, 0.3)
const replay = () => armed.value && run.value++
</script>

<template>
  <div ref="root" class="fb-replays" :class="{ armed, ran: run > 0 }">
    <article v-for="(r, i) in REPLAYS" :key="r.kicker" class="fb-replay" :style="{ '--i': i }">
      <header>
        <span class="kicker">{{ r.kicker }}</span>
        <span class="same"><i aria-hidden="true">=</i> Same: {{ r.same }}</span>
      </header>
      <div :key="run" class="bars">
        <div v-for="(side, k) in [r.before, r.after]" :key="k" class="bar" :class="k ? 'after' : 'before'">
          <span class="label">{{ side.label }}</span>
          <span class="track"><i :style="{ '--w': `${(side.value / r.of) * 100}%` }" /></span>
          <span class="value">
            <NumberTicker v-if="run" :value="side.value" :decimals="r.decimals ?? 0" :duration="k ? 1500 : 700" :delay="k ? 500 : 0" />
            <template v-else>{{ side.value.toFixed(r.decimals ?? 0) }}</template>
            <small>{{ r.unit === '%' ? '%' : ` / ${r.of}` }}</small>
          </span>
        </div>
      </div>
      <footer>
        <strong class="delta">{{ r.delta }}</strong>
        <a :href="r.href">{{ r.source }} <span aria-hidden="true">→</span></a>
      </footer>
    </article>
    <button v-if="armed" type="button" class="fb-replay-btn" @click="replay">
      <span aria-hidden="true">↻</span> Replay
    </button>
  </div>
</template>
