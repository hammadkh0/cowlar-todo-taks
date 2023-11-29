import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: new Date(Date.now()).toISOString(),
    },
    completedAt: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

export default mongoose.model("Todo", todoSchema);
