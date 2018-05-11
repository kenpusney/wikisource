import React, { Component } from "react"
import SearchService from "./SearchService";

import ResultList from "./ResultList"

const searchService = new SearchService();


export default class SearchResult extends Component {

    constructor(props) {
        super(props)
        if (props.match) {
            this.keyword = (props.match.params.keyword || "").trim()
        }
        this.state = {
            keyword: this.keyword,
            result: []
        }
    }

    componentDidMount() {
        this.performSearch(this.keyword)
    }

    componentDidUpdate() {
        let keyword = this.getNewKeyword();
        if (this.keyword !== keyword) {
            this.keyword = keyword;
            this.performSearch(keyword)
        }
    }


    performSearch(keyword) {
        searchService.searchAsync(keyword, result => {
            this.setState({
                keyword,
                result
            })
        })
    }

    getNewKeyword() {
        if (this.props.match && this.props.match.params.keyword) {
            return this.props.match.params.keyword
        }
        return this.keyword
    }

    render() {
        return (
            <div>
                <h4>{this.state.keyword ? `Search result for "${this.state.keyword}"`
                    : "Please input your search keywords"}</h4>
                <ResultList result={this.state.result} />
            </div>
        )
    }
}