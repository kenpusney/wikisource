

const fm = require("front-matter")

const fs = require("fs").promises

const moment = require("moment");
const { parseFileName } = require("./util");

async function read(file, wiki) {
  const fileNameDetail = parseFileName(file, wiki.config.sourceDir);

  const { visitPath } = fileNameDetail;

  if (wiki.postExists(visitPath)) {
    return wiki.post(visitPath)
  }

  const text = await fs.readFile(file, { encoding: "utf-8" });
  const stat = await fs.stat(file)
  const content = fm(text)

  if (content.attributes.date) {
    content.attributes.date = moment(content.attributes.date).format(wiki.config.dateFormat);
  } else {
    content.attributes.date = "#N/A";
  }

  return wiki.addPost(visitPath, {
    id: fileNameDetail.visitPath,
    title: fileNameDetail.fileName,
    ...content,
    ...content.attributes,
    ...fileNameDetail,
    file,
    source: content.file,
    target: `${wiki.config.targetDir}/${fileNameDetail.visitPath}/index.html`,
    updateDate: moment(stat.mtime).format(wiki.config.dateFormat)
  });
}

module.exports = {
  read
}
