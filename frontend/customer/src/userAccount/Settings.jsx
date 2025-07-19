// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";

const Settings = () => {
  const { user, loading, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) setProfile(user);
      setFetching(false);
    };
    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (loading || fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">User not found. Please login.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="500px" mx="auto" mt={5}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>

        <Typography variant="body1"><strong>Username:</strong> {profile.username}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>

        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          fullWidth
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
