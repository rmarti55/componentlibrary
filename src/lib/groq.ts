import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || ''
})

export async function generateComponent(prompt: string) {
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

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Groq API error:', error)
    throw error
  }
}

export default groq 