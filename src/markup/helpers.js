const hljs = require("highlight.js");

const CnmdRenderer = require("cnmd").CnmdRenderer;

function fixStaticFileLink(href) {
  if (href.startsWith("../"))
    return href.substring(href.search("static") + "static".length);
  return href;
}

function image(href, title, text) {
  let el = "";
  if (href.startsWith("../")) {
    href = fixStaticFileLink(href)
  }
  if (title) {
    el = `<img src=${href} alt='${text}' title=${title}>`
  } else {
    el = `<img src='${href}' alt='${text}'/>`

  }
  if (text) {
    el += `<div class='image-description'><span>⬆️</span>${text}</div>`
  }

  return el;
}

function highlight(code, lang) {
  if (lang && hljs.listLanguages().includes(lang)) {
    return hljs.highlight(lang, code, true).value;
  } else {
    return hljs.highlightAuto(code).value;
  }
}

function cnmdRenderer(wiki) {
  return new CnmdRenderer({
    ...CnmdRenderer.default_handlers,
    "": (postfix, r) => wiki.postExists(postfix) ?
      r(postfix.startsWith(".") ? `../${postfix}` : `/${postfix}`, wiki.post(postfix).title) :
      `<a href="#" class="disabled-link">${postfix}</a>`,
  })
}

module.exports = {
  image, highlight, cnmdRenderer
}
