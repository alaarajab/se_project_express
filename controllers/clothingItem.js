const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
  OK_STATUS_CODE,
} = require("../utils/constants");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(CREATED_STATUS_CODE).send({
        _id: item._id,
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
        owner: item.owner,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS_CODE).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;
  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "item ID not found" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};
const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      // Check if user has liked the item
      if (!item.likes.includes(userId)) {
        // User hasn't liked the item yet
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "You haven't liked this item yet" });
      }

      // Remove the user from likes
      item.likes.pull(userId);
      return item.save(); // Pass to next .then()
    })
    .then((updatedItem) =>
      updatedItem
        ? res.status(OK_STATUS_CODE).send({ data: updatedItem })
        : null
    )
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
