

import React from "react"
import "./Footer.less"
import WikiLink from "../../Common/WikiLink";
import config from "../../../config/wiki"

export default (props) => (
  <footer style={{margin: "3em 0 1em 0", color: "#777777", fontSize: "0.8em"}}>
      Powered by <a href="https://github.com/kenpusney/cnmd">CNMD</a> with ♡, hosted on GitHub Pages.<br />
    <ul className="footer-nav">
      <li><a href="/">Home</a></li>
      <li><WikiLink page="about" text="About" /></li>
      <li><WikiLink page="contact" text="Contact" /></li>
      <li><a href={`https://github.com/${config.owner}/${config.repo}/new/master/${config.pathprefix}/`}>New Page</a></li>
      <li><a id="edit-page" href="/#">Edit Page</a></li>
    </ul>
  </footer>
)