import React, { useState, useEffect } from 'react'

import marked from "marked"

import {CnmdRenderer} from "cnmd"
import LoadingService from '../../service/LoadingService'

import SeeAlso from "./Meta/SeeAlso"
import Tags from "./Meta/Tags"

import "./Post.css"

import { parsePostPath } from "../../utils"

const loader = new LoadingService();
const renderer = new CnmdRenderer({
    ...CnmdRenderer.default_handlers, "": (postfix) => {
        if (postfix.endsWith("/")) {
            return `/#/wiki/${postfix}README`
        } else {
            return `/#/wiki/${postfix}`
        }
    }
})

const render = (text) => {
    return marked(text, { renderer, })
}

export default (props) => {
    const [post, setPost] = useState({metadata: {}, body: ""})

    const [postId, setPostId] = useState("");

    useEffect(() => {
        const postPath = parsePostPath(props)
        if (postId !== postPath.postId) {
            setPostId(postPath.postId)
            loader.load(postPath.postId, setPost);
        }
    })

    return (
        <div className="Post">
            <Tags tags={post.metadata.tags} />
            <p className="Post-body" dangerouslySetInnerHTML={{"__html": render(post.body)}}>
            </p>
            <SeeAlso refs={post.metadata.refs} />
        </div>
    )
}


