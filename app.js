const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { NotFoundError } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
//Enable request logger BEFORE all routes
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Mount all routes
app.use("/", mainRouter);

// Catch-all route for unknown endpoints
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});
// Enable error logger AFTER routes
app.use(errorLogger);
// Celebrate error handler (MUST be before centralized handler)
app.use(errors());
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
