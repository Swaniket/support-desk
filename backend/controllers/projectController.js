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

  const projectExists = await Projects.find({ projectName: projectName });

  if (projectExists && projectExists.length > 0) {
    res.status(409);
    throw new Error("Project already exists");
  }

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

// @DESC-    Remove a project from DB
// @ROUTE-   POST: /api/projects
// @ACCESS-  Admin only
const removeProject = asyncHandler(async (req, res) => {
  // @TODO: Check if project already exists
  const { projectName } = req.body;

  // Check if the project exists
  const project = await Projects.findOne({ projectName: projectName });

  if (project) {
    await Projects.deleteOne({
      projectName,
    });
    res.status(201).json({ message: "Project Removed Successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid Project Data!");
  }
});

module.exports = {
  getAllProjects,
  addNewProject,
  removeProject,
};
