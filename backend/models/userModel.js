// File: models/userModel.js
// SQL Schema for PostgreSQL migration:
/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'member',
  created_at TIMESTAMP DEFAULT NOW()
);
*/

// Example userModel for raw queries (optional wrapper)
const db = require('../config/db');

exports.createUser = async ({ fullname, email, passwordHash, role }) => {
  const result = await db.query(
    'INSERT INTO users(fullname, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING id, fullname, email, role, created_at',
    [fullname, email, passwordHash, role]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

exports.findUserById = async (id) => {
  const result = await db.query(
    'SELECT id, fullname, email, role, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};
