import React, { useEffect, useState } from 'react';
import { createCategory, listCategories, createTag, listTags } from './grpcClient';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    listCategories((err, res) => {
      if (err) {
        setError('Error fetching categories');
        return;
      }
      const cats = res.getCategoriesList().map(c => ({
        id: c.getId(),
        name: c.getName(),
        description: c.getDescription(),
      }));
      setCategories(cats);
    });
    listTags((err, res) => {
      if (err) {
        setError('Error fetching tags');
        return;
      }
      const tg = res.getTagsList().map(t => ({
        id: t.getId(),
        name: t.getName(),
      }));
      setTags(tg);
    });
  }, []);

  const handleAddCategory = () => {
    if (!newCategoryName) return;
    createCategory(newCategoryName, newCategoryDesc, (err, res) => {
      if (err) {
        setError('Error creating category');
        return;
      }
      setCategories([...categories, {
        id: res.getId(),
        name: res.getName(),
        description: res.getDescription(),
      }]);
      setNewCategoryName('');
      setNewCategoryDesc('');
    });
  };

  const handleAddTag = () => {
    if (!newTagName) return;
    createTag(newTagName, (err, res) => {
      if (err) {
        setError('Error creating tag');
        return;
      }
      setTags([...tags, { id: res.getId(), name: res.getName() }]);
      setNewTagName('');
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Categorías</h2>
      <ul>
        {categories.map(c => <li key={c.id}><b>{c.name}</b>: {c.description}</li>)}
      </ul>
      <input
        placeholder="Nombre categoría"
        value={newCategoryName}
        onChange={e => setNewCategoryName(e.target.value)}
      />
      <input
        placeholder="Descripción"
        value={newCategoryDesc}
        onChange={e => setNewCategoryDesc(e.target.value)}
      />
      <button onClick={handleAddCategory}>Agregar Categoría</button>

      <h2>Etiquetas</h2>
      <ul>
        {tags.map(t => <li key={t.id}>{t.name}</li>)}
      </ul>
      <input
        placeholder="Nombre etiqueta"
        value={newTagName}
        onChange={e => setNewTagName(e.target.value)}
      />
      <button onClick={handleAddTag}>Agregar Etiqueta</button>

      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
