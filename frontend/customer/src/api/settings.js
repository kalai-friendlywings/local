import axios from './client';

export const getSettings = async () => {
  const response = await axios.get('/api/settings/');
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await axios.put('/api/settings/', data);
  return response.data;
};
