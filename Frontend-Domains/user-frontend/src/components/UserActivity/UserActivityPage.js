import React, { useEffect, useState, useContext } from 'react';
import { getUserActivity } from '../../services/userActivityApi';
import { AuthContext } from '../../context/AuthContext';

const UserActivityPage = () => {
  const { user, token } = useContext(AuthContext);
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      getUserActivity(user.id, token)
        .then(res => setActivity(res.data))
        .catch(() => setError('Error loading user activity'));
    }
  }, [user, token]);

  if (!user) return <p>Please login to see activity.</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (activity.length === 0) return <p>No activity data.</p>;

  return (
    <div>
      <h2>User Activity</h2>
      <ul>
        {activity.map(a => (
          <li key={a.id}>{a.action} at {a.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivityPage;
