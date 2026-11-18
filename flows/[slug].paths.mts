// A page for every flow the flowverse releases that nobody here has written one for.
//
// The hand-written pages (`flows/*.md`, one per flow in `theme/flows.ts`) are the ones with a
// diagram and the prose that says when to reach for a flow. But the flowverse is open: anybody
// may release a flow into it, and a catalogue that only listed what this repository had heard of
// would be wrong the day after a release. So a module with no hand-written page gets one built
// from its README, at the commit its newest release pins, under the facts strip every flow page
// has. Writing a page for it by hand -- and listing it in `theme/flows.ts` -- replaces this.
import { loadFlowverse, slugOf } from '../.vitepress/flowverse.mts'
import { FLOWS } from '../.vitepress/theme/flows'

/** A README is written for GitHub, and this puts it on a page of ours: its own title goes
 *  (ours replaces it, with the flow's name as hmz calls it), as do its badges and its table of
 *  contents (the page has an outline), and every relative link and image -- inline, with a
 *  title, by reference, or in raw HTML -- is pointed back at the repository, since none of them
 *  exist on this site. A link to docs.humanfia.ai, where the documentation was until it was
 *  folded into humanfia.ai, is sent to the same path here: a release pins the README it was cut
 *  with. Code is left as it was written. The whole is wrapped in `v-pre`, so a
 *  `{{` anywhere in it is text rather than Vue. */
export function adapt(markdown: string, repo: string, commit: string): string {
  const blob = `https://github.com/${repo}/blob/${commit}/`
  const raw = `https://raw.githubusercontent.com/${repo}/${commit}/`
  const away = /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i
  const at = (base: string, path: string) => (away.test(path) ? path : base + path.replace(/^\.?\//, ''))
  const outside = (text: string) =>
    text
      // Images first, then links: an image is a link with a `!` in front.
      .replace(/!\[([^\]]*)\]\(<?([^)\s>]+)>?((?:\s+"[^"]*")?)\)/g, (_, alt, path, title) => `![${alt}](${at(raw, path)}${title})`)
      .replace(/(^|[^!])\[([^\]]+)\]\(<?([^)\s>]+)>?((?:\s+"[^"]*")?)\)/g, (_, lead, words, path, title) =>
        path.startsWith('#') ? `${lead}${words}` : `${lead}[${words}](${at(blob, path)}${title})`,
      )
      // A fragment means GitHub's slug of a heading, which is not always VitePress's: the
      // outline beside the page is the way around it, so a link into the README becomes its
      // words. Then the targets a reference-style link or raw HTML names.
      .replace(/^( {0,3}\[[^\]]+\]:[ \t]*)<?(\S+?)>?([ \t].*)?$/gm, (_, lead, path, rest = '') =>
        `${lead}${at(/\.(png|jpe?g|gif|svg|webp)$/i.test(path) ? raw : blob, path)}${rest}`,
      )
      .replace(/\b(src|href)=(["'])([^"']+)\2/g, (_, attr, q, path) => `${attr}=${q}${at(attr === 'src' ? raw : blob, path)}${q}`)
  const body = markdown
    .replace(/\r/g, '')
    .replace(/https:\/\/docs\.humanfia\.ai\//g, 'https://humanfia.ai/')
    .replace(/^#\s[^\n]*\n/, '')
    .replace(/^\s*\[!\[[^\n]*\n/gm, '')
    .replace(/^## Table of Contents\n[\s\S]*?(?=^## )/m, '')
    // Fenced blocks are kept whole, and only what lies between them is rewritten. Inline code
    // is set aside while it is, and put back after: it may sit inside a link's words.
    .split(/(^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)[ \t]*$)/m)
    .map((part, n) => {
      if (n % 2) return part
      const code: string[] = []
      const kept = part.replace(/`+[^`\n]*?`+/g, (span) => `\u0000${code.push(span) - 1}\u0000`)
      return outside(kept).replace(/\u0000(\d+)\u0000/g, (_, k) => code[Number(k)])
    })
    .join('')
  return `<div v-pre>\n\n${body}\n\n</div>`
}

export default {
  async paths() {
    const written = new Set(FLOWS.map((one) => one.module).filter(Boolean))
    const read = await loadFlowverse()
    return read.modules
      .filter((module) => !written.has(module.name))
      .map((module) => ({
        params: { slug: slugOf(module.name), name: module.name },
        content: [
          `# ${module.name}`,
          '',
          `<FlowFacts module="${module.name}" />`,
          '',
          '::: info From its README',
          `Nobody has written this flow a page of its own yet, so this is its README, as of the release above. Its roles, params and what ends it are there; [Humanize's documentation](/humanize/) says how flows are run.`,
          ':::',
          '',
          adapt(module.readme.markdown, module.latest.repo, module.latest.commit),
        ].join('\n'),
      }))
  },
}
