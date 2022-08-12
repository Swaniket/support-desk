import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  tickets: [],
  ticket: {},
  kpis: {},
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch Tickets from all users
export const fetchAllTickets = createAsyncThunk(
  "admin/fetchAllTickets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Close a ticket
export const closeTicket = createAsyncThunk(
  "tickets/close",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.closeTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Tickets from all users
export const fetchKPIs = createAsyncThunk(
  "admin/fetchKPIs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchKPIs(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProject = createAsyncThunk(
  "admin/createProject",
  async (projectName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await adminService.addNewProject({ projectName }, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProjects = createAsyncThunk(
  "admin/getProjects",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchProjects(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "admin/deleteProject",
  async (projectName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteProject(projectName, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        if (action.payload && action.payload[0]._id) {
          // Process the response to be used in the table
          var modifiedTickets = [];

          action.payload.forEach((ticket) => {
            var data = {
              ...ticket,
              userName: ticket.user.name,
              userEmail: ticket.user.email,
            };
            delete data.user;
            modifiedTickets.push(data);
          });

          state.tickets = modifiedTickets;

          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
        } else {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? ticket.status === "closed"
            : ticket
        );
        state.kpis.openTickets = state.kpis.openTickets - 1;
        state.kpis.closedTickets = state.kpis.closedTickets + 1;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchKPIs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchKPIs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.kpis = action.payload;
      })
      .addCase(fetchKPIs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.message = ""
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = ""
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
        state.message = ""
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = ""
        state.projects = action.payload
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.message = ""
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = ""
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const getAdminState = (state) => state.admin;

export default adminSlice.reducer;
