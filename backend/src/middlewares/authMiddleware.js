import jwt from "jsonwebtoken";
import "../config/env.js";
import { pool } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Fetch user from DB
    const result = await pool.query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = result.rows[0]; // attach full user inf
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
