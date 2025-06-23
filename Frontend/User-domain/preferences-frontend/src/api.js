const API_URL = process.env.REACT_APP_API_URL + "/preferences";

export async function getPreferences(userId) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error("No preferences found");
  return await res.json();
}

export async function savePreferences(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error saving preferences");
  return await res.json();
}

export async function deletePreferences(userId) {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting preferences");
  return await res.json();
}
