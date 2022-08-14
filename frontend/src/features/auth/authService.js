import apiServiceDesk from "../../axios/apiServiceDesk"

const API_URL = "/api/users";
const ADMIN_URL = "/api/users/isAdmin";

// Register new user
const register = async (userData) => {
  const response = await apiServiceDesk.post(API_URL, userData);

  return response.data;
};

// User Login
const login = async (userCredential) => {
  var userIsAdmin = false

  const response = await apiServiceDesk.post(`${API_URL}/login`, userCredential);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));

    const token = response.data.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const checkAdmin = await apiServiceDesk.get(ADMIN_URL, config);

    userIsAdmin = checkAdmin.data.isAdmin
  }
  return {user: response.data, isAdmin: userIsAdmin};
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
  // @TODO: Unvalidate user token from backend
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
