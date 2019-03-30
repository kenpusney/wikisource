
import octokit from "@octokit/rest"

import wikiConfig from "../config/wiki"

export const oc = octokit();

const {token} = wikiConfig

oc.authenticate({
    type: "token",
    token
})
