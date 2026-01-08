const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const aiProxy = async (endpoint, method = 'GET', data = {}) => {
    try {
        const config = {
            method: method,
            url: `${AI_SERVICE_URL}${endpoint}`,
            data: data,
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(`Error connecting to AI Service (${endpoint}):`, error.message);
        // Return mock data or error
        if (error.code === 'ECONNREFUSED') {
            return { error: true, message: "AI Service Unavailable (Is it running?)" };
        }
        return { error: true, message: error.message };
    }
};

module.exports = aiProxy;
