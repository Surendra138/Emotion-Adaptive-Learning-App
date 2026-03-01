import api from "./axios";

export const analyzeEmotion = async (imageBase64) => {
    const res = await api.post('/emotion/analyze', {
        image: imageBase64
    });

    return res.data; 
};