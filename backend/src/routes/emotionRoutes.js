import express from "express";
import { detectSessionEmotion } from "../controllers/emotionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:sessionId/detect", authMiddleware, detectSessionEmotion);

export default router;
