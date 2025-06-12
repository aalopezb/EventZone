import React, { useState } from 'react';
import ActivityLogList from './components/ActivityLogList';

function App() {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedId(userId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Activity History</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Load</button>
      </form>

      {submittedId && <ActivityLogList userId={submittedId} />}
    </div>
  );
}

export default App;
