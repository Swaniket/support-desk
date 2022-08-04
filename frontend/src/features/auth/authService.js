import axios from "axios";

const API_URL = "/api/users";

// Register new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// User Login
const login = async (userCredential) => {
  const response = await axios.post(`${API_URL}/login`, userCredential);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout a user
const logout = () => {
  console.log("LOgout");
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
