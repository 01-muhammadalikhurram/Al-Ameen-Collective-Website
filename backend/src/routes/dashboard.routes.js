const express = require('express');
const { getAdminDashboard, getVendorDashboard } = require('../controllers/dashboard.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/admin', verifyToken, authorizeRoles('ADMIN'), getAdminDashboard);
router.get('/vendor', verifyToken, authorizeRoles('VENDOR'), getVendorDashboard);

module.exports = router;
