
import FilterChip from './FilterChip'

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

export default FilterChipGroup 