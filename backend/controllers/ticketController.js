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

// @DESC-    Get single ticket by user
// @ROUTE-   GET: /api/tickets/:id
// @ACCESS-  Protected
const getTicket = asyncHandler(async (req, res) => {
  // Get user using JWT
  // req.user.id is populated through the auth middlewere
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
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

  const modTicket = await Ticket.find(ticket).populate("user");

  res.status(201).json(modTicket);
});

// @DESC-    Delete ticket by ticket ID
// @ROUTE-   DELETE: /api/tickets/:id
// @ACCESS-  Protected
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using JWT
  // req.user.id is populated through the auth middlewere
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // Delete ticket
  await ticket.remove();

  res.status(200).json({ success: true });
});

// @DESC-    Update ticket by ticket ID
// @ROUTE-   PUT: /api/tickets/:id
// @ACCESS-  Admin Only
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // Update ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
