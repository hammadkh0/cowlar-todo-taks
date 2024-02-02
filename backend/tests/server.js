const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("../routes/userRoutes");
const { connectToDB } = require("../configs/mongo");

dotenv.config();

const app = express();
app.use(cors());

// Body parser
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/users", userRoutes);

// Connect to MongoDB
connectToDB()
  .then(
    app.listen(5000, () => {
      console.log("Test Server is running on port 5000");
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

module.exports = app;
