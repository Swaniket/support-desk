const express = require("express");
const router = express.Router();

const { protect, protectAdmin } = require("../middleware/authMiddleware");
const { getTickets, createTicket } = require("../controllers/ticketController");

// @ POST & GET: /api/tickets
router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
