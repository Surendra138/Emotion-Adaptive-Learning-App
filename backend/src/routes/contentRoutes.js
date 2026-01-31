import express from "express";
import { createContent, fetchAllContent, fetchContentById } from "../controllers/contentController.js";

const router = express.Router();

// Public endpoints (later can add auth middleware)
router.get("/", fetchAllContent);
router.get("/:id", fetchContentById);
router.post("/", createContent); // Admin only, for now no auth

export default router;
