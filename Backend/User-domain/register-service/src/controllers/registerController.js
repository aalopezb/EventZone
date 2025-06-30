const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { validateUser } = require('../utils/validateUser');

async function registerUser(req, res) {
  console.log('Register payload:', req.body);
  try {
    const { name, email, password, role } = req.body;

    const validationError = validateUser({ name, email, password, role });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser };
