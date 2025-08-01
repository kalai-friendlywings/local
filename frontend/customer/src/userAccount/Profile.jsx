import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, CircularProgress, Snackbar, Alert, Typography
} from '@mui/material';
import API from '@/api/client';

const Profile = () => {
  const [formData, setFormData] = useState({ username: '', email: '', contact: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/profile/');
        const { username, email, contact } = response.data;
        setFormData({ username, email, contact: contact || '' });
      } catch {
        setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await API.put('/profile/', formData);
      setSnackbar({ open: true, message: 'Profile updated!', severity: 'success' });
      setEditMode(false);
    } catch {
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 5, mx: 'auto', display: 'block' }} />;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" textAlign="center">My Profile</Typography>

      <TextField label="Username" name="username" value={formData.username}
        onChange={handleChange} disabled={!editMode} fullWidth />
      <TextField label="Email" name="email" value={formData.email}
        onChange={handleChange} disabled={!editMode} fullWidth />
      <TextField label="Contact" name="contact" value={formData.contact}
        onChange={handleChange} disabled={!editMode} fullWidth />

      {!editMode ? (
        <Button variant="outlined" onClick={() => setEditMode(true)}>Edit</Button>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="success" onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={20} /> : 'Save'}
          </Button>
          <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>Cancel</Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
