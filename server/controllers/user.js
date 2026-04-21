import mongoose from 'mongoose';
import userModel from '../models/User.js';

// Get user info

const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        
        // Exclude password
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { getUserInfo };