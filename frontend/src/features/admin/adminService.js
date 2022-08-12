import axios from "axios";

const API_URL = "/api/admin";
const TICKETS_URL = "/api/tickets";
const PROJECT_URL = "/api/projects";

// Fetch all tickets
const fetchAllTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/allTickets`, config);
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
    `${TICKETS_URL}/${ticketId}`,
    { status: "closed" },
    config
  );
  return response.data;
};

// Fetch KPI values
const fetchKPIs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/kpi`, config);
  return response.data;
};

// Add new project
const addNewProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(PROJECT_URL, projectData, config);
  return response.data;
};

//Fetch all projects
const fetchProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(PROJECT_URL, config);
  return response.data;
};

// Delete a project
// Different structure as axios doesn't support a
// request body on delete requests
const deleteProject = async (projectName, token) => {
  const response = await axios.delete(PROJECT_URL, {
    data: { projectName: projectName },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const adminService = {
  fetchAllTickets,
  closeTicket,
  fetchKPIs,
  addNewProject,
  fetchProjects,
  deleteProject,
};

export default adminService;
