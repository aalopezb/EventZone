import axios from 'axios';

const API_URL = process.env.REACT_APP_USER_ACTIVITY_SERVICE_URL;

export const getUserActivity = (userId, token) => {
  return axios.get(`${API_URL}/activity/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
