import express from "express";
const router = express.Router();

import { validateLogin, validateRegister, logoutUser, registerTempUser, sendOTP } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

router.post('/login', authMiddleware.checkLogin, validateLogin);
router.post('/registerTemp', authMiddleware.checkTempRegister, registerTempUser);
router.post('/register', authMiddleware.checkRegister, validateRegister);
router.post("/sendOtp", authMiddleware.validateOtpReq, sendOTP);
router.get("/logout", logoutUser);

export default router;
