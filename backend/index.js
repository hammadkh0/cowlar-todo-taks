import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { connectToDB } from "./configs/mongo.js";
import { variables } from "./configs/variables.js";

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

export default app;
