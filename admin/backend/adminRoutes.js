const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');

const router = express.Router();

// Admin Registration Endpoint
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new admin into the database
            const query = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, hashedPassword], (err, results) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });

                res.status(201).json({ message: 'Admin registered successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
