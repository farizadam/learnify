export default function CategoryCard({ category }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center cursor-pointer hover:scale-105 transform">
      <div className="text-5xl mb-4">{category.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {category.count} courses
      </p>
    </div>
  );
}
