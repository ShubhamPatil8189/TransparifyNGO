const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
// const { verifyToken, isAdmin } = require('../middleware/auth'); // Add auth middleware if needed

router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;
