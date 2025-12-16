const express = require("express");
const router = express.Router();
const { 
  validateLogin, 
  validateRegister, 
  logoutUser, 
  registerTempUser, 
  sendOTP,
  validateForgotPass
} = require('../controllers/auth.controller.js');

const authMiddleware = require('../middleware/auth.middleware.js');

router.get("/checkAuth", authMiddleware.verifyToken, (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user,
  });
});
router.post('/login', authMiddleware.checkLogin, validateLogin);
router.post('/registerTemp', authMiddleware.checkTempRegister, registerTempUser);
router.post('/register', authMiddleware.checkRegister, validateRegister);
router.post('/forgotpass', authMiddleware.checkForgotPass, validateForgotPass);
router.post("/sendOtp", authMiddleware.validateOtpReq, sendOTP);
router.get("/logout", logoutUser);

module.exports = router;
