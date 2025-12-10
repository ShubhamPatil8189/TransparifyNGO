const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

// Routes
const razorpayWebhookRoute = require('../src/routes/razorpayWebhook');
const inKindTransactionsRoute = require('../src/routes/inKindTransactions');
const transactionsRoute = require('../src/routes/transactions');
const allTransactionsRoute = require('../src/routes/allTransactions');
const receiptRoute = require('../src/routes/receipt');
const receiptVerifyRoute = require('../src/routes/receiptVerify');
const receiptPdfRoute = require('../src/routes/receiptPdf');
const inventory = require('../src/routes/inventoryRoutes');
const transparency = require('../src/routes/publicTransparency');
const indexRouter = require('../src/routes/index.js'); // if you have one

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/transactions", transactionsRoute);
app.use("/api/transactions/in-kind", inKindTransactionsRoute);
app.use("/api/transactions/all", allTransactionsRoute);
app.use("/api/transactions", receiptRoute);
app.use("/api/payments/webhook", express.raw({ type: "*/*" }), razorpayWebhookRoute);
app.use("/api/receipts", receiptVerifyRoute);
app.use("/api/receipts", receiptPdfRoute);
app.use("/api/inventory", inventory);
app.use("/api/public-transparency", transparency);
app.use("/api", indexRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "API running on Vercel!" });
});

// Export serverless handler for Vercel
module.exports.handler = serverless(app);
