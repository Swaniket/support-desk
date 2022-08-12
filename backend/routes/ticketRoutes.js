const express = require("express");
const router = express.Router();

const { protect, protectAdmin } = require("../middleware/authMiddleware");
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

// @ POST, GET: /api/tickets
router.route("/").get(protect, getTickets).post(protect, createTicket);

// @ GET, DELETE, PUT: /api/tickets/:id
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protectAdmin, deleteTicket)
  .put(protectAdmin, updateTicket);

module.exports = router;
