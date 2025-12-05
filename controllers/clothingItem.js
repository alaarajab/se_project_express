const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");
const { OK_STATUS_CODE, CREATED_STATUS_CODE } = require("../utils/constants");

// Create a new item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS_CODE).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

// Get all items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS_CODE).send(items))
    .catch(next);
};

// Delete an item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
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
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

// Like an item
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return next(new NotFoundError("Item not found"));
      }
      res.status(OK_STATUS_CODE).send(updatedItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

// Unlike an item
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return next(new NotFoundError("Item not found"));
      }
      res.status(OK_STATUS_CODE).send(updatedItem);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
