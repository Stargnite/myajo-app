const groupModel = require('../models/groupModel');
const groupMemberModel = require('../models/groupMemberModel');

exports.createGroup = async (groupData) => {
  return await groupModel.createGroup(groupData);
};

exports.getGroup = async (id) => {
  // Ensure id is parsed as integer
  const groupId = parseInt(id, 10);
  if (isNaN(groupId)) {
    throw Object.assign(new Error('Invalid group ID format'), { status: 400 });
  }
  
  const group = await groupModel.findGroupById(groupId);
  if (!group) {
    throw Object.assign(new Error('Group not found'), { status: 404 });
  }
  return group;
};

exports.listGroups = async (agentId) => {
  return await groupModel.findGroupsByAgent(agentId);
};

exports.listMembers = async (id) => {
  // Ensure id is parsed as integer
  const groupId = parseInt(id, 10);
  if (isNaN(groupId)) {
    throw Object.assign(new Error('Invalid group ID format'), { status: 400 });
  }
  
  return await groupMemberModel.listMembers(groupId);
};

exports.joinByReferral = async ({ referralCode, userId }) => {
  // Find group by referral code
  const group = await groupModel.findByReferralCode(referralCode);
  if (!group) {
    throw Object.assign(new Error('Invalid referral code'), { status: 404 });
  }
  
  // Get current members
  const members = await groupMemberModel.listMembers(group.id);
  
  // Determine next rotation position
  const rotationPosition = members.length + 1;
  
  // Add member to group
  return await groupMemberModel.addMember({
    groupId: group.id,
    userId,
    rotationPosition,
    status: 'active'
  });
};

exports.addMember = async ({ groupId, userId, rotationPosition }) => {
  // Ensure groupId is parsed as integer
  const parsedGroupId = parseInt(groupId, 10);
  if (isNaN(parsedGroupId)) {
    throw Object.assign(new Error('Invalid group ID format'), { status: 400 });
  }
  
  // Parse userId as integer if it's coming from a route parameter
  const parsedUserId = parseInt(userId, 10) || userId;
  
  return await groupMemberModel.addMember({
    groupId: parsedGroupId,
    userId: parsedUserId,
    rotationPosition,
    status: 'active'
  });
};