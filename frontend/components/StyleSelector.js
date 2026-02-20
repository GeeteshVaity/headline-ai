'use client';

export default function StyleSelector({ styles, selected, onSelect }) {
  const styleEntries = Object.entries(styles);

  if (styleEntries.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Content Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {styleEntries.map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`p-3 rounded-xl border-2 transition-all text-left ${
              selected === key
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="text-2xl mb-1">{value.icon}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {value.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
              {value.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
