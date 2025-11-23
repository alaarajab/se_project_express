const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
  OK_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} = require("../utils/constants");
const { JWT_SECRET } = require("../utils/config");

// Create new user (signup)
const createUser = async (req, res) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .send({ message: "Email and password are required" });
    }
    // Check if the email already exists before creating the user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(CONFLICT_STATUS_CODE)
        .send({ message: "Email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    // Remove password from output
    const userObj = user.toObject();
    delete userObj.password; // Hide password
    res.status(CREATED_STATUS_CODE).send(userObj);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST_STATUS_CODE).send({ message: err.message });
    }
    if (err.code === 11000) {
      return res
        .status(CONFLICT_STATUS_CODE)
        .send({ message: "Email already exists" });
    }
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error occurred on the server" });
  }
};

// Get current user (GET /users/me)
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(NOT_FOUND_STATUS_CODE)
        .send({ message: "User not found" });
    }

    const userObj = user.toObject();
    delete userObj.password;
    res.status(OK_STATUS_CODE).send(userObj);
  } catch (err) {
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error occurred on the server" });
  }
};

// Update current user's profile (PATCH /users/me)
const updateUserProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(NOT_FOUND_STATUS_CODE)
        .send({ message: "User not found" });
    }

    const userObj = updatedUser.toObject();
    delete userObj.password;
    res.status(OK_STATUS_CODE).send(userObj);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST_STATUS_CODE).send({ message: err.message });
    }
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error occurred on the server" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.send({ jwt: token });
  } catch (err) {
    if (err.message === "Incorrect email or password") {
      return res
        .status(UNAUTHORIZED_STATUS_CODE)
        .send({ message: "Incorrect email or password" });
    }

    res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUserProfile,
  login,
};
