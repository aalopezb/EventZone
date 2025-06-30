import React, { useEffect, useState, useContext } from 'react';
import { getProfile } from '../../services/profileApi';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      getProfile(user.id, token)
        .then(res => setProfile(res.data))
        .catch(() => setError('Error loading profile'));
    }
  }, [user, token]);

  if (!user) return <p>Please login to see profile.</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
    </div>
  );
};

export default ProfilePage;
