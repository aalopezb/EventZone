import React, { useEffect, useState } from 'react';

const UserRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/recommendations/user/${userId}`)
      .then(res => res.json())
      .then(data => setRecommendations(data.recommendations || []))
      .catch(console.error);
  }, [userId]);

  return (
    <div>
      <h2>Recommendations for User {userId}</h2>
      <ul>
        {recommendations.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecommendations;
