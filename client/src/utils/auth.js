import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

// Set a cookie
export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 1 }); // 1 day
};

// Remove a cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};

// Get a cookie
export const getCookie = (key) => {
  return Cookies.get(key);
};

// Set token to cookie
export const setAuthentication = (token) => {
  setCookie("token", token);
};

// Logout: remove the token
export const logOut = () => {
  removeCookie("token");
};

// Check login status
export const isLogin = async () => {
  const token = getCookie("token");

  if (token) {
    try {
      const res = await axios.post(`${baseURL}/api/auth`, { token });
      return res.data;
    } catch (err) {
      console.error("Auth check failed:", err);
      return { auth: false };
    }
  }

  return { auth: false };
};
