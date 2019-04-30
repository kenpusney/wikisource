const indexing = require("./indexing")

const yargs = require("yargs")

yargs.command("index", "create index data for wiki", {}, () => {
    indexing("**/*.cn.md", 'data/indexing.json', 'cnmd/', '.cn.md')    
})
.help();
