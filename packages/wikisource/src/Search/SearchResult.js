import React from "react"

export default (props) => {
    let keyword = props.match.params.keyword;

    return <div>
            <h4>{ keyword ? `Search result for "${keyword}"` 
                : "Please input your search keywords"}</h4>
    </div>
    
}