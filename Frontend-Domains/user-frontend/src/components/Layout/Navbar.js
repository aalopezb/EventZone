import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, setToken, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      {!user && <>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </>}
      {user && <>
        <Link to="/profile">Profile</Link> | <Link to="/roles">Roles</Link> |{' '}
        <Link to="/preferences">Preferences</Link> | <Link to="/notifications">Notifications</Link> |{' '}
        <Link to="/activity">Activity</Link> | <button onClick={handleLogout}>Logout</button>
      </>}
    </nav>
  );
};

export default Navbar;
