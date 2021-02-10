
const fm = require("front-matter")

const fs = require('fs');
const path = require('path').posix;

const moment = require("moment");

function parseFileName(file) {
  const visitPathStartsAt = "content/".length;
  const relativePath = file.substring(visitPathStartsAt);

  const ext = path.extname(relativePath);

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

  return { isCategory, parentName, fileName, visitPath };
}

function load(file, wiki) {
  if (!wiki.registered()) {
    const text = fs.readFileSync(file, { encoding: "utf-8" });
    const stat = fs.statSync(file);

    const content = fm(text);

    const fileNameDetail = parseFileName(file);

    if (content.attributes.date) {
      content.attributes.date = moment(content.attributes.date).format("YYYY-MM-DD");
    } else {
      content.attributes.date = "#N/A";
    }


    wiki.register(file, {
      ...content,
      ...content.attributes,
      ...fileNameDetail,
      file,
      updateDate: moment(stat.mtime).format("YYYY-MM-DD"),
    });
  }
  return wiki.register(file);
}

function loadWikiData(files, wiki) {
  files.forEach(file => {
    const content = load(file, wiki);
    const post = {
      id: content.visitPath,
      title: content.fileName,
      ...content,
      source: content.file,
      target: "public/" + content.visitPath + "/index.html"
    }

    wiki.addPost(post.id, post);
  });
  return Object.values(wiki.posts);
}


module.exports = {
  loadWikiData,
  parseFileName
}
