
const ejs = require("ejs")


async function sitemap(wiki) {
  return await ejs.renderFile("template/sitemap.xml.ejs", { posts: Object.values(wiki.posts) });
}

module.exports = {
  sitemap
}
