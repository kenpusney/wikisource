
import React from "react"
import {Badge} from "react-bootstrap"

export default ({tags}) => {
    tags = Array.from(new Set(tags || []));

    if (tags.length === 0) {
        return <div />
    }
    
    return (
        <div>
            Tags: &nbsp;
            { tags.map(tag => <span key={tag}><Badge variant='primary'>{tag}</Badge>&nbsp;</span> ) }
        </div>
    )
}