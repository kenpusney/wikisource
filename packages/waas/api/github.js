
const octokit = require("@octokit/rest")
const githubConfig = require("../config/github")

const oc = octokit({
    auth: `token ${githubConfig.token}`
});

module.exports = (route) => {
    route.route("/github")
        .get(async (request, response) => {
            console.log(request)

            const {owner, repo } = githubConfig;

            const {path} = request.query;
            console.log(path)
            console.log(request.query);
            
            try {
                response.send(await oc.repos.getContent({ owner, repo, path}));
            } catch (error) {
                response.status(500).send(error);
            }
        })
}