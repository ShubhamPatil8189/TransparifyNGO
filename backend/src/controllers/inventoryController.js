const Inventory = require("../models/Inventory");
const cloudinary = require("cloudinary").v2;

/** Cloudinary Config **/
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};


/**
 * CREATE Inventory Item
 * POST /api/inventory
 */
exports.createInventoryItem = async (req, res) => {
  try {
    const { description, estimatedValue, donor } = req.body;

    let images = [];

    // ✔ Upload files to Cloudinary (req.files from multer.memoryStorage())
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.buffer, "inventory");
        images.push(url);
      }
    }

    // ✔ If URLs are also provided manually
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

    res.status(201).json({
      success: true,
      message: "In-kind inventory item added successfully",
      data: item,
    });
  } catch (error) {
    console.error("Inventory create error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};



/**
 * LIST Inventory Items
 * GET /api/inventory
 */
exports.listInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (err) {
    console.error("Error fetching inventory:", err);
    res.status(500).json({ error: "Server error while fetching inventory" });
  }
};


// // controllers/inventoryController.js
// const Inventory = require("../models/Inventory");

// // POST /api/inventory
// exports.createInventoryItem = async (req, res) => {
//   try {
//     const { description, estimatedValue, donor } = req.body;

//     // If you are using multer for file upload:
//     // const images = req.files?.map(f => f.path) || [];

//     // If you're just receiving URLs directly:
//     const images = req.body.images || [];

//     const item = await Inventory.create({
//       description,
//       estimatedValue,
//       donor,
//       images,
//       createdAt: new Date(),
//     });

//     res.status(201).json({
//       success: true,
//       message: "In-kind inventory item added successfully",
//       data: item,
//     });
//   } catch (error) {
//     console.error("Inventory create error:", error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };


// /**
//  * List All Inventory Items
//  * GET /api/inventory
//  */
// exports.listInventory = async (req, res) => {
//   try {
//     const items = await Inventory.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: items.length,
//       items,
//     });
//   } catch (err) {
//     console.error("Error fetching inventory:", err);
//     res.status(500).json({ error: "Server error while fetching inventory" });
//   }
// };