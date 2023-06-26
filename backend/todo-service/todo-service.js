const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoRoutes = require("./todoRoutes");
const Todo = require("./todoModel");

// Load env variables
dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.get('/',(req,res)=>{
  res.send("Hello from todo-service")
})
app.get('/todos',async(req,res)=>{
  const todos = await Todo.find();
  res.send(todos)
})
app.use("/api/v1/todos", todoRoutes);

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
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

module.exports = app;
