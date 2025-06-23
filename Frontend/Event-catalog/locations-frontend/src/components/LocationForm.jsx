import React, { useState, useEffect } from 'react';
import { createLocation, updateLocation } from '../api/locationsApi';

const initialFormState = {
  name: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
  latitude: '',
  longitude: '',
  capacity: '',
  description: '',
};

export default function LocationForm({ location, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      setFormData({ ...location });
    } else {
      setFormData(initialFormState);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.latitude || !formData.longitude) {
      setError('Name, latitude, and longitude are required');
      return;
    }

    try {
      if (location) {
        await updateLocation(location.id, formData);
      } else {
        await createLocation(formData);
      }
      onSuccess();
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message || 'Error saving location';
      setError(backendMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
      <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
      <input name="state" placeholder="State/Province" value={formData.state} onChange={handleChange} />
      <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
      <input name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleChange} />
      <input
        name="latitude"
        type="number"
        step="any"
        placeholder="Latitude"
        value={formData.latitude}
        onChange={handleChange}
        required
      />
      <input
        name="longitude"
        type="number"
        step="any"
        placeholder="Longitude"
        value={formData.longitude}
        onChange={handleChange}
        required
      />
      <input
        name="capacity"
        type="number"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">{location ? 'Update' : 'Create'}</button>
      {location && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
