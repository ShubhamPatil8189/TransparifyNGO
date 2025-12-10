const multer = require("multer");

// Use memory storage for Vercel + Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
