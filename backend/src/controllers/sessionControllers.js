import { startSession, endSession, logInteraction, logEmotion} from '../services/sessionService.js';


export const startLearningSession = async(req, res) => {
    try {
        const userId = req.user.id;
        const { contentId, deviceType } = req.body;
        const session = await startSession(userId, contentId, deviceType);
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const endLearningSession = async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const session = await endSession(sessionId);
        res.json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



export const recordInteraction = async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const { interaction_type, interaction_value } = req.body;
        await logInteraction(sessionId, interaction_type, interaction_value);
        res.status(201).json({ message: "Interaction recorded" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



export const recordEmotion = async (req, res) => {
    try {
        const sessionId = req.params.sessionId;
        const { emotion, confidence_score } = req.body;
        await logEmotion(sessionId, emotion, confidence_score);
        res.status(201).json({ message: "Emotion recorded" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};