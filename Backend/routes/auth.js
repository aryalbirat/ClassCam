import dotenv from 'dotenv'; 
dotenv.config(); 

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-jwt-secret';

// In-memory user storage for development (replace with MongoDB in production)
const users = new Map();

// Helper function to check if MongoDB is available
const isMongoDBAvailable = () => {
  try {
    const mongoose = require('mongoose');
    return mongoose.connection.readyState === 1;
  } catch (err) {
    return false;
  }
};

// JWT middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    
    // Check if user already exists
    if (users.has(email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const userId = Date.now().toString(); // Simple ID generation
    
    const user = {
      id: userId,
      name,
      email,
      password: hashed,
      role: 'admin' // Default role
    };
    
    users.set(email, user);
    
    const token = jwt.sign({ id: userId, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } 
  catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      message: 'Signup failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: 'All fields required' });
    
    const user = users.get(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ 
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Protected /me endpoint
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Find user by email from JWT token
    const user = Array.from(users.values()).find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Return user data without password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch user info',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;