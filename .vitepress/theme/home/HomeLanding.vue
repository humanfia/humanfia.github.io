<script setup lang="ts">
// The home page. It is one argument told in order -- what we build, how it is put together,
// what it has achieved, where to start -- and nothing on it is pinned. The page moves at the speed of
// the hand; the pictures are driven by where their section happens to be on screen (the hero
// comes apart as it leaves, the stack turns to whichever paragraph is in the middle of the
// window), or play once when they arrive (the manifesto, a picture in place of a paragraph). The numbers are the blog's numbers, and every one of them
// links to the post that says how to check it.
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../posts.data.mts'
import { data as achievements, type Achievement } from '../achievements.data.mts'
import { HeroScene, StackField, fitScene } from './fields'
import HomeRollup from './HomeRollup.vue'
import HomeVision from './HomeVision.vue'
import ManifestoScene from './ManifestoScene.vue'
import {
  clamp,
  easeOut,
  onFirstSight,
  prefersReducedMotion,
  span,
  useScrollProgress,
  vReveal,
} from './motion'

const { isDark } = useData()
const motion = ref(false)

const GITHUB = 'https://github.com/humanfia'
const REPO = 'https://github.com/humanfia/humanize'
const DOCS = '/humanize/'

// ------------------------------------------------------------------------------------ hero

const heroEl = ref<HTMLElement | null>(null)
const heroSvg = ref<SVGSVGElement | null>(null)
const heroArt = ref<HTMLElement | null>(null)
// How far the hero has scrolled off the top, 0..1: one screen of ordinary scrolling, not a pin.
const heroP = useScrollProgress(heroEl, (box) => clamp(-box.top / box.height))
let hero: HeroScene | null = null

const heroCopy = computed(() => {
  if (!motion.value) return {}
  const out = span(heroP.value, 0.05, 0.6)
  return { opacity: 1 - out, transform: `translate3d(0, ${-out * 60}px, 0)` }
})
const cueOpacity = computed(() => 1 - span(heroP.value, 0, 0.06))

/** Where the H stands at rest, read off the layout every frame: the copy decides how much room
 *  the art column has, and the whole construction -- not just the H -- is fitted into it. */
function heroAnchor() {
  const art = heroArt.value!.getBoundingClientRect()
  const stage = heroSvg.value!.getBoundingClientRect()
  const left = art.left - stage.left
  // Beside the copy, the art may use the page's right margin too, up to a gutter from the edge:
  // the construction is the loudest thing on the page and should not be boxed in by the grid.
  const wide = stage.width > 900
  const width = wide ? stage.width - left - 24 : art.width
  return fitScene({ left, top: art.top - stage.top, width, height: art.height })
}

// ----------------------------------------------------------------------------------- stack

const STEPS = [
  {
    tag: 'Flows',
    title: 'Flows are open-source Python.',
    body: 'A flow is a directory of Python: which agents take turns, what each is asked, and when it stops. RLAR, Flame Chase, the Ralph loop and the rest are open source, to read, fork or improve on.',
    link: { text: 'Browse the flowverse', href: 'https://github.com/humanfia/flowverse' },
  },
  {
    tag: 'Runtime',
    title: 'Humanize runs the flows.',
    body: 'It opens and resumes sessions, keeps a budget in time, cost or tokens, puts the work in a worktree, a container or on another machine, and writes every turn down on one clock.',
    link: { text: 'Meet Humanize', href: '/humanize/' },
  },
  {
    tag: 'Agents',
    title: 'It drives thirteen coding-agent CLIs you already use.',
    body: 'claude, codex, dsh, agy, grok, kimi, qwen, pi, omp, opencode, mimo, mcode and cursor-agent. It holds a key only if you give it one: the runtime drives the tools you already pay for.',
    link: { text: 'Read the docs', href: DOCS },
  },
  {
    tag: 'Results',
    title: 'Flows are tested on problems with an outside grader.',
    body: 'Proofs checked by Lean, kernels timed on real hardware, models scored on public benchmarks and competitions. The grader is never ours, so a result does not rest on our own judgement.',
    link: { text: 'See the achievements', href: '#achievements' },
  },
  {
    tag: 'FlowBench',
    title: 'FlowBench makes the winning flow the next default.',
    body: 'FlowBench scores flows against each other on long-horizon work, ours included, with the model held fixed. The winner becomes the next default.',
    link: { text: 'About FlowBench', href: '/flowbench/' },
  },
]
const stackEl = ref<HTMLElement | null>(null)
const stackCanvas = ref<HTMLCanvasElement | null>(null)
// The five paragraphs are equally tall and scroll like any others; the picture beside them is
// sticky. Progress is where the middle of the window is down the list, so layer k is the
// subject exactly when paragraph k is in the middle -- the picture follows the reading.
const stackP = useScrollProgress(stackEl, (box, vh) => clamp((vh / 2 - box.top) / box.height))
let stack: StackField | null = null
const focus = (k: number) => clamp(1 - Math.abs(stackP.value * 5 - 0.5 - k) * 1.15)
/** The paragraph being read is at full strength, the others are set back. */
const stepOn = (k: number) => !motion.value || focus(k) > 0.4

