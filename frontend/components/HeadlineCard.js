'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function HeadlineCard({ headline, index }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(headline);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const characterCount = headline.length;
  const isOptimalLength = characterCount >= 50 && characterCount <= 80;

  return (
    <div className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all">
      {/* Index Badge */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
        {index}
      </div>
      
      {/* Headline Text */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
          {headline}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <span className={`${isOptimalLength ? 'text-green-600' : 'text-yellow-600'}`}>
            {characterCount} chars
            {isOptimalLength && ' ✓'}
          </span>
        </div>
      </div>
      
      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className={`flex-shrink-0 p-2 rounded-lg transition-all ${
          copied 
            ? 'bg-green-100 dark:bg-green-900 text-green-600' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-600'
        }`}
        title="Copy to clipboard"
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
