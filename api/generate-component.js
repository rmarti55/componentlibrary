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
          content: `You are a React component generator. Create React components with TypeScript, Tailwind CSS, and follow the existing patterns in this codebase. Return only the component code, no explanations.`
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

    const componentCode = completion.choices[0]?.message?.content || ''
    return res.status(200).json({ componentCode })
  } catch (error) {
    console.error('Groq API error:', error)
    return res.status(500).json({ error: 'Failed to generate component' })
  }
} 