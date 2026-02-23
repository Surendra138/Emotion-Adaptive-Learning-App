import express from "express";
import { fetchAllCourses } from "../controllers/courseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, fetchAllCourses);

export default router;