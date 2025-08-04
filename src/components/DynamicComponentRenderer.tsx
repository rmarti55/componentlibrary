import { COMPONENT_MAP, ComponentDefinition } from './TrustedComponentMap'

interface DynamicComponentRendererProps {
  definition: ComponentDefinition
}

// Normalize component definition to handle malformed AI responses
const normalizeDefinition = (def: any): ComponentDefinition => {
  // Start with existing props, don't create a new empty object
  const props = { ...(def.props || {}) }
  
  // If children exists at top level but not in props, move it to props
  if (def.children && !props.children) {
    props.children = def.children
  }
  
  // Ensure we have a valid type
  const type = def.type || 'Div'
  
  // Add default children for buttons if missing
  if (type === 'Button' && !props.children) {
    props.children = 'Click me'
  }
  
  return {
    type: type as keyof typeof COMPONENT_MAP,
    props
  }
}

export function DynamicComponentRenderer({ definition }: DynamicComponentRendererProps) {
  // Normalize the definition first
  const normalizedDefinition = normalizeDefinition(definition)
  const Component = COMPONENT_MAP[normalizedDefinition.type]
  
  if (!Component) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="text-red-800 font-medium mb-2">Unknown Component Type</div>
        <div className="text-red-600 text-sm">
          Component type "{normalizedDefinition.type}" is not supported
        </div>
      </div>
    )
  }

  try {
    return <Component {...normalizedDefinition.props} />
  } catch (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="text-red-800 font-medium mb-2">Render Error</div>
        <div className="text-red-600 text-sm">
          {error instanceof Error ? error.message : 'Failed to render component'}
        </div>
      </div>
    )
  }
} 