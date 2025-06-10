import React, { useState } from "react";
import PreferencesForm from "./components/PreferencesForm";

function App() {
  const [userId, setUserId] = useState("");

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Gestión de Preferencias</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <PreferencesForm userId={userId} />
    </div>
  );
}

export default App;
