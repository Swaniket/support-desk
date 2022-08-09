import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";

// Return True or false if the user is authenticated
const useAuth = () => {
  const user = useSelector(getUser);
  if (user) return true;
  return false;
};

function PrivateRoute() {
  const isAuth = useAuth();

  return isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
