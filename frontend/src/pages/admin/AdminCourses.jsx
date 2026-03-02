import { useEffect, useState } from "react";
import {
    createCourse,
    getAdminCourses,
    deleteCourse,
} from "../../api/admin.api";
import { useNavigate } from "react-router-dom";
import "./admin.css";


const AdminCourses = () =>  {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseInfo, setCourseInfo] = useState("");

    const fetchCourses = async () => {
        const res = await getAdminCourses(); 
        setCourses(res.data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreate = async () => {
        await createCourse(
            { courseName: courseName, courseInfo: courseInfo },
        );
        setCourseName("");
        setCourseInfo("");
        fetchCourses();
    };

    const handleDelete = async (id) => {
        await deleteCourse(id);
        fetchCourses();
    };

    return (
        <div className="admin-container">
            <div className="admin-header-row">
                <h2 className="admin-title">Manage Courses</h2>
            </div>

            {/* Create Course Form */}
            <div className="admin-card">
                <div className="admin-form-group">
                    <input
                        className="admin-input"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>

                <div className="admin-form-group">
                    <input
                        className="admin-input"
                        placeholder="Course Info"
                        value={courseInfo}
                        onChange={(e) => setCourseInfo(e.target.value)}
                    />
                </div>

                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleCreate}
                >
                Create Course
                </button>
            </div>

            {/* Course List */}
            <div className="admin-card">
                <ul className="admin-list">
                    {courses.map((course) => (
                        <li key={course.id} className="admin-list-item">
                            <span className="admin-list-title">
                                {course.course_name}
                            </span>

                            <div className="admin-list-actions">
                                <button
                                    className="admin-btn admin-btn-secondary"
                                    onClick={() =>
                                        navigate(`/admin/courses/${course.id}`)
                                    }
                                >
                                View Content
                                </button>

                                <button
                                    className="admin-btn admin-btn-danger"
                                    onClick={() => handleDelete(course.id)}
                                >
                                Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default AdminCourses;