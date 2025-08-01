import { useState, useEffect } from 'react'
import { Component } from '../types/Component'


const INITIAL_COMPONENTS: Component[] = []

export function useComponentRegistry() {
  const [components, setComponents] = useState<Component[]>(INITIAL_COMPONENTS)
  const [isLoading, setIsLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  // Load components from localStorage on mount
  useEffect(() => {
    const savedComponents = localStorage.getItem('mcp-visualizer-components')
    if (savedComponents) {
      try {
        const parsed = JSON.parse(savedComponents).map((comp: any) => ({
          ...comp,
          createdAt: new Date(comp.createdAt),
          updatedAt: new Date(comp.updatedAt)
        }))
        
        // Only load components that don't have a component property (AI-generated only)
        const aiComponents = parsed.filter((comp: any) => !comp.component)
        setComponents(aiComponents)
      } catch (error) {
        console.error('Error loading components from localStorage:', error)
        setComponents([])
      }
    } else {
      setComponents([])
    }
  }, [])

  // Save components to localStorage whenever components change (excluding React components)
  useEffect(() => {
    const componentsToSave = components.map(({ component, ...rest }) => rest)
    localStorage.setItem('mcp-visualizer-components', JSON.stringify(componentsToSave))
  }, [components])

  // Fetch components from GitHub
  const fetchFromGitHub = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/fetch-components')
      if (response.ok) {
        const data = await response.json()
        
        if (data.success) {
          // Parse the registry content to extract new components
          // This is a simplified approach - in a real implementation you'd want to properly parse the TypeScript
          const newComponents: Component[] = []
          
          // Add AI-generated components
          if (data.aiComponents) {
            data.aiComponents.forEach((aiComp: any) => {
              const componentName = aiComp.name
              const sanitizedName = componentName.replace(/[^a-zA-Z0-9]/g, '')
              
              newComponents.push({
                id: sanitizedName.toLowerCase(),
                name: sanitizedName,
                description: 'AI-generated component from GitHub',
                category: 'atoms', // Default category
                tags: ['ai-generated', 'github'],
                code: aiComp.content,
                createdAt: new Date(),
                updatedAt: new Date()
              })
            })
          }
          
          // Merge with existing components
          setComponents(prev => {
            const existingIds = new Set(prev.map(c => c.id))
            const uniqueNewComponents = newComponents.filter(c => !existingIds.has(c.id))
            return [...prev, ...uniqueNewComponents]
          })
          
          setLastFetched(new Date())
        }
      }
    } catch (error) {
      console.error('Error fetching components from GitHub:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addComponent = (component: Component) => {
    setComponents(prev => {
      // Check for existing component by name (case-insensitive)
      const existingByName = prev.find(c => 
        c.name.toLowerCase() === component.name.toLowerCase()
      )
      
      // Check for existing component by id
      const existingById = prev.find(c => c.id === component.id)
      
      if (existingByName || existingById) {
        // Update existing component instead of creating duplicate
        const existing = existingByName || existingById
        if (existing) {
          return prev.map(c => 
            (c.id === existing.id || c.name.toLowerCase() === component.name.toLowerCase())
              ? { ...component, updatedAt: new Date() }
              : c
          )
        }
      }
      
      // If no existing component found, add new one
      return [...prev, { ...component, createdAt: new Date(), updatedAt: new Date() }]
    })
  }

  const removeComponent = (componentId: string) => {
    setComponents(prev => prev.filter(c => c.id !== componentId))
  }

  const updateComponent = (componentId: string, updates: Partial<Component>) => {
    setComponents(prev => prev.map(c => 
      c.id === componentId 
        ? { ...c, ...updates, updatedAt: new Date() }
        : c
    ))
  }

  return {
    components,
    addComponent,
    removeComponent,
    updateComponent,
    fetchFromGitHub,
    isLoading,
    lastFetched
  }
} 