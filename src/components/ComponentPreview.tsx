import React, { useState } from 'react'
import { Component } from '@/types/Component'
import { Code, Eye, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import FilterChips from './FilterChips'
import CommentsChip from './CommentsChip'
import FilterChip from './FilterChip'
import MultiBrandDashboard from './MultiBrandDashboard'
import StarIcon from './StarIcon'

interface ComponentPreviewProps {
  component: Component | null
}

// Component registry for rendering
const componentRegistry: Record<string, React.ComponentType<any>> = {
  'filter-chips': FilterChips,
  'comments-chip': CommentsChip,
  'filter-chip': FilterChip,
  'multi-brand-dashboard': MultiBrandDashboard,
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [variantTab, setVariantTab] = useState<{ [key: string]: 'preview' | 'code' }>({})

  // Helper for StarIcon code snippets
  const starIconCode = {
    Filled: `<StarIcon filled />`,
    Outlined: `<StarIcon filled={false} />`,
    'Half-filled': `<span style={{ position: 'relative', display: 'inline-block', width: 20, height: 20 }}>
  <StarIcon filled style={{ position: 'absolute', left: 0, top: 0, width: 20, height: 20, clipPath: 'inset(0 50% 0 0)' }} />
  <StarIcon filled={false} style={{ width: 20, height: 20 }} />
</span>`
  }

  if (!component) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Component Selected</h3>
          <p className="text-sm">Select a component from the sidebar to preview it here.</p>
        </div>
      </div>
    )
  }

  // Helper to get variants array or wrap single component as a variant
  const getVariants = (comp: any) => {
    if (Array.isArray(comp.variants) && comp.variants.length > 0) {
      return comp.variants
    }
    // If no variants, treat as a single variant
    return [{
      name: comp.name,
      description: comp.description,
      component: comp.component,
      props: comp.props || {},
      code: comp.code,
    }]
  }

  const variants = getVariants(component)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{component.name}</h2>
          {component.description && (
            <p className="text-muted-foreground mt-1">{component.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {component.figmaUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={component.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Figma
              </a>
            </Button>
          )}
          <Button onClick={async () => {
            if (component?.code) {
              await navigator.clipboard.writeText(component.code)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }
          }} size="sm">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex flex-col gap-8 w-full">
            {variants.map((variant: any, idx: number) => {
              // Special StarIcon logic for code preview
              let code = variant.code
              if (component.id === 'star-icon') {
                code = starIconCode[variant.name as keyof typeof starIconCode] || ''
              }
              // Special StarIcon logic for preview
              let preview = null
              if (component.id === 'star-icon') {
                if (variant.name === 'Filled') preview = <StarIcon filled className="text-yellow-400 w-10 h-10" />
                else if (variant.name === 'Outlined') preview = <StarIcon filled={false} className="text-yellow-400 w-10 h-10" />
                else if (variant.name === 'Half-filled') preview = (
                  <span style={{ position: 'relative', display: 'inline-block', width: 40, height: 40 }}>
                    <StarIcon filled className="text-yellow-400 absolute left-0 top-0 w-10 h-10" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                    <StarIcon filled={false} className="text-yellow-400 w-10 h-10" />
                  </span>
                )
              } else if (variant.component) {
                const Comp = variant.component
                preview = <Comp {...(variant.props || {})} />
              }
              return (
                <div key={variant.name || idx} className="mb-8">
                  <div className="font-semibold text-lg mb-1">{variant.name}</div>
                  <div className="text-xs text-muted-foreground mb-3">{variant.description}</div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={`px-3 py-1 rounded ${variantTab[variant.name] !== 'code' ? 'bg-primary text-white' : 'bg-muted text-black'}`}
                      onClick={() => setVariantTab(tabs => ({ ...tabs, [variant.name]: 'preview' }))}
                    >
                      Preview
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${variantTab[variant.name] === 'code' ? 'bg-primary text-white' : 'bg-muted text-black'}`}
                      onClick={() => setVariantTab(tabs => ({ ...tabs, [variant.name]: 'code' }))}
                    >
                      Code
                    </button>
                  </div>
                  <div className="mt-4">
                    {variantTab[variant.name] === 'code' ? (
                      <pre className="bg-slate-950 text-slate-100 rounded p-4 text-sm overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    ) : (
                      <div className="flex items-center justify-center">{preview}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Component Info */}
      {component.tags && component.tags.length > 0 && (
        <>
          <Separator />
          <div className="p-6">
            <h4 className="text-sm font-medium mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {component.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
} 