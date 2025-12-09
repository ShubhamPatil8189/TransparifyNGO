import express from 'express';
import userRoutes from './user.route.js';
import authRoutes from './auth.route.js';
import campaignRoutes from './compaign.route.js';
const router = express.Router();


router.use('/campaign', campaignRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;