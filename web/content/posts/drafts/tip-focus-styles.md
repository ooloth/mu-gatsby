---
title: string
slug: url pathname
description: string
featuredImage: relative path
topics:
  - string
devLink: absolute url
linkSharedOnTwitter: absolute url
published: false
datePublished: 2020-12-31
dateUpdated: 2020-12-31
---

<!--

Tips:

- Write for one person (not everyone): https://twitter.com/b0rk/status/1262415197345636353
- Put main ideas in headings: https://twitter.com/b0rk/status/1262756496162476033

-->

- what-input
- tracks your user's input mode and records it in data attributes added to your html element
- in gatsby, import in gatsby-browser (only needed in browser, doesn't need to re-render on route changes)
- one declaration to hide outlines except for keyboard users

```css
[data-whatintent='mouse'] *:focus,
[data-whatintent='touch'] *:focus,
html:not([data-whatinput='keyboard']) *:focus {
  outline: none;
}
```

- use browser default (users who need them used to spotting them)
- if you want to customize, here's a declaration for that (use tailwind suggestion?)

## Glossary

## Links

- https://github.com/ten1seven/what-input
