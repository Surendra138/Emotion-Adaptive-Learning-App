import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./dashboard.css";
import { getAllCourses } from "../../api/course.api";
import EmotionCapture from "../../components/EmotionCapture";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const [theme, setTheme] = useState("light");
    const [emotion, setEmotion] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [courses, setCourses] = useState([]);

    const lastLesson = {
        course: "Data Structures",
        lesson: "Recursion Basics",
    };

    const emotionEmoji = {
        happy: "😄",
        sad: "😢",
        angry: "😠",
        fear: "😨",
        surprise: "😲",
        disgust: "🤢",
        neutral: "😐"
    };

    const fetchCourses = async () => {
        try {
            const res = await getAllCourses();
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    useEffect(() => {
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

                    <div className="emotion-wrapper">
                        <EmotionCapture
                            onEmotionDetected={setEmotion}
                            onConfidenceDetected={setConfidence}
                        />

                        {emotion && (
                            <div className="emotion-info">
                                <h2>Emotion: {emotion}</h2>
                                <p>Confidence: {confidence}%</p>
                                <h2>
                                    {emotionEmoji[emotion?.toLowerCase()] || "😐"} {emotion}
                                </h2>
                            </div>
                        )}
                    </div>
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
                                style={{ width: `${course.progress_percentage || 0}%` }}
                            ></div>
                        </div>
                        <p>{course.progress_percentage || 0}% Completed</p>
                        <button className="secondary-btn">Resume</button>
                    </div>
                ))}
            </div>

        </div>
    );
}
