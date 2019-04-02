
import React from "react"
import _ from "lodash"
import {Badge} from "react-bootstrap"

export default ({tags}) => {
    tags = _.uniq(tags || [])

    if (_.isEmpty(tags)) {
        return <div />
    }
    
    return (
        <div>
            Tags: &nbsp;
            { tags.map(tag => <span key={tag}><Badge variant='primary'>{tag}</Badge>&nbsp;</span> ) }
        </div>
    )
}