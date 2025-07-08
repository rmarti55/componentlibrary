import { useState } from 'react'
import { ComponentSidebar } from '@/components/ComponentSidebar'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CategoryPreview } from '@/components/CategoryPreview'
import { Component, ComponentCategory } from '@/types/Component'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<Component | ComponentCategory | null>(null)

  const handleComponentSelect = (component: Component | ComponentCategory) => {
    setSelectedComponent(component)
  }

  // Check if selected item is a category
  const isCategory = (item: Component | ComponentCategory | null): item is ComponentCategory => {
    return item !== null && 'variants' in item
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

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isCategory(selectedComponent) ? (
          <CategoryPreview category={selectedComponent} />
        ) : (
          <ComponentPreview component={selectedComponent} />
        )}
      </div>
    </div>
  )
}

export default App 