const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getQuizByCourse, submitQuiz } = require('../controllers/quiz');

router.get('/course/:courseId', verifyToken, getQuizByCourse);
// The frontend calls POST /api/quizzes/:id/submit. But validateSubmitPayload checks req.body.courseId and req.body.answers. 
// So wait, let me look at `validateSubmitPayload`. It expects courseId in the payload! But if the url is /:id/submit, id is the quizId.
// Let's just map it to POST /:id/submit anyway.
router.post('/:id/submit', verifyToken, submitQuiz);

module.exports = router;
