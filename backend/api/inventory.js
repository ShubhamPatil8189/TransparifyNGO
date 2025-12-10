const express = require("express");
const serverless = require("serverless-http");
const multer = require("multer");
const inventoryHandler = require("../../controllers/inventoryController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use("/api/inventory", upload.array("images"), inventoryHandler);

module.exports.handler = serverless(app);
