import axios from "axios";

export const baseURL = import.meta.env["VITE_API_BASE_URL"];

export const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const endPoints = {
  AUTH: {
    GOOGLE: "/auth/google",
    ME: "/auth/me",
  },
};

export const queryKeys = {
  AUTH: {
    GOOGLE: ["google-auth"],
    ME: ["current-user"],
  },
};

export const AUTH_REDIRECT_URL = "/dashboard";
