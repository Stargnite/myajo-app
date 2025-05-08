const db = require('../config/db');
exports.getAllUsers = async () => {
  const result = await db.query('SELECT id, fullname, email, role, created_at FROM users');
  return result.rows;
};