const User = require("../models/userModel.js");

exports.saveToDB = async (req, hashedPassword) => {
  // create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    image: req.body.image,
  });
  await newUser.save();
  return newUser;
};

exports.findExistingUser = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

exports.findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
