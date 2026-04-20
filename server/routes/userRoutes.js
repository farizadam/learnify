const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Ensure this matches your file structure

//route to get user info
router.get('/user',verifyToken);


module.exports = router;