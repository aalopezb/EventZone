import React, { useState } from 'react';
import { registerUser } from '../../services/registerApi';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await registerUser({ name, email, password });
      setMessage(`✅ ${res.data.message}`);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage('❌ Registration failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
