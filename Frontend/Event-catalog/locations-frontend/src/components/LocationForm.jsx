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

    // Validación simple
    if (!formData.name || !formData.latitude || !formData.longitude) {
      setError('Nombre, latitud y longitud son obligatorios');
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
      setError('Error guardando ubicación');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
      <input name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} />
      <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} />
      <input name="state" placeholder="Estado/Provincia" value={formData.state} onChange={handleChange} />
      <input name="country" placeholder="País" value={formData.country} onChange={handleChange} />
      <input name="postal_code" placeholder="Código postal" value={formData.postal_code} onChange={handleChange} />
      <input
        name="latitude"
        type="number"
        step="any"
        placeholder="Latitud"
        value={formData.latitude}
        onChange={handleChange}
        required
      />
      <input
        name="longitude"
        type="number"
        step="any"
        placeholder="Longitud"
        value={formData.longitude}
        onChange={handleChange}
        required
      />
      <input
        name="capacity"
        type="number"
        placeholder="Capacidad"
        value={formData.capacity}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">{location ? 'Actualizar' : 'Crear'}</button>
      {location && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
