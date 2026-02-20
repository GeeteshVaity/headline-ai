'use client';

export default function HistoryPanel({ history, onLoad, onClear, onClose }) {
  if (history.length === 0) {
    return (
      <div className="card-gradient backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">History</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No history yet. Generate some headlines!
        </p>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card-gradient backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">History</h3>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-4"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onLoad(item)}
            className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {item.topic}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(item.timestamp)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                {item.style?.icon} {item.style?.name}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
                {item.tone}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                {item.headlines?.length} headlines
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
