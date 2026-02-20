'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import HeadlineCard from '../components/HeadlineCard';
import StyleSelector from '../components/StyleSelector';
import ToneSelector from '../components/ToneSelector';
import HistoryPanel from '../components/HistoryPanel';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('youtube');
  const [tone, setTone] = useState('casual');
  const [count, setCount] = useState(10);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [styles, setStyles] = useState({});
  const [tones, setTones] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch available styles and tones
  useEffect(() => {
    fetch('/api/headlines/styles')
      .then(res => res.json())
      .then(data => {
        setStyles(data.styles || {});
        setTones(data.tones || []);
      })
      .catch(err => console.error('Failed to fetch styles:', err));

    // Load history from localStorage
    const savedHistory = localStorage.getItem('headlineHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const generateHeadlines = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setLoading(true);
    setHeadlines([]);

    try {
      const response = await fetch('/api/headlines/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), style, tone, count })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate headlines');
      }

      setHeadlines(data.headlines);
      
      // Save to history
      const historyItem = {
        id: Date.now(),
        topic: data.topic,
        style: data.style,
        tone: data.tone,
        headlines: data.headlines,
        timestamp: new Date().toISOString()
      };
      
      const newHistory = [historyItem, ...history.slice(0, 19)]; // Keep last 20
      setHistory(newHistory);
      localStorage.setItem('headlineHistory', JSON.stringify(newHistory));
      
      toast.success(`Generated ${data.headlines.length} headlines!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setTopic(item.topic);
    setHeadlines(item.headlines);
    setShowHistory(false);
    toast.success('Loaded from history');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('headlineHistory');
    toast.success('History cleared');
  };

  const copyAllHeadlines = () => {
    const text = headlines.join('\n');
    navigator.clipboard.writeText(text);
    toast.success('All headlines copied!');
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Catchy Headline Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate click-worthy titles for YouTube videos & blog posts
          </p>
        </div>

        {/* Generator Form */}
        <form onSubmit={generateHeadlines} className="card-gradient backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Exercise, Productivity, Cooking..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {topic.length}/200
            </div>
          </div>

          {/* Style Selector */}
          <StyleSelector 
            styles={styles} 
            selected={style} 
            onSelect={setStyle} 
          />

          {/* Tone Selector */}
          <ToneSelector 
            tones={tones} 
            selected={tone} 
            onSelect={setTone} 
          />

          {/* Count Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Headlines: <span className="text-purple-600 font-bold">{count}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                '✨ Generate Headlines'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="sm:w-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300 font-medium"
            >
              📜 History ({history.length})
            </button>
          </div>
        </form>

        {/* History Panel */}
        {showHistory && (
          <HistoryPanel 
            history={history}
            onLoad={loadFromHistory}
            onClear={clearHistory}
            onClose={() => setShowHistory(false)}
          />
        )}

        {/* Results */}
        {headlines.length > 0 && (
          <div className="card-gradient backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Headlines
              </h2>
              <button
                onClick={copyAllHeadlines}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                📋 Copy All
              </button>
            </div>
            
            <div className="space-y-3">
              {headlines.map((headline, index) => (
                <HeadlineCard 
                  key={index} 
                  headline={headline} 
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && headlines.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="text-6xl mb-4">💡</div>
            <p>Enter a topic above to generate catchy headlines!</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by AI • Made with ❤️</p>
        </footer>
      </div>
    </main>
  );
}
