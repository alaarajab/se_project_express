const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
  OK_STATUS_CODE,
} = require("../utils/constants");

/**
 * Create a new clothing item
 * The logged-in user will be set as the owner
 */
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

/**
 * Get all clothing items
 */
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS_CODE).send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

/**
 * Delete a clothing item
 * Only the owner of the item can delete it
 */
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      // Ownership check
      if (item.owner.toString() !== userId) {
        return res
          .status(403)
          .send({ message: "You do not have permission to delete this item" });
      }

      // Delete the item if owner
      return item
        .deleteOne()
        .then(() =>
          res
            .status(OK_STATUS_CODE)
            .send({ message: "Item deleted successfully" })
        );
    })
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

/**
 * Like a clothing item
 * Adds the logged-in user's ID to the likes array (no duplicates)
 */
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.likes.includes(userId)) {
        item.likes.push(userId);
      }
      return item.save().then((savedItem) =>
        res.status(OK_STATUS_CODE).send({
          data: {
            _id: savedItem._id,
            name: savedItem.name,
            weather: savedItem.weather,
            imageUrl: savedItem.imageUrl,
            owner: savedItem.owner,
            likes: savedItem.likes,
          },
        })
      );
    })
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

/**
 * Unlike a clothing item
 * Removes the logged-in user's ID from the likes array
 */
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.likes.includes(userId)) {
        item.likes.pull(userId);
      }
      return item.save().then((savedItem) =>
        res.status(OK_STATUS_CODE).send({
          data: {
            _id: savedItem._id,
            name: savedItem.name,
            weather: savedItem.weather,
            imageUrl: savedItem.imageUrl,
            owner: savedItem.owner,
            likes: savedItem.likes,
          },
        })
      );
    })
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
  deleteItem,
  likeItem,
  unlikeItem,
};
