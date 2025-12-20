const Product = require("../models/product.model");

// ============== ADMIN CONTROLLERS ==============

// Create Product (Admin Only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and stock are required fields",
      });
    }

    // Validate price and stock
    if (parseFloat(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (parseInt(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description?.trim() || "",
      price: parseFloat(price),
      stock: parseInt(stock),
      category: category?.trim() || "",
      imageUrl: imageUrl || null,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Update Product (Admin/Owner Only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, isActive, imageUrl } = req.body;
    const product = req.product; // From middleware

    // Update fields
    if (name !== undefined) product.name = name.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (priceNum < 0) {
        return res.status(400).json({
          success: false,
          message: "Price cannot be negative",
        });
      }
      product.price = priceNum;
    }
    if (stock !== undefined) {
      const stockNum = parseInt(stock);
      if (stockNum < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock cannot be negative",
        });
      }
      product.stock = stockNum;
    }
    if (category !== undefined) product.category = category.trim();
    if (isActive !== undefined) product.isActive = isActive;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete Product (Admin/Owner Only)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// Get All Products for Admin (with filters)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const { category, isActive, minPrice, maxPrice, search, sortBy } = req.query;
    const { page, limit, skip } = req.pagination;

    // Build query
    let query = {};

    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === "true";
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort
    let sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split(":");
      sort[field] = order === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Update Stock (Admin Only)
exports.updateStock = async (req, res) => {
  try {
    const { quantity, operation } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    await product.updateStock(quantity, operation);

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update stock error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update stock",
    });
  }
};

// Get Dashboard Stats (Admin Only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    const totalStockValue = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
          totalStock: { $sum: "$stock" },
          totalSold: { $sum: "$sold" },
        },
      },
    ]);

    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalStock: { $sum: "$stock" },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        lowStockProducts,
        outOfStockProducts,
        totalStockValue: totalStockValue[0]?.totalValue || 0,
        totalStock: totalStockValue[0]?.totalStock || 0,
        totalSold: totalStockValue[0]?.totalSold || 0,
        categoryStats,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

// ============== USER CONTROLLERS ==============

// Get All Active Products (Public/User)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sortBy } = req.query;
    const { page, limit, skip } = req.pagination;

    // Build query - only active products for users
    let query = { isActive: true, stock: { $gt: 0 } };

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort
    let sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split(":");
      sort[field] = order === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const products = await Product.find(query)
      .select("-createdBy")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get Single Product (Public/User)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    }).select("-createdBy");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Get Products by Category (Public/User)
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page, limit, skip } = req.pagination;

    const products = await Product.find({
      category,
      isActive: true,
      stock: { $gt: 0 },
    })
      .select("-createdBy")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({
      category,
      isActive: true,
      stock: { $gt: 0 },
    });

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get All Categories (Public/User)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {
      isActive: true,
      category: { $ne: null, $ne: "" },
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// Get Featured/Popular Products (Public/User)
exports.getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const products = await Product.find({
      isActive: true,
      stock: { $gt: 0 },
    })
      .select("-createdBy")
      .sort({ sold: -1, rating: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get featured products error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
      error: error.message,
    });
  }
};

// Check Product Availability (Public/User)
exports.checkAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.query;

    const product = await Product.findOne({
      _id: id,
      isActive: true,
    }).select("name stock price");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const requestedQty = parseInt(quantity) || 1;
    const available = product.stock >= requestedQty;

    res.status(200).json({
      success: true,
      data: {
        available,
        stock: product.stock,
        canFulfill: available,
        maxAvailable: product.stock,
      },
    });
  } catch (error) {
    console.error("Check availability error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check availability",
      error: error.message,
    });
  }
};