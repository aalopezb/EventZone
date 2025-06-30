import React, { useEffect, useState, useContext } from 'react';
import { getNotifications } from '../../services/notificationsApi';
import { AuthContext } from '../../context/AuthContext';

const NotificationsPage = () => {
  const { user, token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      getNotifications(user.id, token)
        .then(res => setNotifications(res.data))
        .catch(() => setError('Error loading notifications'));
    }
  }, [user, token]);

  if (!user) return <p>Please login to see notifications.</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (notifications.length === 0) return <p>No notifications.</p>;

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
