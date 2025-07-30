import { useState, useEffect } from 'react'

export interface ComponentData {
  id: string
  name: string
  category: string
  code: string
  description: string
  created?: string
  aiGenerated: boolean
  componentName?: string
  states: Array<{
    name: string
    props: Record<string, any>
    description: string
  }>
}

export function useComponents() {
  const [components, setComponents] = useState<ComponentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComponents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/components')
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setComponents(data.components)
      }
    } catch (err) {
      setError('Failed to fetch components')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComponents()
  }, [])

  const refreshComponents = () => {
    fetchComponents()
  }

  return {
    components,
    loading,
    error,
    refreshComponents
  }
} 