const asyncHandler = require("express-async-handler");
const { getTicketKPIS } = require("../utils/kpiUtil");

const Ticket = require("../models/ticketModel");

// @DESC-    Get KPI (Total Tickets, Open Tickets, Closed Tickets)
// @ROUTE-   GET: /api/admin/kpi
// @ACCESS-  Admin Only
const getAdminKPI = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  const ticketKPIs = getTicketKPIS(tickets);
  res.status(200).json(ticketKPIs);
});

// @DESC-    Get All Tickets with user info
// @ROUTE-   GET: /api/admin/allTickets
// @ACCESS-  Admin Only
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({}).populate("user");
  res.status(200).json(tickets);
});

module.exports = {
  getAdminKPI,
  getAllTickets,
};
