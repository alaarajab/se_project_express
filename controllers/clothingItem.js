const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
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
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;
  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // comes from auth middleware

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      // Check if user has liked the item
      if (!item.likes.includes(userId)) {
        // stop execution, return nothing further
        return res
          .status(400)
          .send({ message: "You haven't liked this item yet" });
      }

      // Remove the user from likes
      item.likes.pull(userId);
      return item.save(); // will be passed to next .then()
    })
    .then((updatedItem) => {
      // Only send if updatedItem exists (item was actually liked)
      if (updatedItem) {
        return res.status(200).send({ data: updatedItem });
      }
      // else do nothing (response already sent for 400 case)
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      console.error(err);
      return res
        .status(500)
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
