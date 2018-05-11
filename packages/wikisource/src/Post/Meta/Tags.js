
import React from "react"
import _ from "lodash"
import {Label} from "react-bootstrap"

export default ({tags}) => {
    tags = _.uniq(tags || [])

    if (_.isEmpty(tags)) {
        return <div />
    }
    
    return (
        <div>
            Tags: &nbsp;
            {
                tags.map(tag => {
                    return <span key={tag}><Label>{tag}</Label>&nbsp;</span>
                })
            }
        </div>
    )
}