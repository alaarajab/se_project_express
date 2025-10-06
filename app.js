const express = require("express");
const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const app = express();

// Middleware / routes
app.use(express.json());

const port = process.env.PORT || 3001;

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);
app.use((req, res, next) => {
  req.user = {
    _id: "68dfee1c5a00937340342d17", // paste the _id of the test user created in the previous step
  };
  next();
});
/* const routes = require("./routes"); */
app.use("/", mainRouter);

// Start server
// eslint-disable-next-line no-console
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
