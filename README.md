# Astro Example: Markdown

```
npm init astro -- --template with-markdown
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-markdown)

This example showcases Astro's [built-in Markdown support](../../docs/markdown.md).

- `src/pages/index.astro` uses Astro's `<Markdown>` component.
- `src/pages/other.md` is a treated as a page entrypoint and uses a `layout`.


BUG
added `<div>{content.astro?.headers.filter(h => h.depth === 1).map(h => <a href="">{h.text}</a>)}</div>` to the layout