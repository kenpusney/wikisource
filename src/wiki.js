
const _ = require("lodash")

module.exports = class {
    posts = {};
    tags = {};
    registry = {};

    constructor(data = {}) {
        this.posts = data.posts || {};
        this.tags = data.tags || {};
        this.registry = data.registry || {};
    }

    addPost(id, post) {
        this.posts[id] = post;

        if (post.tags) {
            fillTags(this.tags, post);
        }
    }

    postExists(id) {
        return this.posts[id] !== undefined;
    }

    post(id) {
        return this.posts[id]
    }

    childPosts(id) {
        return postsInFolder(id, Object.values(this.posts));
    }

    forEachPost(fn) {
        Object.values(this.posts).forEach(fn);
    }

    registered(file) {
        return this.registry[file] !== undefined;
    }

    register(file, data = undefined) {
        if (data &&!this.registered(file)) {
            this.registry[file] = data;
        }
        return this.registry[file]
    }
}


function fillTags(tags, post) {
    post.tags.forEach(tag => {
        if (!tags[tag]) {
            tags[tag] = [];
        }

        tags[tag] << post.id;
    });
}


function postsInFolder(category, allWikiItems) {
    return _.reverse(_.sortBy(allWikiItems.filter(item => {
        return item.parentName === category && !(item.draft === true);
    }), item => item.date));
}