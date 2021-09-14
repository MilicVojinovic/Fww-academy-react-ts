import { TOKEN_LS_NAME } from "../constants/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_LS_NAME);
  if (token) {
    config.headers["session-id"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
