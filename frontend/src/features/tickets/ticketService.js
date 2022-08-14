import apiServiceDesk from "../../axios/apiServiceDesk"

const API_URL = "/api/tickets/";
const API_URL_PROJECTS = "/api/projects/";

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await apiServiceDesk.post(API_URL, ticketData, config);
  return response.data;
};

// Get User Tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await apiServiceDesk.get(API_URL, config);
  return response.data;
};

// Get Single ticket by ticketID
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await apiServiceDesk.get(`${API_URL}${ticketId}`, config);
  return response.data;
};

// Get All Projects
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await apiServiceDesk.get(API_URL_PROJECTS, config);
  return response.data;
};

const ticketService = {
  createTicket,
  getProjects,
  getTickets,
  getTicket,
};

export default ticketService;
