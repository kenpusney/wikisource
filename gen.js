
const glob = require("glob");
const ejs = require("ejs");

const { loadWikiData } = require("./src/loader");
const { render } = require("./src/render");
const { save, copyToPublic } = require("./src/file_ops");

const Wiki = require("./src/wiki")

if (require.main === module) {

    const wiki = {
        posts: {}, tags: {}, registry: {}
    }

    const wikiAlt = new Wiki();
    
    glob("content/**/*.md", function (err, data) {
        const { posts } = wiki;

        loadWikiData(data, wikiAlt).forEach(item => {
            render(item, wikiAlt).then(result => {
                save(item.target, result);
            });
        })

        ejs.renderFile("template/sitemap.xml.ejs", { posts: Object.values(posts) }).then(result => {
            save("public/sitemap.xml", result);
        })
    });

    glob("static/**/*", function (err, data) {
        data.forEach(file => copyToPublic(file))
    });
}
