import api from "./axios.js";

export const detectEmotion = (sessionId) => {
    api.post(`/emotion/${sessionId}/detect`);
};