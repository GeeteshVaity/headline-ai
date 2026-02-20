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

const TONES = ['professional', 'casual', 'humorous', 'urgent', 'inspirational'];

export async function GET() {
  return Response.json({
    styles: HEADLINE_STYLES,
    tones: TONES
  });
}
