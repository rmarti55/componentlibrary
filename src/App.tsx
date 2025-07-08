import { useState } from 'react'
import { ComponentSidebar } from '@/components/ComponentSidebar'
import { Component, ComponentCategory } from '@/types/Component'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<Component | ComponentCategory | null>(null)

  const handleComponentSelect = (component: Component | ComponentCategory) => {
    setSelectedComponent(component)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ComponentSidebar
          selectedComponent={selectedComponent}
          onComponentSelect={handleComponentSelect}
        />
      </div>
      {/* Main Content - now empty */}
      <div className="flex-1 overflow-hidden">
        {/* No preview or content shown */}
      </div>
    </div>
  )
}

export default App 