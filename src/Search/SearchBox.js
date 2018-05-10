import React, {Component} from "react"
import {Link} from "react-router-dom"

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: props.keywords || ""
        };
    }

    render() {
        return <div>
            <input type="text" value={this.state.keywords}
                    onChange={e => this.setState({keywords: e.target.value})}/>
            <Link 
                className="btn btn-search btn-primary" 
                to={`/search/${this.state.keywords}`}> 
                <i className="glyphicon glyphicon-search"></i>
                &nbsp; Search
            </Link>
            </div>
    }
}

export default SearchBox;