import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, getUser } from "../../features/auth/authSlice";
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Button, Container, Navbar } from "react-bootstrap";
import "./header.css";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(getUser)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
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
        {user ? (
          <Navbar.Text>
            <Button className="btn btn-dark" onClick={onLogout}>
              <FaSignOutAlt/> Logout
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
