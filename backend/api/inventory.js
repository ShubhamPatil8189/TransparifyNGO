const express = require("express");
const serverless = require("serverless-http");
const inventoryRoutes = require("../src/routes/inventoryRoutes");

const app = express();
app.use(express.json());

// Use the router
app.use("/api/inventory", inventoryRoutes);

module.exports.handler = serverless(app);
