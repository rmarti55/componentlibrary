import React, { useState, useEffect } from 'react'
import * as Babel from '@babel/standalone'

interface DynamicComponentRendererProps {
  code: string
  props?: Record<string, any>
}

export function DynamicComponentRenderer({ code, props = {} }: DynamicComponentRendererProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Clean the code - remove imports and exports, keep only the component
      let cleanCode = code
        .replace(/import.*?from.*?['"];?\n?/g, '') // Remove imports
        .replace(/export\s+default\s+/, '') // Remove export default
        .replace(/export\s+/, '') // Remove other exports
        .trim()

      // If the code doesn't start with a function/const declaration, wrap it
      if (!cleanCode.match(/^(const|function|class)\s+/)) {
        cleanCode = `const DynamicComponent = ${cleanCode}`
      }

      // Add React import and return statement if needed
      if (!cleanCode.includes('React')) {
        cleanCode = `const React = require('react');\n${cleanCode}`
      }

      // Ensure the component is returned
      if (!cleanCode.includes('return') && !cleanCode.includes('=>')) {
        cleanCode = `${cleanCode}\nreturn DynamicComponent;`
      }

      // Compile the code
      const compiled = Babel.transform(cleanCode, {
        presets: ['react', 'typescript'],
        filename: 'dynamic-component.tsx'
      }).code

      // Create the component function
      const componentFunction = new Function('React', 'require', compiled)
      const ReactModule = { createElement: React.createElement }
      const requireModule = (name: string) => {
        if (name === 'react') return ReactModule
        return {}
      }

      const DynamicComponent = componentFunction(React, requireModule)
      setComponent(() => DynamicComponent)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compile component')
      setComponent(null)
    }
  }, [code])

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="text-red-800 font-medium mb-2">Component Error:</div>
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg">
        <div className="text-gray-600">Compiling component...</div>
      </div>
    )
  }

  try {
    return <Component {...props} />
  } catch (renderError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
        <div className="text-red-800 font-medium mb-2">Render Error:</div>
        <div className="text-red-600 text-sm">
          {renderError instanceof Error ? renderError.message : 'Failed to render component'}
        </div>
      </div>
    )
  }
} 