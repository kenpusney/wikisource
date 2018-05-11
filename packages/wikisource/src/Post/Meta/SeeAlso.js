
import _ from "lodash"

import React from "react"
import WikiLink from "../../Common/WikiLink";


export default ({refs}) => {
    refs = refs || []
    
    if (_.isEmpty(refs)) {
        return <div />
    }

    return (
        <div>
            <h4>See Also</h4>
            <ul>
                { refs.map(ref => {
                    return <li key={ref}><WikiLink page={ref}/></li>
                }) }
            </ul>
        </div>
    )
}