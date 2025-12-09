const express = require("express");
const router = express.Router();

const { 
  validateLogin, 
  validateRegister, 
  logoutUser, 
  registerTempUser, 
  sendOTP 
} = require('../controllers/auth.controller.js');

const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/login', authMiddleware.checkLogin, validateLogin);
router.post('/registerTemp', authMiddleware.checkTempRegister, registerTempUser);
router.post('/register', authMiddleware.checkRegister, validateRegister);
router.post("/sendOtp", authMiddleware.validateOtpReq, sendOTP);
router.get("/logout", logoutUser);

module.exports = router;
