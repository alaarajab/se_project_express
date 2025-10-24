const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND_STATUS_CODE } = require("../utils/constants");
// Public routes (accessible without auth)
router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);
router.use("/items", itemRouter);
// Test route to check database connection

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "Requested resource not found" });
});
module.exports = router;
