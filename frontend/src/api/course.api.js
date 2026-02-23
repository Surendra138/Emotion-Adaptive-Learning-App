import api from "./axios.js";


export const getAllCourses =()=> api.get("/courses/");