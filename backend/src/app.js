const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const path = require("path");

// Routes
const indexRouter = require("./routes/index.js");
const razorpayWebhookRoute = require("./routes/razorpayWebhook");
const inKindTransactionsRoute = require("./routes/inKindTransactions");
const transactionsRoute = require("./routes/transactions");
const allTransactionsRoute = require("./routes/allTransactions");
const receiptRoute = require("./routes/receipt");
const receiptVerifyRoute = require("./routes/receiptVerify");
const receiptPdfRoute = require("./routes/receiptPdf");
const inventory = require("./routes/inventoryRoutes");
const transparency = require("./routes/publicTransparency");
const connectDB = require("./db");



dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/receipts", express.static(path.join(__dirname, "receipts")));

// CORS
const allowedOrigins = [
  'http://localhost:4000',
  'http://localhost:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['PUT', 'GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Origin', 'Accept', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}));

// MongoDB connection
connectDB();

// API Routes
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

// EXPORT app (no app.listen!)
module.exports = app;
