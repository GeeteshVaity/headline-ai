const groqService = require('../services/groqService');

// Available headline styles
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

// Available tones
const TONES = ['professional', 'casual', 'humorous', 'urgent', 'inspirational'];

exports.generateHeadlines = async (req, res) => {
  try {
    const { topic, style = 'youtube', tone = 'casual', count = 10 } = req.body;

    if (!topic || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (topic.length > 200) {
      return res.status(400).json({ error: 'Topic must be 200 characters or less' });
    }

    const validCount = Math.min(Math.max(parseInt(count) || 10, 1), 20);

    const headlines = await groqService.generateHeadlines(
      topic.trim(),
      style,
      tone,
      validCount
    );

    res.json({
      success: true,
      topic,
      style: HEADLINE_STYLES[style] || HEADLINE_STYLES.youtube,
      tone,
      count: headlines.length,
      headlines
    });
  } catch (error) {
    console.error('Error generating headlines:', error);
    res.status(500).json({ 
      error: 'Failed to generate headlines',
      message: error.message 
    });
  }
};

exports.getStyles = (req, res) => {
  res.json({
    styles: HEADLINE_STYLES,
    tones: TONES
  });
};
