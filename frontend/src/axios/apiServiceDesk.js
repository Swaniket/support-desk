import axios from "axios";
import { toast } from "react-toastify";

const apiServiceDesk = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

apiServiceDesk.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      
      toast.error("Session Expired, Please login again!")
      setTimeout(() => {
        localStorage.removeItem("user");
        window.location = "/";
      }, 3000)
      
      
    }
    return Promise.reject(err);
  }
);

export default apiServiceDesk;
