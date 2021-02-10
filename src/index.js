
const { scan } = require("./scan")
const { read } = require("./read")
const { markup } = require("./markup")
const { render } = require("./render")

const { save } = require("./save")

const { staticPublish } = require("./staticPublish")

const { sitemap } = require("./sitemap")

module.exports = {
  scan,
  read,
  markup,
  render,
  save,
  staticPublish,
  sitemap,
}
