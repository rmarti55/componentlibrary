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
          content: `You are a React component generator. Create React components with TypeScript and Tailwind CSS.

IMPORTANT: 
1. Return ONLY the component code without any markdown formatting, explanations, or additional text.
2. The component should be a valid React TypeScript component that can be directly compiled and rendered.
3. Use Tailwind CSS classes for styling.
4. Make the component match the user's request exactly (e.g., if they ask for a blue button, make it blue).
5. Include proper TypeScript interfaces for props.

Example format:
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Component: React.FC<ComponentProps> = ({ children, className = '', onClick }) => {
  return (
    <button 
      className={\`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded \${className}\`}
      onClick={onClick}
    >
      {children || 'Click me'}
    </button>
  );
};

export default Component;

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
    
    // Clean the response to remove markdown formatting
    let cleanCode = response
    
    // Remove markdown code blocks
    cleanCode = cleanCode.replace(/```typescript\s*/g, '')
    cleanCode = cleanCode.replace(/```tsx\s*/g, '')
    cleanCode = cleanCode.replace(/```jsx\s*/g, '')
    cleanCode = cleanCode.replace(/```\s*/g, '')
    
    // Remove explanations and markdown text
    const lines = cleanCode.split('\n')
    const codeLines = []
    let inCode = false
    
    for (const line of lines) {
      // Skip lines that are clearly explanations
      if (line.trim().startsWith('Here is') || 
          line.trim().startsWith('You can use') ||
          line.trim().startsWith('The category') ||
          line.trim().startsWith('Example') ||
          line.trim().startsWith('// Example') ||
          line.trim().startsWith('// Usage') ||
          line.trim().startsWith('// App.tsx')) {
        continue
      }
      
      // If we find import React, we're in the code
      if (line.includes('import React') || line.includes('import {') || line.includes('interface') || line.includes('const ') || line.includes('export default')) {
        inCode = true
      }
      
      if (inCode) {
        codeLines.push(line)
      }
    }
    
    cleanCode = codeLines.join('\n').trim()
    
    // Determine category based on component complexity
    let category = 'atom'
    if (cleanCode.includes('useState') || cleanCode.includes('useEffect') || cleanCode.includes('useContext')) {
      category = 'molecule'
    }
    if (cleanCode.includes('useState') && cleanCode.includes('useEffect') && cleanCode.length > 500) {
      category = 'organism'
    }

    return res.status(200).json({ 
      componentCode: cleanCode, 
      category: category 
    })
  } catch (error) {
    console.error('Groq API error:', error)
    return res.status(500).json({ error: 'Failed to generate component' })
  }
} 