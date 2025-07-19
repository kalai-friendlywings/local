import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";

export default function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contact) {
      newErrors.contact = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Must be a valid 10-digit number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        username: formData.username,
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        password2: formData.confirmPassword
      };

      setLoading(true);

      try {
        const response = await fetch("http://localhost:8000/api/signup/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);

          setSnackbar({
            open: true,
            message: "Signup successful! Redirecting to login...",
            severity: "success"
          });

          setTimeout(() => navigate("/login"), 2000);
        } else {
          const backendErrors = {};
          for (const [field, messages] of Object.entries(data)) {
            backendErrors[field] = Array.isArray(messages) ? messages.join(", ") : messages;
          }
          if (data.detail) {
            setSnackbar({ open: true, message: data.detail, severity: "error" });
          }
          setErrors(backendErrors);
        }
      } catch (err) {
        console.error("Signup error:", err);
        setSnackbar({
          open: true,
          message: "Network error. Please try again.",
          severity: "error"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          name="contact"
          label="WhatsApp Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.contact}
          onChange={handleChange}
          error={!!errors.contact}
          helperText={errors.contact}
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I accept the <Link to="/terms">Terms and Conditions</Link>
            </Typography>
          }
        />
        {errors.termsAccepted && (
          <Typography color="error" variant="body2">
            {errors.termsAccepted}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
