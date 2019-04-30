const jieba = require("nodejieba");
const glob = require("glob");
const fs = require('fs')

jieba.load({
    userDict: `${__dirname}/user.dict.utf8`
});

const allowedTypes = ['n', 'eng']

function indexing(from, to, prefix, postfix) {
    glob(from, {}, (err, files) => {
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

            fs.writeFileSync(to, JSON.stringify(strMapToObj(keywords)));
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