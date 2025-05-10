const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.get('/', groupController.listGroups);

router.get('/:id/members', groupController.listMembers);
router.post('/join', groupController.joinByReferral);
router.post('/:id/members', groupController.addMember);

module.exports = router;
