import { getAdaptiveContent } from "../services/adaptiveService.js";


export const recommendNextContent = async (req, res) => {
    try {
        const result = await getAdaptiveContent(
        req.user.id,
        req.params.contentId
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
