const express = require('express');
const serverless = require('serverless-http');
// const inventoryRoutes = require('./inventoryRoutes');
const app = express();
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.json({ message: "API running on Vercel!" });
});

// Your other routes can go here
// app.use('/inventory', inventoryRoutes);

module.exports = app; // ❌ This is wrong for Vercel function
module.exports.handler = serverless(app); // ✅ Correct for Vercel
