import axios from "axios";

const API_URL = "/api/admin/allTickets";
const TICKETS_URL = "/api/tickets/";

const fetchAllTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Close a ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${TICKETS_URL}${ticketId}`,
    { status: "closed" },
    config
  );
  return response.data;
};

const adminService = {
  fetchAllTickets,
  closeTicket,
};

export default adminService;
