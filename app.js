const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

// Middleware / routes
app.use(express.json());
app.use("/", mainRouter);

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
