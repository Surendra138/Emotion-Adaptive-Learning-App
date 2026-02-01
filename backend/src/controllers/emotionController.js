import { analyzeSessionEmotion } from '../services/emotionService.js';

export const detectSessionEmotion = async(req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const result = await analyzeSessionEmotion(sessionId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};