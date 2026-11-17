<script setup lang="ts">
// A project's hero: the post hero's poster (the accent band on the diagonal, the ink rule, the accent
// circle where the band leaves the frame), set for a page that is a project rather than a post.
//
// A project page asks for the post layout in its frontmatter (`layout: post`, `sidebar: false`)
// and adds a `project:` block; PostLayout draws this in place of PostMeta, which draws nothing
// on a page without a date. From the top: the five projects as a row of tabs, the current one
// inked in, so a reader can step sideways without opening the menu; the status and the links;
// the title (a colon splits it into a display line and a subtitle, as a post's does); the
// description as the standfirst; and on the right, the same headline card a post's `hero:`
// block gives, with its number and its leaderboard. Under all of it, a strip of the project's
// headline numbers, each counting up once, each linking to the post that reported it.
//
//   project:
//     status: Open source · Apache-2.0
//     links:
//       - { text: humanfia/hoa, href: https://github.com/humanfia/hoa }
//     stats:
//       - { value: 6, suffix: ' / 6', kicker: IMO 2026, text: '…', href: /news/2026-07-22-imo-2026 }
//       - { display: '1.17–1.69×', kicker: MLSys 2026, text: '…' }
//     note: Self-reported, …   # optional, under the strip
//   hero: { … }                 # optional, exactly as a post's
import { computed } from 'vue'
import { useData } from 'vitepress'
import Leaderboard from './kit/Leaderboard.vue'
import NumberTicker from './kit/NumberTicker.vue'

interface Stat {
  /** Counts up from `from`. Leave it out and give `display` for a figure that is not a number. */
  value?: number
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  display?: string
  kicker?: string
  text?: string
  href?: string
  /** The link's words, when it is not to a write-up. */
  more?: string
}

interface Project {
  status?: string
  links?: { text: string; href: string }[]
  stats?: Stat[]
  note?: string
}

interface Hero {
  kicker?: string
  value: number
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  label?: string
  board?: { name: string; score: number; us?: boolean; detail?: string }[]
  boardDecimals?: number
  boardSuffix?: string
}

const { frontmatter, page, theme } = useData()

const project = computed<Project | undefined>(() => frontmatter.value.project)
const hero = computed<Hero | undefined>(() => frontmatter.value.hero)

/** The projects menu from the nav, so the tabs are the menu and never a second list of it. */
const projects = computed<{ text: string; link: string }[]>(
  () => theme.value.nav?.find((item: { text?: string }) => item.text === 'Projects')?.items ?? [],
)
// A project's page is /<project>/index.md, and the menu names it /<project>/.
const here = computed(() => `/${page.value.relativePath.replace(/(?:index)?\.md$/, '')}`)

const title = computed(() => {
  const whole = String(frontmatter.value.title ?? '')
  const at = whole.indexOf(': ')
  if (at > 0 && at <= 28) return { main: whole.slice(0, at), sub: whole.slice(at + 2) }
  return { main: whole, sub: '' }
})
const size = computed(() => (title.value.main.length <= 14 ? 'xl' : title.value.main.length <= 48 ? 'lg' : 'md'))
const external = (href: string) => /^https?:/.test(href)
</script>

<template>
  <header v-if="project" class="post-hero project-hero" :class="{ 'has-card': hero }">
    <div class="post-hero-geo" aria-hidden="true">
      <span class="geo-band" />
      <span class="geo-rule" />
      <span class="geo-dot" />
      <span v-if="!hero" class="geo-tag" :style="{ '--n': title.main.length }">{{ title.main }}</span>
    </div>

    <div class="post-hero-inner">
      <div class="post-hero-copy">
        <nav class="ph-tabs" aria-label="Projects">
          <a
            v-for="item in projects"
            :key="item.link"
            :href="item.link"
            :class="{ on: item.link === here }"
            :aria-current="item.link === here ? 'page' : undefined"
          >{{ item.text }}</a>
        </nav>

        <p class="post-kicker">
          <span class="post-tag">Project</span>
          <span v-if="project.status" class="post-section">{{ project.status }}</span>
        </p>

        <h1 class="post-title" :class="`size-${size}`">
          <span class="post-title-main">{{ title.main }}</span>
          <span v-if="title.sub" class="post-title-sub">{{ title.sub }}</span>
        </h1>

        <p v-if="frontmatter.description" class="post-standfirst">{{ frontmatter.description }}</p>

        <ul v-if="project.links?.length" class="ph-links">
          <li v-for="(link, i) in project.links" :key="link.href" :style="{ '--i': i }">
            <a
              :href="link.href"
              :target="external(link.href) ? '_blank' : undefined"
              :rel="external(link.href) ? 'noreferrer' : undefined"
            >{{ link.text }}<span aria-hidden="true">{{ external(link.href) ? ' ↗' : ' →' }}</span></a>
          </li>
        </ul>
      </div>

      <aside v-if="hero" class="kit invert post-hero-card" :aria-label="hero.label ?? 'Headline result'">
        <p v-if="hero.kicker" class="kit-kicker">{{ hero.kicker }}</p>
        <p class="post-hero-value">
          <NumberTicker
            :value="hero.value"
            :from="hero.from ?? 0"
            :decimals="hero.decimals ?? 0"
            :prefix="hero.prefix ?? ''"
            :suffix="hero.suffix ?? ''"
            :duration="1800"
            :delay="250"
          />
        </p>
        <p v-if="hero.label" class="post-hero-label">{{ hero.label }}</p>
        <Leaderboard
          v-if="hero.board"
          :entries="hero.board"
          :decimals="hero.boardDecimals ?? hero.decimals ?? 0"
          :suffix="hero.boardSuffix ?? hero.suffix ?? ''"
          bare
          invert
        />
      </aside>
    </div>

    <div v-if="project.stats?.length" class="ph-stats-wrap">
      <ul class="ph-stats" :style="{ '--n': project.stats.length }">
        <li v-for="(stat, i) in project.stats" :key="i" class="kit" :style="{ '--i': i }">
          <component :is="stat.href ? 'a' : 'div'" class="ph-stat" :href="stat.href">
            <span v-if="stat.kicker" class="kit-kicker">{{ stat.kicker }}</span>
            <strong class="ph-value">
              <NumberTicker
                v-if="stat.value !== undefined"
                :value="stat.value"
                :from="stat.from ?? 0"
                :decimals="stat.decimals ?? 0"
                :prefix="stat.prefix ?? ''"
                :suffix="stat.suffix ?? ''"
                :duration="1500"
                :delay="400 + i * 120"
              />
              <template v-else>{{ stat.display }}</template>
            </strong>
            <span v-if="stat.text" class="ph-text">{{ stat.text }}</span>
            <span v-if="stat.href" class="ph-more" aria-hidden="true">{{ stat.more ?? 'The write-up' }} →</span>
          </component>
        </li>
      </ul>
      <p v-if="project.note" class="ph-note">{{ project.note }}</p>
    </div>
  </header>
