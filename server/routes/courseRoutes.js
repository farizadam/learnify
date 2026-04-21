const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createCourse, getAllCourses, getCourseById } = require('../controllers/course');

router.post('/', verifyToken, createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;
