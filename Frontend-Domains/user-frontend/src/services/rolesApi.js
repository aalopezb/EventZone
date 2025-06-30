import axios from 'axios';

const API_URL = process.env.REACT_APP_ROLES_SERVICE_URL;

export const getRoles = (token) => {
  return axios.get(`${API_URL}/roles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
