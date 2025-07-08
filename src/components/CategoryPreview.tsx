import { ComponentCategory } from '@/types/Component'

interface CategoryPreviewProps {
  category: ComponentCategory
}

export function CategoryPreview({ category }: CategoryPreviewProps) {
  const variant = category.variants[0]
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold tracking-tight">{variant.name}</h2>
        {variant.description && (
          <p className="text-muted-foreground mt-1">{variant.description}</p>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <variant.component />
      </div>
    </div>
  )
} 