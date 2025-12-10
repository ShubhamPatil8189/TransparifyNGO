const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.CONNECTIONSTRING, {
    serverSelectionTimeoutMS: 5000
  });

  isConnected = true;
  console.log("MongoDB Connected");
}

module.exports = connectDB;
