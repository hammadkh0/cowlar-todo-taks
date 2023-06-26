const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./userModel");
dotenv.config({ path: "../.env" });

exports.signup = async (req, res) => {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      image: req.body.image,
    });
    await newUser.save();
    // create jwt token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // send jwt token to client
    res.status(201).json({ status: "success", name: newUser.name, image: newUser.image, token });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ status: "fail", message: "Please provide email and password" });
    }
    // check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ status: "fail", message: "No User for that email exists" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      // create jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      // send jwt token to client
      res.status(201).json({ status: "success", name: user.name, image: user.image, token });
    } else {
      res.status(401).json({ status: "fail", message: "Incorrect password" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ status: "fail", message: "Token not provided" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "fail", message: "You are not logged in. Please log in to get access." });
      } else {
        // get the user from db based on token id
        let user;
        try {
           user = await User.findById(decoded.id);
          
        } catch (error) {
          return res.status(401).json({ status: "fail", message: error.message });
        }
        // add user to req object
        req.user = user;
        // call next middleware and now it will contain the user object
        next();
      }
    });
  }
};
