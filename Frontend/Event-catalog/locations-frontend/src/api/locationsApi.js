import axios from 'axios';

const API_URL = 'http://localhost:3024/api/locations';

export const fetchLocations = () => axios.get(API_URL);

export const createLocation = (location) => axios.post(API_URL, location);

export const updateLocation = (id, location) => axios.put(`${API_URL}/${id}`, location);

export const deleteLocation = (id) => axios.delete(`${API_URL}/${id}`);
