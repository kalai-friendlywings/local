// src/api/client.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper to set token manually
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Request interceptor: attach access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: auto-refresh access token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/"}token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("access", newAccessToken);
        setAuthToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
