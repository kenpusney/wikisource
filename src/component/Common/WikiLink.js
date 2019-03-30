
import React from "react"

export default ({page, text}) => {
    page = page || "README"
    text = text || page

    return <a href={`/#/wiki/${page}`}>{text}</a>
}