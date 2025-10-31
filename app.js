const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { NOT_FOUND_STATUS_CODE } = require("./utils/constants");

const app = express();
const port = process.env.PORT || 3001;

// Middleware / routes
app.use(cors());
app.use(express.json());

// Mount all routes
app.use("/", mainRouter);

// Catch-all route for unknown endpoints
app.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "Requested resource not found" });
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
