const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const {
  authenticate,
  authorizeAdmin,
  authorizeProductOwner,
  validatePagination,
} = require("../middleware/product.middleware");

// ============== PUBLIC/USER ROUTES ==============

// Get all categories (must be before /:id route)
router.get("/categories/all", productController.getAllCategories);

// Get featured/popular products
router.get("/featured/products", productController.getFeaturedProducts);

// Check product availability
router.get("/check-availability/:id", productController.checkAvailability);

// Get products by category
router.get(
  "/category/:category",
  validatePagination,
  productController.getProductsByCategory
);

// Get all active products (with filters)
router.get("/", validatePagination, productController.getAllProducts);

// Get single product by ID
router.get("/:id", productController.getProductById);

// ============== ADMIN ROUTES ==============

// Get dashboard statistics (Admin only)
router.get(
  "/admin/stats/dashboard",
  authenticate,
  authorizeAdmin,
  productController.getDashboardStats
);

// Get all products for admin (with all filters)
router.get(
  "/admin/all",
  authenticate,
  authorizeAdmin,
  validatePagination,
  productController.getAllProductsAdmin
);

// Create product (Admin only)
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  productController.createProduct
);

// Update product (Admin/Owner only)
router.put(
  "/:id",
  authenticate,
  authorizeProductOwner,
  productController.updateProduct
);

// Delete product (Admin/Owner only)
router.delete(
  "/:id",
  authenticate,
  authorizeProductOwner,
  productController.deleteProduct
);

// Update stock (Admin only)
router.patch(
  "/admin/stock/:id",
  authenticate,
  authorizeAdmin,
  productController.updateStock
);

module.exports = router;