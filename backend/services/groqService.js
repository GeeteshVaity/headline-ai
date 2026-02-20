const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const STYLE_PROMPTS = {
  youtube: 'YouTube video titles that are clickable, engaging, and make viewers want to click. Include elements like curiosity gaps, numbers, and emotional triggers.',
  blog: 'SEO-optimized blog post titles that are informative, keyword-rich, and encourage readers to click through.',
  listicle: 'List-based headlines with numbers (e.g., "7 Ways...", "10 Secrets...") that promise specific, actionable content.',
  howto: 'Tutorial-style titles starting with "How to" or similar instructional phrases that promise to teach something valuable.',
  controversial: 'Bold, provocative headlines that challenge conventional wisdom and spark debate or curiosity.',
  emotional: 'Headlines that trigger strong emotions like excitement, fear of missing out, hope, or surprise.'
};

const TONE_MODIFIERS = {
  professional: 'Use a professional, authoritative tone.',
  casual: 'Use a casual, friendly, conversational tone.',
  humorous: 'Add wit, humor, and playfulness to the titles.',
  urgent: 'Create a sense of urgency and importance.',
  inspirational: 'Make the titles uplifting and motivational.'
};

exports.generateHeadlines = async (topic, style, tone, count) => {
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.youtube;
  const toneModifier = TONE_MODIFIERS[tone] || TONE_MODIFIERS.casual;

  const prompt = `Generate exactly ${count} catchy, click-worthy headlines about "${topic}".

Style: ${stylePrompt}
Tone: ${toneModifier}

Requirements:
- Each headline should be unique and creative
- Headlines should be 50-80 characters long (optimal for clicks)
- Use proven headline formulas (curiosity, numbers, questions, how-to, etc.)
- Make them irresistible to click
- Mix different headline structures for variety

Return ONLY a JSON array of strings with the headlines, no explanations or additional text.
Example format: ["Headline 1", "Headline 2", "Headline 3"]`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert copywriter and content strategist specializing in viral headlines. You create headlines that get clicks while maintaining quality and relevance. Always respond with valid JSON arrays only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9,
      max_tokens: 1024
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the JSON response
    const cleanedResponse = response.trim();
    const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const headlines = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(headlines)) {
      throw new Error('Response is not an array');
    }

    return headlines.slice(0, count);
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to generate headlines: ' + error.message);
  }
};
