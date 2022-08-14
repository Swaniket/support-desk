import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setAdmin } from "./features/auth/authSlice";
import { Header } from "./components";
import {
  AddProject,
  Dashboard,
  Home,
  Login,
  NewTicket,
  Register,
  Tickets,
} from "./pages";
import PrivateRoute from "./authentication/PrivateRoute";
import AdminRoute from "./authentication/AdminRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const ADMIN_URL = "/api/users/isAdmin";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // Check if user is admin
      const checkAdmin = async () => {
        const response = await axios.get(ADMIN_URL, config);
        dispatch(setAdmin(response.data.isAdmin));
      };
      checkAdmin();
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/tickets" element={<Tickets />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-project" element={<AddProject />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
