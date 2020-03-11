
import config from "../config/wiki"

import { savedToken } from "./token"

export const githubClient = new class {
    constructor() {
        this.config = config;
        this.token = savedToken();
    }

    authenticate(token) {
        this.token = token;
    }

    async getContents({owner, repo, path}) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                "Authorization": `token ${this.token}`
            }
        });

        return response.json();
    }

    async check({owner, repo}) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                "Authorization": `token ${this.token}`
            }
        })

        return response.json();
    }
}()