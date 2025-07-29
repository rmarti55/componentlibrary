import { useEffect, useState } from 'react'

interface AIChatPreviewProps {
  code: string
}

export function AIChatPreview({ code }: AIChatPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) return

    try {
      // Extract component name from code
      const componentMatch = code.match(/const\s+(\w+):\s*React\.FC|const\s+(\w+)\s*=\s*\(|export\s+default\s+(\w+)/)
      const componentName = componentMatch?.[1] || componentMatch?.[2] || componentMatch?.[3] || 'GeneratedComponent'

      // Create a simple component from the code
      // This is a basic implementation - in production you'd want a more robust solution
      const processedCode = code
        .replace(/import.*?from.*?['"];?\n?/g, '') // Remove imports
        .replace(/export\s+default\s+.*?;?\n?/g, '') // Remove export default
        .replace(/interface.*?{[\s\S]*?}/g, '') // Remove TypeScript interfaces
        .replace(/:\s*React\.FC<.*?>/g, '') // Remove React.FC typing
        .replace(/:\s*React\.ComponentType<.*?>/g, '') // Remove ComponentType typing

      // Create a function that returns the component
      const componentFunction = new Function('React', `
        ${processedCode}
        return ${componentName};
      `)

      // Create a simple React-like object for the component
      const ReactMock = {
        createElement: (type: any, props: any, ...children: any[]) => {
          if (typeof type === 'string') {
            const element = document.createElement(type)
            if (props) {
              Object.keys(props).forEach(key => {
                if (key === 'className') {
                  element.className = props[key]
                } else if (key === 'onClick') {
                  element.onclick = props[key]
                } else if (key.startsWith('on')) {
                  ;(element as any)[key.toLowerCase()] = props[key]
                } else {
                  element.setAttribute(key, props[key])
                }
              })
            }
            children.forEach(child => {
              if (typeof child === 'string') {
                element.textContent = child
              } else if (child) {
                element.appendChild(child)
              }
            })
            return element
          }
          return null
        }
      }

      const component = componentFunction(ReactMock)
      setComponent(() => component)
      setError(null)
    } catch (err) {
      setError('Failed to render component preview')
      setComponent(null)
    }
  }, [code])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!Component) {
    return <div className="text-gray-500">Loading preview...</div>
  }

  // For now, render a simple placeholder since dynamic component rendering is complex
  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-2">Component Preview</div>
      <div className="text-xs text-gray-500">
        Dynamic preview coming soon...
      </div>
    </div>
  )
} 