const express = require('express');
const router = express.Router();
const publicTransparencyController = require('../controllers/publicTransparency');

router.get('/transparency', publicTransparencyController.getPublicTransparency);
router.get('/report', publicTransparencyController.generateTransparencyReport);

module.exports = router;
