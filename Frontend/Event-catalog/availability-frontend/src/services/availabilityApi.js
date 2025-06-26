import axios from 'axios';

const API_URL = 'http://localhost:3028/availability';

export function getAvailability(eventId) {
  return axios.get(`${API_URL}/${eventId}`);
}

export function reserveSlot(eventId, quantity) {
  return axios.post(`${API_URL}/${eventId}/reserve`, { quantity });
}

export function releaseSlot(eventId, quantity) {
  return axios.post(`${API_URL}/${eventId}/release`, { quantity });
}

export function updateCapacity(eventId, newCapacity) {
  return axios.put(`${API_URL}/${eventId}/capacity`, { newCapacity });
}
