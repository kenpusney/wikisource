const cnmd = require("cnmd");
const ejs = require("ejs");
const marked = require("marked");
const hljs = require("highlight.js");


const _ = require('lodash');

function postsInFolder(category, allWikiItems) {
  return _.reverse(_.sortBy(allWikiItems.filter(item => {
    return item.parentName === category && !(item.draft === true);
  }), item => item.date));
}

function fixRelativeHref(href) {
  if (href.startsWith("../"))
    return href.substring(href.search("static") + "static".length);
  return href;
}

function render(wikiItem, wiki) {

  let children = [];

  if (wikiItem.isCategory) {
    children = wiki.childPosts(wikiItem.visitPath);
  }

  const cnmdR = new cnmd.CnmdRenderer({
    ...cnmd.CnmdRenderer.default_handlers,
    "": (postfix, r) => wiki.postExists(postfix) ?
      r(postfix.startsWith(".") ? `../${postfix}` : `/${postfix}`, wiki.post(postfix).title) :
      `<a href="#" class="disabled-link">${postfix}</a>`,
  })

  marked.use({
    renderer: {
      link(href, title, text) {
        return cnmdR.link(href, title, text);
      },
      image(href, title, text) {
        let el = "";
        if (href.startsWith("../")) {
          href = fixRelativeHref(href)
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
    },
    highlight: function (code, lang) {
      if (lang && hljs.listLanguages().includes(lang)) {
        return hljs.highlight(lang, code, true).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    }
  });

  const data = {
    ...wikiItem,
    body: marked(wikiItem.body),
    posts: children,
  };

  const result = ejs.renderFile("template/index.html.ejs", data)
  return result;
}

module.exports = {
  render,
}
