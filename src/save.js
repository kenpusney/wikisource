
const fs = require('fs');
const path = require('path').posix;

function save(target, content) {
  const dirname = path.dirname(target)

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  fs.writeFileSync(target, content)
}

module.exports = {
  save
}
