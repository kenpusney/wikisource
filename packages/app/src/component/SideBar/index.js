
import React, { useState, useEffect } from "react"

import LoadingService from "../../service/LoadingService";

import { parsePostPath } from "../../utils"
import { Badge } from "react-bootstrap"
import WikiLink from "../Common/WikiLink";

import "./index.less"

const loader = new LoadingService();


const linkTo = (item) => {
    return `${item.path + (item.type === 'dir' ? "/README" : "")}`
}

const nameOf = (item) => {
    return `${item.name + (item.type === 'dir' ? "/" : "")}`
}

const renderDirs = (items) => {
    return items.map(it => {
        return (
            <span key={it.name}>
                <Badge variant="secondary" >
                    <WikiLink page={linkTo(it)} text={nameOf(it)}></WikiLink>
                </Badge> &nbsp;
            </span>
        )
    })
}

export default (props) => {

    const [sideBar, setSideBar] = useState({parent: "Home", children: []})
    const [current, setCurrent] = useState("")

    useEffect(() => {
        const postPath = parsePostPath(props);
        const postId = postPath.postId;
        if (current !== postId) {
            setCurrent(postId)
            loader.listDir(postId).then(setSideBar);
        }
    })

    return (
        <div className="sidebar">
            <hr></hr>
            <h5>Topics in current category</h5>
            { renderDirs(sideBar.children.filter(it => it.name !== "README")) }
        </div>
    )
}