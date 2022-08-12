import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  reset,
  getUser,
  getAdmin,
} from "../../features/auth/authSlice";
import { FaSignOutAlt, FaUserPlus, FaPlus, FaDashcube } from "react-icons/fa";
import { Container, Navbar, Dropdown } from "react-bootstrap";
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

  const handleAddUserClick = () => {
    navigate("/register");
  };

  const handleAddProject = () => {
    navigate("/add-project");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

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
          {user && (
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" variant="dark">
                Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onLogout}>
                  {" "}
                  <FaSignOutAlt /> Logout
                </Dropdown.Item>

                {user && isAdmin && (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Header>
                      <small>Admin Options</small>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={handleAddUserClick}>
                      <FaUserPlus /> Add User
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleAddProject}>
                      <FaPlus /> Add Project
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleOpenDashboard}>
                      <FaDashcube /> Dashboard
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
