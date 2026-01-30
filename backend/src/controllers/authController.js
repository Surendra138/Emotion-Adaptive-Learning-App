import { registerUser, loginUser } from '../services/authService.js';

export const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await registerUser(name, email, password);
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser(email, password);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};