# Catchy Headline Generator 🎯

Generate click-worthy headlines for YouTube videos and blog posts using AI.

## Features

- **6 Content Styles**: YouTube, Blog, Listicle, How-To, Controversial, Emotional
- **5 Tones**: Professional, Casual, Humorous, Urgent, Inspirational
- **Adjustable Count**: Generate 1-20 headlines at once
- **Copy to Clipboard**: One-click copy for individual or all headlines
- **History**: Save and reload previous generations
- **Dark Mode**: Eye-friendly dark theme support
- **Responsive Design**: Works on desktop and mobile
- **Character Count**: Shows optimal headline length indicator

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Next.js 14, React, Tailwind CSS
- **AI**: Groq API (Llama 3.3 70B)

## Quick Start

### 1. Backend Setup

```bash
cd third/backend
npm install
npm run dev
```

Backend runs on http://localhost:5002

### 2. Frontend Setup

```bash
cd third/frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3001

## Environment Variables

### Backend (.env)

```env
PORT=5002
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URL=http://localhost:3001
```

## API Endpoints

### Generate Headlines
```
POST /api/headlines/generate
Body: {
  "topic": "Exercise",
  "style": "youtube",
  "tone": "casual",
  "count": 10
}
```

### Get Available Styles
```
GET /api/headlines/styles
```

### Health Check
```
GET /api/health
```

## Usage

1. Enter a topic (e.g., "Productivity", "Cooking", "Fitness")
2. Select a content style (YouTube, Blog, etc.)
3. Choose a tone (Professional, Casual, etc.)
4. Adjust the number of headlines (1-20)
5. Click "Generate Headlines"
6. Copy individual headlines or all at once
7. Access previous generations from History

## License

MIT
