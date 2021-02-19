let users = [];

function add(user) {
  const id = users.length.toString();

  user.id = id;
  users.push(user);

  return id;
}

function get(username) {
  for (let user of users) {
    if (user.username === username) {
      return user;
    }
  }
}

function getAll() {
  return users;
}

function removeByUsername(username) {
  users = users.filter((user) => user.username !== username);
}

function removeById(id) {
  users = users.filter((user) => user.id !== id);
}

function removeAll() {
  users = [];
}

module.exports = {
  add,
  get,
  getAll,
  removeAll,
  removeById,
  removeByUsername,
};
