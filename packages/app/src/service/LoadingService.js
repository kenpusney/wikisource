
import fm from "front-matter"
import {
    atob
} from "b2a"

import { oc } from "./client"
import wikiConfig from "../config/wiki"

export default class LoadingService {

    load(postId, callback, retry=false) {

        const {owner, repo, pathprefix} = wikiConfig;

        oc.repos.getContent({ owner, repo, path: `${pathprefix}/${postId}.cn.md`}).then(result => {
            this.extractData(atob(result.data.content), callback);
        }).catch(result => {
            if(retry) {
                return this.error(callback);
            }
            console.log(result);
            this.load(`${postId}/README`, callback, true);
        });
    }

    extractData(val, callback) {
        let metadata = {};
        let body = val
        if (fm.test(val)) {
            let data = fm(val)
            metadata = data.attributes;
            body = data.body
        }
        callback({body, metadata});
    }

    listDir(postId, callback) {
        const {owner, repo, pathprefix} = wikiConfig;

        console.log(postId);
        let parent = postId.replace(/(.*\/)*.*/, '$1');

        oc.repos.getContent({ owner, repo, path: `${pathprefix}/${parent}`}).then(result => {
            
            const mapped = result.data.map(({name, path, type}) => {
                if (type === 'file') {
                    name = name.replace(/\.cn\.md$/, "");
                }
                path = path.replace(new RegExp(`^${pathprefix}/`), "").replace(/\.cn\.md$/, "")
                return {
                    name, path, type
                }
            })
            callback({ parent: parent || "Home", children: mapped });
        })
    }

    error(callback) {
        callback({
            metadata: {},
            body: "**Error when rendering page: ** *Not Available!*"
        })
    }

}