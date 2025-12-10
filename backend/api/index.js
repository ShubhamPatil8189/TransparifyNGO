const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running on Vercel!" });
});

module.exports.handler = serverless(app);
