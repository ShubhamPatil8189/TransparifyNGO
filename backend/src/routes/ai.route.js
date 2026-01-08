const express = require('express');
const router = express.Router();
const aiProxy = require('../services/aiProxy');

// Fraud Detection
router.post('/fraud-check', async (req, res) => {
    const result = await aiProxy('/fraud-check', 'POST', req.body);
    res.json(result);
});

router.get('/fraud-scan', async (req, res) => {
    const result = await aiProxy('/fraud-scan', 'GET');
    res.json(result);
});

// Trends
router.get('/trends/donation-analysis', async (req, res) => {
    const result = await aiProxy('/trends/donation-analysis', 'GET');
    res.json(result);
});

router.get('/trends/donor-behavior', async (req, res) => {
    const result = await aiProxy('/trends/donor-behavior', 'GET');
    res.json(result);
});

// Transparency
router.get('/transparency/trust-score/:ngo_id', async (req, res) => {
    const result = await aiProxy(`/transparency/trust-score/${req.params.ngo_id}`, 'GET');
    res.json(result);
});

router.get('/transparency/fake-detection', async (req, res) => {
    const result = await aiProxy('/transparency/fake-detection', 'GET');
    res.json(result);
});

router.get('/transparency/fund-allocation/:campaign_id', async (req, res) => {
    const result = await aiProxy(`/transparency/fund-allocation/${req.params.campaign_id}`, 'GET');
    res.json(result);
});

// Chatbot & Reports
router.post('/chat', async (req, res) => {
    // Python endpoint is /ai/chat
    const result = await aiProxy('/ai/chat', 'POST', req.body);
    res.json(result);
});

router.post('/generate-report', async (req, res) => {
    const result = await aiProxy('/ai/generate-report', 'POST', req.body);
    res.json(result);
});

router.post('/impact-prediction', async (req, res) => {
    const result = await aiProxy('/ai/impact-prediction', 'POST', req.body);
    res.json(result);
});

module.exports = router;
