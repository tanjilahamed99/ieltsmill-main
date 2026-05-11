import API from "../lib/axios";

export const login = ({
  email,
  password,
}) => {
  return API.post("/auth/login", { email, password });
};

export const register = (data) => {
  return API.post("/auth/register", data);
};

export const myData = () => {
  return API.get("/auth/profile");
};

export const sendCode = (email) => {
  return API.post("/auth/forgot-password", { email });
};

export const forgetPassword = (
  email,
  authCode,
  password,
) => {
  return API.post("/auth/reset-password", {
    email,
    code: authCode,
    password,
  });
};

export const changePassword = (
  email,
  newPassword,
  password,
) => {
  return API.post("/auth/change-password", {
    email,
    newPassword,
    password,
  });
};
