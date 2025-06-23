import React, { useEffect, useState } from "react";
import { getPreferences, savePreferences, deletePreferences } from "../api";

function PreferencesForm({ userId }) {
  const [prefs, setPrefs] = useState({
    language: "es",
    timezone: "UTC",
    theme: "light",
    notifications_enabled: true,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userId) {
      getPreferences(userId)
        .then((data) => setPrefs(data))
        .catch(() => setMessage("There are no saved preferences"));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await savePreferences({ user_id: userId, ...prefs });
      setMessage("Preferences saved successfully");
    } catch {
      setMessage("Error saving");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePreferences(userId);
      setPrefs({
        language: "es",
        timezone: "UTC",
        theme: "light",
        notifications_enabled: true,
      });
      setMessage("Preferences deleted");
    } catch {
      setMessage("Delete error");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <label>Idioma: </label>
      <select name="language" value={prefs.language} onChange={handleChange}>
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="fr">Francés</option>
      </select>

      <br />

      <label>Zona Horaria: </label>
      <input
        name="timezone"
        value={prefs.timezone}
        onChange={handleChange}
      />

      <br />

      <label>Tema: </label>
      <select name="theme" value={prefs.theme} onChange={handleChange}>
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>

      <br />

      <label>
        <input
          type="checkbox"
          name="notifications_enabled"
          checked={prefs.notifications_enabled}
          onChange={handleChange}
        />
        Notificaciones
      </label>

      <br />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
        Eliminar
      </button>

      <p>{message}</p>
    </div>
  );
}

export default PreferencesForm;
