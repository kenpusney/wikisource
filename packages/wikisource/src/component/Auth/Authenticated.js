
import React, { useEffect, useState } from "react"
import { Modal, Button, FormControl } from "react-bootstrap"

import ReactLoading from "react-loading"

import "./Auth.css"

import { oc } from "../../service/client"
import wikiConfig from "../../config/wiki";

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

export default (props) => {

    const [token, setToken] = useState("");
    const [authed, setAuthed] = useState(false);

    const saveToken = (token) => {
        localStorage.setItem("WIKI_TOKEN", token);
        oc.authenticate({
            type: "token",
            token: localStorage.getItem(token) || "undefined"
        });
        setAuthed(true);
    }

    useEffect(() => {
        const token = localStorage.getItem("WIKI_TOKEN");
        
        if (!authed && token) {
            authCheck(token).then(() => {
                setAuthed(true)
            }).catch(() => {
                localStorage.clear("WIKI_TOKEN");
            });
        }
    })

    return (authed ?  
        props.children : 
            <Waiting time={1800}>
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
                        <p><small>You can find a guide to generate a token in <a target='_blank' href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line">here</a>.</small></p>
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
        <ReactLoading
            type='spinningBubbles' 
            className='loading-spinner'
            color="darkgray">
        </ReactLoading>}
    </div>
}