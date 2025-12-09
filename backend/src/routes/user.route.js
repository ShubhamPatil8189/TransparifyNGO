import express from "express";
import { authMiddleware, adminOnly } from "../middleware/user.middleware.js";
import { getMyProfile, updateMyProfile, listNGOUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);
router.get("/ngos/users", authMiddleware, adminOnly, listNGOUsers);

export default router;
