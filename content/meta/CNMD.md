---
title: CNMD 标记语法
date: 2017-01-17
---

CNMD, aka Cross Notation Markdown, is a syntax extension for Markdown.

## Extension used in this format

### namespaces

Let's say if you want link an item exists in Wikipedia, you can just add
a normal link, but with a `wiki:` prefix like `[wiki:Markdown]()`, it
means that you want link this page to `https://en.wikipedia.org/wiki/Markdown`.

For internal items(like in wikipedia, it's single page for one item),
just put an `:` as a prefix, e.g. `[:about]()` ([:about]()).

### Tags and Refs

You can now add front-matter to include tags and refs declaration.

```markdown
---
tags:
  - hello world
refs:
  - meta/Fork Me
---
```

## Extensions to be implemented:

  - Alias
