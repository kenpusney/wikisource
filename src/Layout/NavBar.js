
import React, { Component } from "react"

import { Breadcrumb } from "react-bootstrap"

export default class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = { items: [] }
        if (props.match && props.match.params.postId) {
            this.postId = props.match.params.postId
            this.items = props.match.params.postId.split("/")
        } else {
            this.items = []
        }
    }

    componentDidUpdate() {
        if (this.props.match && this.props.match.params.postId) {
            if (this.postId !== this.props.match.params.postId) {
                this.postId = this.props.match.params.postId
                this.setState({
                    items: this.props.match.params.postId.split("/")
                })
            }
        }
    }

    render() {
        let href = "/#/wiki"

        const item = ({ href, text }) =>
            <Breadcrumb.Item href={href} key={`navbar${href}}`}>{text}</Breadcrumb.Item>
        const links = this.state.items.map(i => ({ href: (href += `/${i}`), text: i }))

        links.unshift({ href: "/", text: "Home" });
        const items = links.map(item);

        return (
            <Breadcrumb>
                {items}
            </Breadcrumb>
        )
    }
}