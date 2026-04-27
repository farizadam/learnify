import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Clock, BookOpen, Download, Share2, CheckCircle, Play } from 'lucide-react';
import LessonItem from '../components/LessonItem';
import ProgressBar from '../components/ProgressBar';
import { courses, enrolledCourses } from '../data/placeholderData';

export default function CoursePage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));
  const enrolledCourse = enrolledCourses.find(c => c.id === parseInt(id));
  const [completedLessons, setCompletedLessons] = useState(
    enrolledCourse ? enrolledCourse.lessons : course.lessons.map(() => false)
  );
  const [isEnrolled, setIsEnrolled] = useState(!!enrolledCourse);
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Course not found</p>
      </div>
    );
  }

  const toggleLessonCompletion = (index) => {
    const updated = [...completedLessons];
    updated[index] = !updated[index];
    setCompletedLessons(updated);
  };

  const completedCount = completedLessons.filter(Boolean).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100);
  const courseObjectives = [
    'Master the fundamentals of this course',
    'Build real-world projects',
    'Understand best practices',
    'Get certified upon completion'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header with Video Player */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Video Player Area */}
          <div className="relative bg-black h-96 w-full flex items-center justify-center">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-70" />
            <button className="absolute flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
              <Play size={24} fill="white" />
              Watch Preview
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  <Share2 size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  <Download size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-8 border-y border-gray-300 dark:border-gray-700">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star size={20} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {course.rating}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Rating</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Price</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(course.students / 1000).toFixed(1)}K
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Students</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={20} className="text-green-600 dark:text-green-400" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {course.lessons.length}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Lessons</p>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="mb-8 pb-8 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructor
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-600"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.instructor.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Expert Instructor with 10+ years experience
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsEnrolled(!isEnrolled)}
                className={`flex-1 py-4 rounded-lg font-bold text-lg transition ${
                  isEnrolled
                    ? 'bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isEnrolled ? (
                  <>
                    <CheckCircle size={20} />
                    Enrolled
                  </>
                ) : (
                  'Enroll Now'
                )}
              </button>
              {isEnrolled && progress >= 80 && (
                <Link
                  to="/certificates"
                  className="flex-1 py-4 rounded-lg font-bold text-lg bg-purple-600 hover:bg-purple-700 text-white transition text-center"
                >
                  🏆 Get Certificate
                </Link>
              )}
            </div>

            {/* Course Objectives */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What you'll learn
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseObjectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        {isEnrolled && (
          <>
            <div className="flex gap-4 mb-8 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-bold border-b-2 transition ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                <BookOpen size={20} className="inline mr-2" />
                Lessons
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-6 py-3 font-bold border-b-2 transition ${
                  activeTab === 'quiz'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                ✓ Quiz
              </button>
            </div>

            {/* Lessons Tab */}
            {activeTab === 'overview' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Course Curriculum
                  </h2>
                  <ProgressBar progress={progress} />
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    {completedCount} of {course.lessons.length} lessons completed ({progress}%)
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {course.lessons.map((lesson, index) => (
                    <LessonItem
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={completedLessons[index]}
                      onToggle={() => toggleLessonCompletion(index)}
                    />
                  ))}
                </div>

                {completedCount === course.lessons.length && (
                  <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg p-6 text-center">
                    <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                      ✓ You've completed all lessons! Ready for the quiz?
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    📝 Course Quiz
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Test your knowledge by taking the course quiz. You need 80% to pass!
                  </p>
                  <Link
                    to={`/course/${course.id}/quiz`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
                  >
                    Start Quiz Now →
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Not Enrolled Message */}
        {!isEnrolled && (
          <div className="bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Enroll to Access Course Content
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-6">
              Enroll in this course to view lessons, take quizzes, and earn your certificate.
            </p>
            <button
              onClick={() => setIsEnrolled(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
            >
              Enroll Now
            </button>
          </div>
        )}

        {/* Quiz Quick Access */}
        {!isEnrolled && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Test Your Knowledge?</h3>
            <p className="text-purple-100 mb-6">
              Enroll in this course and take the comprehensive quiz to test your skills!
            </p>
            <button
              onClick={() => setIsEnrolled(true)}
              className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition text-lg"
            >
              🎯 Enroll & Access Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
