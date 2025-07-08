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

  // Only show the preview for the selected variant (no grid, no color palette, no extra)
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{selectedVariant.name}</h2>
          {selectedVariant.description && (
            <p className="text-muted-foreground mt-1">{selectedVariant.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleCopyCode} size="sm" disabled={!selectedVariant?.code}>
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
      </div>
      {/* Preview */}
      <div className="flex-1 flex items-center justify-center">
        {selectedState ? (
          <selectedVariant.component {...selectedState.props} />
        ) : (
          <selectedVariant.component />
        )}
      </div>
    </div>
  )
} 