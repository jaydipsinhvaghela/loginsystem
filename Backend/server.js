import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logiin"
});

// ✅ Register User
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        await db.execute(query, [name, email, hashedPassword]);

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Attempt - Email:", email, "Password:", password); 

        // Run query
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        console.log("Query Result:", rows); 

        // If no user found
        if (!rows || rows.length === 0) {
            console.log("User Not Found in Database");
            return res.status(401).json({ message: "User not found" });
        }

        const user = rows[0];
        console.log("User Found:", user);

        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("password Match:", isMatch);

        if (!isMatch) {
            console.log("Password Incorrect");
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
        res.json({ success: true, token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Start Server
app.listen(8111, () => {
    console.log("server running on http://localhost:8111");
});
