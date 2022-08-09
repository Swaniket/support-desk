import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  reset,
  getUser,
  getAdmin,
} from "../../features/auth/authSlice";
import { FaHome, FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Button, Container, Navbar } from "react-bootstrap";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const isAdmin = useSelector(getAdmin);

  const onLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(reset());
  };

  const onAdminClick = () => {
    navigate("/admin-test")
  }

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        {/* Logo */}
        <Navbar.Brand>
          <Link to="/" className="header-logo">
            Support Desk
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* Links */}
        <Navbar.Collapse className="justify-content-end">
          {user && isAdmin && (
            <Navbar.Text>
              <button
                className="btn btn-outline-dark header-link"
                onClick={onAdminClick}
              >
                <FaUserFriends /> Admin
              </button>
            </Navbar.Text>
          )}

          {user ? (
            <Navbar.Text>
              <Button className="btn btn-dark" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </Button>
            </Navbar.Text>
          ) : (
            <>
              <Navbar.Text>
                <Link to="/home" className="header-link">
                  <FaHome /> Home
                </Link>
              </Navbar.Text>
              <Navbar.Text>
                <Link to="/register" className="header-link">
                  <FaUser /> Register
                </Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
