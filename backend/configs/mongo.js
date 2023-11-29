import mongoose from "mongoose";
import { variables } from "./variables.js";

// Connect to MongoDB
export const connectToDB = async () => {
  mongoose
    .connect(`${variables.DATABASE_URL}`)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw new Error(err);
    });
};
