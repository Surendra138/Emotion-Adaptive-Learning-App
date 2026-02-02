import { decideNextContent } from "../rules/adaptiveRules.js";
import { pool } from "../config/db.js";


export const getAdaptiveContent = async(userId, contentId) => {
    // Get emotion
    const emotionRes = await pool.query(
        'SELECT emotion FROM emotion_snapshots WHERE session_id IN (SELECT id FROM learning_sessions WHERE user_id = $1 AND content_id = $2 ORDER BY created_at DESC LIMIT 1) ORDER BY detected_at DESC LIMIT 1',
        [userId, contentId]
    );
    const emotion = emotionRes.rows[0]?.emotion || 'focused';


    // Get last score
    const progressRes = await pool.query(
        'SELECT score FROM user_content_progress WHERE user_id = $1 AND content_id = $2',
        [userId, contentId]
    );
    const lastScore = progressRes.rows[0]?.score || 0;


    // Get content difficulty
    const contentRes = await pool.query(
        'SELECT difficulty, topic FROM learning_content WHERE id = $1',
        [contentId]
    );
    const { difficulty, topic } = contentRes.rows[0];


    const decision = decideNextContent({ emotion, lastScore, currentDifficulty: difficulty });


    // Fetch next recommended content
    const recommendedContentRes = await pool.query(
        'SELECT * FROM learning_content WHERE topic = $1 AND difficulty = $2 AND content_type = $3 LIMIT 1',
        [topic, decision.difficulty, decision.content_type]
    );

    return ({
        emotion,
        decision,
        recommended: recommendedContentRes.rows[0] || null
    });
};
