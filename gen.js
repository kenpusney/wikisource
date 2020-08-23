
const fm = require("front-matter")
const glob = require("glob");
const cnmd = require("cnmd");
const ejs = require("ejs");
const marked = require("marked");

const fs = require('fs');
const path = require('path');

const moment = require("moment");

glob("content/**/*.md", function (err, data) {

    data.forEach(file => {    
        const content = render(file, postsInFolder(file, data));

        content.then(c => save(file, c))
    })
});

glob("static/**/*", function(err, data) {
    data.forEach(file => copyToPublic(file))
});

function copyToPublic(file) {
    const subFileName = file.substring("static/".length);

    const targetFileName = "public/" + subFileName;

    const pathName = path.dirname(targetFileName);

    fs.mkdirSync(pathName, { recursive: true });

    fs.copyFileSync(file, targetFileName);
}

function postsInFolder(readme, allfile) {
    if (new String(readme).endsWith("README.md")) {
        const folder = readme.substring(0, readme.length - "README.md".length);

        const regex = new RegExp(`${folder}[^\\/]+\\.md`);

        return allfile.filter(f => regex.test(f) && f !== readme);
    }

    return []
}

const registry = {};

function loadFileContent(file, registry) {
    if (!registry[file]) {
        const text = fs.readFileSync(file, { encoding: "utf-8" });

        const content = fm(text);
        const fileName = file.substring(file.lastIndexOf("/") + 1, file.length - 3);
        const filePath = path.dirname(file.substring("content/".length)) + "/" + fileName;

        if (content.attributes.date) {
            content.attributes.date = moment(content.attributes.date).format("YYYY-MM-DD");
        }

        registry[file] = { ...content, 
            ...content.attributes,
            fileName, file, filePath};

    }
    return registry[file];
}

function render(file, posts) {

    if (posts) {
        posts.map(p => {
            loadFileContent(p, registry);
        })
    }

    const renderer = new cnmd.CnmdRenderer({
        ...cnmd.CnmdRenderer.default_handlers,
        "": postfix => postfix.startsWith(".") ? `../${postfix}` : `/${postfix}`
    })

    const content = loadFileContent(file, registry);


    const data = {
        ...content,
        body: marked(content.body, { renderer }),
        posts: posts.map(p => loadFileContent(p, registry))
    };


    const result = ejs.renderFile("index.html.ejs", data)
    return result;
}


function save(file, content) {

    let htmlFileName = "public/" + file.substring("content/".length, file.length - ".md".length) + "/index.html"


    if (file.endsWith("README.md")) {
        htmlFileName = "public/" + file.substring("content/".length, file.length - "README.md".length) + "index.html"
    }
    
    const dirname = path.dirname(htmlFileName)

    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(htmlFileName, content)
}
