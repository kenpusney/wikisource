module.exports = {
  dateFormat: "YYYY-MM-DD",

  sourceDir: "content",
  targetDir: "public",
  staticDir: "static",

  site: {
    title: "Wiki",
    author: "KimmyLeo",
    copyright: "Copyright &copy; KimmyLeo",
    baseUrl: "https://wiki.kimleo.net/",
  },

  templates: {
    post: "template/index.html.ejs",
    sitemap: "template/sitemap.xml.ejs"
  }
}
