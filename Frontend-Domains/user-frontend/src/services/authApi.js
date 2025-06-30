import axios from 'axios';

const API_URL = process.env.REACT_APP_LOGIN_SERVICE_URL;

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`);
};
