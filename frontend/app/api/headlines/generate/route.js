import { generateHeadlines } from '@/lib/groq';

const HEADLINE_STYLES = {
  youtube: {
    name: 'YouTube Video',
    description: 'Engaging, clickable titles for YouTube videos',
    icon: '🎬'
  },
  blog: {
    name: 'Blog Post',
    description: 'SEO-friendly titles for blog articles',
    icon: '📝'
  },
  listicle: {
    name: 'Listicle',
    description: 'Number-based list headlines',
    icon: '📋'
  },
  howto: {
    name: 'How-To Guide',
    description: 'Tutorial and guide style titles',
    icon: '📚'
  },
  controversial: {
    name: 'Controversial',
    description: 'Bold, opinion-grabbing headlines',
    icon: '🔥'
  },
  emotional: {
    name: 'Emotional',
    description: 'Headlines that trigger emotions',
    icon: '💖'
  }
};

export async function POST(request) {
  try {
    const { topic, style = 'youtube', tone = 'casual', count = 10 } = await request.json();

    if (!topic || topic.trim().length === 0) {
      return Response.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (topic.length > 200) {
      return Response.json({ error: 'Topic must be 200 characters or less' }, { status: 400 });
    }

    const validCount = Math.min(Math.max(parseInt(count) || 10, 1), 20);

    const headlines = await generateHeadlines(
      topic.trim(),
      style,
      tone,
      validCount
    );

    return Response.json({
      success: true,
      topic,
      style: HEADLINE_STYLES[style] || HEADLINE_STYLES.youtube,
      tone,
      count: headlines.length,
      headlines
    });
  } catch (error) {
    console.error('Error generating headlines:', error);
    return Response.json({ 
      error: 'Failed to generate headlines',
      message: error.message 
    }, { status: 500 });
  }
}
