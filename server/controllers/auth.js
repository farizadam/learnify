    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    const User = require('../models/User'); // Ensure this matches your file structure
    const jwt = require('jsonwebtoken');
    // --- CONTROLLERS ---
    const register = async (req, res) => {
        try {
            const { firstName, lastName, email, password, role, bio } = req.body;

            // Check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" }); // Changed 404 to 400 (Bad Request)
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user (Note: naming must match your User Schema exactly)
            const newUser = new User({
                firstName, // Use camelCase to stay consistent
                lastName,
                email,
                password: hashedPassword,
                role: role || 'student',
                bio: bio || '',
                isVerified: false,
            });

            await newUser.save();
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong during registration" });
        }
    };

    const login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Generate Token
            // Including id, role, and name so the frontend doesn't have to fetch them again
            const token = jwt.sign(
                { 
                    id: user._id, 
                    role: user.role, 
                    email: user.email, 
                    firstName: user.firstName, 
                    lastName: user.lastName 
                }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong during login" });
        }
    };

    const logout = async (req, res) => {
        // Since JWT is stateless, we can't truly "log out" on the server side without implementing token blacklisting.
        // For now, the frontend can simply delete the token to "log out".
        res.status(200).json({ message: "Logged out successfully (frontend should delete the token)" });
    };


    module.exports = {register, login, logout };