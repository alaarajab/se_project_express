const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

/* const mongoose = require("mongoose"); */
router.use("/users", userRouter);
router.use("/items", itemRouter);
// Test route to check database connection

router.use((req, res) => {
  res.status(500).send({ message: "Requested resource not found" });
});
module.exports = router;
