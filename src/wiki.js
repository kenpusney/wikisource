
const _ = require("lodash")

module.exports = class {
  posts = {};
  config = {};

  constructor(data = {}) {
    this.posts = data.posts || {};
    this.config = data.config
  }

  addPost(id, post) {
    this.posts[id] = post;
    return post;
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
}

function postsInFolder(category, posts) {
  return _.reverse(_.sortBy(posts.filter(post => {
    return post.parentName === category && !(post.draft === true);
  }), post => post.date));
}
