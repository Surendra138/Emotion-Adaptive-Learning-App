import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminOnly } from '../middlewares/adminOnly.js';
import {
    createCourse,
    getAllCoursesAdmin,
    deleteCourse,
    createContent,
    getCourseContentAdmin,
    deleteContent,
} from "../controllers/adminController.js";

const router = express.Router();

// Create Course
router.post(
    "/courses",
    authMiddleware,
    adminOnly,
    createCourse
);

// Get All Courses (Admin View)
router.get(
    "/courses",
    authMiddleware,
    adminOnly,
    getAllCoursesAdmin
);

// Delete Course
router.delete(
    "/courses/:id",
    authMiddleware,
    adminOnly,
    deleteCourse
);

/* ================= CONTENT ROUTES ================= */

// Add content to course
router.post(
    "/courses/:courseId/content",
    authMiddleware,
    adminOnly,
    createContent
);

// Get all content of a course
router.get(
    "/courses/:courseId/content",
    authMiddleware,
    adminOnly,
    getCourseContentAdmin
);

// Delete content
router.delete(
    "/content/:id",
    authMiddleware,
    adminOnly,
    deleteContent
);

export default router;