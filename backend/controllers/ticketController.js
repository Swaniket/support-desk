const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @DESC-    Get all tickets for a user
// @ROUTE-   GET: /api/tickets
// @ACCESS-  Protected
const getTickets = asyncHandler(async (req, res) => {
  // Get user using JWT
  // req.user.id is populated through the auth middlewere
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @DESC-    Get user tickets
// @ROUTE-   POST: /api/tickets
// @ACCESS-  Protected
const createTicket = asyncHandler(async (req, res) => {
  const { project, title, description } = req.body;

  // Check if the request is valid
  if (!project || !title || !description) {
    res.status(400);
    throw new Error("Please add project, title & description");
  }

  // Get user using JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    project,
    title,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
