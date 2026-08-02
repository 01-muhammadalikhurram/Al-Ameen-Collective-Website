const express = require('express');
const { getAdminDashboard, getVendorDashboard } = require('../controllers/dashboard.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/admin', protect, authorizeRoles('ADMIN'), getAdminDashboard);
router.get('/vendor', protect, authorizeRoles('VENDOR'), getVendorDashboard);

module.exports = router;
