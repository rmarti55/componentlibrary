import { useState } from 'react'
import { ComponentCategory } from '@/types/Component'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Code, Eye, Copy } from 'lucide-react'

interface CategoryPreviewProps {
  category: ComponentCategory
}

export function CategoryPreview({ category }: CategoryPreviewProps) {
  const [selectedVariant, setSelectedVariant] = useState(category.variants[0])
  const [selectedState, setSelectedState] = useState(selectedVariant?.states?.[0])
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (selectedVariant?.code) {
      await navigator.clipboard.writeText(selectedVariant.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
          {category.description && (
            <p className="text-muted-foreground mt-1">{category.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleCopyCode} size="sm" disabled={!selectedVariant?.code}>
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="showcase" className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList>
              <TabsTrigger value="showcase">
                <Eye className="w-4 h-4 mr-2" />
                Showcase
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="showcase" className="flex-1 m-0 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              {/* Variant Selection */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Variants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setSelectedState(variant.states?.[0])
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border hover:bg-muted'
                        }`}
                      >
                        <div className="font-medium text-sm">{variant.name}</div>
                        {variant.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {variant.description}
                          </div>
                        )}
                        {variant.interactive && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Interactive
                          </Badge>
                        )}
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* State Selection */}
                {selectedVariant?.states && selectedVariant.states.length > 1 && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-sm">States</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedVariant.states.map((state, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedState(state)}
                          className={`w-full text-left p-2 rounded border transition-colors ${
                            selectedState === state
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border hover:bg-muted'
                          }`}
                        >
                          <div className="font-medium text-xs">{state.name}</div>
                          {state.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {state.description}
                            </div>
                          )}
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Component Preview */}
              <div className="lg:col-span-3">
                <Card className="h-full">
                  <CardContent className="p-8 h-full flex items-center justify-center component-preview">
                    {selectedVariant && (
                      <div className="w-full">
                        {selectedVariant.id === 'filter-chip-interactive' ? (
                          <div className="space-y-6">
                            <div className="text-center mb-4">
                              <h3 className="text-lg font-semibold mb-2">{selectedVariant.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedState?.description || selectedVariant.description}
                              </p>
                            </div>
                            
                            {selectedState && (
                              <div className="flex justify-center">
                                <selectedVariant.component {...selectedState.props} />
                              </div>
                            )}
                            
                            {selectedVariant.states && selectedVariant.states.length > 1 && (
                              <div className="mt-8">
                                <h4 className="text-sm font-medium mb-4 text-center">All States</h4>
                                <div className="flex flex-wrap gap-4 justify-center">
                                  {selectedVariant.states.map((state, index) => (
                                    <div key={index} className="text-center">
                                      <selectedVariant.component {...state.props} />
                                      <p className="text-xs text-muted-foreground mt-2">{state.name}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : selectedVariant.id === 'multi-brand-dashboard' ? (
                          <div className="w-full h-full overflow-auto">
                            <div className="text-center mb-4">
                              <h3 className="text-lg font-semibold mb-2">{selectedVariant.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {selectedVariant.description}
                              </p>
                            </div>
                            <selectedVariant.component {...(selectedState?.props || selectedVariant.props)} />
                          </div>
                        ) : (
                          <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">{selectedVariant.name}</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                              {selectedVariant.description}
                            </p>
                            <div className="flex justify-center">
                              <selectedVariant.component {...(selectedState?.props || selectedVariant.props)} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="flex-1 m-0 p-6">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <pre className="text-sm overflow-auto h-full p-6 bg-slate-950 text-slate-100 rounded-lg">
                  <code className="language-tsx">
                    {selectedVariant?.code || '// Code not available for this variant'}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Tags */}
      {category.tags && category.tags.length > 0 && (
        <>
          <Separator />
          <div className="p-6">
            <h4 className="text-sm font-medium mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {category.tags.map(tag => (
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