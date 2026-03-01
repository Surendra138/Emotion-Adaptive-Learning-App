import { detectEmotion } from '../rules/emotionRules.js';
import axios from "axios"
import { ML_SERVICES } from "../config/mlServices.js"
import { pool } from '../config/db.js';

export const analyzeSessionEmotion = async(sessionId) => {
    // Get interactions
    const interactionsRes = await pool.query(
        'SELECT interaction_type FROM user_interactions WHERE session_id = $1',
        [sessionId]
    );

    // Get session duration
    const sessionRes = await pool.query(
        'SELECT total_time_spent FROM learning_sessions WHERE id = $1',
        [sessionId]
    );

    const interactions = interactionsRes.rows;
    const duration = sessionRes.rows[0]?.total_time_spent || 0;

    const { emotion , confidence } = detectEmotion(interactions, duration); 

    // save data to db
    await pool.query(
        'INSERT INTO emotion_snapshots(session_id, emotion, confidence_score) VALUES($1, $2, $3)',
        [sessionId, emotion, confidence]
    );

    return { emotion, confidence };
};


export const analyzeEmotionService = async (base64Image) => {
    // Remove base64 prefix if present
    const cleanBase64 = base64Image.replace(
    /^data:image\/\w+;base64,/,
    ""
    );

    const response = await axios.post(
        ML_SERVICES.FACE + '/analyze',
        {
            image: cleanBase64,
        }
    );

    return response.data;
};