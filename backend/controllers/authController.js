// e-commerse-mini-project/backend/controllers/authController.js
const fs = require('fs');
const path = require('path');

const userPath = path.join(__dirname, '../models/User.json');

// Signup
const signup = (req, res) => {
    const { id, email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Fill all fields" });
    }

    const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'));

    const isUser = users.find(u => u.email === email);
    if (isUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push(req.body);
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Signup successful" });
};

// Login
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Fill all fields" });
    }

    const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'));

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
};

// ✅ Forgot Password
const forgotPassword = (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password required" });
        }

        const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'));

        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ message: "Email not found" });
        }

        users[userIndex].password = newPassword;

        fs.writeFileSync(userPath, JSON.stringify(users, null, 2));

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { signup, login, forgotPassword };
