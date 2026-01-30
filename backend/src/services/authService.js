import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import '../config/env.js';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;


export const registerUser = async(name, email, password) => {
    // hash password
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // save user to db
    const result = await pool.query(
        'INSERT INTO users (name, password_hash, email) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, hash, email]
    );

    const user = result.rows[0];

    // generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d"
    });

    return { user, token };
};


export const loginUser = async(email, password) => {
    // finding user in the db
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    // checking if the user exists
    if(result.rows[0] === 0) throw new Error("User not found");
    const user = result.rows[0];

    // checking if the password is correct
    const match = await bcrypt.compare(password, user.password_hash);
    if(!match) throw new Error("Invalid Credentials");

    // generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d"
    });

    return { user: { id: user.id, email: user.email, name: user.name }, token };
};