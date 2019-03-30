
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Container } from "react-bootstrap"
import { HashRouter as Router } from "react-router-dom";

import Top from "./Layout/Top"
import Middle from "./Layout/Middle"
import Bottom from "./Layout/Bottom"

export default (props) => {
    return (
        <Router>
            <Container>
                <Top />
                <Middle />
                <Bottom />
            </Container>
        </Router>
    );
}