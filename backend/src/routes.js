import express from "express";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/sessions", sessionRoutes);

export default router;
