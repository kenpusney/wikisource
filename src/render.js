const { markup } = require("./index")

const ejs = require("ejs")

async function render(item) {

  const rendered = await ejs.renderFile("template/index.html.ejs", {...item, body: item.marked})

  return {
    ...item,
    rendered
  };
}

module.exports = {
  render,
}
