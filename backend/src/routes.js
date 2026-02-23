import express from "express";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import emotionRoutes from './routes/emotionRoutes.js';
import adaptiveRoutes from "./routes/adaptiveRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/sessions", sessionRoutes);
router.use("/emotion", emotionRoutes);
router.use("/adaptive", adaptiveRoutes);
router.use("/courses", courseRoutes);

export default router;
