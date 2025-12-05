const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { NotFoundError } = require("./utils/errors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mount all routes
app.use("/", mainRouter);

// Catch-all route for unknown endpoints
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Centralized error handler (must be last)
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
