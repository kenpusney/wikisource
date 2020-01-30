import {
    atob
} from "b2a"

import wikiConfig from "../config/wiki"

import { oc } from "./client"

const uniq = (array) => {
    return Array.from(new Set(array));
}

const flatten_array = (arrays) => {
    return arrays.reduce((a, b) => a.concat(b));
}

const intersection_array = (left, right) => {
    const a = new Set(left);
    const b = new Set(right);
    return [...a].filter(x => b.has(x));
}

const object_at = (object, keys) => {
    return keys.map(key => object[key])
}

export default class SearchService {
    constructor() {
    }

    ready() {
        return this.indexData !== undefined;
    }

    reverseIndexing(data) {
        let index = {};
        Object.keys(data).forEach(k => {
            data[k].forEach(page => {
                if (index[page]) {
                    index[page].push(k)
                } else {
                    index[page] = [k]
                }
            })
        });
        this.reverseIndex = index
    }

    async loadIndexing() {
        const { owner, repo } = wikiConfig;
        const response = await oc.repos.getContent({ owner, repo, path: "data/indexing.json"});
        console.log(response);
        return JSON.parse(atob(response.data.content));
    }

    search(searchKeywords) {
        searchKeywords = searchKeywords.split(/\s+/).filter(k => k)
        let indexData = this.indexData || {}

        let matching_info = searchKeywords
            .map(searchKey => Object.keys(indexData).filter(indexKey => indexKey.includes(searchKey)))
            .map(indexKeys => uniq(flatten_array(object_at(indexData, indexKeys))))
            .reduce((merged, result) => merged ? intersection_array(merged, result) : result)
            .map(result => this.generateResult(result, searchKeywords))

        return matching_info;
    }

    generateResult(result, searchKeywords) {
        if (this.reverseIndex) {
            let matchedIndexKeys = this.reverseIndex[result]
                .map(indexKey => {
                    let searchKeys = searchKeywords.filter(searchKey => indexKey.includes(searchKey));
                    return { indexKey, searchKeys }
                })
                .map(combinedKey =>
                    combinedKey.searchKeys
                        .map(searchKey => {
                            let wrapped = combinedKey.indexKey.replace(searchKey, `<b>${searchKey}</b>`);
                            let orig = combinedKey.indexKey;
                            return { wrapped, orig }
                        }))
            return {
                result,
                matched: uniq(flatten_array(matchedIndexKeys))
            }
        }
        return { result, matched: [] }
    }


    async searching(keyword) {
        if (!this.ready()) {
            this.indexData = await this.loadIndexing();
            this.reverseIndexing(this.indexData);
        } 
        return this.search(keyword);
    }
}