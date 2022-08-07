import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth/authSlice"
import ticketReducer from "./tickets/ticketSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer
  },
});
