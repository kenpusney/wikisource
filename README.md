Wiki for Minimalist
=========

## How to setup your own wiki

 - Step 1: fork this repo
 - Step 2: clone this repo to your local machine
 - Step 3: run `./wiki init` and input your wiki details
 - Step 4: push to github

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
