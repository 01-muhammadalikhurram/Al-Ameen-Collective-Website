const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Login handler
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Seed handler for initial setup
const registerAdminSeed = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return res.status(403).json({ message: 'Admin already seeded' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    res.status(201).json({ message: 'Admin seeded successfully', username: newAdmin.username });
  } catch (error) {
    console.error('Seed Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const seedVendor = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingVendor = await prisma.user.findFirst({
      where: { role: 'VENDOR' }
    });

    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'VENDOR'
      }
    });

    res.status(201).json({ message: 'Vendor seeded successfully' });
  } catch (error) {
    console.error('Seed Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  login,
  registerAdminSeed,
  seedVendor,
};
