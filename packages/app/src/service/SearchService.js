import _ from "lodash"
import {
    atob
} from "b2a"

import wikiConfig from "../config/wiki"

import { oc } from "./client"

export default class SearchService {
    constructor() {
    }

    ready() {
        return this.indexData !== undefined;
    }

    reverseIndexing(data) {
        let index = {};
        _.keys(data).forEach(k => {
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
            .map(searchKey => _.keys(indexData).filter(indexKey => indexKey.includes(searchKey)))
            .map(indexKeys => _.uniq(_.flatten(_.at(indexData, indexKeys))))
            .reduce((merged, result) => merged ? _.intersection(merged, result) : result)
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
                matched: _.uniq(_.flatten(matchedIndexKeys))
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