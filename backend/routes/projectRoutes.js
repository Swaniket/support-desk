const express = require("express");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const {
  getAllProjects,
  addNewProject,
} = require("../controllers/projectController");

const router = express.Router();

// @ GET, POST: /api/projects/
router
  .route("/")
  .get(protect, getAllProjects)
  .post(protectAdmin, addNewProject);

module.exports = router;
