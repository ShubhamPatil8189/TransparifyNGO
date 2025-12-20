const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");

// Authentication middleware
exports.authenticate = async (req, res, next) => {
  try {
    // Check multiple sources for the token
    let token = null;
    
    // 1. Check cookies - IMPORTANT: Your token is in 'jwt' cookie, not 'token'
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    // 2. Check Authorization header
    if (!token && req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        token = req.headers.authorization;
      }
    }
    
    // 3. Check for token in body (some implementations send it here)
    if (!token && req.body && req.body.token) {
      token = req.body.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWTSecret);
    } catch (jwtError) {
      if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Please login again.",
        });
      }
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please login again.",
        });
      }
      throw jwtError;
    }

    // IMPORTANT: Your JWT uses 'key' not 'id' for user identifier
    const userId = decoded.id || decoded.key || decoded._id || decoded.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload. Please login again.",
      });
    }

    // Find user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    // Check if user has temp account
    if (user.isTemp) {
      return res.status(403).json({
        success: false,
        message: "Please complete your registration.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

// Admin authorization middleware
exports.authorizeAdmin = (req, res, next) => {
  
  if (!req.user.roles || !Array.isArray(req.user.roles) || !req.user.roles.includes("ADMIN")) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
      userRoles: req.user.roles || []
    });
  }
  
  next();
};

// Check product ownership or admin
exports.authorizeProductOwner = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Allow if user is ADMIN or product owner
    const isAdmin = req.user.roles && req.user.roles.includes("ADMIN");
    const isOwner = product.createdBy.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to modify this product",
      });
    }

    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
      error: error.message,
    });
  }
};

// Validate pagination parameters
exports.validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page < 1) {
    return res.status(400).json({
      success: false,
      message: "Page number must be greater than 0",
    });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: "Limit must be between 1 and 100",
    });
  }

  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit,
  };

  next();
};