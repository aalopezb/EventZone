import axios from 'axios';

const API_URL = process.env.REACT_APP_REGISTER_SERVICE_URL;

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/api/register`, userData);
};
//1