import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";
import { getAllCourses } from "../../api/course.api";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const [theme, setTheme] = useState("dark");
    const [emotion, setEmotion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    const lastLesson = {
        course: "Data Structures",
        lesson: "Recursion Basics",
    };

    const fetchEmotion = async () => {
        try {
            const res = await fetch("/api/emotion/analyze");
            const data = await res.json();
            setEmotion(data);
        } catch (err) {
            setError("Failed to analyze emotion");
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    useEffect(() => {
        fetchEmotion();
        fetchCourses();
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    return (
        <div className="dashboard-container">

            {/* ===== NAVBAR ===== */}
            <div className="navbar">
                <h2>Emotion Adaptive Learning</h2>
                <div className="nav-actions">
                    <button className="theme-btn" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* ===== WELCOME SECTION ===== */}
            <div className="welcome">
                <h1>Welcome back, {user.name} 👋</h1>
                <p>Ready to continue your learning journey?</p>
            </div>

            {/* ===== GRID SECTION ===== */}
            <div className="dashboard-grid">
        
                {/* ===== EMOTION CARD ===== */}
                <div className="card">
                    <h3>Your Current Emotion</h3>

                    {loading && <p>Analyzing your emotion...</p>}

                    {error && (
                    <>
                        <p className="card-error">{error}</p>
                        <button onClick={fetchEmotion}>Retry</button>
                    </>
                    )}

                    {!loading && !error && emotion && (
                    <>
                        <h2>{emotion.emotion}</h2>
                        <p>Confidence: {(emotion.confidence * 100).toFixed(0)}%</p>
                        <button onClick={fetchEmotion}>Analyze Again</button>
                    </>
                    )}
                </div>

                {/* ===== CONTINUE LEARNING CARD ===== */}
                <div className="card">
                    <h3>Continue Learning</h3>
                    <p><strong>{lastLesson.course}</strong></p>
                    <p>Lesson: {lastLesson.lesson}</p>
                    <button className="primary-btn">Resume</button>
                </div>

            </div>

            {/* ===== COURSES SECTION ===== */}
            <div className="courses-section">
                <h2>Your Courses</h2>

                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h4>{course.course_name}</h4>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${!course.progress_percentage && 0}%` }}
                            ></div>
                        </div>
                        <p>{!course.progress_percentage && 0}% Completed</p>
                        <button className="secondary-btn">Resume</button>
                    </div>
                ))}
            </div>

        </div>
    );
}
