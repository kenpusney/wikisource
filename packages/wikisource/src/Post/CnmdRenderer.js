import { Renderer } from "marked";

const DEFAULT_HANDLERS = {
    "": (postfix) => `/#/wiki/${postfix}`,
    "github": (postfix) => `https://github.com/${postfix}`,
    "\\": (postfix) => postfix,
    "twitter": (postfix) => `https://twitter.com/${postfix}`,
    "wiki": (postfix) => `https://en.wikipedia.org/wiki/${postfix}`,
}

class CnmdRenderer extends Renderer {
    constructor(handlers, options, history) {
        super(options);
        this.handlers = handlers || DEFAULT_HANDLERS;
    }
    link(href, title, text) {
        if (text.match(/^\w*:.*/)) {
            let segment = text.split(":");
            if (this.handlers[segment[0]]) {
                href = this.handlers[segment[0]](segment[1]);
                return super.link(href, segment[1], segment[1])
            }
        }
        return super.link(href, title, text);
    }
}

CnmdRenderer.default_handler = DEFAULT_HANDLERS;

export default CnmdRenderer;