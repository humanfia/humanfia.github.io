# humanfia.github.io

The organisation GitHub Pages site for Humanfia, served at
[docs.humanfia.ai](https://docs.humanfia.ai/).

Its own content is one page: `index.html` redirects the root of `docs.humanfia.ai` to
[humanfia.ai](https://humanfia.ai/), keeping the query string and fragment. Because this is the
organisation's Pages site and `CNAME` gives it the custom domain, the project Pages of the
other `humanfia` repositories are served under the same domain, at the repository's name:

- [docs.humanfia.ai/humanize/](https://docs.humanfia.ai/humanize/), from
  [humanfia/humanize](https://github.com/humanfia/humanize)
- [docs.humanfia.ai/kda-wishlist/](https://docs.humanfia.ai/kda-wishlist/), from
  [humanfia/kda-wishlist](https://github.com/humanfia/kda-wishlist)

Changing `CNAME` moves every one of those sites with it. `.nojekyll` publishes the files as they
are, so this README is not turned into a page.

## Usage

There is nothing to build: GitHub Pages publishes the root of `main` on every push.

## Contributing

See the [contributing guide](https://github.com/humanfia/.github/blob/main/CONTRIBUTING.md).

## License

[Apache-2.0](LICENSE)
