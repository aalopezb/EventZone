import React, { useState } from 'react';
import { getAvailability, reserveSlot, releaseSlot, updateCapacity } from '../services/availabilityApi';

export default function AvailabilityChecker() {
  const [eventId, setEventId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [capacity, setCapacity] = useState(0);
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    try {
      const res = await getAvailability(eventId);
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResult(err.response?.data?.error || 'Error al consultar disponibilidad');
    }
  };

  const handleReserve = async () => {
    try {
      const res = await reserveSlot(eventId, quantity);
      setResult(res.data.message);
    } catch (err) {
      setResult(err.response?.data?.error || 'Error al reservar');
    }
  };

  const handleRelease = async () => {
    try {
      const res = await releaseSlot(eventId, quantity);
      setResult(res.data.message);
    } catch (err) {
      setResult(err.response?.data?.error || 'Error al liberar');
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await updateCapacity(eventId, capacity);
      setResult(res.data.message);
    } catch (err) {
      setResult(err.response?.data?.error || 'Error al actualizar capacidad');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>Event ID:</label>
        <input type="text" value={eventId} onChange={e => setEventId(e.target.value)} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Cantidad:</label>
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Nueva capacidad:</label>
        <input type="number" min="0" value={capacity} onChange={e => setCapacity(e.target.value)} />
      </div>
      <div>
        <button onClick={handleCheck}>Consultar Disponibilidad</button>
        <button onClick={handleReserve}>Reservar</button>
        <button onClick={handleRelease}>Liberar</button>
        <button onClick={handleUpdate}>Actualizar Capacidad</button>
      </div>
      <pre style={{ background: '#f0f0f0', marginTop: 20 }}>{result}</pre>
    </div>
  );
}
