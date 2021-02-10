
const path = require('path').posix;


function parseFileName(file, prefix) {
  const visitPathStartsAt = `${prefix}/`.length;
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

module.exports = {
  parseFileName
}
