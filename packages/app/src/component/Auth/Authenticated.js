
import React, { useEffect, useState } from "react"
import { Modal, Button, FormControl } from "react-bootstrap"

import "./Auth.less"

import { oc } from "../../service/client"
import wikiConfig from "../../config/wiki";

import loadingGif from "../../images/loading.gif"

const authCheck = async (token) => {
    try {
        await oc.repos.get(wikiConfig)
        console.log(token);
        return token;
    } catch (e) {
        console.log("failed");
        throw e;
    }
}

const TOKEN_KEY = "WIKI_TOKEN"

const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.reload();
}

const savedToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

const clearSavedToken = () => {
    localStorage.clear(TOKEN_KEY);
}

const auth = (token) => {
    oc.authenticate({
        type: "token",
        token: token
    });
}

const fetchFromServer = async (tokenServer) => {
    const response = await fetch(tokenServer);
    const data = await response.json();
    return data.token;
}

export default (props) => {

    const [token, setToken] = useState(savedToken() || "");
    const [authed] = useState(token != "");


    if (authed) {
        auth(token);
    } else if (wikiConfig.tokenServer) {
        fetchFromServer(wikiConfig.tokenServer).then((token) => {
            auth(token);
            saveToken(token);
        })
    }

    useEffect(() => {
        const token = savedToken();
        
        if (!authed && token) {
            authCheck(token).then(() => {
                setToken(token)
            }).catch(clearSavedToken);
        }
    })

    return (authed ?  
        props.children : 
            <Waiting time={2300}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Authentication Required</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>In order to use this wiki, you need to provide an <strong>read only</strong> GitHub personal access token.</p>
                        <p>Please add a token below to continue: </p>
                        <FormControl
                            placeholder="GitHub token"
                            aria-label="GitHub token"
                            aria-describedby="github-token"
                            value={token}
                            onChange={(e) => {setToken(e.target.value)}}
                            />
                        <p><small>You can find a guide to generate a token in <a target='_blank' rel="noopener noreferrer" href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line">here</a>.</small></p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => saveToken(token)}>Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Waiting>)
}


const Waiting = ({time, children}) => {
    const [timeUp, setTimeUp] = useState(false);

    setTimeout(() => setTimeUp(true), time);

    return <div>
        { timeUp ?  children : 
        <img src={loadingGif} style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                height: "2em",
                width: "2em",
                marginLeft: "-1em",
                marginTop: "-1em",
            }} />}
    </div>
}