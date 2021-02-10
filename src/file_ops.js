
const fs = require('fs');
const path = require('path').posix;

function copyToPublic(file) {
  const subFileName = file.substring("static/".length);

  const targetFileName = "public/" + subFileName;

  const pathName = path.dirname(targetFileName);

  fs.mkdirSync(pathName, { recursive: true });

  if (!fs.statSync(file).isDirectory()) {
    fs.copyFileSync(file, targetFileName);
  }
}


function save(target, content) {
  const dirname = path.dirname(target)

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  fs.writeFileSync(target, content)
}

module.exports = {
  copyToPublic,
  save
}
