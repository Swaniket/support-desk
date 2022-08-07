import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/header-component/Header";

import Home from "./pages/home-page/Home";
import Login from "./pages/login-page/Login";
import Register from "./pages/register-page/Register";
import NewTicket from "./pages/newTicket-page/NewTicket";

import PrivateRoute from "./authentication/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>


        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
