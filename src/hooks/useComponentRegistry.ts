import { useState, useEffect } from 'react'
import { Component } from '../types/Component'
import FilterChipsComponent from '../components/FilterChips'
import CommentsChipComponent from '../components/CommentsChip'
import FilterChipComponent from '../components/FilterChip'
import MultiBrandDashboard from '../components/MultiBrandDashboard'
import ButtonComponent from '../components/ai/Button'

const INITIAL_COMPONENTS: Component[] = [
  {
    id: 'filter-chips',
    name: 'Filter Chips',
    description: 'A collection of filter chips for categorizing content',
    category: 'Filters',
    tags: ['filters', 'chips', 'ui'],
    code: `// Filter Chips Component
import React from 'react';

const FilterChips = () => {
  const chips = ['Comments', 'Ads', 'All Posts', 'Earned Media', 'Statistics'];
  
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <div
          key={chip}
          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
        >
          {chip}
        </div>
      ))}
    </div>
  );
};

export default FilterChips;`,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    component: FilterChipsComponent
  },
  {
    id: 'comments-chip',
    name: 'Comments Chip',
    description: 'A chip component for displaying comments filter',
    category: 'Filters',
    tags: ['comments', 'chip', 'filter'],
    code: `// Comments Chip Component
import React from 'react';

const CommentsChip = () => {
  return (
    <div className="px-5 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
      Comments
    </div>
  );
};

export default CommentsChip;`,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    component: CommentsChipComponent
  },
  {
    id: 'filter-chip',
    name: 'Filter Chip',
    description: 'Interactive filter chip with selected/unselected states',
    category: 'Interactive',
    tags: ['filter', 'chip', 'interactive', 'toggle'],
    code: `// Filter Chip Component
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterChip = ({ label = "Filter", hasDropdown = false, initialSelected = false }) => {
  const [isSelected, setIsSelected] = useState(initialSelected);
  
  return (
    <button
      onClick={() => setIsSelected(!isSelected)}
      className={\`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md \${
        isSelected
          ? 'bg-blue-200 text-black border border-blue-200'
          : 'bg-transparent text-black border border-gray-300 hover:bg-gray-50'
      }\`}
    >
      {label}
      {hasDropdown && (
        <ChevronDown className="w-4 h-4" />
      )}
    </button>
  );
};

export default FilterChip;`,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    component: FilterChipComponent
  },
  {
    id: 'multi-brand-dashboard',
    name: 'Multi-Brand Dashboard',
    description: 'Comprehensive social media management dashboard with navigation, filters, search, data table, and pagination',
    category: 'Dashboard',
    tags: ['dashboard', 'table', 'navigation', 'social-media', 'complex'],
    code: `// Multi-Brand Dashboard Component
import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

const MultiBrandDashboard = () => {
  const [selectedChip, setSelectedChip] = useState('Instagram');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Component implementation with header navigation, filter chips, 
  // search controls, data table, and pagination
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Dashboard content */}
    </div>
  );
};

export default MultiBrandDashboard;`,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    component: MultiBrandDashboard
  },
  {
    id: 'button',
    name: 'Button',
    description: 'AI-generated red button component',
    category: 'atoms',
    tags: ['ai-generated', 'github', 'button'],
    code: `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const classes = \`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded \${className}\`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;`,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    component: ButtonComponent
  }
]

export function useComponentRegistry() {
  const [components, setComponents] = useState<Component[]>(INITIAL_COMPONENTS)
  const [isLoading, setIsLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  // Load components from localStorage on mount, but merge with initial components
  useEffect(() => {
    const savedComponents = localStorage.getItem('mcp-visualizer-components')
    if (savedComponents) {
      try {
        const parsed = JSON.parse(savedComponents).map((comp: any) => ({
          ...comp,
          createdAt: new Date(comp.createdAt),
          updatedAt: new Date(comp.updatedAt)
        }))
        
        // Merge saved components with initial components, preserving React components
        const mergedComponents = INITIAL_COMPONENTS.map(initialComp => {
          const savedComp = parsed.find((p: any) => p.id === initialComp.id)
          return savedComp ? { ...savedComp, component: initialComp.component } : initialComp
        })
        
        // Add any new saved components that aren't in initial
        const newSavedComponents = parsed.filter((p: any) => 
          !INITIAL_COMPONENTS.find(initial => initial.id === p.id)
        )
        
        setComponents([...mergedComponents, ...newSavedComponents])
      } catch (error) {
        console.error('Error loading components from localStorage:', error)
        setComponents(INITIAL_COMPONENTS)
      }
    } else {
      setComponents(INITIAL_COMPONENTS)
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