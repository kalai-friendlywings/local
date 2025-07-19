import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
  Badge,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAccountMobile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '/default-avatar.jpg',
    joinDate: '',
    orders: [],
    addresses: []
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchUserData = async () => {
    console.log('Fetching user data...');
    if (!token) {
      console.warn('No token found in localStorage');
      setLoading(false);
      return;
    }

    try {
      console.log('Making API request to /api/user/profile');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API Response:', response.data);

      if (!response.data) {
        throw new Error('Empty response from server');
      }

      setUserData({
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        avatar: response.data.avatar || '/default-avatar.jpg',
        joinDate: response.data.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        orders: response.data.orders || [],
        addresses: response.data.addresses || []
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      let errorMessage = 'Failed to load user data';

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);

        if (error.response.status === 401) {
          errorMessage = 'Session expired. Please login again.';
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 2000);
        }
      }

      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    if (editMode) {
      saveProfile();
    } else {
      setEditMode(true);
    }
  };

  const saveProfile = async () => {
    try {
      console.log('Saving profile with data:', {
        name: userData.name,
        phone: userData.phone
      });

      const response = await axios.put(
        'http://localhost:5000/api/user/profile',
        {
          name: userData.name,
          phone: userData.phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Save response:', response.data);
      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          p: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Not Signed In
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Please sign in to view your account
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 7, p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 2,
          borderRadius: 2,
          mb: 3
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              size="small"
              sx={{ bgcolor: 'background.paper', p: 0.5, '&:hover': { bgcolor: 'action.hover' } }}
              onClick={toggleEditMode}
            >
              {editMode ? <Check fontSize="small" /> : <Edit fontSize="small" />}
            </IconButton>
          }
        >
          <Avatar
            src={userData.avatar}
            sx={{ width: 64, height: 64, border: '2px solid', borderColor: 'background.paper' }}
          />
        </Badge>
        <Box sx={{ flex: 1 }}>
          {editMode ? (
            <TextField
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              variant="standard"
              fullWidth
            />
          ) : (
            <Typography variant="h6" fontWeight={700}>
              {userData.name}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Member since {userData.joinDate}
          </Typography>
        </Box>
      </Box>

      <TextField
        name="email"
        label="Email"
        value={userData.email}
        variant="outlined"
        fullWidth
        disabled
        margin="normal"
      />

      <TextField
        name="phone"
        label="WhatsApp Number"
        value={userData.phone}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!editMode}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserAccountMobile;
