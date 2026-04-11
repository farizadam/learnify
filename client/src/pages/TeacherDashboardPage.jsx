import { useState } from 'react';
import { Plus, Eye, Trash2, Edit } from 'lucide-react';

export default function TeacherDashboardPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'React.js Basics',
      students: 45,
      sections: 5,
      resources: 12,
      createdDate: '2024-01-15',
      published: true,
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      students: 28,
      sections: 8,
      resources: 20,
      createdDate: '2024-02-01',
      published: true,
    },
  ]);

  const [showNewCourse, setShowNewCourse] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <button
            onClick={() => setShowNewCourse(!showNewCourse)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            <Plus size={20} />
            Create Course
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Courses</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Students</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{courses.reduce((sum, c) => sum + c.students, 0)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Total Resources</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{courses.reduce((sum, c) => sum + c.resources, 0)}</p>
          </div>
        </div>

        {/* Create Course Form */}
        {showNewCourse && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Course</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Course description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Category</label>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Web Development</option>
                  <option>Mobile Apps</option>
                  <option>Data Science</option>
                  <option>Cloud Computing</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewCourse(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Courses List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created on {new Date(course.createdDate).toLocaleDateString()}</p>
                </div>
                {course.published && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold px-4 py-2 rounded-full text-sm">
                    Published
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sections</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.sections}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resources</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{course.resources}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                  <Edit size={18} />
                  Edit
                </button>
                <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-2 px-4 rounded-lg transition">
                  <Eye size={18} />
                  Preview
                </button>
                <button className="flex items-center gap-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 font-bold py-2 px-4 rounded-lg transition">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
