const express = require('express');
const { login, registerAdminSeed, seedVendor } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', login);

// Temporary endpoint to seed the first admin user
// In production, this would be removed or strictly protected
router.post('/seed-admin', registerAdminSeed);
router.post('/seed-vendor', seedVendor);

module.exports = router;
