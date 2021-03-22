const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "users");

async function add(user) {
  const newUser = new User({
    username: user.username,
    passwordHash: user.passwordHash,
  });

  await newUser.save();

  return newUser._id.toString();
}

async function get(username) {
  return await User.findOne({ username: username });
}

async function getAll() {
  return await User.find({});
}

async function removeByUsername(username) {
  return await User.remove({ username: username });
}

async function removeById(id) {
  return await User.remove({ _id: id });
}

async function removeAll() {
  return await User.remove({});
}

module.exports = {
  add,
  get,
  getAll,
  removeAll,
  removeById,
  removeByUsername,
};
