import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createContentLoader, defineConfig, type ContentData, type SiteConfig } from 'vitepress'

import { OTHER_SITES } from './other-sites'
import { authorsWithDeps } from './theme/projects'

// humanfia.ai, served from the repository root: the CNAME in public/ is the custom domain,
// so no base is prepended and every internal link is written from `/`. This repository is the
// organisation's Pages site, so the other repositories' Pages are served under the same domain:
// Humanize's page and its documentation are one site at /humanize/, built from humanfia/humanize.
// Everything here links to it, as a path, rather than restating it (./other-sites.ts).
const HOSTNAME = 'https://humanfia.ai'

/** The projects, in the order they are worth reading: the runtime, the referee, the three
 *  applications. Names only -- a list is a list of places, and the sentence explaining each
 *  one is already the first thing on the page it goes to.
 *
 *  Humanize is labelled the way its own README names it. RLCR Flow, the Claude Code plugin
 *  it grew out of, is not a project here: it lives on as the humanize1 flow, under Flows.
 *
 *  Each project is at /<project>/. Humanize's is its own repository's site, so the link is
 *  followed by the browser and not the router (`target`); the others are pages here. They were
 *  at /projects/<project> until the documentation site was folded into this one, and
 *  public/projects/ still sends each of those on.
 *
 *  The nav's dropdown, and nothing else: a project page is drawn full width, with no sidebar,
 *  so this is the one way between them. There is no longer a page above them either. */
const PROJECT_LINKS = [
  { text: 'Humanize', link: '/humanize/', target: '_self' },
  { text: 'FlowBench', link: '/flowbench/' },
  { text: 'HOA', link: '/hoa/' },
  { text: 'KDA', link: '/kda/' },
  { text: 'HMA', link: '/hma/' },
]

/**
 * The two sections a post can be in, and what each one is called where it is named.
 *
 * News is the record -- one result per post, a number, its caveats and a date. The blog is what
 * we think -- essays, design arguments, the write-ups that are about a way of working rather
 * than a score. Each has its own directory, its own index and its own feed, so a reader who
 * wants only the numbers subscribes to only the numbers.
 */
const SECTIONS = {
  blog: { name: 'Blog', feed: 'Humanfia blog', about: 'Essays and arguments from the people building Humanfia.' },
  news: { name: 'News', feed: 'Humanfia news', about: 'What the flows did, one result per post.' },
} as const
type Section = keyof typeof SECTIONS

