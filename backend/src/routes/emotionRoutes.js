import express from "express";
import { detectSessionEmotion, analyzeEmotion } from "../controllers/emotionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:sessionId/detect", authMiddleware, detectSessionEmotion);
router.post("/analyze", authMiddleware, analyzeEmotion);


export default router;
