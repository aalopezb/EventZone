import axios from 'axios';

const API_URL = process.env.REACT_APP_PREFERENCES_SERVICE_URL;

export const getPreferences = (userId, token) => {
  return axios.get(`${API_URL}/preferences/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
