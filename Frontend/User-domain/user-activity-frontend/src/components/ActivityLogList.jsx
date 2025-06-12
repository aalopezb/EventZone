import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActivityLogList({ userId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3012/api/activity/${userId}`)
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div>
      <h2>Activity Log for User {userId}</h2>
      <ul>
        {activities.map((a) => (
          <li key={a._id}>
            <strong>{a.action}</strong> — {new Date(a.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityLogList;
