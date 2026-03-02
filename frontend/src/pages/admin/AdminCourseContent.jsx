import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    createContent,
    getCourseContentAdmin,
    deleteContent,
} from "../../api/admin.api";
import "./admin.css";

const AdminCourseContent = () => {
    const { courseId } = useParams();
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState("");

    const fetchContent = async () => {
        const res = await getCourseContentAdmin(courseId);
        setContent(res.data);
    };


    useEffect(() => {
        fetchContent();
    }, []);


    const handleCreate = async () => {
        await createContent(
            courseId,
            {
                title,
                description: "",
                topic: "",
                content_type: "video",
                difficulty: "beginner",
                estimated_time: 10,
                content_body: "",
                meta_data: {},
            },
        );
        setTitle("");
        fetchContent();
    };

    const handleDelete = async (id) => {
        await deleteContent(id, token);
        fetchContent();
    };


    return (
        <div className="admin-container">
            <div className="admin-header-row">
                <h2 className="admin-title">Manage Content</h2>
            </div>

            {/* Add Lesson */}
            <div className="admin-card">
                <div className="admin-form-group">
                    <input
                        className="admin-input"
                        placeholder="Lesson Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleCreate}
                >
                Add Lesson
                </button>
            </div>

            {/* Content List */}
            <div className="admin-card">
                <ul className="admin-list">
                    {content.map((item) => (
                        <li key={item.id} className="admin-list-item">
                            <span className="admin-list-title">
                            {item.title}
                            </span>

                            <div className="admin-list-actions">
                                <button
                                    className="admin-btn admin-btn-danger"
                                    onClick={() => handleDelete(item.id)}
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

export default AdminCourseContent;