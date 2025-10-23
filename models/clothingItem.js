const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the clothing item"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name must be at most 30 characters long"],
  },
  weather: {
    type: String,
    required: [true, "Please specify the weather suitability"],
    enum: {
      values: ["hot", "warm", "cold"],
      message: "Weather must be either: hot, warm, or cold",
    },
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (url) =>
        validator.isURL(url, {
          protocols: ["http", "https"],
          require_protocol: true,
        }),
      message: "Invalid URL format",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // allow creation without auth
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // array of users who liked the item
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
