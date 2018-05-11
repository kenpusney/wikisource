
import React from "react"
import WikiLink from "../Common/WikiLink";

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
                <h4><WikiLink page={result.result} /></h4>
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