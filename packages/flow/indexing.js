const jieba = require("nodejieba");
const glob = require("glob");
const fs = require('fs')
const chalk = require("chalk")

jieba.load({
    userDict: `${__dirname}/user.dict.utf8`
});

const allowedTypes = ['n', 'eng']

function indexing(from, to, prefix, postfix) {
    glob(from, {}, (err, files) => {
        console.log(chalk.yellow("Start indexing..."))
        if (!err) {
            let keywords = new Map();

            files.forEach(file => {
                const id = retrieveId(file, prefix.length, postfix.length)

                const text = fs.readFileSync(file, { encoding: "utf8" })

                const set = new Set(jieba.tag(text)
                    .filter(group => allowedTypes.includes(group.tag) && group.word.length > 1)
                    .map(group => group.word.toLowerCase()));

                set.forEach(collectToMap(keywords, id));
            });

            console.log(chalk.yellow(`Successfully processed ${chalk.green(files.length)} file(s)`))
            fs.writeFileSync(to, JSON.stringify(strMapToObj(keywords)));
            console.log(chalk.yellow(`Data persisted to: ${chalk.green(to)}`))
            console.log(chalk.yellow("Done."))
        } else {
            console.log(chalk.red("Error!"));
            console.log(chalk.red(JSON.stringify(err)));
        }
    });
}

function collectToMap(map, value) {
    return key => {
        if (map.has(key)) {
            map.get(key).push(value);
        } else {
            map.set(key, [value]);
        }
    }
}

function strMapToObj(strMap) {
    let obj = {};
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

function retrieveId(fileName, startIndex, sizeToEnd) {
    return fileName.slice(startIndex, fileName.length - sizeToEnd);
}


module.exports = indexing;