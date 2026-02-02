import { recommendNextContent } from "../controllers/adaptiveController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get('/recommend/:contentId', authMiddleware, recommendNextContent);

export default router;