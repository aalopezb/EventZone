import React, { useEffect, useState } from 'react';

const PopularEvents = () => {
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/recommendations/popular')
      .then(res => res.json())
      .then(data => setPopularEvents(data.popularEvents || []))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Popular Events</h2>
      <ul>
        {popularEvents.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularEvents;
