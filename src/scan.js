
const glob = require("glob")

async function scan({patterns}) {
  return new Promise(function(resolve, reject) {
    glob(patterns, (err, matches) => {
      if (!err) {
        resolve(matches)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  scan
}
