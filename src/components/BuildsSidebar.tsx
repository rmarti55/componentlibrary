interface Build {
  id: string
  name: string
}

interface BuildsSidebarProps {
  builds: Build[]
  selectedBuildId: string
  onSelect: (id: string) => void
}

export default function BuildsSidebar({ builds, selectedBuildId, onSelect }: BuildsSidebarProps) {
  return (
    <div className="h-full flex flex-col bg-background border-r p-4 w-80">
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1 mb-4">
        Builds
      </div>
      <div className="space-y-2">
        {builds.map(build => (
          <button
            key={build.id}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors font-medium text-sm ${selectedBuildId === build.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:bg-muted'}`}
            onClick={() => onSelect(build.id)}
          >
            {build.name}
          </button>
        ))}
      </div>
      {/* Future: Add new build button */}
      {/* <button className="mt-6 px-4 py-2 rounded bg-primary text-white font-semibold">+ New Build</button> */}
    </div>
  )
} 