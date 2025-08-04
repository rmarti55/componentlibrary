import { COMPONENT_MAP, ComponentDefinition } from './TrustedComponentMap'

interface DynamicComponentRendererProps {
  definition: ComponentDefinition
}

// Normalize component definition to handle malformed AI responses
const normalizeDefinition = (def: any): ComponentDefinition => {
  console.log('🔍 Raw definition received:', def)
  
  let props = def.props || {}
  console.log('🔍 Initial props:', props, 'Type:', typeof props)
  
  // 🔥 FIX: Handle props as JSON string
  if (typeof props === "string") {
    try {
      props = JSON.parse(props)
      console.log('🔍 Parsed props from string:', props)
    } catch (err) {
      console.error("❌ Invalid props JSON string", err)
      props = {}
    }
  }
  
  // If children exists at top level but not in props, move it to props
  if (def.children && !props.children) {
    props.children = def.children
    console.log('🔍 Moved children to props:', props.children)
  }
  
  // Ensure we have a valid type
  const type = def.type || 'Div'
  console.log('🔍 Component type:', type)
  
  // Add default children for buttons if missing
  if (type === 'Button' && !props.children) {
    props.children = 'Click me'
    console.log('🔍 Added default button children')
  }
  
  const normalized = {
    type: type as keyof typeof COMPONENT_MAP,
    props
  }
  
  console.log('🔍 Final normalized definition:', normalized)
  return normalized
}

export function DynamicComponentRenderer({ definition }: DynamicComponentRendererProps) {
  console.log('🎯 DynamicComponentRenderer called with:', definition)
  
  // Normalize the definition first
  const normalizedDefinition = normalizeDefinition(definition)
  const Component = COMPONENT_MAP[normalizedDefinition.type]
  
  console.log('🎯 Component found:', !!Component, 'Type:', normalizedDefinition.type)
  console.log('🎯 Props to be passed:', normalizedDefinition.props)
  
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
    console.log('🎯 Rendering component with props:', normalizedDefinition.props)
    const rendered = <Component {...normalizedDefinition.props} />
    console.log('🎯 Component rendered successfully')
    return rendered
  } catch (error) {
    console.error('❌ Render error:', error)
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