import express from "express";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);

export default router;
