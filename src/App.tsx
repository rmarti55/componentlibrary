import { useState } from 'react'
import { ComponentSidebar } from '@/components/ComponentSidebar'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CategoryPreview } from '@/components/CategoryPreview'
import { Component, ComponentCategory } from '@/types/Component'
import BuildsSidebar from '@/components/BuildsSidebar'
import MobileBuildPreview from '@/components/MobileBuildPreview'
import AIChat from '@/components/AIChat'

function App() {
  const [selectedComponent, setSelectedComponent] = useState<Component | ComponentCategory | null>(null)
  const [view, setView] = useState<'components' | 'builds' | 'ai'>('components')
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
      {/* Top Bar with Tab Selector */}
      <div className="absolute left-0 top-0 w-full z-10 bg-background border-b flex items-center h-20 px-8">
        <div className="flex space-x-8">
          <button
            className={`text-2xl font-bold tracking-tight transition-colors ${
              view === 'components' 
                ? 'text-foreground border-b-2 border-primary pb-1' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setView('components')}
          >
            Components
          </button>
                      <button
              className={`text-2xl font-bold tracking-tight transition-colors ${
                view === 'builds' 
                  ? 'text-foreground border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setView('builds')}
            >
              Builds
            </button>
            <button
              className={`text-2xl font-bold tracking-tight transition-colors ${
                view === 'ai' 
                  ? 'text-foreground border-b-2 border-primary pb-1' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setView('ai')}
            >
              AI
            </button>
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
        ) : view === 'builds' ? (
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
        ) : (
          <div className="flex-1 overflow-hidden">
            <AIChat />
          </div>
        )}
      </div>
    </div>
  )
}

export default App 