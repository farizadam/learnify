import { Clock, BookOpen, TrendingUp } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { enrolledCourses, upcomingLessons } from '../data/placeholderData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Courses Enrolled</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  {enrolledCourses.length}
                </p>
              </div>
              <BookOpen size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Learning Streak</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  12 days
                </p>
              </div>
              <TrendingUp size={40} className="text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Hours Learned</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  47.5 hours
                </p>
              </div>
              <Clock size={40} className="text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Courses
              </h2>

              <div className="space-y-6">
                {enrolledCourses.map(course => (
                  <div
                    key={course.id}
                    className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {course.instructor}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {course.progress}%
                      </span>
                    </div>
                    <ProgressBar progress={course.progress} />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                      {course.lessons.filter(Boolean).length} of {course.lessons.length} lessons completed
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Upcoming Lessons
            </h2>

            <div className="space-y-4">
              {upcomingLessons.map(lesson => (
                <div
                  key={lesson.id}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {lesson.courseName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {lesson.lessonTitle}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {lesson.time}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {lesson.instructor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
