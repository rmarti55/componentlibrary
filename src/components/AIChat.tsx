import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2, Eye, Code, Save } from 'lucide-react'
import { AIChatPreview } from './AIChatPreview'

export default function AIChat() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [category, setCategory] = useState('atom')
  const [componentName, setComponentName] = useState('')
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code')
  const [showSave, setShowSave] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
    setShowSave(false)
    try {
      const response = await fetch('/api/generate-component', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
      })
      
      const data = await response.json()
      if (data.error) {
        setResponse(`Error: ${data.error}`)
      } else {
        setResponse(data.componentCode)
        setCategory(data.category || 'atom')
        
        // Extract component name from code
        const nameMatch = data.componentCode.match(/const\s+(\w+)|export\s+default\s+(\w+)/)
        const extractedName = nameMatch?.[1] || nameMatch?.[2] || 'GeneratedComponent'
        setComponentName(extractedName)
        setShowSave(true)
      }
    } catch (error) {
      setResponse('Error generating component. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!response || !componentName) return

    try {
      const saveResponse = await fetch('/api/save-component', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentCode: response,
          componentName,
          category
        })
      })

      const data = await saveResponse.json()
      if (data.success) {
        // Show detailed success message with instructions
        const message = `Component processed successfully!\n\n` +
          `File: ${data.fileName}\n` +
          `Category: ${data.category}\n\n` +
          `To add to library:\n` +
          `1. Create src/components/${data.fileName}\n` +
          `2. Add component code\n` +
          `3. Update src/data/componentCategories.ts\n\n` +
          `Component will appear in sidebar after deployment.`
        
        alert(message)
        setShowSave(false)
      } else {
        alert('Failed to save component: ' + data.error)
      }
    } catch (error) {
      alert('Error saving component. Please try again.')
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="text-lg font-semibold mb-4">AI Component Generator</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Create a red button component..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>

      {response && (
        <div className="flex-1 overflow-auto">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'code' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-black hover:bg-muted/80'
              }`}
              onClick={() => setViewMode('code')}
            >
              <Code className="w-4 h-4 inline mr-1" />
              Code
            </button>
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'preview' 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-black hover:bg-muted/80'
              }`}
              onClick={() => setViewMode('preview')}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
            {showSave && (
              <div className="flex gap-2 ml-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-2 py-1 text-sm border rounded"
                >
                  <option value="atom">Atom</option>
                  <option value="molecule">Molecule</option>
                  <option value="organism">Organism</option>
                </select>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-1" />
                  Save to Library
                </button>
              </div>
            )}
          </div>
          
          {viewMode === 'code' ? (
            <pre className="bg-slate-950 text-slate-100 rounded p-4 text-sm overflow-x-auto">
              <code>{response}</code>
            </pre>
          ) : (
            <div className="bg-white border rounded-lg p-8 flex items-center justify-center min-h-[200px]">
              <AIChatPreview code={response} />
            </div>
          )}
        </div>
      )}
    </div>
  )
} 