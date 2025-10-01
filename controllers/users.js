const User = require("../models/user");
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID" });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUserById };
