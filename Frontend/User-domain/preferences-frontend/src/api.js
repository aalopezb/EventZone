const API_URL = process.env.REACT_APP_API_URL + "/preferences";

export async function getPreferences(userId) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error("No se encontraron preferencias");
  return await res.json();
}

export async function savePreferences(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar preferencias");
  return await res.json();
}

export async function deletePreferences(userId) {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar preferencias");
  return await res.json();
}
