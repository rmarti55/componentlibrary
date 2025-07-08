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

  const handleCopyCode = async () => {
    if (component?.code) {
      await navigator.clipboard.writeText(component.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
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

  const ComponentToRender = componentRegistry[component.id]

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
          <Button onClick={handleCopyCode} size="sm">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="preview">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="flex-1 m-0 p-6">
            <Card className="h-full">
              <CardContent className="p-8 h-full flex items-center justify-center component-preview">
                {component.id === 'star-icon' ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-row items-end gap-8">
                      {/* Filled */}
                      <div className="flex flex-col items-center">
                        <StarIcon filled className="text-yellow-400 w-10 h-10" />
                        <span className="text-xs mt-2">Filled</span>
                      </div>
                      {/* Outlined */}
                      <div className="flex flex-col items-center">
                        <StarIcon filled={false} className="text-yellow-400 w-10 h-10" />
                        <span className="text-xs mt-2">Outlined</span>
                      </div>
                      {/* Half-filled */}
                      <div className="flex flex-col items-center">
                        <span style={{ position: 'relative', display: 'inline-block', width: 40, height: 40 }}>
                          <StarIcon filled className="text-yellow-400 absolute left-0 top-0 w-10 h-10" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                          <StarIcon filled={false} className="text-yellow-400 w-10 h-10" />
                        </span>
                        <span className="text-xs mt-2">Half-filled</span>
                      </div>
                      {/* 60%-filled */}
                      <div className="flex flex-col items-center">
                        <span style={{ position: 'relative', display: 'inline-block', width: 40, height: 40 }}>
                          <StarIcon filled className="text-yellow-400 absolute left-0 top-0 w-10 h-10" style={{ clipPath: 'inset(0 40% 0 0)' }} />
                          <StarIcon filled={false} className="text-yellow-400 w-10 h-10" />
                        </span>
                        <span className="text-xs mt-2">60%-filled</span>
                      </div>
                    </div>
                  </div>
                ) : ComponentToRender ? (
                  <div className="w-full">
                    {component.id === 'filter-chip' ? (
                      <div className="space-y-6">
                        <div className="text-center mb-4">
                          <p className="text-sm text-muted-foreground mb-4">Click to toggle states</p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                          <ComponentToRender label="Ads" defaultSelected={false} />
                          <ComponentToRender label="Comments" defaultSelected={true} />
                          <ComponentToRender label="Instagram" defaultSelected={false} hasDropdown={true} />
                          <ComponentToRender label="All Posts" defaultSelected={true} />
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-xs text-muted-foreground">
                            Unselected: Gray border • Selected: Blue background
                          </p>
                        </div>
                      </div>
                    ) : component.id === 'multi-brand-dashboard' ? (
                      <div className="w-full h-full overflow-auto">
                        <ComponentToRender />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <ComponentToRender />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8" />
                    </div>
                    <p className="mb-2">Component preview for {component.name}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Component: {component.name}</p>
                      {component.figmaNodeId && <p>Figma Node ID: {component.figmaNodeId}</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="flex-1 m-0 p-6">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <pre className="text-sm overflow-auto h-full p-6 bg-slate-950 text-slate-100 rounded-lg">
                  <code className="language-tsx">{component.code}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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