
const glob = require("glob");
const ejs = require("ejs");

const { loadWikiData } = require("./src/loader");
const { render } = require("./src/render");
const { save, copyToPublic } = require("./src/file_ops");

const Wiki = require("./src/wiki")


function generate() {
  const wiki = new Wiki();

  glob("content/**/*.md", function (err, data) {

    loadWikiData(data, wiki).forEach(item => {
      render(item, wiki).then(result => {
        save(item.target, result);
      });
    })

    ejs.renderFile("template/sitemap.xml.ejs", { posts: Object.values(wiki.posts) }).then(result => {
      save("public/sitemap.xml", result);
    })
  });

  glob("static/**/*", function (err, data) {
    data.forEach(file => copyToPublic(file))
  });
}

if (require.main === module) {
  generate()
}
