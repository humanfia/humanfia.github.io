// The paths on humanfia.ai that this repository does not build.
//
// This repository is the organisation's GitHub Pages site (humanfia/humanfia.github.io) and
// humanfia.ai is its domain, so GitHub serves every other humanfia repository that has Pages on
// at `humanfia.ai/<repository>/`, from that repository's own build. A project that has
// documentation keeps it in its own repository, and its page here *is* that site's front page:
// `/humanize/` is humanfia/humanize's `docs/`, and there is no second page about it in here.
//
// So these are links to pages the build cannot see and the router must not answer. The config
// leaves them out of the dead-link check, the theme hands a click on one to the browser (a full
// page load, since it is another build), and `pnpm check:docs` fetches every one that is written.
//
// A repository's path wins over a route of this site, so no page here may start with one of
// these names -- and a repository named like a route here (`flows`, `blog`, `news`, `about`,
// `hoa`, `hma`, `kda`, `flowbench`) must not turn Pages on.
//
// Imported by the config, the theme and the checks, so it imports nothing.
export const OTHER_SITES = ['humanize', 'kda-wishlist']

/** Whether a path of this origin belongs to another repository's build. */
export const isOtherSite = (path: string) =>
  OTHER_SITES.some((site) => path === `/${site}` || path.startsWith(`/${site}/`))
