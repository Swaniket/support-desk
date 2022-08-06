const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: String,
      required: [true, "Please select a project"],
    },
    title: {
      type: String,
      required: [true, "Please the title of the issue"],
    },
    description: {
      type: String,
      required: [true, "Please a desctiption for the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
