

import React from "react"
import WikiLink from "../../Common/WikiLink";


export default ({refs}) => {
    refs = refs || []
    
    if (refs.length === 0) {
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