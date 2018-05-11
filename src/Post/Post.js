import React, { Component } from 'react';

import marked from "marked"

import CnmdRenderer from "./CnmdRenderer"
import CnmdLoader from './CnmdLoader';

import SeeAlso from "./Meta/SeeAlso"
import Tags from "./Meta/Tags"

class Post extends Component {
    constructor(props) {
        super(props);
        this.loader = new CnmdLoader();
        this.state = {metadata:{}};
        this.postId = this.resolveNewPostId();
    }

    reloadPageData(postId) {
        this.loader.load(postId, ({ metadata, body }) => {
            this.setState({
                metadata,
                body: {
                    __html: marked(body, { renderer: new CnmdRenderer() })
                }
            })
        });
    }

    componentDidMount() {
        this.reloadPageData(this.postId);
    }

    componentDidUpdate() {
        let postId = this.resolveNewPostId();
        if (this.postId === postId) {
            return;
        }
        this.postId = postId;
        this.reloadPageData(this.postId)
    }

    resolveNewPostId() {
        if (this.props.match && this.props.match.params.postId) {
            return this.props.match.params.postId;
        }
        if (this.props.postId) {
            return this.props.postId;
        }
        return this.postId;
    }

    render() {
        return (
            <div className="Post">
                <Tags tags={this.state.metadata.tags} />
                <p className="Post-body" dangerouslySetInnerHTML={this.state.body}>
                </p>
                <SeeAlso refs={this.state.metadata.refs} />
            </div>
        )
    }
}

export default Post
