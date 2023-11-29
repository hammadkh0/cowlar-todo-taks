import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "../routes/userRoutes";
import { connectToDB } from "../configs/mongo";
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
