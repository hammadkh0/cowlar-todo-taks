const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./userRoutes");
const  mongoose= require("mongoose");

// Load env variables
dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());

// Body parser
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//  Run the server
    app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });



module.exports = app;
