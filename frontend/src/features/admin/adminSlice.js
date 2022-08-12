import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  tickets: [],
  ticket: {},
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
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getAdminState = (state) => state.admin;

export default adminSlice.reducer;
