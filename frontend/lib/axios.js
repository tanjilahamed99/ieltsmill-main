import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
});

// REDIRECT FUNCTION
const Navigate = (path) => {
  window.location.href = path;
};

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  // SUCCESS RESPONSE
  (response) => {
    return response;
  },

  // ERROR RESPONSE
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    console.log("Interceptor Error:", status, message);

    // ANOTHER DEVICE LOGIN
    if (
      status === 401 &&
      message === "Account already logged in from another device"
    ) {
      toast.error("Your account was logged in from another device", {
        duration: 4000,
      });

      setTimeout(() => {
        localStorage.clear();
        Navigate("/login");
      }, 1500);
    }

    // TOKEN FAILED / EXPIRED
    else if (
      status === 401 &&
      (message === "Not authorized, token failed" ||
        message === "jwt expired" ||
        message === "Not authorized, no token")
    ) {
      localStorage.clear();

      Navigate("/login");
    }

    return Promise.reject(error);
  },
);

export default API;
