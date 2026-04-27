const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { createCourse, getAllCourses, getCourseById,deleteCourse, getAllLessonsofCourse,updateCourse,getAllCategories} = require('../controllers/course');
const { createLesson, deleteLesson, getLessonById, updateLesson } = require('../controllers/lesson');

router.get('/', getAllCourses);
router.get('/categories', getAllCategories);
router.get('/:id', getCourseById);
router.post('/addLesson', verifyToken,createLesson)
router.post('/createCourse', verifyToken, createCourse);
router.delete('/deleteCourse/:courseId', verifyToken, deleteCourse);
router.delete('/deleteLesson/:lessonId', verifyToken, deleteLesson);
router.get('/:courseId/lessons', getAllLessonsofCourse);
router.get('/lesson/:lessonId', getLessonById);
router.patch('/updateLesson/:lessonId', verifyToken, updateLesson);
router.patch('/updateCourse/:courseId', verifyToken, updateCourse);

module.exports = router;
