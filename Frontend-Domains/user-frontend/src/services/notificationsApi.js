import axios from 'axios';

const API_URL = process.env.REACT_APP_NOTIFICATIONS_SERVICE_URL;

export const getNotifications = (userId, token) => {
  return axios.get(`${API_URL}/notifications/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
