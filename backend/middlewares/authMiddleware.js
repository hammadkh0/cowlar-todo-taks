const jwt = require("jsonwebtoken");
const { variables } = require("../configs/variables.js");
const { findUserById } = require("../services/user-service.js");

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ status: "fail", message: "Token not provided" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, variables.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "fail", message: "You are not logged in. Please log in to get access." });
      } else {
        let user;
        try {
          user = await findUserById(decoded.id);
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
