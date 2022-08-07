const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @DESC-    Register a User
// @ROUTE-   POST: /api/users
// @ACCESS-  Public (For future version it will be an ADMIN ONLY route)
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Invalid Form Submission!");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

// @DESC-    User Login
// @ROUTE-   POST: /api/users/login
// @ACCESS-  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists and if password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

// @DESC-    Retrives an user profile
// @ROUTE-   GET: /api/users/me
// @ACCESS-  Protected
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    updatedAt: req.user.updatedAt.toDateString(),
  };

  res.status(200).json(user);
});

// @DESC-    User Login
// @ROUTE-   POST: /api/users/login
// @ACCESS-  Protected
const isAdmin = asyncHandler(async (req, res) => {
  res.status(200).send({ isAdmin: req.user.isAdmin });
});

// Generate Token
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  isAdmin,
};
