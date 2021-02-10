const marked = require("marked");

const { image, highlight, cnmdRenderer } = require("./markup/helpers")

function markup(wikiItem, wiki) {

  let children = [];

  if (wikiItem.isCategory) {
    children = wiki.childPosts(wikiItem.visitPath);
  }

  marked.use({
    renderer: {
      link(href, title, text) {
        return cnmdRenderer(wiki).link(href, title, text);
      },
      image,
    },
    highlight,
  });

  return {
    ...wikiItem,
    marked: marked(wikiItem.body),
    posts: children,
  };
}

module.exports = {
  markup
}
