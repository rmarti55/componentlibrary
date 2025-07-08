import { useState } from 'react'

interface CategoryPreviewProps {
  category: any
}

export function CategoryPreview({ category }: CategoryPreviewProps) {
  const variant = category.variants[0]
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold tracking-tight">{variant.name}</h2>
        {variant.description && (
          <p className="text-muted-foreground mt-1">{variant.description}</p>
        )}
      </div>
      {/* Tab Toggle */}
      <div className="flex border-b px-6 pt-4 gap-2">
        <button
          className={`px-4 py-2 rounded-t text-sm font-semibold ${tab === 'preview' ? 'bg-white border border-b-0 border-gray-200' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          className={`px-4 py-2 rounded-t text-sm font-semibold ${tab === 'code' ? 'bg-white border border-b-0 border-gray-200' : 'bg-gray-100 text-gray-500'}`}
          onClick={() => setTab('code')}
        >
          Code
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        {tab === 'preview' ? (
          <variant.component />
        ) : (
          <pre className="w-full h-full p-6 bg-slate-950 text-slate-100 rounded-lg overflow-auto text-xs"><code>{variant.code || '// Code not available for this variant'}</code></pre>
        )}
      </div>
    </div>
  )
} 