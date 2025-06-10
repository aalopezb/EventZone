import React, { useState } from 'react';
import NotificationsList from './components/NotificationsList';

function App() {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) setSubmittedId(userId.trim());
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h1>📨 Notificaciones del Usuario</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={userId}
          placeholder="Ingrese User ID"
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '0.5rem', width: '250px' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
          Ver Notificaciones
        </button>
      </form>
      {submittedId && <NotificationsList userId={submittedId} />}
    </div>
  );
}

export default App;
