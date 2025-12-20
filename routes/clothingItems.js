const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const { validateCardBody, validateId } = require("../middlewares/validation");

// Routes for /items

// Public route: anyone can view items
router.get("/", getItems);

// Protected routes (require auth)
router.post("/", auth, validateCardBody, createItem); // validate request body
router.delete("/:id", auth, validateId, deleteItem); // validate param
router.put("/:id/likes", auth, validateId, likeItem); // like an item
router.delete("/:id/likes", auth, validateId, unlikeItem); // unlike an item

module.exports = router;
