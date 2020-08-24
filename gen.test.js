
const gen = require("./gen");

const fs = require('fs');

test("should run test", () => {
    expect(1 + 2).toBe(3);
});

test("copy file", () => {
    fs.rmdirSync("public", { recursive: true });

    gen.copyToPublic("static/CNAME");

    expect(fs.existsSync("public/CNAME")).toBeTruthy();
});

test("load README file content", () => {
    const content = gen.loadFileContent("content/README.md", {});


    expect(content.isCategory).toBeTruthy();
    expect(content.visitPath).toBe(".");
    expect(content.parentName).toBe("..");
    expect(content.fileName).toBe(".");
});

test("load plain file content", () => {
    const content = gen.loadFileContent("content/about.md", {});

    expect(content.isCategory).toBeFalsy();
    expect(content.visitPath).toBe("about");
    expect(content.parentName).toBe(".");
    expect(content.fileName).toBe("about")
});

test("load second level README content", () => {
    const content = gen.loadFileContent("content/articles/README.md", {});

    expect(content.isCategory).toBeTruthy();
    expect(content.fileName).toBe("articles");
    expect(content.visitPath).toBe("articles");
    expect(content.parentName).toBe(".");
});

test("load second level file content", () => {
    const content = gen.loadFileContent("content/articles/htlpl.md", {});

    expect(content.isCategory).toBeFalsy();
    expect(content.visitPath).toBe("articles/htlpl");
    expect(content.parentName).toBe("articles");
    expect(content.fileName).toBe("htlpl");
});

