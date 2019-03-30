
import octokit from "@octokit/rest"

export const oc = octokit();

oc.authenticate({
    type: "token",
    token: localStorage.getItem("WIKI_TOKEN") || "undefined"
})