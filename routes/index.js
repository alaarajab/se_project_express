const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");

// Public routes (accessible without auth)
router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);
router.use("/items", itemRouter);
// Test route to check database connection

module.exports = router;
