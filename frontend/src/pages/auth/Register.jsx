import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
        <div className="auth-container">
            <h2 className="auth-title">Register</h2>

            {error && <p className="auth-error">{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
                <input 
                    className="auth-input"
                    type="name" 
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                />
                
                <input 
                    className="auth-input"
                    type="email" 
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                />
                
                <input 
                    className="auth-input"
                    type="password" 
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                />
                
                <button type="submit" className="auth-button">Register</button>
            </form>

            <p className="auth-footer">
                Already have account? <Link to="/login">Login</Link>
            </p>
        </div>
        </div>
    );
};
