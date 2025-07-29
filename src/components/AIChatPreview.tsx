import { useEffect, useState } from 'react'

interface AIChatPreviewProps {
  code: string
}

export function AIChatPreview({ code }: AIChatPreviewProps) {
  const [componentInfo, setComponentInfo] = useState<{
    name: string
    type: string
    props: string[]
    children: string
  } | null>(null)

  useEffect(() => {
    if (!code) return

    try {
      // Extract component name
      const nameMatch = code.match(/const\s+(\w+)|export\s+default\s+(\w+)/)
      const componentName = nameMatch?.[1] || nameMatch?.[2] || 'Component'

      // Extract component type (button, div, etc.)
      const typeMatch = code.match(/<(\w+)/)
      const componentType = typeMatch?.[1] || 'div'
      
      // Check if it's a button component by looking for button-related patterns
      const isButton = code.includes('<button') || code.includes('button') || componentName.toLowerCase().includes('button')

      // Extract props
      const propsMatch = code.match(/interface\s+\w+Props\s*{([^}]*)}/)
      const propsText = propsMatch?.[1] || ''
      const props = propsText.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('//'))
        .map(line => line.replace(/[?:;].*$/, '').trim())
        .filter(Boolean)

      // Extract children content
      const childrenMatch = code.match(/\{children\}/)
      const hasChildren = !!childrenMatch

      setComponentInfo({
        name: componentName,
        type: isButton ? 'button' : componentType,
        props: props,
        children: hasChildren ? 'Dynamic content' : 'No children'
      })
    } catch (err) {
      setComponentInfo(null)
    }
  }, [code])

  if (!componentInfo) {
    return <div className="text-gray-500">Analyzing component...</div>
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-2">{componentInfo.name}</h3>
        <div className="text-sm text-gray-600 mb-4">
          A {componentInfo.type} component
        </div>
      </div>

      {/* Visual representation */}
      <div className="flex justify-center">
        <div className={`${componentInfo.type === 'button' ? 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors' : 'border p-4'} text-center`}>
          {componentInfo.children}
        </div>
      </div>

      {/* Component info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div><strong>Type:</strong> {componentInfo.type}</div>
        <div><strong>Props:</strong> {componentInfo.props.length > 0 ? componentInfo.props.join(', ') : 'None'}</div>
        <div><strong>Children:</strong> {componentInfo.children}</div>
      </div>
    </div>
  )
} 