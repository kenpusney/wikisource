
import fm from "front-matter"
import {
    atob
} from "b2a"

import { oc } from "./client"
import wikiConfig from "../config/wiki"

export default class LoadingService {

    async loadPost(postId, retry = false) {
        const {owner, repo, pathprefix} = wikiConfig;
        try {
            const response = await oc.repos.getContent({ owner, repo, path: `${pathprefix}/${postId}.cn.md`});
            const content = atob(response.data.content);
            return this.extractContent(content);
        } catch (ex) {
            if (retry) {
                return this.errorResponse();
            }
            return this.loadPost(`${postId}/README`, true);
        }
    }

    extractContent(val) {
        let metadata = {};
        let body = val
        if (fm.test(val)) {
            let data = fm(val)
            metadata = data.attributes;
            body = data.body
        }
        return {body, metadata};
    }

    async listDir(postId) {
        const {owner, repo, pathprefix} = wikiConfig;
        let parent = postId.replace(/(.*\/)*.*/, '$1');

        const result = await oc.repos.getContent({ owner, repo, path: `${pathprefix}/${parent}`})

        const mapped = result.data.map(({name, path, type}) => {
            if (type === 'file') {
                name = name.replace(/\.cn\.md$/, "");
            }
            path = path.replace(new RegExp(`^${pathprefix}/`), "").replace(/\.cn\.md$/, "")
            return {
                name, path, type
            }
        })

        return {
            parent: parent || "Home", 
            children: mapped
        }

    }

    errorResponse() {
        return {
            metadata: {},
            body: "**Error when rendering page: ** *Not Available!*"
        }
    }

}