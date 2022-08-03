const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 8000;
const app = express();

// ---- Connect to database ----
connectDB()

// ---- Middlewares ----
// Body parser
app.use(express.json());
// To accept URL encoded Form Data
app.use(express.urlencoded({ extended: false }));

// ---- Routes ----
// Users Route
app.use("/api/users", require("./routes/userRoutes"));

// Custom Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
