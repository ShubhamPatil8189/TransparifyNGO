const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { authenticate, authorizeAdmin } = require("../middleware/product.middleware");

// User routes (require authentication)
router.post("/", authenticate, orderController.createOrder);
router.get("/my-orders", authenticate, orderController.getMyOrders);
router.get("/:id", authenticate, orderController.getOrderById);
router.patch("/:id/cancel", authenticate, orderController.cancelOrder);

// Admin routes
router.get("/admin/all", authenticate, authorizeAdmin, orderController.getAllOrders);
router.patch("/admin/:id/status", authenticate, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;