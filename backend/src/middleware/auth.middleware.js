const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.model.js');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

function validateOtpReq(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required field.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  next(); 
}

function checkTempRegister(req, res, next) {
  const { name, email, password, ngoId } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, Email and Password are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  if (ngoId && !mongoose.Types.ObjectId.isValid(ngoId)) {
    return res.status(400).json({ error: 'Invalid ngoId format.' });
  }

  next(); 
}

function checkRegister(req, res, next) {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and Code are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  next(); 
}

function checkForgotPass(req, res, next) {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({ error: 'Email, Code, Password are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  next(); 
}

function checkLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and Password are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  next();
}



const verifyToken = async (req, res, next) => {
  const token =
    req.cookies.jwt ||
    req.headers["authorization"]?.split(" ")[1] ||
    req.query.token ||
    req.params.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided, access denied!" });
  }

  try {
    jwt.verify(token, process.env.JWTSecret, async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized!" });

      const userId = decoded.key;
      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = user;
      next();
    });
  } catch (err) {
    console.error("Internal server error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  checkLogin,
  checkRegister,
  validateOtpReq,
  checkTempRegister,
  verifyToken,
  checkForgotPass
};
