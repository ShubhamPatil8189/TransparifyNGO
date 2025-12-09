// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,       // from .env
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// module.exports = razorpay;


const Razorpay = require("razorpay");

const key_id = process.env.RAZORPAY_KEY_ID || "dummy_key_id";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "dummy_key_secret";

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

module.exports = razorpay;
