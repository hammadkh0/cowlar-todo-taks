const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { saveToDB, findExistingUser } = require("../services/user-service.js");

const { variables } = require("../configs/variables.js");

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await saveToDB(req, hashedPassword);

    const token = jwt.sign({ id: newUser._id }, variables.JWT_SECRET, {
      expiresIn: variables.JWT_EXPIRES_IN,
    });
    res.status(201).json({ status: "success", name: newUser.name, image: newUser.image, token });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "fail", message: "Please provide email and password" });
    }

    const user = await findExistingUser(email);
    if (!user) {
      return res.status(401).json({ status: "fail", message: "No User for that email exists" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      const token = jwt.sign({ id: user._id }, variables.JWT_SECRET, {
        expiresIn: variables.JWT_EXPIRES_IN,
      });
      res.status(201).json({ status: "success", name: user.name, image: user.image, token });
    } else {
      res.status(401).json({ status: "fail", message: "Incorrect password" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
