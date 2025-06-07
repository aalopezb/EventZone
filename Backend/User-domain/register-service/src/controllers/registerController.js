const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { validateUser } = require('../utils/validateUser');

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validar campos
    const validationError = validateUser({ name, email, password });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Verificar si email existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser };
