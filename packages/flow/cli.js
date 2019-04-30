#!/usr/bin/env node
const indexing = require("./indexing")
const yargs = require("yargs")
const chalk = require("chalk")

const argv = yargs.command("index", "create index data for wiki", {}, () => {
    indexing("**/*.cn.md", 'data/indexing.json', 'cnmd/', '.cn.md')  
})
.strict()
.help().argv;
