import { pool } from "../config/db.js";


// get all available courses
export const getAllCourses = async(userId) => {
    const result = await pool.query(
        `SELECT 
            c.id,
            c.course_name, 
            ROUND(
                (COUNT(CASE WHEN ucp.status = 'completed' THEN 1 END) * 100.0) 
                / NULLIF(COUNT(lc.id), 0),
            2) AS progress_percentage
        FROM courses c
        LEFT JOIN learning_content lc 
            ON lc.course_id = c.id
        LEFT JOIN user_content_progress ucp 
            ON ucp.content_id = lc.id 
            AND ucp.user_id = $1
        GROUP BY c.id, c.course_name`,
        [userId]
    );
    return result.rows;
}