const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      // Requied token fomat authorization: Bearer <TOKEN>
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
        req.user = await User.findById(decoded.id).select("-password")

      if (!req.user) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      next();
    } catch (e) {
      console.log("AUTH MIDDLEWARE ERROR:", e);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get Token from header
      // Requied token fomat authorization: Bearer <TOKEN>
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password")

      if (!req.user || req.user.isAdmin === false) {
        res.status(401);
        throw new Error("Not Authorized");
      }

      next();
    } catch (e) {
      console.log("AUTH MIDDLEWARE ERROR:", e);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
})

module.exports = {
  protect,
  protectAdmin
};
