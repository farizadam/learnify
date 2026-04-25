const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const sanitizeQuestions = (questions = []) =>
	questions.map(({ question, options }) => ({
		question,
		options: Array.isArray(options) ? options : [],
	}));

const calculateQuizResult = (questions, answers) => {
	const total = questions.length;

	const score = questions.reduce((runningScore, question, index) => {
		const submittedAnswer = answers[index];

		if (!Number.isInteger(submittedAnswer)) {
			return runningScore;
		}

		if (
			!Array.isArray(question.options) ||
			submittedAnswer < 0 ||
			submittedAnswer >= question.options.length
		) {
			return runningScore;
		}

		return submittedAnswer === question.correctAnswer ? runningScore + 1 : runningScore;
	}, 0);

	const percentage = total === 0 ? 0 : Number(((score / total) * 100).toFixed(2));

	return {
		score,
		total,
		percentage,
	};
};

const validateSubmitPayload = (payload) => {
	const normalizedPayload = payload && typeof payload === 'object' ? payload : {};
	const courseId =
		typeof normalizedPayload.courseId === 'string'
			? normalizedPayload.courseId.trim()
			: normalizedPayload.courseId;
	const { answers } = normalizedPayload;

	if (!courseId || !isValidObjectId(courseId)) {
		return {
			valid: false,
			statusCode: 400,
			message: 'A valid courseId is required.',
		};
	}

	if (!Array.isArray(answers)) {
		return {
			valid: false,
			statusCode: 400,
			message: 'answers must be an array of option indexes.',
		};
	}

	if (answers.some((answer) => !Number.isInteger(answer))) {
		return {
			valid: false,
			statusCode: 400,
			message: 'Each answer must be an integer option index.',
		};
	}

	return {
		valid: true,
		courseId,
		answers,
	};
};

const buildAttemptContext = ({ req, quiz, answers, result }) => ({
	userId: req.user?._id || req.user?.id || null,
	courseId: quiz.courseId.toString(),
	quizId: quiz._id.toString(),
	answers,
	...result,
	attemptedAt: new Date(),
});

const getQuizByCourse = async (req, res, next) => {
	try {
		const { courseId } = req.params;

		if (!courseId || !isValidObjectId(courseId)) {
			return res.status(400).json({ message: 'Invalid courseId format.' });
		}

		const quiz = await Quiz.findOne({ courseId }).select('courseId title questions').lean();

		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found for the provided courseId.' });
		}

		return res.status(200).json({
			courseId: quiz.courseId.toString(),
			title: quiz.title,
			questions: sanitizeQuestions(quiz.questions),
		});
	} catch (error) {
		if (typeof next === 'function') {
			return next(error);
		}

		return res.status(500).json({ message: 'Internal server error.' });
	}
};

const submitQuiz = async (req, res, next) => {
	try {
		const payloadValidation = validateSubmitPayload(req.body);

		if (!payloadValidation.valid) {
			return res
				.status(payloadValidation.statusCode)
				.json({ message: payloadValidation.message });
		}

		const { courseId, answers } = payloadValidation;

		const quiz = await Quiz.findOne({ courseId })
			.select('_id courseId questions.correctAnswer questions.options')
			.lean();

		if (!quiz) {
			return res.status(404).json({ message: 'Quiz not found for the provided courseId.' });
		}

		const questions = Array.isArray(quiz.questions) ? quiz.questions : [];

		if (answers.length !== questions.length) {
			return res
				.status(400)
				.json({ message: `answers length must match total questions (${questions.length}).` });
		}

		const result = calculateQuizResult(questions, answers);

		// Makes attempt metadata available to downstream middleware for persistence/progress tracking.
		res.locals.quizAttempt = buildAttemptContext({
			req,
			quiz,
			answers,
			result,
		});

		return res.status(200).json(result);
	} catch (error) {
		if (typeof next === 'function') {
			return next(error);
		}

		return res.status(500).json({ message: 'Internal server error.' });
	}
};

module.exports = {
	getQuizByCourse,
	submitQuiz,
};
