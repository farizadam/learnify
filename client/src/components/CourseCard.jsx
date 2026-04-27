import { Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{course.description}</p>

        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Users size={16} />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            ${course.price}
          </span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          By {course.instructor.name}
        </p>

        <Link
          to={`/course/${course.id}`}
          className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
