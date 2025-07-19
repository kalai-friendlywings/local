// src/api/profile.js
import API from './client';

// Get profile data
export const getProfile = async () => {
  try {
    const response = await API.get('/api/profile/');
    return {
      username: response.data.username || '',
      email: response.data.email || '',
      contact: response.data.contact || ''
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update profile data - MAKE SURE THIS IS EXPORTED
export const updateProfile = async (profileData) => {
  try {
    const response = await API.patch('/api/profile/', profileData);
    return {
      username: response.data.username || '',
      email: response.data.email || '',
      contact: response.data.contact || ''
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Export all functions together
export default {
  getProfile,
  updateProfile
};