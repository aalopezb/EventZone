import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationsList({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/notifications/${userId}`)
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setNotifications([]);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>loading notifications...</p>;

  return (
    <div>
      {notifications.length === 0 ? (
        <p>There are no notifications for this user.</p>
      ) : (
        <ul>
          {notifications.map(n => (
            <li key={n._id}>
              <strong>{n.title}</strong> - {n.message} <br />
              <small>{new Date(n.createdAt).toLocaleString()}</small>
              {n.read ? ' ✅' : ' 🔔'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsList;
