import api from "./axios.js";

export const getContentById = (id) => api.get(`/content/${id}`);
export const getAllContent = () => api.get("/content");
export const createContent = (data) => api.post("/content", data);