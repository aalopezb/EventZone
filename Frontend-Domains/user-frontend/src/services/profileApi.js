import axios from 'axios';

const API_URL = process.env.REACT_APP_PROFILE_SERVICE_URL;

export const getProfile = (userId, token) => {
  return axios.get(`${API_URL}/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
