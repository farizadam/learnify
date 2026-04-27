export default function ProgressBar({ progress }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress</span>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{progress}%</span>
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
