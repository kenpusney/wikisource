import React from "react"
import SearchBox from "./SearchBox"

export default (props) => {
    let keyword = props.match.params.keyword;

    return <div>
        <SearchBox keywords={keyword}/>
            <h4>{ keyword ? `Search result for "${keyword}"` 
                : "Please input your search keywords"}</h4>
    </div>
    
}