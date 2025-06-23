import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3026/schedules";

export default function ScheduleList({ eventId }) {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    if (!eventId) {
      setError("Invalid event ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/event/${eventId}`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error getting schedules (${res.status}): ${errText}`);
      }
      const data = await res.json();
      setSchedules(data);
    } catch (err) {
      setError(err.message);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchSchedules();
  }, [eventId]);

  if (!eventId) return <p>Select an event to view schedules.</p>;
  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (schedules.length === 0) return <p>There are no schedules for this event.</p>;

  return (
    <div>
      <h3>Event schedules {eventId}</h3>
      <ul>
        {schedules.map((sch) => (
          <li key={sch.id}>
            {new Date(sch.start_datetime).toLocaleString()} -{" "}
            {new Date(sch.end_datetime).toLocaleString()} ({sch.timezone}){" "}
            {sch.description && <em>- {sch.description}</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}
