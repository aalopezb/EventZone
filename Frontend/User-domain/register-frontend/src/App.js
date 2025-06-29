import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      if (res.status === 201) {
        setMessage('User registered successfully!');
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        const data = await res.json();
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>
          Register
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      
      <button
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => window.location.href = "http://localhost:3016"}
      >
        Back to Login
      </button>
    </div>
  );
}
