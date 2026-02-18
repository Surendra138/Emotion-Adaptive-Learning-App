import api from "./axios.js";

export const getRecommendation = (contentId) => api.get(`/adaptive/recommend/${contentId}`);
