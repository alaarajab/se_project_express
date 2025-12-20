const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const { CREATED_STATUS_CODE, OK_STATUS_CODE } = require("../utils/constants");

// Create new user (signup)
const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError("Email and password are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ConflictError("Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(CREATED_STATUS_CODE).send(userObj);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};

// Get current user (GET /users/me)
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError("User not found"));
    }

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(OK_STATUS_CODE).send(userObj);
  } catch (err) {
    return next(err);
  }
};

// Update current user's profile (PATCH /users/me)
const updateUserProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new NotFoundError("User not found"));
    }

    const userObj = updatedUser.toObject();
    delete userObj.password;

    return res.status(OK_STATUS_CODE).send(userObj);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new BadRequestError("Email and password are required"));
    }

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(OK_STATUS_CODE).send({ jwt: token });
  } catch (err) {
    if (err.message === "Incorrect email or password") {
      return next(new UnauthorizedError("Incorrect email or password"));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUserProfile,
  login,
};
