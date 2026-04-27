const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); 
const { getUserInfo, updateUserInfo, deleteUser, enrollCourse,enrollLesson, getAllCoursesOfInstructor,getAllCoursesEnrolled } = require('../controllers/user');

router.get('/me', verifyToken, getUserInfo);
router.put('/me', verifyToken, updateUserInfo);
router.delete('/me', verifyToken, deleteUser);
router.post('/enroll-course/:courseId', verifyToken, enrollCourse);
router.post('/enroll-lesson/:lessonId', verifyToken, enrollLesson);
router.get('/teacher/courses', verifyToken, getAllCoursesOfInstructor);
router.get('/student/courses', verifyToken, getAllCoursesEnrolled);

module.exports = router;