import { BookOpen, Clock, User } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Learn Anything, Become Anything
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Join millions of learners and unlock your potential with our world-class courses from industry experts.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 transition font-bold py-3 px-8 rounded-lg">
              Start Learning Today
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition">
              <BookOpen size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-blue-100">Learn from industry professionals</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition">
              <Clock size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Learn at Your Pace</h3>
              <p className="text-blue-100">Complete courses whenever you want</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition md:col-span-2">
              <User size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
              <p className="text-blue-100">Get lifetime access to all course materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
