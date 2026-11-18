# humanfia.ai

The Humanfia website: the team, its projects and its results, built with VitePress. It is
served at [humanfia.ai](https://humanfia.ai/), and it is the organisation's GitHub Pages site,
so every other `humanfia` repository with Pages on is served under the same domain
(see Project sites below).

## Usage

Needs Node.js 22+ and [pnpm](https://pnpm.io/).

```sh
pnpm install
pnpm dev      # local preview
pnpm build    # build into .vitepress/dist
```

Pages are Markdown: `index.md`, a directory per project (`hoa/`, `hma/`, `kda/`, `flowbench/`),
`flows/`, `about/`, and one file per post in `news/` or `blog/`. Files in `public/` are
published as they are. The Humanize page is not here: it is the front page of Humanize's own
documentation, in [humanfia/humanize](https://github.com/humanfia/humanize) (`docs/`).

The figures in the Flow Science post on the blog are drawn by
`.vitepress/theme/components/flowscience/`: a line chart with log and hand-spaced axes the post
kit does not have yet, and the data it plots, read off the charts in our talk slides
(`deck-data.json`, described in `figures.ts`).

The HMA page (`hma/index.md`) is one full-width component,
`.vitepress/theme/components/projects/hma/`; its numbers live in `data.ts` there, each with its
source.

The KDA page (`kda/index.md`) is drawn by its own components,
`.vitepress/theme/components/projects/kda/`; its numbers live in the page's frontmatter, each
block naming the write-up it comes from.

### Adding a post

A post is one file, named `YYYY-MM-DD-slug.md`. Put results in `news/`: one result per post.
Put essays and arguments in `blog/`. Start the file with this frontmatter:

```yaml
---
title: "What was done, in one line"
description: One or two sentences for the standfirst, the card, the feed and search engines.
date: 2026-10-05
authors:
  - Your Name
tag: HOA
---
```

`tag` is the project the post belongs to. A news post credits more than its `authors`: its
byline, everywhere it is shown and in the feed, adds the leads and co-leads of every project
the tagged project is built on, transitively. An HOA result therefore also names the Humanize
lead, and a post about Humanize itself adds nobody. Projects, their tags, leads and
dependencies live in one registry, `.vitepress/theme/projects.ts`, which the team roster reads
too; a news tag it does not list fails the build. Everything else is generated from the frontmatter:
the post's page (its hero, contents, related posts and a Cite button that exports the
post in BibTeX, BibLaTeX, APA, MLA, Chicago, IEEE, RIS and CSL-JSON), the section index (a list for news,
a mosaic for the blog), the home page, and the section's feed (`news/feed.rss`, `blog/feed.rss`). There is no list to
update. A news post that adds an `achievement:` block also gets a tile in the home page's
Achievements, one per topic, from the newest post. Figures come from the post kit: interactive charts, tables, diagrams and callouts
that you write straight into the markdown. [CONTRIBUTING.md](CONTRIBUTING.md) is the guide to
the post layout and every component in the kit.

### Project sites

Every project is at `humanfia.ai/<project>/`: one page, or one site, per project.

- A project **without documentation** is a page here: `hoa/index.md` is
  [humanfia.ai/hoa/](https://humanfia.ai/hoa/).
- A project **with documentation** keeps it in its own repository and publishes it with GitHub
  Pages. Because this repository is the organisation's Pages site (`humanfia.github.io`) and
  `public/CNAME` gives it the domain, GitHub serves that build at `humanfia.ai/<repository>/`.
  Its front page is the project's page; there is no second one here.
  [humanfia.ai/humanize/](https://humanfia.ai/humanize/) is
  [humanfia/humanize](https://github.com/humanfia/humanize)'s `docs/`, and
  [humanfia.ai/kda-wishlist/](https://humanfia.ai/kda-wishlist/) is
  [humanfia/kda-wishlist](https://github.com/humanfia/kda-wishlist).

Things to know:

- **A repository's path wins.** A repository with Pages on owns `/<repository name>/`. No page
  here may start with such a name, and a repository named like a route here (`flows`, `blog`,
  `news`, `about`, `hoa`, `hma`, `kda`, `flowbench`, ...) must not turn Pages on. To give one
  of those projects documentation, delete its page here in the same change that turns its
  repository's Pages on.
- **Links are paths.** A link to another repository's site is written from the root,
  `/humanize/user/first-run`, like any link here. `.vitepress/other-sites.ts` lists those
  sites: the build leaves links to them out of its dead-link check, the theme has the browser
  load them instead of the router, and `pnpm check:docs` fetches every one.
- **One bar, one footer.** The nav's links, the social link and the footer's lines are the
  `NAV`, `SOCIAL_LINKS` and `FOOTER` constants in `.vitepress/config.mts`, and every build
  writes them to [humanfia.ai/chrome.json](https://humanfia.ai/chrome.json). Humanize's site
  reads that file when it is built and draws the same bar and footer, with its own copy of
  `Wordmark.vue` and of the chrome's rules in `theme/style.css`; a change to either of those
  is made in `humanfia/humanize`'s `docs/.vitepress/theme/humanfia/` too. A change to the nav
  reaches Humanize's site the next time that site is built.
- **No flash between builds.** Going to another repository's site is a page load. Both themes
  ask the browser to cross-fade it and to carry the nav across unchanged (`@view-transition`
  in `theme/style.css`), and to draw the other build's page ahead of the click
  (the `speculationrules` script in `head`).
- **Same origin.** Those sites share this one's cookies and localStorage, and each builds its
  own header and footer.
- **Renaming this repository, or changing `public/CNAME`, moves every one of those sites.**

The projects were at `humanfia.ai/projects/<project>` and the documentation at
`docs.humanfia.ai/<repository>/` until 2026-11-17. `public/projects/` holds a redirect for each
old project page; docs.humanfia.ai is retired and answers nothing.

### Deploying

A push to `main` builds the site and deploys it to GitHub Pages
(`.github/workflows/deploy.yml`). Pull requests run the same build without deploying. The org
profile in [humanfia/.github](https://github.com/humanfia/.github) is generated from the deployed
site and notices a deploy on its own, so nothing here needs a token for it.

## Contributing

Issues and pull requests are welcome; see the
[contributing guide](https://github.com/humanfia/.github/blob/main/CONTRIBUTING.md). Every pull
request runs the build and three checks, and all four have to pass:

```sh
pnpm build          # every internal link resolves
pnpm check:anchors  # every #fragment resolves to a heading the site built
pnpm check:feed     # the feed holds every post, and a click on it is not a 404
pnpm check:docs     # every link to another repository's site reaches the page it names
```

## License

The site's code — `.vitepress/` (configuration, theme, components and checks), `scripts/`,
the workflows and the build configuration — is licensed under [Apache-2.0](LICENSE).

The content — the pages in `index.md`, `blog/`, `news/`, `flows/`, `about/` and the project
directories, and the
images under `public/` — is licensed under
[CC-BY-4.0](LICENSE-CC-BY-4.0): reuse it with attribution to Humanfia and a link to the page.

The citation styles in `.vitepress/theme/csl/` are copied unchanged from
[citation-style-language/styles](https://github.com/citation-style-language/styles) and are
licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), as each file
says.

Material quoted or linked from others (problem statements, benchmark results, third-party
repositories and papers) keeps its owners' terms. The Humanfia name and logo identify the
organisation; the licences above do not grant any trademark rights.
