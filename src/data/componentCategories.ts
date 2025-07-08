import { ComponentCategory } from '@/types/Component'
import FilterChips from '@/components/FilterChips'
import CommentsChip from '@/components/CommentsChip'
import FilterChip from '@/components/FilterChip'
import MultiBrandDashboard from '@/components/MultiBrandDashboard'
import ColorPalette from '@/components/ColorPalette'
import Typography from '@/components/Typography'
import FilterChipGroup from '@/components/FilterChipGroup'
import ReviewsModule from '@/components/ReviewsModule'

export const componentCategories: ComponentCategory[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    description: 'Design tokens, colors, typography, and layout primitives',
    layout: 'showcase',
    variants: [
      {
        id: 'color-palette',
        name: 'Color Palette',
        description: 'Brand colors with live swatches and hex values',
        component: ColorPalette,
        interactive: false,
        code: `// Brand Color Palette
const colors = {
  primary: {
    black: '#000000',
    blue: '#dce0f4',
  },
  neutral: {
    gray: '#f5f5f5',
    grayBorder: '#c3c5d0',
  }
}

// Usage in Tailwind CSS
// bg-black, bg-blue-100, bg-gray-100, border-gray-300`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Complete brand color palette with swatches'
          }
        ]
      },
      {
        id: 'typography',
        name: 'Typography',
        description: 'Futura font samples at different sizes and weights',
        component: Typography,
        interactive: false,
        code: `// Typography Scale
const typography = {
  headingLarge: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Futura Std, sans-serif'
  },
  headingMedium: {
    fontSize: '18px',
    fontWeight: 'semibold',
    fontFamily: 'Futura Std, sans-serif'
  },
  bodyLarge: {
    fontSize: '16px',
    fontWeight: 'medium',
    fontFamily: 'Futura Std, sans-serif'
  },
  bodySmall: {
    fontSize: '14px',
    fontWeight: 'normal',
    fontFamily: 'Futura Std, sans-serif'
  }
}`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Complete typography scale with Futura font'
          }
        ]
      }
    ],
    tags: ['design-tokens', 'colors', 'typography', 'foundations'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'atoms',
    name: 'Atoms',
    description: 'Individual UI building blocks - buttons, inputs, and basic components',
    layout: 'showcase',
    variants: [
      {
        id: 'filter-chip',
        name: 'Filter Chip',
        description: 'Interactive chip with 4 states: Default, Selected, With Dropdown, Selected + Dropdown',
        component: FilterChip,
        interactive: true,
        code: `import { useState } from 'react'

interface FilterChipProps {
  label?: string
  defaultSelected?: boolean
  onToggle?: (selected: boolean) => void
  hasDropdown?: boolean
}

const FilterChip = ({ 
  label = "Filter", 
  defaultSelected = false, 
  onToggle,
  hasDropdown = false 
}: FilterChipProps) => {
  const [isSelected, setIsSelected] = useState(defaultSelected)

  const handleClick = () => {
    const newSelected = !isSelected
    setIsSelected(newSelected)
    onToggle?.(newSelected)
  }

  return (
    <button
      onClick={handleClick}
      className={\`
        relative rounded-[35px] inline-flex items-center justify-center h-[35px] px-5 py-[7px] transition-all duration-200 hover:scale-105
        \${isSelected 
          ? 'bg-[#dce0f4] border border-[#dce0f4]' 
          : 'bg-transparent border border-[#c3c5d0] hover:border-[#a0a3b3]'
        }
      \`}
      style={{ fontFamily: 'Futura Std, sans-serif' }}
    >
      <div className="flex flex-row items-center justify-center gap-2 relative">
        <div className={\`flex flex-col justify-center leading-[0] not-italic text-[14px] text-center whitespace-nowrap \${isSelected ? 'text-[#000000]' : 'text-[#000000]'}\`}>
          <p className="block leading-[1.25] whitespace-pre">{label}</p>
        </div>
        {hasDropdown && (
          <div className="overflow-clip relative shrink-0 size-4">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}

export default FilterChip`,
        states: [
          {
            name: 'Default',
            props: { label: 'Filter', defaultSelected: false },
            description: 'Default unselected state with gray border'
          },
          {
            name: 'Selected',
            props: { label: 'Filter', defaultSelected: true },
            description: 'Selected state with blue background'
          },
          {
            name: 'With Dropdown',
            props: { label: 'Instagram', defaultSelected: false, hasDropdown: true },
            description: 'Filter chip with dropdown indicator'
          },
          {
            name: 'Selected + Dropdown',
            props: { label: 'Instagram', defaultSelected: true, hasDropdown: true },
            description: 'Selected state with dropdown'
          }
        ]
      },
      {
        id: 'black-filter-chip',
        name: 'Black Filter Chip',
        description: 'Dark themed filter chip with white text',
        component: FilterChips,
        interactive: false,
        code: `import React from 'react'

const BlackFilterChip = () => {
  return (
    <div
      className="bg-black relative rounded-[35px] inline-flex items-center justify-center h-[35px] px-5 py-[7px]"
    >
      <div className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[35px]" />
      <div className="flex flex-row items-center justify-center gap-2 relative">
        <div
          className="flex flex-col justify-center leading-[0] not-italic text-white text-[14px] text-center whitespace-nowrap"
          style={{ fontFamily: 'Futura Std, sans-serif' }}
        >
          <p className="block leading-[1.25] whitespace-pre">Instagram</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-4">
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BlackFilterChip`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Black background with white text and dropdown'
          }
        ]
      },
      {
        id: 'comments-chip',
        name: 'Comments Chip',
        description: 'Blue themed filter chip for comments',
        component: CommentsChip,
        interactive: false,
        code: `const CommentsChip = () => {
  return (
    <div 
      className="px-5 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200" 
      style={{ fontFamily: 'Futura Std, sans-serif' }}
    >
      Comments
    </div>
  )
}

export default CommentsChip`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Blue background comments chip'
          }
        ]
      }
    ],
    tags: ['atoms', 'chips', 'buttons', 'interactive'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'molecules',
    name: 'Molecules',
    description: 'Component combinations - groups of atoms working together',
    layout: 'showcase',
    variants: [
      {
        id: 'filter-chip-group',
        name: 'Filter Chip Group',
        description: 'Collection of filter chips working together',
        component: FilterChipGroup,
        interactive: true,
        code: `import FilterChip from './FilterChip'

const FilterChipGroup = () => {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <FilterChip label="All Posts" defaultSelected={true} />
      <FilterChip label="Instagram" hasDropdown={true} />
      <FilterChip label="Comments" />
      <FilterChip label="Ads" />
      <FilterChip label="Earned Media" />
      <FilterChip label="Statistics" />
    </div>
  )
}

export default FilterChipGroup`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Group of filter chips with various states'
          }
        ]
      }
    ],
    tags: ['molecules', 'chip-group', 'filters', 'interactive'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'organisms',
    name: 'Organisms',
    description: 'Complete interface sections - complex components with multiple elements',
    layout: 'showcase',
    variants: [
      {
        id: 'social-media-dashboard',
        name: 'Social Media Dashboard',
        description: 'Complete dashboard with header, filters, search, data table, and pagination',
        component: MultiBrandDashboard,
        interactive: true,
        code: `import React, { useState } from 'react'
import { ChevronDown, Search, MessageCircle, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'

const SocialMediaDashboard = () => {
  const [selectedChip, setSelectedChip] = useState('Instagram')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Complete dashboard component with:
  // - Header navigation (e.l.f. Skin branding)
  // - Interactive filter chips
  // - Search bar and dropdown filters
  // - Data table with post images, content, comments
  // - Pagination controls

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Futura Std, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">e.l.f. Skin</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Social Media Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {/* Filter chips implementation */}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Dropdown filters */}
        </div>
      </div>

      {/* Data Table */}
      <div className="px-8 py-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Post</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Content</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Comments</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">AI Response</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows with post data */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-8 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600">Page {currentPage}</span>
            <button className="p-2 hover:bg-gray-100 rounded">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaDashboard`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Complete social media dashboard interface'
          }
        ]
      },
      {
        id: 'reviews-module',
        name: 'Reviews Module',
        description: 'Detailed product review card with images, ratings, and user info',
        component: ReviewsModule,
        interactive: false,
        code: `// ReviewsModule organism generated from Figma MCP\n// See src/components/ReviewsModule.tsx for implementation`,
        states: [
          {
            name: 'Default',
            props: {},
            description: 'Default reviews module card as shown in Figma'
          }
        ]
      }
    ],
    tags: ['organisms', 'dashboard', 'reviews', 'cards'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
] 