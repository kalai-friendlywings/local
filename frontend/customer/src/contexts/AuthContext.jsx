import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import API from "@/api/client";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  const login = async ({ access, refresh }) => {
    try {
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      API.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      const response = await API.get("profile/");
      setUser(response.data);
    } catch {
      logout();
      throw new Error("Login failed");
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return null;
      const response = await API.post("token/refresh/", { refresh });
      const newAccess = response.data.access;
      localStorage.setItem("access", newAccess);
      API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
      return newAccess;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await API.get("profile/");
        setUser(response.data);
      } catch (error) {
        if (
          error.message === "Token expired" ||
          error.response?.status === 401
        ) {
          const newToken = await refreshToken();
          if (newToken) {
            const response = await API.get("profile/");
            setUser(response.data);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [logout, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
