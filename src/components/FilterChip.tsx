import { useState } from 'react'

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
      className={`
        relative rounded-[35px] inline-flex items-center justify-center h-[35px] px-5 py-[7px] transition-all duration-200 hover:scale-105
        ${isSelected 
          ? 'bg-[#dce0f4] border border-[#dce0f4]' 
          : 'bg-transparent border border-[#c3c5d0] hover:border-[#a0a3b3]'
        }
      `}
      data-name="Filter Chip"
    >
      <div className="flex flex-row items-center justify-center gap-2 relative">
        <div
          className={`
            flex flex-col justify-center leading-[0] not-italic text-[14px] text-center whitespace-nowrap
            ${isSelected ? 'text-[#000000]' : 'text-[#000000]'}
          `}
          style={{ fontFamily: 'Futura Std, sans-serif' }}
        >
          <p className="block leading-[1.25] whitespace-pre">{label}</p>
        </div>
        {hasDropdown && (
          <div className="overflow-clip relative shrink-0 size-4">
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  )
}

export default FilterChip 