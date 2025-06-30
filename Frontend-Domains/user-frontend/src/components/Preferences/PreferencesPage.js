import React, { useEffect, useState, useContext } from 'react';
import { getPreferences } from '../../services/preferencesApi';
import { AuthContext } from '../../context/AuthContext';

const PreferencesPage = () => {
  const { user, token } = useContext(AuthContext);
  const [preferences, setPreferences] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      getPreferences(user.id, token)
        .then(res => setPreferences(res.data))
        .catch(() => setError('Error loading preferences'));
    }
  }, [user, token]);

  if (!user) return <p>Please login to see preferences.</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!preferences) return <p>Loading preferences...</p>;

  return (
    <div>
      <h2>User Preferences</h2>
      {/* Muestra tus preferencias */}
      <pre>{JSON.stringify(preferences, null, 2)}</pre>
    </div>
  );
};

export default PreferencesPage;
