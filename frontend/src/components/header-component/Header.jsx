import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";
import "./header.css";

function Header() {
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
          <Navbar.Text>
            <Link to="/login" className="header-link">
              <FaSignInAlt /> Login
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/register" className="header-link">
            <FaUser /> Register
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
