
const fs = require('fs');
const path = require('path').posix;

function staticPublish(file) {
  const subFileName = file.substring("static/".length);

  const targetFileName = "public/" + subFileName;

  const pathName = path.dirname(targetFileName);

  fs.mkdirSync(pathName, { recursive: true });

  if (!fs.statSync(file).isDirectory()) {
    fs.copyFileSync(file, targetFileName);
  }
}

module.exports = {
  staticPublish,
}
