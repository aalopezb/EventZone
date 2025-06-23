function EditEvent({ event, onCancel, onSave }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3020/events/${event.id}`, {
        title,
        description,
        location,
        date,
      });
      onSave();  
    } catch (err) {
      alert("Error al guardar cambios");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="location" />
      <input type="date" value={date.slice(0,10)} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
