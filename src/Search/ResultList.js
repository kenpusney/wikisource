
import React from "react"

const searchLabel = (matched) => {
    return (
        <span key={matched.orig}>
            <a href={`/#/search/${matched.orig}`}>
                <span dangerouslySetInnerHTML={{ __html: matched.wrapped }} />
            </a>
            &nbsp;
        </span>
    );
}

const listItem = (result) => {
    return (
        <div key={result.result}>
            <dt>
                <h4><a href={`/#/wiki/${result.result}`}>{result.result}</a></h4>
            </dt>
            <dd>
                matches: {result.matched.map(searchLabel)}
            </dd>
        </div>
    )
}

export default (props) => {
    return (
        <dl>
            {
                props.result.map(listItem)
            }
        </dl>
    )
}