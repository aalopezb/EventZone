import React from 'react';

export default function LocationItem({ location, onEdit, onDelete }) {
  return (
    <li>
      <b>{location.name}</b> — {location.address}, {location.city} — Lat: {location.latitude}, Lon: {location.longitude}
      <button onClick={() => onEdit(location)}>Editar</button>
      <button onClick={() => onDelete(location.id)}>Eliminar</button>
    </li>
  );
}
