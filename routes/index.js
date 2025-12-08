const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
// import validators
const {
  validateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");

// Public routes
router.post("/signup", validateUserBody, createUser); // validate signup body
router.post("/signin", validateLoginBody, login); // validate login body

router.use("/users", userRouter);
router.use("/items", itemRouter);
// Test route to check database connection

module.exports = router;
