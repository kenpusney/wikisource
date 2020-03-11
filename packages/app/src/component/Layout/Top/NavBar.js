
import React, { useState, useEffect } from "react"

import Breadcrumb from "react-bootstrap/Breadcrumb"


const toNavs = (items) => {
    let href = "/#/wiki"

    const item = ({ href, text }) =>
        <Breadcrumb.Item href={href} key={`navbar${href}}`}>{text}</Breadcrumb.Item>
    const links = items.map(i => ({ href: (href += `/${i}`), text: i }))

    links.unshift({ href: "/", text: "Home" });
    return links.map(item);
}

export default (props) => {

    const [postId, setPostId] = useState("")
    const [items, setItems] = useState([])

    useEffect(() => {
        if (props.match && props.match.params.postId) {
            const newPostId = props.match.params.postId;
            if (newPostId !== postId) {
                setItems(newPostId.split("/"));
                setPostId(newPostId);
            }
        } else {
            // setItems([])
        }
    }, [props.match, postId]);

    return (
        <Breadcrumb>
            {toNavs(items)}
        </Breadcrumb>
    )
}
