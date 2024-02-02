const mongoose = require("mongoose");
const { variables } = require("./variables.js");

// Connect to MongoDB
exports.connectToDB = async () => {
  console.log(variables.DATABASE_URL);
  mongoose
    .connect(`${variables.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw new Error(err);
    });
};
