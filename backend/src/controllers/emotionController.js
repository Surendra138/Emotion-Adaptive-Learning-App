import { analyzeSessionEmotion, analyzeEmotionService } from '../services/emotionService.js';

export const detectSessionEmotion = async(req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const result = await analyzeSessionEmotion(sessionId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const analyzeEmotion = async(req, res) => {
    try {
        const { image } = req.body;

        if(!image) return res.status(400).json({ error: "Image is required" });

        const result = await analyzeEmotionService(image);
        return res.json(result);
    } catch (error) {
        console.log("Emotion controller error:", error.message);
        return res.status(500).json({ error: "Emotion analysis failed" });
    }
}