// ---------------------------------------------------------------------------- achievements

// Every tile is a news post that declared an achievement (achievements.data.mts), one per
// topic, newest first. Nothing here names a result: the sizes come from the count alone.
//
// The tiles are laid in rows that each fill the twelve columns: a tall pair first, then threes,
// with a pair wherever a three would leave a tile on its own. The rows alternate their cut so
// the mosaic does not read as a table.
function sizes(n: number): string[] {
  if (n < 2 || n === 3) return Array(n).fill(n === 1 ? 'w12' : 'w4')
  const rows = [2]
  let left = n - 2
  while (left > 0) {
    const k = left === 2 || left === 4 ? 2 : 3
    rows.push(k)
    left -= k
  }
  return rows.flatMap((k, r) => {
    if (r === 0) return ['w7 tall', 'w5 tall']
    if (k === 2) return r % 2 ? ['w5', 'w7'] : ['w7', 'w5']
    return r % 2 ? ['w4', 'w4', 'w4'] : ['w5', 'w4', 'w3']
  })
}
const SIZES = sizes(achievements.length)

/** How far up a bar or across a row an entry of the board reaches, against the board's best. */
const reach = (t: Achievement, score: number) => `${(score / Math.max(...t.board!.map((b) => b.score))) * 100}%`
/** The cells of the grid: `of` if the post gave one, else whole rows of twenty. */
const cells = (t: Achievement) => t.of ?? Math.ceil(t.value / 20) * 20

const fmt = (t: Achievement, v: number) => `${t.prefix ?? ''}${v.toFixed(t.decimals ?? 0)}${t.suffix ?? ''}`
const shown = reactive<Record<string, string>>(Object.fromEntries(achievements.map((t) => [t.url, fmt(t, t.value)])))
const live = reactive<Record<string, boolean>>({})
const bentoEl = ref<HTMLElement | null>(null)
let bentoIO: IntersectionObserver | null = null

