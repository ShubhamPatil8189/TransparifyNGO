const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user.model.js');
const validator = require('validator');

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

module.exports = {
  checkLogin,
  checkRegister,
  validateOtpReq,
  checkTempRegister
};
