import api from "./axios";


export const createCourse = (data) =>
    api.post("/admin/courses", data);

export const getAdminCourses = () =>
    api.get("/admin/courses");

export const deleteCourse = (id) =>
    api.delete(`/admin/courses/${id}`);

export const createContent = (courseId, data, token) =>
    api.post(`/admin/courses/${courseId}/content`, data);

export const getCourseContentAdmin = (courseId) =>
    api.get(`/admin/courses/${courseId}/content`);

export const deleteContent = (id, token) =>
    api.delete(`/admin/content/${id}`);