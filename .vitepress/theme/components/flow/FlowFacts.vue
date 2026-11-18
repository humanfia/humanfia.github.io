<script setup lang="ts">
// Where a flow comes from and how to get it, under its title: in humanize itself, which is
// `chat` alone, or released in the flowverse -- and then which version, from which repository, pinned to which commit,
// under which licence, needing what. Every fact about a release is read from the flowverse at
// build time (`flowverse.data.mts`), never written on the page, so a new release shows up here
// on the next build without anybody editing a page.
//
// <FlowFacts flow="aot" /> on a hand-written page, by its name in FLOWS; a page generated from
// the flowverse passes `module` instead, since it has no entry there.
import { computed } from 'vue'

import { data } from '../../flowverse.data.mts'
import { FLOWS } from '../../flows'

const props = defineProps<{ flow?: string; module?: string }>()

const entry = computed(() => FLOWS.find((one) => one.name === props.flow))
const moduleName = computed(() => props.module ?? entry.value?.module)
const shipped = computed(() => data.modules.find((one) => one.name === moduleName.value))
const builtin = computed(() => !!entry.value && !entry.value.module)

/** The other flows the same install brings. */
const siblings = computed(() =>
  moduleName.value ? FLOWS.filter((one) => one.module === moduleName.value && one.name !== props.flow).map((one) => one.name) : [],
)

/** The line that runs a release straight from its repository, installing nothing: the ref the
 *  manifest pins, and the flow inside it. */
const direct = computed(() => {
  const m = shipped.value
  if (!m) return ''
  const name = entry.value?.phases ? `${entry.value.name}:${entry.value.phases.at(-1)}` : (entry.value?.name ?? m.name)
  const phase = name.includes(':') ? `:${name.split(':').slice(1).join(':')}` : ''
  return `git+https://github.com/${m.latest.repo}@${m.latest.ref || m.latest.commit}#${m.latest.subdir}${phase}`
})

const deps = computed(() => Object.entries(shipped.value?.latest.dependencies ?? {}))
const day = (iso: string) => iso.slice(0, 10)
</script>

<template>
  <div class="flow-facts flow-ui">
    <template v-if="builtin">
      <div class="badge"><span class="sq" />ships with Humanize</div>
      <p class="how">
        Nothing to install: it is in <code>hmz</code> from the first run, and is all there is
        to run until a flow is installed.
      </p>
    </template>

    <template v-else-if="shipped">
      <div class="badge">
        <span class="sq" />flowverse
        <span class="v">v{{ shipped.versions[0] }}</span>
      </div>
      <p class="how">
        In <code>hmz</code>, open <code>/flow</code> → <b>Flowverses</b> → <code>official</code> and
        install <code>{{ shipped.name }}</code><template v-if="siblings.length">, which brings
          <template v-for="(one, n) in siblings" :key="one"><code>{{ one }}</code>{{ n < siblings.length - 1 ? ', ' : '' }}</template>
          with it</template><template v-if="deps.length"> and installs
          <template v-for="([dep], n) in deps" :key="dep"><code>{{ dep }}</code>{{ n < deps.length - 1 ? ', ' : '' }}</template>,
          which it calls</template>. Or run the release without installing anything:
      </p>
      <pre class="direct"><code>hmz exec -f '{{ direct }}' …</code></pre>
      <dl>
        <div>
          <dt>repository</dt>
          <dd><a :href="shipped.repo.url">{{ shipped.latest.repo }}</a></dd>
        </div>
        <div>
          <dt>release</dt>
          <dd>
            <a :href="`${shipped.repo.url}/tree/${shipped.latest.commit}`">{{ shipped.latest.ref || shipped.versions[0] }}</a>
            · commit <code>{{ shipped.latest.commit.slice(0, 7) }}</code>
          </dd>
        </div>
        <div v-if="shipped.versions.length > 1">
          <dt>earlier</dt>
          <dd>{{ shipped.versions.slice(1).map((v) => `v${v}`).join(' · ') }}</dd>
        </div>
        <div v-if="deps.length">
          <dt>needs</dt>
          <dd>
            <template v-for="([dep, range], n) in deps" :key="dep">
              <code>{{ dep }} {{ range }}</code>{{ n < deps.length - 1 ? ' · ' : '' }}
            </template>
          </dd>
        </div>
        <div>
          <dt>licence</dt>
          <dd>{{ shipped.latest.license || 'see the repository' }}</dd>
        </div>
      </dl>
      <p class="whence">
        Read from <a :href="data.source">{{ data.source.replace('https://github.com/', '') }}</a>
        {{ data.from === 'network' ? 'when this site was built' : `as of ${day(data.read)}` }}.
      </p>
    </template>

    <p v-else class="how">
      Not in the flowverse this site was built from. Its code is wherever its author keeps it.
    </p>
  </div>
</template>

<style scoped>
/* A ruled strip, flush with the column: a accent square, a label set in capitals, and the facts in
   a two-column table. The square is the one colour, as it is wherever a flow is named. */
.flow-facts {
  position: relative;
  padding: 14px 18px 12px 20px;
  border: 1px solid var(--flow-panel-edge);
  border-left: 4px solid var(--flow-ink);
  border-radius: 2px;
  background: var(--flow-panel);
  font-size: 13.5px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.sq {
  width: 9px;
  height: 9px;
  background: var(--flow-mark);
}

.v {
  padding: 1px 6px;
  border: 1px solid var(--flow-ink);
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0;
  text-transform: none;
}

.how {
  margin: 8px 0 0;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.direct {
  margin: 8px 0 0;
  padding: 8px 12px;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  background: var(--flow-card);
  font-size: 12px;
  line-height: 1.5;
}

.direct code {
  padding: 0;
  background: none;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

dl {
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 12.5px;
}

dl div {
  display: flex;
  gap: 12px;
  padding: 2px 0;
}

dt {
  flex: none;
  width: 84px;
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}

dd {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}

.whence {
  margin: 8px 0 0;
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}
</style>
