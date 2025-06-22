import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3026/schedules";

export default function ScheduleList({ eventId }) {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    if (!eventId) {
      setError("ID del evento no válido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/event/${eventId}`);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error al obtener horarios (${res.status}): ${errText}`);
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

  if (!eventId) return <p>Seleccione un evento para ver horarios.</p>;
  if (loading) return <p>Cargando horarios...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (schedules.length === 0) return <p>No hay horarios para este evento.</p>;

  return (
    <div>
      <h3>Horarios para evento {eventId}</h3>
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
