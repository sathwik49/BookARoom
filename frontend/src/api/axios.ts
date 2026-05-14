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
    LOGOUT: "/auth/logout",
  },
  CR: {
    CREATE: "/classroom",
    GET_ALL: "/classroom",
    GET_BY_ID: (id: string) => `/classroom/${id}`,
    UPDATE: (id: string) => `/classroom/${id}`,
    DELETE: (id: string) => `/classroom/${id}`,
  },
  USER: {
    GET_STATS: "/user/stats",
  },
};

export const queryKeys = {
  AUTH: {
    GOOGLE: ["google-auth"],
    ME: ["current-user"],
    LOGOUT: ["logout"],
  },
  CR: {
    ALL: ["classrooms"],
    CREATE: ["create-cr"],
    UPDATE: ["update-cr"],
    DELETE: ["delete-cr"],
    DETAILS: (id: string) => ["classroom", id],
    SEARCH: (
      page: number,
      limit: number,
      search?: string,
      building?: string,
    ) => ["classrooms", page, limit, search, building],
  },
  USER: {
    GET_STATS: ["get-stats"],
  },
};

export const AUTH_REDIRECT_URL = "/dashboard";
export const HOME_URL = "/";
