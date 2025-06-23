import React, { useEffect, useState } from 'react';
import { fetchLocations, deleteLocation } from '../api/locationsApi';
import LocationForm from './LocationForm';
import LocationItem from './LocationItem';

export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);

  const loadLocations = async () => {
    try {
      const response = await fetchLocations();
      setLocations(response.data);
      setError(null);
    } catch (err) {
      setError('Error loading locations');
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      setLocations(locations.filter((loc) => loc.id !== id));
      setError(null);
    } catch {
      setError('Error deleting location');
    }
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
  };

  const handleFormSuccess = () => {
    setSelectedLocation(null);
    loadLocations();
  };

  const handleCancelEdit = () => {
    setSelectedLocation(null);
  };

  return (
    <div>
      <h2>Ubicaciones</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <LocationForm
        location={selectedLocation}
        onSuccess={handleFormSuccess}
        onCancel={handleCancelEdit}
      />

      <ul>
        {locations.map((loc) => (
          <LocationItem
            key={loc.id}
            location={loc}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
