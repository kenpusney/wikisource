---
title: Workflow of this wiki
date: 2017-01-17
deprecated: true
---

**WARNING: This page is deprecated and out of date**

The normal way of create a new wiki item is just add a new [:CNMD]() page, and then publish,
it will be accessible from anywhere of this wiki using the cross-notation reference.

But for more complicated items, it may belongs to some specific category, like, an article, or
a source code snippet. I use folders as categories, and then can using folder name as the namespace
for all items in that category, and README.cn.md document under that folder will be the index of
the category.

Also I've created a utility script to complete the workflow.

e.g. if you want to create a new category:
```
./wiki new category entity
```

then you trying to add item into that category:
```
./wiki new entity "Wiki Item"
```

then go to `./cnmd/entity/Wiki Item.cn.md` edit the content.

All detailed code is in `wiki` script of [github:kenpusney/wiki]() repository.

## `./wiki` program reference

 - `./wiki new <item>`, create a new toplevel wiki item
 - `./wiki new category <cat>` create a new wiki category
 - `./wiki new <cat> <item>` create a new item under category
 - `./wiki index`, create search-engine index data, and write to `indexing.json`
 - `./wiki hash`, create short url link for all wiki entries and add to `hashing.json`
 - `./wiki serve`, start local http server for this wiki


You can put following code into `.git/hooks/pre-commit` to automatially hasing and indexing:
```bash
#!/usr/bin/env bash

./wiki index
./wiki hash

git add *.json
```

