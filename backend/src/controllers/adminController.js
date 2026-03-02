import { pool } from "../config/db.js";

export const createCourse = async (req, res) => {
    const { courseName, courseInfo } = req.body;

    try {
        const result = pool.query(
            'INSERT INTO courses (course_name, course_info) VALUES ($1, $2)',
            [courseName, courseInfo]
        );

        res.status(200).json((await result).rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to create course" });
        console.log('Error in createContent controller');
    }
};


export const getAllCoursesAdmin = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM courses
            ORDER BY created_at ASC`
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses" });
        console.log('Error in getAllCoursesAdmin controller');
    }
};


export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM courses WHERE id = $1`, [id]);
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete course" });
        console.log('Error in deleteCourse controller');
    }
};


/* ================= CONTENT ================= */

export const createContent = async (req, res) => {
    const { courseId } = req.params;
    const {
        title,
        description,
        topic,
        content_type,
        difficulty,
        estimated_time,
        content_body,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO learning_content 
            (title, description, topic, content_type, difficulty, estimated_time, content_body, course_id)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                title,
                description,
                topic,
                content_type,
                difficulty,
                estimated_time,
                content_body,
                courseId,
            ]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to create content" });
        console.log('Error in createContent controller: ', err);
    }
};


export const getCourseContentAdmin = async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM learning_content
            WHERE course_id = $1
            ORDER BY created_at ASC`,
            [courseId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch content" });
        console.log('Error in getCourseContentAdmin controller');
    }
};


export const deleteContent = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `DELETE FROM learning_content WHERE id = $1`,
            [id]
        );

        res.json({ message: "Content deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete content" });
        console.log('Error in deleteContent controller');
    }
};