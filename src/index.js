import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Grid, Row, Col, Nav, NavItem} from "react-bootstrap"

import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Post from './Post/Post';
import SearchResult from "./Search/SearchResult"

ReactDOM.render(
    <Router>
        <Grid>
            <Row>
            <Col xs={12} md={4}>
                <h1>Kimmy's wiki</h1>
                <Nav stacked bsStyle="pills">
                    <NavItem>
                        <Link to="/wiki/README">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/search/">Search</Link>
                    </NavItem>
                </Nav>
            </Col>
            <Col xs={12} md={8}>
                <Redirect from="/" to="/wiki/README" />
                <Route path="/wiki/:postId+" component={Post} />
                <Route path="/search/:keyword*" component={SearchResult} />
            </Col>
            </Row>
        </Grid>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();


