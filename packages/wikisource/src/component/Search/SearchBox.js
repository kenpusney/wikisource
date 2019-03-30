import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default (props) => {
    const [keywords, setKeywords] = useState(props.keywords || "");

    return (
    <div>
        <input type="text" value={keywords}
            onChange={e => setKeywords(e.target.value)} />
        <Link to={`/search/${keywords}`}>
            <Button variant="primary" size="sm">Search</Button>
        </Link>
    </div>
    )
} 
