import { getAllCourses } from "../services/courseService.js";


// Fetch course progress status
export const fetchAllCourses = async(req, res) => {
    try {
        const data = await getAllCourses(req.user.id);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({error: err.message});
    }
};