import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
        <div>
            <h2>Register</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="name" 
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                />
                <br /><br />
                <input 
                    type="email" 
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                />
                <br /><br />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    required
                />
                <br /><br />
                <button type="submit">Register</button>
            </form>

            <p>
                Already have account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};
