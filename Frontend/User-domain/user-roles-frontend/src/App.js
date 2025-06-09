import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3006";

function App() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}/roles/`);
      setRoles(res.data);
    } catch (err) {
      setError("Error fetching roles");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${API_URL}/roles/`, { name, description });
      setName("");
      setDescription("");
      fetchRoles();
    } catch (err) {
      setError(err.response?.data?.detail || "Error creating role");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Roles & Permissions</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Add Role</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <b>{role.name}</b>: {role.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
