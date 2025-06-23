import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3020/events', event);
      alert('event created successfully');
    } catch (error) {
      console.error('Error event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Evento</h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={event.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={event.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Ubicación"
        value={event.location}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />

      <button type="submit">create event</button>
    </form>
  );
};

export default EventForm;
