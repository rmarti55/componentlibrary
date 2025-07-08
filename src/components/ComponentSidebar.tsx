import React from 'react'
import { Component, ComponentCategory } from '@/types/Component'
import { componentCategories } from '@/data/componentCategories'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  const [searchQuery, setSearchQuery] = React.useState('')

  // Flat list of all variants, grouped by atomic section
  const atomicVariants = ATOMIC_SECTIONS.map(section => {
    const category = componentCategories.find(cat => cat.id === section.id)
    return {
      ...section,
      variants: category ? category.variants.filter(variant => {
        const matchesSearch =
          variant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          variant.description?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
      }) : []
    }
  })

  return (
    <div className="h-full flex flex-col bg-background border-r">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
                    "cursor-pointer transition-all hover:shadow-md",
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
                  <CardContent className="p-2">
                    <div className="space-y-0.5">
                      <h3 className="font-medium text-xs leading-snug truncate">{variant.name}</h3>
                      {variant.description && (
                        <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                          {variant.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 