function validateUser({ name, email, password, role }) {
  if (!name || name.trim().length < 3) return 'Name must be at least 3 characters';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email format';
  if (!password || password.length < 6) return 'Password must be at least 6 characters';
  if (!role || (role !== 'user' && role !== 'organizer')) return 'Role must be either user or organizer';
  return null;
}

module.exports = { validateUser };
