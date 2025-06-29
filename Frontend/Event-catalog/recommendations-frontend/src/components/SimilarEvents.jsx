import React, { useEffect, useState } from 'react';

const SimilarEvents = ({ eventId }) => {
  const [similarEvents, setSimilarEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/recommendations/event/${eventId}/similar`)
      .then(res => res.json())
      .then(data => setSimilarEvents(data.similarEvents || []))
      .catch(console.error);
  }, [eventId]);

  return (
    <div>
      <h2>Events Similar to Event {eventId}</h2>
      <ul>
        {similarEvents.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarEvents;
