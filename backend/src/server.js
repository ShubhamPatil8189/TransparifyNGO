const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const path = require("path");

const donationRoutes = require("./routes/donationRoutes");
const indexRouter = require('../src/routes/index.js');
const razorpayWebhookRoute = require("./routes/razorpayWebhook");
const inKindTransactionsRoute = require("./routes/inKindTransactions");
const transactionsRoute = require("./routes/transactions");
const allTransactionsRoute = require("./routes/allTransactions");
const receiptRoute = require("./routes/receipt");
const receiptVerifyRoute = require("./routes/receiptVerify");
const receiptPdfRoute = require("./routes/receiptPdf");
const inventory = require("./routes/inventoryRoutes");
const transparency = require("./routes/publicTransparency");
const receipts = require("./routes/receipts");
const aiRoutes = require("./routes/ai.route");

dotenv.config();

const app = express();

// --------------------
// CORS MUST BE FIRST
// --------------------
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4000',
  'http://localhost:5000',
  'http://localhost:8080',
  "https://transparifyngo.onrender.com",
  "https://transparify-ngo-3u1e.vercel.app"
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

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use(cookieParser());
app.use("/receipts", express.static(path.join(__dirname, "receipts")));

// --------------------
// Routes
// --------------------

// Route to get all receipts
app.use("/api", receipts);
app.use("/api", donationRoutes);
app.use('/api', indexRouter);
app.use("/api/transactions", transactionsRoute);
app.use("/api/transactions/in-kind", inKindTransactionsRoute);
app.use("/api/transactions/all", allTransactionsRoute);
app.use("/api/transactions", receiptRoute);
app.use("/api/payments/webhook", razorpayWebhookRoute);
app.use("/api/receipts", receiptVerifyRoute);
app.use("/api/receipts", receiptPdfRoute);
app.use("/api/inventory", inventory);
app.use("/api/public-transparency", transparency);
app.use("/api/ai", aiRoutes);

// MongoDB
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
