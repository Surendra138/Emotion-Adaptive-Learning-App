import { pool } from "../config/db.js";

// create a session
export const startSession = async(userId, contentId, deviceType) => {
    const result = await pool.query(
        'INSERT INTO learning_sessions(user_id, content_id, start_time, device_type) VALUES($1, $2, NOW(), $3) RETURNING *',
        [userId, contentId, deviceType]
    );
    return result.rows[0];
};


// update a session
export const endSession = async(sessionId) => {
    const result = await pool.query(
        'UPDATE learning_sessions SET end_time = NOW(), total_time_spent = EXTRACT(EPOCH FROM (NOW() - start_time)) WHERE id = $1 RETURNING *',
        [sessionId]
    );
    return result.rows[0];
};


// create a log interaction
export const logInteraction = async(sessionId, type, value) => {
    await pool.query(
        'INSERT INTO user_interactions (session_id, interaction_type, interaction_value) VALUES($1,$2,$3)',
        [sessionId, type, value]
    );
};



// create a emotion snapshot
export const logEmotion = async (sessionId, emotion, confidence) => {
    await pool.query(
        `INSERT INTO emotion_snapshots
        (session_id, emotion, confidence_score)
        VALUES ($1,$2,$3)`,
        [sessionId, emotion, confidence]
    );
};