</template>

<style scoped>
/* The projects, as tabs: a hairline row, the current one inked in like a pressed kit toggle. */
.ph-tabs {
  display: inline-flex;
  flex-wrap: wrap;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  animation: post-rise 0.7s cubic-bezier(0.2, 0.7, 0.1, 1) both;
}

.ph-tabs a {
  padding: 6px 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.ph-tabs a + a {
  border-left: 1px solid var(--vp-c-divider);
}

.ph-tabs a:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.ph-tabs a.on {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.ph-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.ph-links li {
  margin: 0;
  animation: post-rise 0.6s calc(0.42s + var(--i) * 50ms) cubic-bezier(0.2, 0.7, 0.1, 1) both;
}

.ph-links a {
  display: inline-block;
  padding: 7px 12px;
  border: 1px solid var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  box-shadow: 3px 3px 0 var(--vp-c-text-1);
  transition: box-shadow 0.2s, transform 0.2s, color 0.2s;
}

.ph-links a:hover {
  color: var(--vp-c-brand-1);
  box-shadow: 3px 3px 0 var(--hf-pink);
  transform: translate(-1px, -1px);
}

/* ---- The numbers: one strip across the poster, under the copy ---------------------------- */

.ph-stats-wrap {
  position: relative;
  max-width: 1236px;
  margin: 44px auto 0;
  padding: 0 32px;
}

.ph-stats {
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--vp-c-divider);
  border-top: 4px solid var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.ph-stats li {
  margin: 0;
  animation: post-rise 0.7s calc(0.35s + var(--i) * 90ms) cubic-bezier(0.2, 0.7, 0.1, 1) both;
}

.ph-stats li + li {
  border-left: 1px solid var(--vp-c-divider);
}

.ph-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 18px 20px 18px;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.2s;
}

a.ph-stat:hover {
  background: var(--vp-c-bg);
}

.ph-stat .kit-kicker {
  margin: 0;
}

.ph-value {
  font-size: clamp(30px, 3.3vw, 44px);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.ph-stats li:first-child .ph-value {
  color: var(--vp-c-brand-1);
}

.ph-text {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.ph-more {
  margin-top: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.ph-note {
  margin: 10px 0 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

@media (max-width: 960px) {
  .ph-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ph-stats li + li {
    border-left: 0;
  }

  .ph-stats li:nth-child(even) {
    border-left: 1px solid var(--vp-c-divider);
  }

  .ph-stats li:nth-child(n + 3) {
    border-top: 1px solid var(--vp-c-divider);
  }
}

@media (max-width: 640px) {
  /* Clear of the accent circle, which sits in the top right corner on a phone. */
  .ph-tabs {
    flex-wrap: nowrap;
    max-width: calc(100% - 40px);
    overflow-x: auto;
  }

  .ph-tabs a {
    padding: 6px 8px;
    font-size: 11.5px;
    white-space: nowrap;
  }

  .ph-stats-wrap {
    padding: 0 20px;
    margin-top: 32px;
  }

  .ph-stat {
    padding: 14px 14px 16px;
  }
}

@media (max-width: 420px) {
  .ph-stats {
    grid-template-columns: minmax(0, 1fr);
  }

  .ph-stats li:nth-child(even) {
    border-left: 0;
  }

  .ph-stats li + li {
    border-top: 1px solid var(--vp-c-divider);
  }
}
</style>
