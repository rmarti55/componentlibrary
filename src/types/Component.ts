export interface Component {
  id: string
  name: string
  description?: string
  figmaNodeId?: string
  figmaUrl?: string
  code: string
  component?: React.ComponentType<any>
  props?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  category?: string
  aiGenerated?: boolean
  states?: ComponentState[]
  interactive?: boolean
}

export interface ComponentVariant {
  id: string
  name: string
  description?: string
  component: React.ComponentType<any>
  props?: Record<string, any>
  code?: string
  interactive?: boolean
  states?: ComponentState[]
}

export interface ComponentState {
  name: string
  props: Record<string, any>
  description?: string
}

export interface ComponentCategory {
  id: string
  name: string
  description?: string
  variants: ComponentVariant[]
  layout?: 'grid' | 'list' | 'showcase'
  tags?: string[]
  createdAt: Date
  updatedAt: Date
} 