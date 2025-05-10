const groupService = require('../services/groupService');

exports.createGroup = async (req, res, next) => {
  try {
    const agentId = req.user.uid; // from authMiddleware
    const group = await groupService.createGroup({ ...req.body, agentId });
    res.status(201).json({ success: true, group });
  } catch (err) { next(err); }
};

exports.getGroup = async (req, res, next) => {
  try {
    const group = await groupService.getGroup(req.params.id);
    res.json({ success: true, group });
  } catch (err) { next(err); }
};

exports.listGroups = async (req, res, next) => {
  try {
    const agentId = req.user.uid;
    const groups = await groupService.listGroups(agentId);
    res.json({ success: true, groups });
  } catch (err) { next(err); }
};

exports.listMembers = async (req, res, next) => {
  try {
    const members = await groupService.listMembers(req.params.id);
    res.json({ success: true, members });
  } catch (err) { next(err); }
};

exports.joinByReferral = async (req, res, next) => {
  try {
    const userId = req.user.uid;
    const member = await groupService.joinByReferral({ 
      referralCode: req.body.referralCode, 
      userId
    });
    res.status(201).json({ success: true, member });
  } catch (err) { next(err); }
};

exports.addMember = async (req, res, next) => {
  try {
    const { userId, rotationPosition } = req.body;
    const member = await groupService.addMember({
      groupId: req.params.id,
      userId,
      rotationPosition
    });
    res.status(201).json({ success: true, member });
  } catch (err) { next(err); }
};