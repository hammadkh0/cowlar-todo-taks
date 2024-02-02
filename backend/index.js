const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");
const { connectToDB } = require("./configs/mongo.js");
const { variables } = require("./configs/variables.js");

const app = express();
app.use(cors());

// Body parser
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);
// Connect to MongoDB

connectToDB().then(() => {
  //  Run the server
  app.listen(variables.PORT, () => {
    console.log("Server is running on port " + variables.PORT);
  });
});

module.exports = app;
