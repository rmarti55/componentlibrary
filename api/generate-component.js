import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a React component generator. Create React components with TypeScript, Tailwind CSS, and follow the existing patterns in this codebase. Also categorize the component as 'atom', 'molecule', or 'organism' based on complexity. Return JSON with 'code' and 'category' fields.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 2048
    })

    const response = completion.choices[0]?.message?.content || ''
    
    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(response)
      return res.status(200).json({ 
        componentCode: parsed.code, 
        category: parsed.category || 'atom' 
      })
    } catch {
      // Fallback to plain text if not JSON
      return res.status(200).json({ 
        componentCode: response, 
        category: 'atom' 
      })
    }
  } catch (error) {
    console.error('Groq API error:', error)
    return res.status(500).json({ error: 'Failed to generate component' })
  }
} 