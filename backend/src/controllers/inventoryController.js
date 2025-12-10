const Inventory = require("../models/Inventory");
const cloudinary = require("cloudinary").v2;

/** Cloudinary Config **/
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Upload buffer to Cloudinary **/
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/** Single function to handle both create and list **/
const inventoryHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      // CREATE inventory item
      const { description, estimatedValue, donor } = req.body;
      let images = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const url = await uploadToCloudinary(file.buffer, "inventory");
          images.push(url);
        }
      }

      if (req.body.images && Array.isArray(req.body.images)) {
        images = images.concat(req.body.images);
      }

      const item = await Inventory.create({
        description,
        estimatedValue,
        donor,
        images,
        createdAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: "In-kind inventory item added successfully",
        data: item,
      });
    }

    if (req.method === "GET") {
      // LIST inventory items
      const items = await Inventory.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: items.length,
        items,
      });
    }

    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Inventory handler error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = inventoryHandler;
