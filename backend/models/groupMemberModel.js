const db = require('../config/db');

exports.addMember = async ({ groupId, userId, rotationPosition, status }) => {
  const result = await db.query(
    `INSERT INTO group_members
       (group_id, user_id, rotation_position, status)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [groupId, userId, rotationPosition, status]
  );
  return result.rows[0];
};

exports.listMembers = async (groupId) => {
  const res = await db.query(
    `SELECT gm.*, u.fullname, u.email
       FROM group_members gm
       JOIN users u ON u.id = gm.user_id
      WHERE gm.group_id = $1
      ORDER BY gm.rotation_position`,
    [groupId]
  );
  return res.rows;
};