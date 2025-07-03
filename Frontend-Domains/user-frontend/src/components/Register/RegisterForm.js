import React, { useState } from 'react';
import { registerUser } from '../../services/registerApi';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' }); //user
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    console.log(form);
    try {
      await registerUser(form);
      setMessage('User registered successfully');
      setForm({ name: '', email: '', password: '', role: 'user' }); //user
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="user">User</option>
        <option value="organizer">Organizer</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
