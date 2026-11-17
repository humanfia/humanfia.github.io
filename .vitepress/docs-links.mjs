// Every link this site makes to a page another repository publishes under humanfia.ai, fetched.
//
// humanfia.ai is the organisation's Pages site, so a repository with Pages on is served at
// `humanfia.ai/<repository>/` from its own build: Humanize's page and documentation at
// /humanize/, from humanfia/humanize (the list is ./other-sites.ts). Those pages are on this
// origin and not in this build, so `pnpm build` leaves links to them out of its dead-link check,
// and they move without this repository hearing about it. When one does, its site leaves a stub
// behind: a page whose only content is a `<meta http-equiv="refresh">` to wherever the page
// went. So a link written against last quarter's layout answers 200, sends the reader through a
// blank page, and is invisible to every other check here. That is how this site came to have ten
// links to a `guide/` directory that no longer exists.
//
// This resolves each one and fails on four things: a page that is gone, a page that moved and
// is being reached through its stub, a redirect the URL could have skipped by being written
// with the trailing slash it is served on, and a `#fragment` the page has no element for.
//
//   pnpm check:docs
//
// It is the one check here that needs the network, so it is not part of `pnpm build`.
// `SITE_ORIGIN` points it somewhere other than https://humanfia.ai, for a preview.

import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { OTHER_SITES } from './other-sites.ts'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const SKIP = new Set(['node_modules', 'dist', 'cache', 'public', '.git', '.github'])
const HOST = 'https://humanfia.ai'
const ORIGIN = (process.env.SITE_ORIGIN ?? HOST).replace(/\/$/, '')

async function walk(at) {
  const found = []
  for (const entry of await readdir(at, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP.has(entry.name)) continue
      found.push(...(await walk(join(at, entry.name))))
    } else if (/\.(md|vue|ts|mts|mjs)$/.test(entry.name) && !/^(docs-links\.mjs|other-sites\.ts)$/.test(entry.name)) {
      found.push(join(at, entry.name))
    }
  }
  return found
}

/** Where each path is written, so a failure names a file rather than an address. */
const said = new Map()
const note = (path, where) => said.set(path, (said.get(path) ?? new Set()).add(where))

// A link is a path from the root of the origin, `/humanize/user/first-run`, standing where a
// link can stand: after a quote, a bracket, a backtick, `=` or a space, or after this host
// written out in full. That leaves out `github.com/humanfia/humanize/…`, which is the same words
// after another host.
const sites = OTHER_SITES.join('|')
const LINK = new RegExp(
  `(?:(?<=["'\`(=\\s])|${HOST.replaceAll('.', '\\.')})(/(?:${sites})(?:/[^\\s"'\`)<>\${}]*)?)(?=[\\s"'\`)<>]|$)`,
  'gm',
)

for (const file of await walk(ROOT)) {
  const where = relative(ROOT, file)
  const text = await readFile(file, 'utf8')
  for (const [, path] of text.matchAll(LINK)) note(path.replace(/[.,·]+$/, ''), where)
}

const paths = [...said.keys()].sort()
if (!paths.length) {
  console.error('no links to the other sites found at all, which cannot be right')
  process.exit(1)
}

/** A stub page and a real one both answer 200. This is what tells them apart. */
const movedTo = (html) =>
  /http-equiv="refresh"/.test(html)
    ? /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? 'somewhere it does not say'
    : undefined

const problems = []

// Six at a time: enough to keep the whole check under a few seconds, few enough that a static
// host never sees this as something to throttle.
const queue = [...paths]
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (let path = queue.shift(); path; path = queue.shift()) {
      const where = [...said.get(path)].sort().join(', ')
      const [page, fragment] = path.split('#')
      const url = ORIGIN + page
      let answer
      try {
        answer = await fetch(url, { redirect: 'manual' })
      } catch (cause) {
        problems.push(`${path} -- could not be reached (${cause.message}) [${where}]`)
        continue
      }

      if (answer.status >= 300 && answer.status < 400) {
        const to = answer.headers.get('location')
        problems.push(`${path} -- redirects to ${to}; write that [${where}]`)
        continue
      }

      if (!answer.ok) {
        problems.push(`${path} -- ${answer.status} [${where}]`)
        continue
      }

      // Only a page can be a stub. A recording is either there or it is not.
      if (/\.(gif|cast|png|svg|jpg|mp4|webm)$/.test(page)) continue
      const html = await answer.text()
      const to = movedTo(html)
      if (to) problems.push(`${path} -- moved to ${to} [${where}]`)
      else if (fragment && !html.includes(`id="${fragment}"`)) {
        problems.push(`${path} -- the page has nothing called #${fragment} [${where}]`)
      }
    }
  }),
)

if (problems.length) {
  for (const problem of problems.sort()) console.error(problem)
  console.error(`\n${problems.length} of ${paths.length} links to the other sites is wrong.`)
  process.exit(1)
}
console.log(`${paths.length} links to the other sites on ${ORIGIN}, every one of them where it says`)
