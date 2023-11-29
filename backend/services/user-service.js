import User from "../models/userModel.js";

export async function saveToDB(req, hashedPassword) {
  // create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    image: req.body.image,
  });
  await newUser.save();
  return newUser;
}

export async function findExistingUser(email) {
  const user = await User.findOne({ email }).select("+password");
  return user;
}

export async function findUserById(id) {
  const user = await User.findById(id);
  return user;
}
