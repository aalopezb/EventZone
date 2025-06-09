import { useState } from "react";

export default function UserSearch() {
  const [searchType, setSearchType] = useState("id");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(`http://localhost:3004/user/${searchType}/${query}`);
      if (!res.ok) throw new Error("Usuario no encontrado");
      const data = await res.json();
      setResult(data);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Buscar por:</label>
        <select
          className="border p-2 rounded"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="name">Nombre</option>
          <option value="email">Correo</option>
        </select>
        <input
          type="text"
          className="border p-2 rounded"
          placeholder={`Ingresa el ${searchType}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded border">
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Nombre:</strong> {result.name}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Creado:</strong> {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
