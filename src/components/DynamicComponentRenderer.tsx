import { COMPONENT_MAP, ComponentDefinition } from './TrustedComponentMap'

interface DynamicComponentRendererProps {
  definition: ComponentDefinition
}

export function DynamicComponentRenderer({ definition }: DynamicComponentRendererProps) {
  const Component = COMPONENT_MAP[definition.type]
  
  if (!Component) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="text-red-800 font-medium mb-2">Unknown Component Type</div>
        <div className="text-red-600 text-sm">
          Component type "{definition.type}" is not supported
        </div>
      </div>
    )
  }

  try {
    return <Component {...definition.props} />
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