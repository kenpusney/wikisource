
// const glob = require("glob");

// const { loadWikiData } = require("./src/loader");
// const { render } = require("./src/render");

// const Wiki = require("./src/wiki")

// const nodejieba = require("nodejieba")

// const cheerio = require("cheerio")


// nodejieba.load({
//   stopWordDict: "content/dict/STOPWORDS.txt",
//   userDict: "content/dict/USERDICT.txt"
// })

// function generate() {
//   const wiki = new Wiki();

//   glob("content/articles/30hours.md", function (err, data) {

//     loadWikiData(data, wiki).forEach(item => {
//       const result = render(item, wiki)

//         // console.log(result)

//         const $ = cheerio.load(result)
//         $("pre").remove();
//         $("a").remove();

//         console.log(nodejieba.cut($.text(), true));

//         console.log(nodejieba.tag($.text()).filter(({tag}) => { return tag.startsWith("n") || tag === "eng"}));

//         console.log(nodejieba.extract($.text(), 50))
//     })
//   })
// }

// if (require.main === module) {
//   generate()
// }
