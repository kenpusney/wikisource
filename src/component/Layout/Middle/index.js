
import React from "react"

import { Row, Col } from "react-bootstrap"
import { Route } from "react-router-dom";

import SearchResult from "../../Search/SearchResult"
import Post from "../../Post"

import SideBar from "../../SideBar"

export default (props) => (
    <Row>
        <Col xs={12} md={8}>
            <Route exact path="/" component={Post} />
            <Route exact path="/wiki/:postId+" component={Post} />
            <Route path="/search/:keyword*" component={SearchResult} />
        </Col>
        <Col xs={12} md={4}>
            <Route exact path="/" component={SideBar} />
            <Route exact path="/wiki/:postId+" component={SideBar} />
        </Col>
    </Row>
);