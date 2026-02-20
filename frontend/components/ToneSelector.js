'use client';

const TONE_ICONS = {
  professional: '👔',
  casual: '😊',
  humorous: '😂',
  urgent: '⚡',
  inspirational: '🌟'
};

export default function ToneSelector({ tones, selected, onSelect }) {
  if (!tones || tones.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Tone
      </label>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <button
            key={tone}
            type="button"
            onClick={() => onSelect(tone)}
            className={`px-4 py-2 rounded-full border-2 transition-all capitalize flex items-center gap-2 ${
              selected === tone
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>{TONE_ICONS[tone] || '📝'}</span>
            <span className="text-sm font-medium">{tone}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
