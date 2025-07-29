import { useState } from 'react'
import { ComponentSidebar } from '@/components/ComponentSidebar'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CategoryPreview } from '@/components/CategoryPreview'
import { Component, ComponentCategory } from '@/types/Component'
import BuildsSidebar from '@/components/BuildsSidebar'
import MobileBuildPreview from '@/components/MobileBuildPreview'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<Component | ComponentCategory | null>(null)
  const [view, setView] = useState<'components' | 'builds'>('components')
  const [selectedBuildId, setSelectedBuildId] = useState('mobile-reviews-stack')
  const builds = [
    { id: 'mobile-reviews-stack', name: 'Mobile Reviews Stack' }
  ]

  const handleComponentSelect = (component: Component | ComponentCategory) => {
    setSelectedComponent(component)
  }

  const isCategory = (item: Component | ComponentCategory | null): item is ComponentCategory => {
    return item !== null && 'variants' in item
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Top Bar with Dropdown */}
      <div className="absolute left-0 top-0 w-full z-10 bg-background border-b flex items-center h-20 px-8">
        <div className="relative">
          <select
            className="text-2xl font-bold tracking-tight bg-transparent border-none px-0 py-0 focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
            value={view}
            onChange={e => setView(e.target.value as 'components' | 'builds')}
          >
            <option value="components">Components</option>
            <option value="builds">Builds</option>
          </select>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex w-full pt-20">
        {view === 'components' ? (
          <>
            <div className="w-80 flex-shrink-0">
              <ComponentSidebar
                selectedComponent={selectedComponent}
                onComponentSelect={handleComponentSelect}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              {selectedComponent ? (
                isCategory(selectedComponent) ? (
                  <CategoryPreview category={selectedComponent} />
                ) : (
                  <ComponentPreview component={selectedComponent} />
                )
              ) : null}
            </div>
          </>
        ) : (
          <>
            <BuildsSidebar
              builds={builds}
              selectedBuildId={selectedBuildId}
              onSelect={setSelectedBuildId}
            />
            <div className="flex-1 overflow-hidden">
              <MobileBuildPreview />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App 