function count(t: Achievement) {
  live[t.url] = true
  if (!motion.value) return
  const from = t.from ?? 0
  const t0 = performance.now()
  const tick = (now: number) => {
    const u = easeOut(clamp((now - t0) / 1500))
    shown[t.url] = fmt(t, from + (t.value - from) * u)
    if (u < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/** The spotlight under the pointer on a tile: two custom properties, and the CSS does the rest. */
function spot(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const box = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - box.left}px`)
  el.style.setProperty('--my', `${e.clientY - box.top}px`)
}

// ---------------------------------------------------------------------------------- runtime

const AGENTS = ['claude', 'codex', 'dsh', 'agy', 'grok', 'kimi', 'qwen', 'pi', 'omp', 'opencode', 'mimo', 'mcode', 'cursor-agent']
const INSTALL = 'uv tool install hmz'
const TERMINAL = [
  { prompt: true, text: INSTALL },
  { prompt: true, text: 'hmz exec -f chat -a assistant=claude/claude-opus-5:high "What does this repository do?"' },
]
const termEl = ref<HTMLElement | null>(null)
const typed = ref(TERMINAL.map((l) => l.text))
const typing = ref(-1)
onFirstSight(termEl, async () => {
  if (!motion.value) return
  typed.value = TERMINAL.map(() => '')
  for (let i = 0; i < TERMINAL.length; i++) {
    typing.value = i
    const text = TERMINAL[i].text
    for (let k = 1; k <= text.length; k++) {
      typed.value[i] = text.slice(0, k)
      await new Promise((r) => setTimeout(r, k < 4 ? 70 : 18 + Math.random() * 22))
    }
    await new Promise((r) => setTimeout(r, 420))
  }
  typing.value = TERMINAL.length - 1
})

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(INSTALL)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    /* a browser that refuses clipboard access still shows the command to select by hand */
  }
}

const FEATURES = [
  { title: 'Time, cost and token budgets', body: 'Stop on time, cost or tokens, so a run meant to take a night does not take a week.' },
  { title: 'Every turn on one timeline', body: 'Every agent, sub-agent and tool call on a single timeline, opened as a Chrome trace.' },
  { title: 'Local, container or SSH', body: 'Locally, in a git worktree, in a container, or on another machine over SSH.' },
]

// ------------------------------------------------------------------------------------ news

// The results, not the essays: this section is the latest news posts, and the blog has its
// own index for the arguments.
const latest = posts.filter((post) => post.kind === 'news').slice(0, 8)
const railEl = ref<HTMLElement | null>(null)
function slide(dir: number) {
  const rail = railEl.value
  if (!rail) return
  rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 720), behavior: 'smooth' })
}

// --------------------------------------------------------------------------------- lifecycle

onMounted(() => {
  const still = prefersReducedMotion()
  motion.value = !still
  if (heroSvg.value) hero = new HeroScene(heroSvg.value, still, heroAnchor)
  if (stackCanvas.value) stack = new StackField(stackCanvas.value, still)
  bentoIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const tile = achievements.find((t) => t.url === (entry.target as HTMLElement).dataset.tile)
        if (tile) count(tile)
        bentoIO?.unobserve(entry.target)
      }
    },
    { threshold: 0.45 },
  )
  bentoEl.value?.querySelectorAll('[data-tile]').forEach((el) => bentoIO!.observe(el))
})

watch(heroP, (p) => {
  if (!hero) return
  hero.progress = p
  hero.update()
})
watch(stackP, (p) => {
  if (!stack) return
  stack.target = p
  stack.update()
})
// The hero is SVG whose fills are CSS variables, so it flips with the theme by itself; the
// stack is a canvas and has to be told to read the palette again.
watch(isDark, () => stack?.recolor())

onBeforeUnmount(() => {
  hero?.destroy()
  stack?.destroy()
  bentoIO?.disconnect()
})
</script>

<template>
  <div class="hf-home-root" :class="{ 'hf-motion': motion }">
    <!-- 1. The hero: the H is built from its pieces, and comes apart again as it leaves. -->
    <section ref="heroEl" class="h-hero" aria-labelledby="hero-title">
      <div class="h-hero-stage">
        <svg ref="heroSvg" class="h-hero-svg" aria-hidden="true" />
        <div class="h-hero-grid">
          <div class="h-hero-copy" :style="heroCopy">
            <p class="h-kicker h-load" style="--d: 0.1s">Open-source agent flows</p>
            <h1 id="hero-title" class="h-display h-load" style="--d: 0.25s">
              We build the flow around the agents.
            </h1>
            <p class="h-lead h-load" style="--d: 0.45s">
              Open-source flows that organise coding agents for long-horizon work, the runtime
              that runs them, and results checked by outside graders.
            </p>
            <div class="h-actions h-load" style="--d: 0.6s">
              <a class="h-btn h-btn-primary" href="/humanize/">Get started</a>
              <a class="h-btn h-btn-ghost" :href="GITHUB" target="_blank" rel="noreferrer">
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div ref="heroArt" class="h-hero-art" aria-hidden="true" />
        </div>
        <div class="h-cue" :style="{ opacity: cueOpacity }" aria-hidden="true"><span /></div>
      </div>
    </section>

    <!-- 2. The argument, as a picture: a model upgraded, the same flow round it, a better score. -->
    <ManifestoScene />

    <!-- 3. How it is put together: flows, runtime, agents, the problems they are tested on, FlowBench. -->
    <section class="h-stack" aria-labelledby="stack-title">
      <div class="h-wrap">
        <header class="h-head" v-reveal>
          <h2 id="stack-title" class="h-h2">How it fits together</h2>
        </header>
      </div>
      <div class="h-stack-grid">
        <div class="h-stack-art">
          <canvas ref="stackCanvas" class="h-stack-canvas" aria-hidden="true" />
        </div>
        <div ref="stackEl" class="h-steps">
          <article v-for="(s, k) in STEPS" :key="s.tag" class="h-step" :class="{ on: stepOn(k) }">
            <p class="h-step-tag" :class="{ warm: k === 4 }">{{ String(k + 1).padStart(2, '0') }} · {{ s.tag }}</p>
            <h3>{{ s.title }}</h3>
            <p>{{ s.body }}</p>
            <a class="h-link" :href="s.link.href">{{ s.link.text }} <span aria-hidden="true">›</span></a>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. Achievements: one tile per topic, from the news. -->
    <section id="achievements" class="h-section h-alt" aria-labelledby="achievements-title">
      <div class="h-wrap">
        <header class="h-head" v-reveal>
          <h2 id="achievements-title" class="h-h2">Achievements</h2>
          <p class="h-lead">Each result links to a dated post that names who produced it and how to check it.</p>
        </header>
        <div ref="bentoEl" class="h-bento">
          <a
            v-for="(t, i) in achievements"
            :key="t.url"
            :href="t.url"
            class="h-tile"
            :class="[SIZES[i], { live: live[t.url] }]"
            :data-tile="t.url"
            v-reveal="(i % 3) * 90"
            @pointermove="spot"
          >
            <span class="h-tile-label">{{ t.label }}</span>
            <span class="h-tile-num">{{ shown[t.url] }}</span>
            <span v-if="t.body" class="h-tile-body">{{ t.body }}</span>

            <span v-if="t.viz === 'checks'" class="v-checks" aria-hidden="true">
              <i v-for="n in t.value" :key="n" :style="{ '--i': n }">✓</i>
            </span>
            <span v-else-if="t.viz === 'versus' && t.board" class="v-versus" aria-hidden="true">
              <span v-for="b in t.board" :key="b.name"><em>{{ b.name }}</em><i :class="{ hot: b.us }" :style="{ '--w': reach(t, b.score) }" /></span>
            </span>
            <span v-else-if="t.viz === 'bars' && t.board" class="v-bars" aria-hidden="true">
              <span v-for="b in t.board" :key="b.name"><i :class="{ hot: b.us }" :style="{ '--h': reach(t, b.score) }" /><em>{{ b.name }}</em></span>
            </span>
            <svg v-else-if="t.viz === 'ring' && t.of" class="v-ring" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="19" />
              <circle cx="22" cy="22" r="19" class="on" pathLength="100" :style="{ '--off': 100 * (1 - t.value / t.of) }" />
            </svg>
            <span v-else-if="t.viz === 'grid'" class="v-grid" aria-hidden="true">
              <i v-for="n in cells(t)" :key="n" :class="{ on: n <= t.value }" :style="{ '--i': n }" />
            </span>
            <span v-else-if="t.viz === 'dots' && t.of" class="v-dots" aria-hidden="true">
              <i v-for="n in t.of" :key="n" :class="{ on: n <= t.value }" :style="{ '--i': n }" />
            </span>
            <span class="h-tile-more" aria-hidden="true">Read the post ›</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 4b. Every result, on one sheet, grouped by field. -->
    <HomeRollup />

    <!-- 6. Where to start. -->
    <section class="h-section" aria-labelledby="start-title">
      <div class="h-wrap">
        <header class="h-head h-center" v-reveal>
          <h2 id="start-title" class="h-h2">Humanize</h2>
          <p class="h-lead">It drives the coding-agent CLIs you already use, through your existing logins, and holds no API key of its own.</p>
        </header>
      </div>
      <div class="h-marquee" aria-label="Supported agents">
        <div class="h-marquee-row">
          <span v-for="n in 2" :key="n" class="h-marquee-set" :aria-hidden="n === 2">
            <b v-for="a in AGENTS" :key="a">{{ a }}</b>
          </span>
        </div>
      </div>
      <div class="h-wrap">
        <div ref="termEl" class="h-term" v-reveal>
          <div class="h-term-bar">
            <i /><i /><i />
            <span>zsh</span>
            <button class="h-copy" type="button" @click="copy">{{ copied ? 'Copied' : 'Copy install' }}</button>
          </div>
          <pre><code><template v-for="(line, i) in TERMINAL" :key="i"><template v-if="!motion || typing < 0 || i <= typing"><span class="p">$ </span>{{ typed[i] }}<span v-if="typing === i" class="h-caret" /><template v-if="i < TERMINAL.length - 1">
</template></template></template></code></pre>
        </div>
        <div class="h-features">
          <div v-for="(f, i) in FEATURES" :key="f.title" class="h-feature" v-reveal="i * 100">
            <h3>{{ f.title }}</h3>
            <p>{{ f.body }}</p>
          </div>
        </div>
        <p class="h-center h-more" v-reveal>
          <a class="h-link" :href="DOCS">Read the documentation <span aria-hidden="true">›</span></a>
        </p>
      </div>
    </section>

    <!-- 7. The latest posts. -->
    <section class="h-section h-alt" aria-labelledby="blog-title">
      <div class="h-wrap">
        <header class="h-head h-row" v-reveal>
          <div>
            <h2 id="blog-title" class="h-h2">News</h2>
          </div>
          <div class="h-rail-nav">
            <button type="button" aria-label="Previous posts" @click="slide(-1)">‹</button>
            <button type="button" aria-label="Next posts" @click="slide(1)">›</button>
          </div>
        </header>
      </div>
      <div ref="railEl" class="h-posts">
        <a v-for="(post, i) in latest" :key="post.url" :href="post.url" class="h-post" v-reveal="Math.min(i, 3) * 80">
          <span class="h-post-meta"><b>{{ post.tag }}</b>{{ post.date }}</span>
          <span class="h-post-title">{{ post.title }}</span>
          <span class="h-post-body">{{ post.description }}</span>
          <span class="h-post-more">Read ›</span>
        </a>
        <a href="/news/" class="h-post h-post-all">
          <span class="h-post-title">All news</span>
          <span class="h-post-body">Every number we have published, newest first — and an RSS feed.</span>
          <span class="h-post-more">Open the news ›</span>
        </a>
      </div>
    </section>

    <!-- 7b. The ambition, as a poster. -->
    <HomeVision />

    <!-- 8. Open source: the repos and the docs. -->
    <section class="h-section h-cta" aria-labelledby="cta-title">
      <div class="h-wrap h-center">
        <h2 id="cta-title" class="h-display h-gradient" v-reveal>The code and the results are public.</h2>
        <p class="h-lead" v-reveal="100">
          Every flow is Python anyone can read or fork, and every number on this page links to the post
          that says how to check it.
        </p>
        <div class="h-actions h-center" v-reveal="200">
          <a class="h-btn h-btn-primary" :href="REPO" target="_blank" rel="noreferrer">Star Humanize on GitHub</a>
          <a class="h-btn h-btn-ghost" :href="DOCS" target="_blank" rel="noreferrer">Read the docs <span aria-hidden="true">↗</span></a>
        </div>
        <p class="h-small" v-reveal="300">
          <a :href="GITHUB">github.com/humanfia</a> · <a href="https://github.com/humanfia/flowverse">flowverse</a> ·
          <a href="/news/feed.rss">RSS</a>
        </p>
      </div>
    </section>
  </div>
</template>
