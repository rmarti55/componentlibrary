import { useState } from 'react'
import { Component, ComponentCategory } from '@/types/Component'
import { componentCategories } from '@/data/componentCategories'
import { Search, EyeOff, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ComponentSidebarProps {
  selectedComponent: Component | ComponentCategory | null
  onComponentSelect: (component: Component | ComponentCategory) => void
}

const ATOMIC_SECTIONS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'atoms', label: 'Atoms' },
  { id: 'molecules', label: 'Molecules' },
  { id: 'organisms', label: 'Organisms' },
]

export function ComponentSidebar({
  selectedComponent,
  onComponentSelect
}: ComponentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [hiddenComponents, setHiddenComponents] = useState<Component[]>([])
  const [showHidden, setShowHidden] = useState(false)

  // Flat list of all variants, grouped by atomic section
  const atomicVariants = ATOMIC_SECTIONS.map(section => {
    const category = componentCategories.find(cat => cat.id === section.id)
    return {
      ...section,
      variants: category ? category.variants.filter(variant => {
        const matchesSearch =
          variant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          variant.description?.toLowerCase().includes(searchQuery.toLowerCase())
        // Hide if in hiddenComponents
        const isHidden = hiddenComponents.some(h => h.id === variant.id)
        return matchesSearch && !isHidden
      }) : []
    }
  })

  // Helper to find the original section for a hidden component
  const getSectionLabel = (component: Component) => {
    for (const section of ATOMIC_SECTIONS) {
      const category = componentCategories.find(cat => cat.id === section.id)
      if (category && category.variants.some(variant => variant.id === component.id)) {
        return section.label
      }
    }
    return ''
  }

  // Hide a component
  const handleHide = (component: Component) => {
    setHiddenComponents(prev => [...prev, component])
  }

  // Unhide a component
  const handleUnhide = (component: Component) => {
    setHiddenComponents(prev => prev.filter(c => c.id !== component.id))
  }

  return (
    <div className="h-full flex flex-col bg-background border-r relative">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Flat Atomic Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {atomicVariants.map(section => (
          <div key={section.id} className="space-y-2">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1 mb-1">
              {section.label}
            </div>
            {section.variants.length === 0 ? (
              <div className="text-xs text-muted-foreground px-2 py-4">No components</div>
            ) : (
              section.variants.map(variant => (
                <Card
                  key={variant.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md flex items-center justify-between",
                    selectedComponent?.id === variant.id && "ring-2 ring-primary shadow-md"
                  )}
                  onClick={() => onComponentSelect({
                    id: section.id,
                    name: section.label,
                    description: '',
                    variants: [variant],
                    layout: 'showcase',
                    tags: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                  })}
                >
                  <CardContent className="p-2 flex flex-row items-center w-full justify-between">
                    <div>
                      <h3 className="font-medium text-xs leading-snug truncate">{variant.name}</h3>
                      {variant.description && (
                        <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                          {variant.description}
                        </p>
                      )}
                    </div>
                    <button
                      className="ml-2 p-1 rounded group"
                      onClick={e => {
                        e.stopPropagation();
                        handleHide(variant as Component)
                      }}
                      title="Hide component"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground group-hover:text-black" />
                    </button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Hidden Components Bar */}
      <div className="absolute left-0 bottom-0 w-full border-t bg-background">
        <button
          className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted focus:outline-none"
          onClick={() => setShowHidden(v => !v)}
        >
          <span>Hidden Components</span>
          <span className="ml-2">{showHidden ? '▲' : '▼'}</span>
        </button>
        {showHidden && hiddenComponents.length > 0 && (
          <div className="p-2 space-y-2 max-h-40 overflow-y-auto">
            {hiddenComponents.map(component => (
              <Card key={component.id} className="flex items-center justify-between">
                <CardContent className="p-2 flex flex-row items-center w-full justify-between">
                  <div>
                    <h3 className="font-medium text-xs leading-snug truncate">{component.name}</h3>
                    <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                      {component.description}
                    </p>
                    <span className="text-[10px] text-muted-foreground">{getSectionLabel(component)}</span>
                  </div>
                  <button
                    className="ml-2 p-1 rounded group"
                    onClick={() => handleUnhide(component)}
                    title="Unhide component"
                  >
                    <EyeOff className="w-4 h-4 text-muted-foreground group-hover:text-black" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 