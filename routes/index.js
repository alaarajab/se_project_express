const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const NOT_FOUND_STATUS_CODE = require("../utils/constants");

router.use("/users", userRouter);
router.use("/items", itemRouter);
// Test route to check database connection

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "Requested resource not found" });
});
module.exports = router;
