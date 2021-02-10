
const Wiki = require("./src/wiki");

// TODO: tokenize && analyse
const { scan, read, markup, render, save, staticPublish, sitemap } = require("./src");

const config = require("./config")

async function generate() {
  const wiki = new Wiki({config});

  const files = await scan({patterns: `${config.sourceDir}/**/*.md`});

  for (let file of files) {
    const item = await render(await markup(await read(file, wiki), wiki), wiki)

    save(item.target, item.rendered)
  }

  save("public/sitemap.xml", await sitemap(wiki));

  for (let file of await scan({patterns: `${config.staticDir}/**/*`})) {
    staticPublish(file)
  }
}

if (require.main === module) {
  generate().then(() => {
    console.log("Generated successfully")
  });
}
