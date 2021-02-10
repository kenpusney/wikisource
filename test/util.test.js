
const { parseFileName } = require("../src/util");

test("load README file content", () => {
    const content = parseFileName("content/README.md", "content");


    expect(content.isCategory).toBeTruthy();
    expect(content.visitPath).toBe("");
    expect(content.parentName).toBe("..");
    expect(content.fileName).toBe("");
});

test("load plain file content", () => {
    const content = parseFileName("content/about.md", "content");

    expect(content.isCategory).toBeFalsy();
    expect(content.visitPath).toBe("about");
    expect(content.parentName).toBe("");
    expect(content.fileName).toBe("about")
});

test("load second level README content", () => {
    const content = parseFileName("content/articles/README.md", "content");

    expect(content.isCategory).toBeTruthy();
    expect(content.fileName).toBe("articles");
    expect(content.visitPath).toBe("articles");
    expect(content.parentName).toBe("");
});

test("load second level file content", () => {
    const content = parseFileName("content/articles/htlpl.md", "content");

    expect(content.isCategory).toBeFalsy();
    expect(content.visitPath).toBe("articles/htlpl");
    expect(content.parentName).toBe("articles");
    expect(content.fileName).toBe("htlpl");
});

