import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2, Eye, Code, Save, Download } from 'lucide-react'
import { AIChatPreview } from './AIChatPreview'

export default function AIChat() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [category, setCategory] = useState('atom')
  const [componentName, setComponentName] = useState('')
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code')
  const [showSave, setShowSave] = useState(false)
  const [saving, setSaving] = useState(false)

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

    setSaving(true)
    try {
      // Try GitHub API first
      const saveResponse = await fetch('/api/github-save-component', {
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
        alert(`✅ Component saved to GitHub successfully!\n\nComponent: ${data.componentName}\nCategory: ${data.category}\n\nIt will appear in the sidebar after deployment.`)
        setShowSave(false)
        setResponse('')
        setMessage('')
      } else if (data.fallback) {
        // Fallback to download
        handleDownload()
      } else {
        alert('Failed to save component: ' + data.error)
      }
    } catch (error) {
      // Fallback to download on any error
      handleDownload()
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!response || !componentName) return

    // Create component file content
    const sanitizedName = componentName.replace(/[^a-zA-Z0-9]/g, '')
    const fileName = `${sanitizedName}.tsx`
    
    // Create download
    const blob = new Blob([response], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Show instructions
    const message = `📁 Component downloaded!\n\n` +
      `File: ${fileName}\n` +
      `Category: ${category}\n\n` +
      `To add to library:\n` +
      `1. Save ${fileName} to src/components/ai/\n` +
      `2. Update src/data/componentCategories.ts\n` +
      `3. Commit and push to GitHub\n\n` +
      `Component will appear in sidebar after deployment.`
    
    alert(message)
    setShowSave(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Component Generator</h2>
        <p className="text-sm text-muted-foreground">
          Describe a component and AI will generate it for you
        </p>
      </div>

      {/* Input */}
      <div className="p-4 border-b">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Create a red button component..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>

      {/* Response */}
      {response && (
        <div className="flex-1 overflow-auto">
          <div className="flex gap-2 mb-4 p-4">
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
                  disabled={saving}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save to Library
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            )}
          </div>
          
          <div className="px-4 pb-4">
            {viewMode === 'code' ? (
              <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                <code>{response}</code>
              </pre>
            ) : (
              <AIChatPreview code={response} />
            )}
          </div>
        </div>
      )}
    </div>
  )
} 