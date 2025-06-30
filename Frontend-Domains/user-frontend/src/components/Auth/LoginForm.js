import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/authApi';

const LoginForm = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(email, password);
      setToken(res.data.token);
      setUser(res.data.user);
    } catch {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
