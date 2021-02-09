const { posts, users } = require("./data");

const getUserById = (id, cb) => {
  // simulate API call
  global.setTimeout(() => {
    const user = users.find((user) => user.id === id);
    cb(user);
  }, 150);
};

const getPostsForUser = (userId, cb) => {
  // simulate API call
  global.setTimeout(() => {
    const postsForUser = posts.filter((post) => post.createdBy === userId);
    cb(postsForUser);
  }, 150);
};

module.exports = { getUserById, getPostsForUser };
