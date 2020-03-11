
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import Container from "react-bootstrap/Container"
import { HashRouter as Router } from "react-router-dom";

import Top from "./Layout/Top"
import Middle from "./Layout/Middle"
import Bottom from "./Layout/Bottom"
import Authenticated from './Auth/Authenticated';

export default (props) => {
    return (
       <Authenticated>
            <Router>
                <Container>
                    <Top />
                    <Middle />
                    <Bottom />
                </Container>
            </Router>
       </Authenticated>
    );
}