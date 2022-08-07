const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  isAdmin
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// @ POST: /api/users
router.post("/", registerUser);

// @ POST: /api/users/login
router.post("/login", loginUser);

// @ GET: /api/users/me
router.get("/me", protect, getMe);

// @ GET: /api/users/isAdmin
router.get("/isAdmin", protect, isAdmin);

module.exports = router;
