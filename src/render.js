const { markup } = require("./index")

const ejs = require("ejs")

async function render(item, wiki) {

  const rendered = await ejs.renderFile(wiki.config.templates.post, {
    ...item,
    body: item.marked,
    config: wiki.config
  })

  return {
    ...item,
    rendered
  };
}

module.exports = {
  render,
}
