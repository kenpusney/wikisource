
const fm = require("front-matter")
const glob = require("glob");
const cnmd = require("cnmd");
const ejs = require("ejs");
const marked = require("marked");

const hljs = require("highlight.js");

const _ = require('lodash');

const fs = require('fs');
const path = require('path').posix;

const moment = require("moment");

function copyToPublic(file) {
    const subFileName = file.substring("static/".length);

    const targetFileName = "public/" + subFileName;

    const pathName = path.dirname(targetFileName);

    fs.mkdirSync(pathName, { recursive: true });

    fs.copyFileSync(file, targetFileName);
}

function postsInFolder(category, allWikiItems) {
    return _.reverse(_.sortBy(allWikiItems.filter(item => {
        return item.parentName === category && !(item.draft === true);
    }), item => item.date));
}

const registry = {};

function loadFileContent(file, registry) {
    if (!registry[file]) {

        const text = fs.readFileSync(file, { encoding: "utf-8" });
        const stat = fs.statSync(file);



        const visitPathStartsAt = "content/".length;
        const relativePath = file.substring(visitPathStartsAt);

        const ext = path.extname(relativePath);

        const content = fm(text);

        let fileName = path.basename(relativePath, ext);
        let parentName = path.join(relativePath, "..");
        let visitPath = path.join(parentName, fileName);

        if (parentName == ".") {
            parentName = "";
        }

        const isCategory = file.endsWith("/README.md")

        if (isCategory) {
            visitPath = path.join(relativePath, "..");
            fileName = path.basename(visitPath);
            parentName = path.join(visitPath, "..");
            if (visitPath == ".") {
                visitPath = "";
                fileName = "";
            }
            if (parentName == ".") {
                parentName = "";
            }
        }

        if (content.attributes.date) {
            content.attributes.date = moment(content.attributes.date).format("YYYY-MM-DD");
        } else {
            content.attributes.date = moment(stat.mtime).format("YYYY-MM-DD");
        }

        registry[file] = {
            ...content,
            ...content.attributes,
            isCategory,
            fileName,
            file,
            visitPath,
            parentName,
        };
    }
    return registry[file];
}

function render(wikiItem, posts) {

    let children = [];

    if (wikiItem.isCategory) {
        children = postsInFolder(wikiItem.visitPath, Object.values(posts));
    }

    const cnmdR = new cnmd.CnmdRenderer({
        ...cnmd.CnmdRenderer.default_handlers,
        "": (postfix, r) => posts[postfix] ?
            r(postfix.startsWith(".") ? `../${postfix}` : `/${postfix}`, posts[postfix].title) :
            `<a href="#" class="disabled-link">${postfix}</a>`,
    })

    marked.use({
        renderer: {
            link(href, title, text) {
                return cnmdR.link(href, title, text);
            }
        }
    });

    const data = {
        ...wikiItem,
        body: marked(wikiItem.body, {
            highlight: function(code, lang) {
                if (lang && hljs.listLanguages().includes(lang)) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        }),
        posts: children,
    };

    const result = ejs.renderFile("index.html.ejs", data)
    return result;
}


function save(target, content) {
    const dirname = path.dirname(target)

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(target, content)
}


const posts = {}
const tags = {}
const categories = {}

const WIKI = {
    posts, tags, categories
}


function loadWikiData(files, wiki) {
    files.forEach(file => {
        const content = loadFileContent(file, registry);
        const post = {
            title: content.fileName,
            ...content,
            source: content.file,
            target: "public/" + content.visitPath + "/index.html"
        }

        wiki.posts[content.visitPath] = post;

        if (post.tags) {
            fillTags(tags, post);
        }
    });
    return Object.values(wiki.posts);
}

function fillTags(tags, post) {
    post.tags.forEach(tag => {
        if (!tags[tag]) {
            tags[tag] = [];
        }

        tags[tag] << post;
    });
}

if (require.main === module) {

    glob("content/**/*.md", function (err, data) {
        const { posts, tags } = WIKI;

        loadWikiData(data, WIKI).forEach(item => {
            render(item, posts).then(result => {
                save(item.target, result);
            });
        })

        ejs.renderFile("sitemap.xml.ejs", { posts: Object.values(posts) }).then(result => {
            save("public/sitemap.xml", result);
        })
    });

    glob("static/**/*", function (err, data) {
        data.forEach(file => copyToPublic(file))
    });

    // loadFileContent("content/README.md", {});
}

module.exports = {
    render,
    loadWikiData,
    loadFileContent,
    save,
    postsInFolder,
    copyToPublic,
    fillTags,
}