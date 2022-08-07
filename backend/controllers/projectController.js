const asyncHandler = require("express-async-handler");

const Projects = require("../models/projectModel");

// @DESC-    Returns all projects from the DB
// @ROUTE-   GET: /api/projects
// @ACCESS-  Protected
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Projects.find({}).select("projectName");

  // @TODO: Check if user exists in the DB

  res.status(200).json(projects);
});

// @DESC-    Creates new Project in the DB
// @ROUTE-   POST: /api/projects
// @ACCESS-  Admin only
const addNewProject = asyncHandler(async (req, res) => {
  // @TODO: Check if project already exists
  const { projectName } = req.body;

  const createdProject = await Projects.create({
    projectName,
  });

  if (createdProject) {
    res.status(201).json(createdProject);
  } else {
    res.status(400);
    throw new Error("Invalid Project Data!");
  }
});

module.exports = {
  getAllProjects,
  addNewProject,
};
