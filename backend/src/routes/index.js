const express = require('express');
const userRoutes = require('./user.route.js');
const authRoutes = require('./auth.route.js');
const campaignRoutes = require('./compaign.route.js');
const donorRoutes = require('./donor.route.js');
const router = express.Router();

// Use routes
router.use('/auth', authRoutes);
router.use('/campaign', campaignRoutes);
router.use('/user', userRoutes);
router.use('/donor', donorRoutes);

module.exports = router;
