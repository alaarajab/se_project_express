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

//start with /items

// Public route
//GET request to /items/
router.get("/", getItems); // anyone can view items

// Protected routes (require auth)
// Protected routes (require auth)
router.post("/", auth, validateCardBody, createItem); // validate body
router.delete("/:itemId", auth, validateId, deleteItem); // validate param
router.put("/:itemId/likes", auth, validateId, likeItem); // validate param
router.delete("/:itemId/likes", auth, validateId, unlikeItem); // validate param

module.exports = router;
