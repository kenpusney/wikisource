
const ejs = require("ejs")


async function sitemap(wiki) {
  return await ejs.renderFile(wiki.config.templates.sitemap, {
    posts: Object.values(wiki.posts),
    config: wiki.config
  });
}

module.exports = {
  sitemap
}
