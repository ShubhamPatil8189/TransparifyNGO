
// controllers/inventoryController.js
const Inventory = require("../models/Inventory");
const path = require("path");


// POST /api/inventory
exports.createInventoryItem = async (req, res) => {
  try {
    const { description, estimatedValue, donor } = req.body;

    let images = [];

    // ✔ If actual image files uploaded using multer
    if (req.files && req.files.length > 0) {
      images = req.files.map(file =>
        `/uploads/inventory/${file.filename}`
      );
    }

    // ✔ If URLs are provided along with files
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
 * List All Inventory Items
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