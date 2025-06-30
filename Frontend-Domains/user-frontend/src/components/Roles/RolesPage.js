import React, { useEffect, useState, useContext } from 'react';
import { getRoles } from '../../services/rolesApi';
import { AuthContext } from '../../context/AuthContext';

const RolesPage = () => {
  const { token } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      getRoles(token)
        .then(res => setRoles(res.data))
        .catch(() => setError('Error loading roles'));
    }
  }, [token]);

  if (!token) return <p>Please login to see roles.</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (roles.length === 0) return <p>No roles found.</p>;

  return (
    <div>
      <h2>User Roles</h2>
      <ul>
        {roles.map(role => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RolesPage;
