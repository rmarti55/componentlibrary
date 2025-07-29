import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'

export default function AIChat() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsLoading(true)
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
      }
    } catch (error) {
      setResponse('Error generating component. Please try again.')
    } finally {
      setIsLoading(false)
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
          <pre className="bg-slate-950 text-slate-100 rounded p-4 text-sm overflow-x-auto">
            <code>{response}</code>
          </pre>
        </div>
      )}
    </div>
  )
} 