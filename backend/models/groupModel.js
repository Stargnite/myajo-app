const db = require('../config/db');

exports.createGroup = async ({ name, contributionAmount, memberCount, frequency, referralCode, agentId, status }) => {
  const result = await db.query(
    `INSERT INTO savings_groups
      (name, contribution_amount, member_count, frequency, referral_code, agent_id, status)
     VALUES($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [name, contributionAmount, memberCount, frequency, referralCode, agentId, status]
  );
  return result.rows[0];
};

exports.findGroupById = async (id) => {
  // Ensure id is an integer for database query
  const res = await db.query(`SELECT * FROM savings_groups WHERE id = $1`, [id]);
  return res.rows[0];
};

exports.findGroupsByAgent = async (agentId) => {
  const res = await db.query(`SELECT * FROM savings_groups WHERE agent_id = $1`, [agentId]);
  return res.rows;
};

exports.findByReferralCode = async (code) => {
  const res = await db.query(
    `SELECT * FROM savings_groups WHERE referral_code = $1`,
    [code]
  );
  return res.rows[0];
};