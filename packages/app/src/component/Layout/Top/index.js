import React from 'react';

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Route, Switch } from "react-router-dom";

import SearchBox from "../../Search/SearchBox"
import NavBar from "./NavBar"

export default (props) => (
    <div>
        <Row>
            <Col xs={12} md={12}>
                <SearchBox />
            </Col>
        </Row>
        <Row>
            <Col xs={12} md={12}>
                <Switch>
                    <Route path="/wiki/:postId+" component={NavBar} />
                    <Route component={NavBar} />
                </Switch>
            </Col>
        </Row>
    </div>
);
