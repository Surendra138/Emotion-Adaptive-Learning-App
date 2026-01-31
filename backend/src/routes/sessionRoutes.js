import express from "express";
import { startLearningSession, endLearningSession, recordInteraction, recordEmotion } from "../controllers/sessionControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/start", authMiddleware, startLearningSession);
router.post("/:sessionId/end", authMiddleware, endLearningSession);
router.post("/:sessionId/interaction", authMiddleware, recordInteraction);
router.post("/:sessionId/emotion", authMiddleware, recordEmotion);

export default router;
