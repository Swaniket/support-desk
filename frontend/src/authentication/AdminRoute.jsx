import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { getUser, getAdmin } from "../features/auth/authSlice";

// Return True or false if the user is admin & authenticated
const useAuth = () => {
  const user = useSelector(getUser);
  const isAdmin = useSelector(getAdmin);

  if (!user || !isAdmin) return false;
  return true;
};

function AdminRoute() {
  const isAuth = useAuth();

  return isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/home" />
  );
}

export default AdminRoute;
