import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(cors());

// Session Middleware
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logiin"
});

//  Register User
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        await db.execute(query, [name, email, hashedPassword, role]);

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Attempt - Email:", email);

        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Store user in session
        req.session.user = { id: user.id, role: user.role };

        res.json({ success: true, role: user.role });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Logout Route
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});

// Admin Route (Only accessible to admins)
app.get('/admin', (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
        res.json({ message: "Welcome Admin!" });
    } else {
        res.status(403).json({ message: "Access Denied" });
    }
});

// User Dashboard (Only accessible to users)
app.get('/user', (req, res) => {
    if (req.session.user && req.session.user.role === "user") {
        res.json({ message: "Welcome User!" });
    } else {
        res.status(403).json({ message: "Access Denied" });
    }
});

// ✅ Start Server
app.listen(8111, () => {
    console.log("Server running on http://localhost:8111");
});
