import React, { Component } from 'react';
import './Post.css';

import marked from "marked"
import fm from "front-matter"
import CnmdRenderer from "../CnmdRenderer"

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postId = props.match.params.postId;
  }

  componentDidMount() {
    fetch("/cnmd/" + this.postId + ".cn.md")
    .then(resp => {
      resp.text().then(val => {
        let metadata =  {};
        let body = val;
        if (fm.test(val)) {
          metadata = fm(val).attributes
          body = fm(val).body
        }
        console.log(metadata, body)
        this.setState({
          metadata,
          body: {
            __html: marked(body, {renderer: new CnmdRenderer()})
          }
        });
      })
    })
  }

  render() {
    return <div className="Post">
    <header className="Post-header">
      <h1 className="Post-title">{this.state.title}</h1>
    </header>
    <p className="Post-body" dangerouslySetInnerHTML={this.state.body}>
    </p>
  </div>
  }
}

export default Post
