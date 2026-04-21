const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Ensure this matches your file structure
const { getUserInfo } = require('../controllers/user'); // Ensure this matches your file structure
//route to get user info
router.get('/user',verifyToken,getUserInfo);


module.exports = router;