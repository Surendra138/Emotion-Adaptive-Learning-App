import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };


    return (
        <div className="auth-page">
        <div className="auth-container">
            <h2 className="auth-title">Login</h2>

            {error && <p className="auth-error">{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
                <input 
                    className="auth-input"
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input 
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit" className="auth-button">Login</button>
            </form>

            <p className="auth-footer">
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
        </div>
    );
};
