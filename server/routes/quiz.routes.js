const express = require('express');
const { getQuizByCourse, submitQuiz } = require('../controllers/quiz');

const router = express.Router();

router.get('/:courseId', getQuizByCourse);
router.post('/submit', submitQuiz);

module.exports = router;
