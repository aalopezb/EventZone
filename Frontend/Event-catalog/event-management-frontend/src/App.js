import React from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Management</h1>
      <EventForm />
      <EventList />
    </div>
  );
}

export default App;
