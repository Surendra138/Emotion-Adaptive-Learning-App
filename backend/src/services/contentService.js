import { pool } from '../config/db.js';

// add new content to db
export const addContent = async (data) => {
    const {
        title,
        description,
        content_type,
        topic,
        difficulty,
        estimated_time,
        content_body,
        metadata
    } = data;

    const result = await pool.query(
        'INSERT INTO learning_content (title, description, content_type, topic, difficulty, estimated_time, content_body, metadata) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [title, description, content_type, topic, difficulty, estimated_time, content_body, metadata || {}]
    );

    return result.rows[0];
};


// get all content by optional filters
export const getAllContent = async (filters) => {
    let query = 'SELECT * FROM learning_content WHERE 1=1';
    const values = [];

    if(filters.type) {
        values.push(filters.type);
        query += ' AND content_type = $' + values.length;
    }
    if(filters.difficulty) {
        values.push(filters.difficulty);
        query += ` AND difficulty = $` + values.length;
    }
    if(filters.topic) {
        values.push(filters.topic);
        query += ` AND topic = $` + values.length;
    }

    const result = await pool.query(query, values);
    return result.rows[0];
};


// get content by id
export const getContentById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM learning_content WHERE id=$1',
        [id]
    );
    
    return result.rows[0];
};
