import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import API from "@/api/client";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.username || !form.password) {
      setSnackbar({
        open: true,
        message: "Please enter both username and password",
        severity: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("token/", {
        username: form.username.trim(),
        password: form.password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      API.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      await login({ access, refresh });

      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error);
      let errorMessage = "Login failed. Please try again.";

      if (error.code === "ECONNREFUSED") {
        errorMessage = "Cannot connect to server. Is the backend running?";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid username or password";
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5" mb={3}>
        Login
      </Typography>

      <TextField
        name="username"
        label="Username"
        value={form.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        autoComplete="username"
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        autoComplete="current-password"
      />

      {/* 🔗 Forgot Password Link */}
      <Typography
        component={Link}
        to="/forgotPassword"
        variant="body2"
        sx={{
          display: "block",
          textAlign: "right",
          mt: 1,
          textDecoration: "none",
          color: "primary.main",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Forgot Password?
      </Typography>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;