import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert,
  CircularProgress
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Simple validation
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call your backend here
      // const response = await api.post('/auth/forgot-password', { email });
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        component={Link}
        to="/login"
        sx={{ alignSelf: "flex-start", mb: 2 }}
      >
        Back to Login
      </Button>

      <Typography variant="h5" component="h1" gutterBottom>
        Forgot Password
      </Typography>

      {success ? (
        <>
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Password reset link has been sent to your email!
          </Alert>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Didn't receive the email?{" "}
            <Button 
              variant="text" 
              size="small"
              onClick={() => setSuccess(false)}
            >
              Try again
            </Button>
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ width: "100%" }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </Box>
        </>
      )}

      <Typography variant="body2" sx={{ mt: 3 }}>
        Don't have an account?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}