import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Layout/Navbar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import ProfilePage from './components/Profile/ProfilePage';
import RolesPage from './components/Roles/RolesPage';
import PreferencesPage from './components/Preferences/PreferencesPage';
import NotificationsPage from './components/Notifications/NotificationsPage';
import UserActivityPage from './components/UserActivity/UserActivityPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/activity" element={<UserActivityPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