export default defineConfig({
  title: 'Humanfia',
  titleTemplate: ':title · Humanfia',
  description:
    'Humanfia builds open-source flows that organise coding agents for long-horizon work, and Humanize, the runtime that runs them.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'CONTRIBUTING.md'],

  sitemap: { hostname: HOSTNAME },

  // Every post, in either section, is drawn by the post layout (theme/components/PostLayout.vue)
  // without having to ask for it; the two indexes keep the default. A post has no sidebar: its
  // contents and the posts to read next are the layout's own.
  transformPageData(page) {
    if (/^(?:blog|news)\/(?!index\.md$)[^/]+\.md$/.test(page.relativePath)) {
      page.frontmatter.layout ??= 'post'
      page.frontmatter.sidebar ??= false
    }
  },

  // The footer has no slot, and its lines are HTML strings that cannot hold a component, so the
  // wordmark gets there by replacing the theme's footer outright -- the theme's documented way of
  // overriding one of its parts. SiteFooter.vue is the theme's own, with the wordmark on top.
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/SiteFooter.vue', import.meta.url)),
        },
      ],
    },
  },

  // The feeds are written by `buildEnd` below, after the link check has run, so the check has
  // no way of knowing they are about to exist. Every other dead link is still a failed build.
  // Nor can it see the sites other repositories publish under this domain; `pnpm check:docs`
  // fetches those.
  ignoreDeadLinks: [/^\/(?:blog|news)\/feed\.rss$/, new RegExp(`^/(?:${OTHER_SITES.join('|')})(?:/|$)`)],

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    // A home screen cannot use the SVG: it wants a raster of a known size and composites it
    // onto its own background, so these are drawn on ink by scripts/icons.py.
    ['link', { rel: 'apple-touch-icon', href: '/icon-180.png', sizes: '180x180' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    // The mark's own ink, not the green: this tints the browser chrome around the page, and a green
    // bar over a paper page would shout louder than anything on it.
    ['meta', { name: 'theme-color', content: '#141a1f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Humanfia' }],
    ['meta', { property: 'og:image', content: `${HOSTNAME}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // One alternate per feed, so a reader pointed at any page here is offered both.
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: SECTIONS.blog.feed, href: `${HOSTNAME}/blog/feed.rss` }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: SECTIONS.news.feed, href: `${HOSTNAME}/news/feed.rss` }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Humanfia',
        url: `${HOSTNAME}/`,
        description: 'We build the flow around the agents.',
        sameAs: [
          'https://github.com/humanfia',
          'https://github.com/humanfia/humanize',
        ],
      }),
    ],
  ],

  themeConfig: {
    // No logo and no title: the brand is the animated wordmark, put inside the theme's title link
    // by the `nav-bar-title-after` slot in theme/index.ts -- the H and the word drawn as one SVG,
    // with the dot of the i hopping to the H and back. `false` rather than leaving it out, which
    // would have the theme print the site's title as text beside it.
    siteTitle: false,

    // Projects is a menu; the rest are plain links. There is no Research menu: Flow Science is a
    // post on the blog, and how Humanize works inside is its own documentation's to say. Flows
    // is a plain link too: the way to a flow is the catalogue at /flows/, which shows every flow
    // at once, drawn, where a menu could only list their names. There is no projects index any more: a page whose whole job
    // was to list six links, when a menu lists the same six without costing a page load, and
    // every one of those pages opens with the sentence the index was paraphrasing. The way in
    // is now the project itself.
    //
    // Documentation is still not in here. It lives with the project it documents, and the way
    // to it is that project's page -- a Docs menu was a second table of contents for a site
    // this one does not own, and it went stale the moment that site moved a page.
    nav: [
      { text: 'Projects', items: PROJECT_LINKS, activeMatch: '^/(?:flowbench|hoa|kda|hma)/' },
      { text: 'Flows', link: '/flows/', activeMatch: '/flows/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      { text: 'News', link: '/news/', activeMatch: '/news/' },
      { text: 'About', link: '/about/', activeMatch: '/about/' },
    ],

    // No section has a sidebar. About is a single page: a list of one is furniture, not
    // navigation. The blog and news indexes are already the whole list (PostMosaic.vue,
    // NewsList.vue), and a post's contents and the posts to read next are its layout's own. The
    // flows' catalogue is their index, and every flow's page leads back to it (FlowsBack.vue).
    // Each project page is drawn full width, and the nav's menu is the way between them.
    sidebar: {},

    socialLinks: [{ icon: 'github', link: 'https://github.com/humanfia' }],

    editLink: {
      pattern: 'https://github.com/humanfia/humanfia.github.io/edit/main/:path',
      text: 'Suggest an edit to this page',
    },

    search: { provider: 'local' },

    outline: { level: [2, 3] },

    footer: {
      message:
        'Open source on <a href="https://github.com/humanfia">github.com/humanfia</a> · RSS: <a href="/blog/feed.rss">blog</a> · <a href="/news/feed.rss">news</a>',
      // The name is the wordmark drawn over these two lines (theme/components/SiteFooter.vue).
      copyright: 'Copyright © 2026',
    },
  },

  // One RSS feed per section, written straight into the built site. Hand-rolled rather than
  // pulled from a package: a feed is a dozen lines of XML, and this way the build has one
  // dependency rather than two.
  async buildEnd(config: SiteConfig) {
    for (const section of Object.keys(SECTIONS) as Section[]) {
      const posts = await createContentLoader(`${section}/*.md`, { excerpt: false }).load()
      writeFileSync(resolve(config.outDir, `${section}/feed.rss`), feedOf(section, posts))
    }
  },
})

function feedOf(section: Section, posts: ContentData[]) {
  const items = posts
    .filter((page) => page.url !== `/${section}/` && page.frontmatter.date)
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
    .map((page) => {
      const link = `${HOSTNAME}${page.url}`
      const own: string[] = page.frontmatter.authors ??
        (page.frontmatter.author ? [page.frontmatter.author] : [])
      // The same byline the post's page shows: a result credits what it was built on.
      const authors = section === 'news' ? authorsWithDeps(own, page.frontmatter.tag) : own
      return [
        '    <item>',
        `      <title>${escapeXml(page.frontmatter.title ?? page.url)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(page.frontmatter.date).toUTCString()}</pubDate>`,
        // `dc:creator`, not RSS's own `<author>`: that element is defined as an email address
        // and nothing else, so a name in it is an error every feed validator reports and some
        // readers drop the whole item over. We publish names and no addresses.
        ...(authors.length ? [`      <dc:creator>${escapeXml(authors.join(', '))}</dc:creator>`] : []),
        `      <description>${escapeXml(page.frontmatter.description ?? '')}</description>`,
        '    </item>',
      ].join('\n')
    })

  // The newest post's date rather than the clock: two builds of the same commit should
  // produce the same bytes, and a reader polling us should see a changed feed only when the
  // section changed.
  const latest = posts.reduce(
    (newest, page) => Math.max(newest, +new Date(page.frontmatter.date ?? 0) || 0),
    0,
  )

  const { feed, about } = SECTIONS[section]
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    <title>${escapeXml(feed)}</title>`,
    `    <link>${HOSTNAME}/${section}/</link>`,
    `    <description>${escapeXml(about)}</description>`,
    '    <language>en-us</language>',
    ...(latest ? [`    <lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>`] : []),
    `    <atom:link href="${HOSTNAME}/${section}/feed.rss" rel="self" type="application/rss+xml"/>`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
