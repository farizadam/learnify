import { useState } from 'react';
import CourseCard from './CourseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CoursesCarousel({ courses }) {
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById('courses-carousel');
    const scrollAmount = 320;
    const newPos = scrollPos + (direction === 'left' ? -scrollAmount : scrollAmount);
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    setScrollPos(newPos);
  };

  return (
    <div className="relative py-6">
      <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar" id="courses-carousel">
        {courses.map(course => (
          <div key={course.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
      
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition hidden md:block"
      >
        <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
      </button>
      
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition hidden md:block"
      >
        <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
      </button>
      
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
