const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the clothing item"],
  },
  weather: {
    type: String,
    required: [true, "Please specify the weather suitability"],
  },
  imageURL: {
    type: String,
    required: [true, "Please provide an image URL"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});
module.exports = mongoose.model("clothingItem", clothingItemSchema);
