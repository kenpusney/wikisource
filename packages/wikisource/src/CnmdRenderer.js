import {Renderer} from "marked";

const DEFAULT_HANDLERS = {
    "": "http://localhost:3000/#/wiki/",
    github: "https://github.com/",
    "\\": "",
    twitter: "https://twitter.com/",
    wiki: "https://en.wikipedia.org/wiki/",
}

class CnmdRenderer extends Renderer {
    constructor(handlers, options) {
        super(options);
        this.handlers = handlers || DEFAULT_HANDLERS;
    }
    link(href, title, text) {
        if (text.match(/^\w*:.*/)) {
            let segment = text.split(":");
            href = this.handlers[segment[0]] + segment[1];
        }
        return super.link(href, title, text);
    }
}

CnmdRenderer.default_handler = DEFAULT_HANDLERS;


export default CnmdRenderer;