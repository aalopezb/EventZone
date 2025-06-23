import React, { useEffect, useState } from "react";
import ScheduleList from "./components/ScheduleList";
import ScheduleForm from "./components/ScheduleForm";

const EVENTS_API = "http://localhost:3020/events";

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const res = await fetch(EVENTS_API);
        if (!res.ok) throw new Error("Error al cargar eventos");
        const data = await res.json();

        
        setEvents(data);
        if (data.length > 0) setSelectedEventId(data[0].id);
      } catch (err) {
        setErrorEvents(err.message);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  if (loadingEvents) return <p>Loading events...</p>;
  if (errorEvents) return <p>Error: {errorEvents}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Microservice Schedules</h2>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <>
          <label>
            Select an event:{" "}
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </label>

          {selectedEventId && (
            <>
              <ScheduleForm eventId={selectedEventId} onScheduleCreated={() => {}} />
              <ScheduleList eventId={selectedEventId} />
            </>
          )}
        </>
      )}
    </div>
  );
}
