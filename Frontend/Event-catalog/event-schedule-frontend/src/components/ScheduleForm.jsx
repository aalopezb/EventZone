import React, { useState } from "react";

const API_URL = "http://localhost:3026/schedules";

export default function ScheduleForm({ eventId, onScheduleCreated }) {
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!startDatetime || !endDatetime) {
      setError("Fecha y hora de inicio y fin son requeridas");
      return;
    }

    if (new Date(startDatetime) >= new Date(endDatetime)) {
      setError("La fecha y hora de fin debe ser posterior a la de inicio");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: Number(eventId),    // Asegura que sea número
          start_datetime: startDatetime,
          end_datetime: endDatetime,
          timezone,
          description,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error creando horario");
      }

      const newSchedule = await res.json();
      onScheduleCreated(newSchedule);
      // Reset form
      setStartDatetime("");
      setEndDatetime("");
      setTimezone("UTC");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!eventId) return <p>Seleccione un evento para agregar horarios.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar horario para evento {eventId}</h3>

      <label>
        Inicio:
        <input
          type="datetime-local"
          value={startDatetime}
          onChange={(e) => setStartDatetime(e.target.value)}
          required
        />
      </label>

      <label>
        Fin:
        <input
          type="datetime-local"
          value={endDatetime}
          onChange={(e) => setEndDatetime(e.target.value)}
          required
        />
      </label>

      <label>
        Zona horaria:
        <input
          type="text"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          placeholder="Ej. UTC, America/New_York"
        />
      </label>

      <label>
        Descripción:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opcional"
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar horario"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
