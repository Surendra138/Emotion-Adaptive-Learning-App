import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="admin-page-center">
            <div className="admin-container admin-container-centered">
                <div className="admin-card admin-panel">

                    {/* Centered Title */}
                    <h1 className="admin-title admin-title-centered">
                    Admin Panel
                    </h1>

                    {/* Logout Top Right */}
                    <button
                        className="admin-btn admin-btn-danger admin-logout-btn"
                        onClick={logout}
                    >
                    Logout
                    </button>

                    <div className="admin-action-group">
                        <button
                            className="admin-btn admin-btn-primary"
                            onClick={() => navigate("/admin/courses")}
                        >
                        Manage Courses
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;