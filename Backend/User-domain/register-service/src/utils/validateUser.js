function validateUser({ name, email, password }) {
  if (!name || name.trim().length < 3) return 'Name must be at least 3 characters';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email format';
  if (!password || password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

module.exports = { validateUser };
