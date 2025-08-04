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
          content: `You are a component definition generator. Generate structured JSON definitions for components instead of raw code.

IMPORTANT: 
1. Return ONLY a JSON object with 'type' and 'props' fields.
2. Use the available component types: Button, Card, Input, Text, Div, Span, Link
3. Use Tailwind CSS classes for styling in the className prop.
4. Make the component match the user's request exactly (e.g., if they ask for a blue button, make it blue with bg-blue-500 or bg-blue-600).
5. Include appropriate children content that matches the request.
6. For buttons, always use proper button styling with hover states.

Example format:
{
  "type": "Button",
  "props": {
    "className": "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors",
    "children": "Click me"
  }
}

Available component types:
- Button: for buttons and interactive elements (use proper button styling)
- Card: for container components with borders/shadows
- Input: for form inputs and text fields
- Text: for text content and paragraphs
- Div: for generic containers
- Span: for inline elements
- Link: for anchor links

Categorize as 'atom' for simple components, 'molecule' for components with state, 'organism' for complex components.`
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
    
    // Parse the JSON response
    let componentDefinition
    try {
      // Clean the response to remove markdown formatting
      let cleanResponse = response
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim()
      
      componentDefinition = JSON.parse(cleanResponse)
      
      // Validate the structure
      if (!componentDefinition.type || !componentDefinition.props) {
        throw new Error('Invalid component definition structure')
      }
      
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      // Fallback to a proper blue button
      componentDefinition = {
        type: 'Button',
        props: {
          className: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors',
          children: 'Click me'
        }
      }
    }
    
    // Determine category based on component type
    let category = 'atom'
    if (componentDefinition.type === 'Card' || componentDefinition.type === 'Div') {
      category = 'molecule'
    }

    return res.status(200).json({ 
      componentCode: JSON.stringify(componentDefinition), 
      category: category 
    })
  } catch (error) {
    console.error('Groq API error:', error)
    return res.status(500).json({ error: 'Failed to generate component' })
  }
} 