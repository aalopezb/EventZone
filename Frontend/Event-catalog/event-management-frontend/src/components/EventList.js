import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3020/events';

function EditEvent({ event, onCancel, onSave }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${event.id}`, {
        title,
        description,
        location,
        date,
      });
      onSave();
    } catch (err) {
      alert("Error al guardar cambios");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ubicación" />
      <input type="date" value={date.slice(0,10)} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setEvents(res.data);
        setError(null);
      } else {
        setEvents([]);
        setError('');
      }
    } catch (err) {
      setError('Error al cargar eventos');
      setEvents([]);
      console.error(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEvents();
    } catch (err) {
      setError('Error al eliminar evento');
      console.error(err);
    }
  };

  const startEditing = (event) => {
    setEditingEvent(event);
  };

  const cancelEditing = () => {
    setEditingEvent(null);
  };

  const saveEditing = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (events.length === 0) {
    return <div>No hay eventos disponibles.</div>;
  }

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {editingEvent && editingEvent.id === event.id ? (
            <EditEvent event={event} onCancel={cancelEditing} onSave={saveEditing} />
          ) : (
            <>
              {event.title}{' '}
              <button onClick={() => startEditing(event)}>Editar</button>
              <button onClick={() => deleteEvent(event.id)}>Eliminar</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
