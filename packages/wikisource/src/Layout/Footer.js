

import React, {Component} from "react"
import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <footer style={{margin: "3em 0 1em 0", color: "#777777", fontSize: "0.8em"}}>
              Powered by <a href="https://github.com/kenpusney/cnmd">CNMD</a> with ♡, hosted on GitHub Pages.<br />
            <ul className="footer-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/#about">About</a></li>
              <li><a href="/#contact">Contact</a></li>
              <li><a href="https://github.com/kenpusney/wiki/new/gh-pages/cnmd">New Page</a></li>
              <li><a id="edit-page" href="">Edit Page</a></li>
            </ul>
          </footer>
        )
    }
}

export default Footer;