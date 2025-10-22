const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "Avatar URL is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // ensure uniqueness
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false, // exclude password from query results by default
  },
});
//  Hash the password before saving to DB
userSchema.statics.findUserByCredentials = async function (email, password) {
  const bcrypt = require("bcryptjs");
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect email or password");
  }

  return user;
};
module.exports = mongoose.model("user", userSchema); // capitalize model name
