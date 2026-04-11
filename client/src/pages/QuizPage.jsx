import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Clock, Home, RotateCcw } from 'lucide-react';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const quiz = {
    title: 'React.js Basics Quiz',
    description: 'Test your knowledge of React fundamentals',
    timeLimit: 30,
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: 'What is React?',
        explanation: 'React is a JavaScript library created by Facebook for building user interfaces with components and making them interactive.',
        options: ['A template engine', 'A JavaScript library for UI', 'A database', 'A server framework'],
        correct: 1,
        section: 'Introduction to React',
      },
      {
        id: 2,
        question: 'What are hooks?',
        explanation: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components.',
        options: ['CSS properties', 'Functions for state and side effects', 'Event listeners', 'Database connections'],
        correct: 1,
        section: 'Hooks',
      },
      {
        id: 3,
        question: 'What is JSX?',
        explanation: 'JSX is a syntax extension to JavaScript that produces React "elements". It looks similar to HTML but is actually JavaScript.',
        options: ['JavaScript XML', 'Java extension', 'Just X markup', 'JSON syntax'],
        correct: 0,
        section: 'JSX and Components',
      },
      {
        id: 4,
        question: 'What does useState do?',
        explanation: 'useState is a Hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.',
        options: ['Creates a component', 'Manages component state', 'Routes pages', 'Fetches data'],
        correct: 1,
        section: 'Hooks',
      },
      {
        id: 5,
        question: 'How do you pass data to a component?',
        explanation: 'Props (short for properties) are used to pass data from parent components to child components in React.',
        options: ['Using props', 'Using state', 'Using context', 'Using localStorage'],
        correct: 0,
        section: 'State and Props',
      },
      {
        id: 6,
        question: 'What is the virtual DOM?',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM kept in memory. React uses it to compare changes and update only what changed in the actual DOM.',
        options: ['A database', 'A lightweight copy of the real DOM', 'A CSS selector', 'A testing library'],
        correct: 1,
        section: 'React Concepts',
      },
    ],
  };

  const handleAnswerClick = (index) => {
    if (answers[currentQuestion] !== undefined) return; // Prevent changing answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);

    if (index === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowReview(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📝 {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {quiz.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-yellow-500 font-bold">
              <Clock size={20} />
              {quiz.timeLimit} min
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1}/{quiz.questions.length}
            </span>
            <div className="w-48 bg-gray-300 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {!showScore ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Question */}
            <div className="mb-8">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-4 py-2 rounded-full inline-block mb-4">
                {quiz.questions[currentQuestion].section}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {quiz.questions[currentQuestion].question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {quiz.questions[currentQuestion].options.map((option, index) => {
                const isSelected = answers[currentQuestion] === index;
                const isCorrect = index === quiz.questions[currentQuestion].correct;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answers[currentQuestion] !== undefined}
                    className={`w-full p-4 rounded-lg text-left text-lg font-semibold transition ${
                      isSelected
                        ? 'bg-blue-600 text-white border-2 border-blue-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent'
                    } ${
                      answers[currentQuestion] !== undefined
                        ? 'cursor-not-allowed opacity-75'
                        : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && answers[currentQuestion] !== undefined && (
                        <span className="text-xl">
                          {isCorrect ? '✓' : '✗'}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation (shown after answering) */}
            {answers[currentQuestion] !== undefined && (
              <div className={`p-4 rounded-lg mb-8 ${
                answers[currentQuestion] === quiz.questions[currentQuestion].correct
                  ? 'bg-green-100 dark:bg-green-900 border-l-4 border-green-600'
                  : 'bg-red-100 dark:bg-red-900 border-l-4 border-red-600'
              }`}>
                <p className={`font-semibold mb-2 ${
                  answers[currentQuestion] === quiz.questions[currentQuestion].correct
                    ? 'text-green-900 dark:text-green-100'
                    : 'text-red-900 dark:text-red-100'
                }`}>
                  {answers[currentQuestion] === quiz.questions[currentQuestion].correct
                    ? '✓ Correct!'
                    : '✗ Incorrect'}
                </p>
                <p className={
                  answers[currentQuestion] === quiz.questions[currentQuestion].correct
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }>
                  {quiz.questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {/* Navigation Button */}
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition text-lg"
            >
              {currentQuestion === quiz.questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
              {currentQuestion === quiz.questions.length - 1 ? '✓' : '→'}
            </button>
          </div>
        ) : !showReview ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            {/* Score Card */}
            <div className="mb-8">
              <div className={`text-7xl font-bold mb-4 ${
                percentage >= quiz.passingScore
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {percentage}%
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quiz Completed!
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                You scored <span className="font-bold">{score}</span> out of{' '}
                <span className="font-bold">{quiz.questions.length}</span> questions correctly.
              </p>
            </div>

            {/* Pass/Fail Message */}
            {percentage >= quiz.passingScore ? (
              <div className="bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-700 rounded-lg p-8 mb-8">
                <p className="text-green-900 dark:text-green-100 font-semibold text-lg">
                  🎉 Congratulations! You passed the quiz!
                </p>
                <p className="text-green-800 dark:text-green-200 mt-2">
                  You can now download your certificate of completion.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-700 rounded-lg p-8 mb-8">
                <p className="text-yellow-900 dark:text-yellow-100 font-semibold text-lg">
                  Keep Learning! 📚
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 mt-2">
                  You need at least {quiz.passingScore}% to pass and earn your certificate.
                </p>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                Score Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score}/{quiz.questions.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Wrong Answers</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{quiz.questions.length - score}/{quiz.questions.length}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowReview(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-lg"
              >
                Review Answers
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Answer Review
              </h2>
              <button
                onClick={() => setShowReview(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {quiz.questions.map((question, idx) => {
                const isCorrect = answers[idx] === question.correct;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-lg border-2 ${
                      isCorrect
                        ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900'
                        : 'border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <Circle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">
                          Q{idx + 1}. {question.question}
                        </p>
                        <p className={`text-sm font-semibold mb-3 ${
                          isCorrect
                            ? 'text-green-700 dark:text-green-200'
                            : 'text-red-700 dark:text-red-200'
                        }`}>
                          {isCorrect ? '✓ Your answer is correct' : '✗ Your answer is incorrect'}
                        </p>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded mb-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Your answer:</span> {question.options[answers[idx]]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                              <span className="font-semibold">Correct answer:</span> {question.options[question.correct]}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          <span className="font-semibold">Tip:</span> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleRestart}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
