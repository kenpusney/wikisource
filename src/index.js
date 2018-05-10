import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { Grid, Row, Col } from "react-bootstrap"
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Layout/Home"
import NavBar from "./Layout/NavBar"
import Footer from "./Layout/Footer"

import Post from './Post/Post';
import SearchResult from "./Search/SearchResult"
import SearchBox from './Search/SearchBox';

class App extends Component {
    render() {
        return (
            <Router>
                <Grid>
                    <Row>
                        <SearchBox />
                    </Row>
                    <Row>
                        <Switch>
                            <Route path="/wiki/:postId+" component={NavBar} />
                            <Route component={NavBar} />
                        </Switch>
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/wiki/:postId+" component={Post} />
                            <Route path="/search/:keyword*" component={SearchResult} />
                        </Col>
                    </Row>
                    <Footer />
                </Grid>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));
registerServiceWorker();


