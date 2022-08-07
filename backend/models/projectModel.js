const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Enter a project"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectsSchema);
