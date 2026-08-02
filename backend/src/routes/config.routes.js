const express = require('express');
const { getConfig, updateConfig } = require('../controllers/config.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', protect, authorizeRoles('ADMIN'), getConfig);
router.put('/', protect, authorizeRoles('ADMIN'), updateConfig);

module.exports = router;
