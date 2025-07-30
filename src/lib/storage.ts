import { kv } from '@vercel/kv'

export interface ComponentData {
  id: string
  name: string
  category: 'atoms' | 'molecules' | 'organisms'
  code: string
  description: string
  created: string
  aiGenerated: boolean
  componentName: string
  states: Array<{
    name: string
    props: Record<string, any>
    description: string
  }>
}

export interface StorageProvider {
  saveComponent(component: ComponentData): Promise<boolean>
  getComponents(): Promise<ComponentData[]>
  getComponent(id: string): Promise<ComponentData | null>
  deleteComponent(id: string): Promise<boolean>
}

// Vercel KV Implementation
export class VercelKVProvider implements StorageProvider {
  private readonly prefix = 'ai-components:'

  async saveComponent(component: ComponentData): Promise<boolean> {
    try {
      await kv.set(`${this.prefix}${component.id}`, component)
      return true
    } catch (error) {
      console.error('Failed to save component to Vercel KV:', error)
      return false
    }
  }

  async getComponents(): Promise<ComponentData[]> {
    try {
      const keys = await kv.keys(`${this.prefix}*`)
      if (keys.length === 0) return []

      const components = await Promise.all(
        keys.map(key => kv.get(key as string))
      )
      
      return components
        .filter(Boolean)
        .map(comp => comp as ComponentData)
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    } catch (error) {
      console.error('Failed to get components from Vercel KV:', error)
      return []
    }
  }

  async getComponent(id: string): Promise<ComponentData | null> {
    try {
      const component = await kv.get(`${this.prefix}${id}`)
      return component as ComponentData || null
    } catch (error) {
      console.error('Failed to get component from Vercel KV:', error)
      return null
    }
  }

  async deleteComponent(id: string): Promise<boolean> {
    try {
      await kv.del(`${this.prefix}${id}`)
      return true
    } catch (error) {
      console.error('Failed to delete component from Vercel KV:', error)
      return false
    }
  }
}

// Future Supabase Implementation (placeholder)
export class SupabaseProvider implements StorageProvider {
  async saveComponent(_component: ComponentData): Promise<boolean> {
    // TODO: Implement Supabase integration
    throw new Error('Supabase provider not implemented yet')
  }

  async getComponents(): Promise<ComponentData[]> {
    // TODO: Implement Supabase integration
    throw new Error('Supabase provider not implemented yet')
  }

  async getComponent(_id: string): Promise<ComponentData | null> {
    // TODO: Implement Supabase integration
    throw new Error('Supabase provider not implemented yet')
  }

  async deleteComponent(_id: string): Promise<boolean> {
    // TODO: Implement Supabase integration
    throw new Error('Supabase provider not implemented yet')
  }
}

// Storage factory - easy to switch providers
export class ComponentStorage {
  private provider: StorageProvider

  constructor(provider: StorageProvider = new VercelKVProvider()) {
    this.provider = provider
  }

  async saveComponent(component: ComponentData): Promise<boolean> {
    return this.provider.saveComponent(component)
  }

  async getComponents(): Promise<ComponentData[]> {
    return this.provider.getComponents()
  }

  async getComponent(id: string): Promise<ComponentData | null> {
    return this.provider.getComponent(id)
  }

  async deleteComponent(id: string): Promise<boolean> {
    return this.provider.deleteComponent(id)
  }

  // Easy provider switching
  setProvider(provider: StorageProvider) {
    this.provider = provider
  }
}

// Default instance
export const componentStorage = new ComponentStorage() 