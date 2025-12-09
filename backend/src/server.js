const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const razorpayWebhookRoute = require("./routes/razorpayWebhook");
const inKindTransactionsRoute = require("./routes/inKindTransactions");
const transactionsRoute = require("./routes/transactions");
const allTransactionsRoute = require("./routes/allTransactions");
const path = require("path");
const receiptRoute = require("./routes/receipt");
const receiptVerifyRoute = require("./routes/receiptVerify");
const receiptPdfRoute = require("./routes/receiptPdf");
const inventory=require("./routes/inventoryRoutes");
const transparency=require("./routes/publicTransparency");

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/receipts", express.static(path.join(__dirname, "receipts")));


// Routes
app.use("/api/transactions", transactionsRoute);
app.use("/api/transactions/in-kind", inKindTransactionsRoute);
app.use("/api/transactions/all", allTransactionsRoute);
app.use("/api/transactions", receiptRoute);
app.use("/api/payments/webhook", razorpayWebhookRoute);
app.use("/api/receipts", receiptVerifyRoute);
app.use("/api/receipts", receiptPdfRoute);

app.use("/api/inventory", inventory);
app.use("/api/public-transparency", transparency);


// mongo connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
