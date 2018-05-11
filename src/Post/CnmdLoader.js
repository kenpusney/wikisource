
import fm from "front-matter"

export default class CnmdLoader {

    load(postId, callback, retry=false) {
        fetch("/cnmd/" + postId + ".cn.md")
        .then(resp => {
            if (resp.ok) {
                resp.text().then(val => {
                    this.extractData(val, callback);
                })
            } else {
                if (!retry) {
                    this.load(`${postId}/README`, callback, true)
                } else this.error(callback);
            }
        }).catch(reason => {
            this.error(callback);
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

    error(callback) {
        callback({
            metadata: {},
            body: "**Error when rendering page: ** *Not Available!*"
        })
    }

}