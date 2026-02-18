import api from "./axios.js";

export const startSession = (contentId, deviceType) =>
    api.post("/sessions/start", { contentId, deviceType });

export const endSession = (sessionId) =>
    api.post(`/sessions/${sessionId}/end`);

export const logInteraction = (sessionId, type, value) =>
    api.post(`/sessions/${sessionId}/interaction`, {
        interaction_type: type,
        interaction_value: value
    });