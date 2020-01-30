import React, { useState, useEffect } from "react"
import SearchService from "../../service/SearchService";

import ResultList from "./ResultList"

const searchService = new SearchService();

const getKeyword = (props) => {
    if (props.match && props.match.params.keyword) {
        return props.match.params.keyword
    } else {
        return ""
    }
}

export default (props) => {

    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        const newKeyword = getKeyword(props);
        if (newKeyword !== '' && keyword !== newKeyword) {
            setKeyword(newKeyword);
            searchService.searching(newKeyword).then(setResult);
        }
    })

    return (
        <div>
            <h4>{keyword ? `Search result for "${keyword}"`
                : "Please input your search keywords"}</h4>
            <ResultList result={result} />
        </div>
    )
} 
