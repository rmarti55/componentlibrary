import { useEffect, useState } from 'react'
import { DynamicComponentRenderer } from './DynamicComponentRenderer'

interface AIChatPreviewProps {
  code: string
}

interface ComponentDefinition {
  type: string
  props: {
    className?: string
    children?: string
    [key: string]: any
  }
}

export function AIChatPreview({ code }: AIChatPreviewProps) {
  const [componentDefinition, setComponentDefinition] = useState<ComponentDefinition | null>(null)
  const [componentInfo, setComponentInfo] = useState<{
    name: string
    type: string
    props: string[]
    children: string
  } | null>(null)

  useEffect(() => {
    if (!code) return

    try {
      // Parse the JSON component definition
      const parsedDefinition: ComponentDefinition = JSON.parse(code)
      
      // Extract component info from the JSON structure
      const componentType = parsedDefinition.type || 'div'
      const props = parsedDefinition.props || {}
      const children = props.children || 'No children'
      
      // Extract prop names (excluding className and children)
      const propNames = Object.keys(props).filter(key => key !== 'className' && key !== 'children')

      setComponentDefinition(parsedDefinition)
      setComponentInfo({
        name: componentType,
        type: componentType.toLowerCase(),
        props: propNames,
        children: children
      })
    } catch (err) {
      console.error('Failed to parse component definition:', err)
      setComponentDefinition(null)
      setComponentInfo(null)
    }
  }, [code])

  if (!componentInfo || !componentDefinition) {
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

      {/* Visual representation using DynamicComponentRenderer */}
      <div className="flex justify-center">
        <DynamicComponentRenderer definition={componentDefinition} />
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