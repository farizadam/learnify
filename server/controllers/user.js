const User = require('../models/User');

// Get user info

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        // Exclude password
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getUserInfo };